import { UserInfoUtil } from "@/utils/userInfo";
import { IBaseAppServerApi } from "./interface/BaseAppServerApi.interface";

export class WebAppServerApiImpl implements IBaseAppServerApi {
  apiBaseUrl: string;
  userId: number;
  token: string;
  constructor(userId: number, token: string) {
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    if (apiBaseUrl[apiBaseUrl.length - 1] !== '/') {
      apiBaseUrl += '/';
    }
    this.apiBaseUrl = apiBaseUrl;
    this.userId = userId;
    this.token = token;
  }
  __uploadWithUri<T>(
    path: string, 
    name: string, 
    filename: string, 
    uri: string, 
    type: string, 
    data: Array<{ name: string; value: string; }>, 
    options: object,
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<T> {
    throw new Error('不支持通过Uri上传头像');
  }

  async __uploadWithFile<T>(
    path: string,
    name: string,
    filename: string,
    file: File,
    type: string,
    data: Array<{
      name: string,
      value: string
    }> = [],
    options = {},
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<T> {
    const formData = new FormData();
    formData.append(name, file, filename);
    for (const { name, value } of data) {
      formData.append(name, value);
    }

    const token = await this.getBearerToken();
    path = this.concatPath(path);
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        "Authorization": token,
      },
      body: formData,
      ...options,
    })
    return res.json();
  }

  async __post<T>(
    path: string,
    data = {},
    options = {},
  ): Promise<T> {
    const token = await this.getBearerToken();
    path = this.concatPath(path);
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(data),
      ...options,
    })
    return res.json();
  }

  async __get<T>(
    path: string,
    options = {},
  ): Promise<T> {
    const token = await this.getBearerToken();
    path = this.concatPath(path);
    const res = await fetch(path, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      ...options,
    });
    return res.json();
  }

  async __put<T>(
    path: string,
    data = {},
    options = {},
  ): Promise<T> {
    const token = await this.getBearerToken();
    path = this.concatPath(path);
    const res = await fetch(path, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return res.json();
  }

  private async getBearerToken() {
    let token = this.token;
    if (!token) {
      const userInfo = await UserInfoUtil.getUserInfo();
      token = userInfo.authenticatedToken;
    }
    return 'Bearer ' + token;
  }

  private concatPath(path: string) {
    if (path[0] == '/') path = path.substring(1);
    path = this.apiBaseUrl + path;
    return path;
  }
}
