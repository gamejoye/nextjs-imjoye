import { UserInfoUtil } from "@/utils/userInfo";
import { AppServerApi } from "../appServerApi";

export class WebAppServerApiImpl extends AppServerApi {
  apiBaseUrl: string;
  userId: number;
  token: string;
  constructor(userId: number, token: string) {
    super();
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    if (apiBaseUrl[apiBaseUrl.length - 1] !== '/') {
      apiBaseUrl += '/';
    }
    this.apiBaseUrl = apiBaseUrl;
    this.userId = userId;
    this.token = token;
  }

  async __uploadWithUri<T>(
    path: string,
    name: string,
    filename: string,
    uri: string,
    type: string,
    data: Array<{
      name: string,
      value: string
    }> = [],
    options = {},
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
    if (path[0] == '/') path = path.substring(1);
    path = this.apiBaseUrl + path;
    const res = await fetch(path, {
      method: 'POST',
      next: { revalidate: 60 },
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
    if (path[0] == '/') path = path.substring(1);
    path = this.apiBaseUrl + path;
    const res = await fetch(path, {
      method: 'POST',
      next: { revalidate: 60 },
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
    if (path[0] == '/') path = path.substring(1);
    path = this.apiBaseUrl + path;
    console.log('path:', path);
    console.log('token:', token);
    const res = await fetch(path, {
      method: 'GET',
      next: { revalidate: 60 },
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
    if (path[0] == '/') path = path.substring(1);
    path = this.apiBaseUrl + path;
    const res = await fetch(path, {
      method: 'PUT',
      next: { revalidate: 60 },
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
}
