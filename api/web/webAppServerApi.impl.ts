import { UserInfoUtil } from "@/utils/userInfo";
import { AppServerApi } from "../appServerApi";

export class WebAppServerApiImpl extends AppServerApi {
  apiBaseUrl: string;
  constructor() {
    super();
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    if (apiBaseUrl[apiBaseUrl.length - 1] !== '/') {
      apiBaseUrl += '/';
    }
    this.apiBaseUrl = apiBaseUrl;
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

    console.log('formData: ', formData.get(name), name);
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
    const userInfo = await UserInfoUtil.getUserInfo();
    const token = userInfo.authenticatedToken;
    return 'Bearer ' + token;
  }
}
