export interface IBaseAppServerApi {
  __post<T>(
    path: string,
    data: object,
    options: object,
  ): Promise<T>;
  __get<T>(
    path: string,
    options: object
  ): Promise<T>;
  __put<T>(
    path: string,
    data: object,
    options: object,
  ): Promise<T>;
  __uploadWithUri<T>(
    path: string,
    name: string,
    filename: string,
    uri: string,
    type: string,
    data: Array<{
      name: string,
      value: string
    }>,
    options: object,
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<T>;
  __uploadWithFile<T>(
    path: string,
    name: string,
    filename: string,
    file: File,
    type: string,
    data: Array<{
      name: string,
      value: string
    }>,
    options: object,
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<T>;
}