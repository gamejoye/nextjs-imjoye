import { paths } from "@/types/api";
import { supportUploadWithFile } from "@/utils/platform";

export class AppServerApi {
  self!: AppServerApi;

  constructor() { }

  init(self: AppServerApi) {
    this.self = self;
  }

  async uploadAvatar(
    input: string | File,
    onProgress?: (uploaded: number, total: number) => void,
  ): Promise<paths['/users/avatar/upload']['post']['responses']['201']['content']['application/json']> {
    if (supportUploadWithFile()) {
      return this.__uploadWithFile('users/avatar/upload', 'file', 'file.jpg', input as File, 'jpg', [], {}, onProgress);
    } else {
      return this.__uploadWithUri('users/avatar/upload', 'file', 'file.jpg', input as string, 'jpg', [], {}, onProgress);
    }
  }

  async login(
    body: paths['/auth/login']['post']['requestBody']['content']['application/json'],
  ): Promise<paths['/auth/login']['post']['responses']['201']['content']['application/json']> {
    return this.__post('auth/login', body);
  }

  async register(
    body: paths['/auth/register']['post']['requestBody']['content']['application/json'],
  ): Promise<paths['/auth/register']['post']['responses']['201']['content']['application/json']> {
    return this.__post('auth/register', body);
  }

  async visitChatroom(
    path: paths['/chatrooms/{chatroomId}/visit']['put']['parameters']['path'],
    query: paths['/chatrooms/{chatroomId}/visit']['put']['parameters']['query'],
  ): Promise<paths['/chatrooms/{chatroomId}/visit']['put']['responses']['200']['content']['application/json']> {
    const chatroomId = path.chatroomId;
    const timestamp = encodeURIComponent(query.timestamp);
    return this.__put(`chatrooms/${chatroomId}/visit?timestamp=${timestamp}`);
  }

  async requestChatroomSummaries(
  ): Promise<paths['/chatrooms/summaries']['get']['responses']['200']['content']['application/json']> {
    return this.__get('chatrooms/summaries');
  }

  async requestChatroomByFriendId(
    query: paths['/chatrooms']['get']['parameters']['query'],
  ): Promise<paths['/chatrooms']['get']['responses']['200']['content']['application/json']> {
    return this.__get(`chatrooms?friend_id=${query.friend_id}`);
  }

  async requestChatroomSummary(
    path: paths['/chatrooms/summaries/{chatroomId}']['get']['parameters']['path'],
  ): Promise<paths['/chatrooms/summaries/{chatroomId}']['get']['responses']['200']['content']['application/json']> {
    const chatroomId = path.chatroomId;
    return this.__get(`chatrooms/summaries/${chatroomId}`);
  }

  async requestMessages(
    query: paths['/messages']['get']['parameters']['query'],
  ): Promise<paths['/messages']['get']['responses']['200']['content']['application/json']> {
    const { room_id } = query;
    return this.__get(`messages?room_id=${room_id}`);
  }

  async createMessage(
    body: paths['/messages']['post']['requestBody']['content']['application/json']
  ): Promise<paths['/messages']['post']['responses']['201']['content']['application/json']> {
    return this.__post('messages', body);
  }

  async requestUser(
    path: paths['/users/{id}']['get']['parameters']['path'],
  ): Promise<paths['/users/{id}']['get']['responses']['200']['content']['application/json']> {
    const { id } = path;
    return this.__get(`users/${id}`);
  }

  async requestFriends(
    path: paths['/users/{id}/friends']['get']['parameters']['path'],
  ): Promise<paths['/users/{id}/friends']['get']['responses']['200']['content']['application/json']> {
    const { id } = path;
    return this.__get(`users/${id}/friends`);
  }

  async requestFriendInfo(
    path: paths['/users/{id}/friends/{friendId}']['get']['parameters']['path'],
  ): Promise<paths['/users/{id}/friends/{friendId}']['get']['responses']['200']['content']['application/json']> {
    const { id, friendId } = path;
    return this.__get(`users/${id}/friends/${friendId}`);
  }

  async __post<T>(
    path: string,
    data: object = {},
    options: object = {},
  ): Promise<T> {
    return this.self.__post(path, data, options);
  }

  async __get<T>(
    path: string,
    options: object = {},
  ): Promise<T> {
    return this.self.__get(path, options);
  }

  async __put<T>(
    path: string,
    data: object = {},
    options: object = {},
  ): Promise<T> {
    return this.self.__put(path, data, options);
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
    return this.self.__uploadWithUri(path, name, filename, uri, type, data, options, onProgress);
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
    return this.self.__uploadWithFile(path, name, filename, file, type, data, options, onProgress);
  }

}

const appServerApi = new AppServerApi();
export default appServerApi;