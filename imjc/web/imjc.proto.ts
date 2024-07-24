// import { WebsocketHeader } from '../types/WebsocketHeader.type';
import { WebSocketMessage } from '../types/WebSocketMessage.type';
import { IBaseIMJCManager } from '../interface/BaseIMJCManager.interface';
import ConnectionStatus from '../constant/ConnectionStatus';
import { EventEmitter } from '../emitter';
import { EventType } from '../constant/EventType';
import { AppServerApi } from '../../api/appServerApi';
// import { WebSocketEventType } from '../constant/WebSocketEventType';
import { fetchWithRetry } from '@/utils/http';
import { getCurrentDatetime } from '@/utils/datetime';
import { isCreated, isOk } from '@/api/web/issuccess';
import { Chatroom, ChatroomSummary, FriendInfo, FriendRequest, Message, User } from '@/types/global';
import { WebSocketEventType } from '../constant/WebSocketEventType';

export default class WebIMJCManagerImpl implements IBaseIMJCManager {
  connectionStatus: ConnectionStatus = ConnectionStatus.Idle;
  serverApi: AppServerApi;
  eventEmitter: EventEmitter;
  ws!: WebSocket;

  constructor(
    serverApi: AppServerApi,
    eventEmitter: EventEmitter,
  ) {
    this.serverApi = serverApi;
    this.eventEmitter = eventEmitter;
  }

  async sendFriendRequst(
    from: number,
    to: number,
    failCB: (err: Error) => void,
  ): Promise<FriendRequest> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.sendFriendRequest(
            { from, to, },
          )
        ),
        ({ statusCode }) => isCreated(statusCode),
        0,
      )
      return res.data;
    } catch (err: any) {
      failCB(err);
      return new FriendRequest();
    }
  }

  async getUserByEmailFromRemote(email: string, failCB: (err: Error) => void): Promise<User> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.requestUserByEmail(
            { email },
          )
        ),
        ({ statusCode }) => isOk(statusCode),
        0,
      )
      return res.data;
    } catch (err: any) {
      failCB(err);
      return new User();
    }
  }
  async acceptFriendRequest(userId: number, requestId: number, failCB: (err: Error) => void): Promise<FriendRequest> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.acceptFriendRequest(
            { id: userId, requestId },
          )
        ),
        ({ statusCode }) => isOk(statusCode),
      )
      return res.data;
    } catch (err: any) {
      failCB(err);
      return new FriendRequest();
    }
  }

  async rejectFriendRequest(userId: number, requestId: number, failCB: (err: Error) => void): Promise<FriendRequest> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.rejectFriendRequest(
            { id: userId, requestId },
          )
        ),
        ({ statusCode }) => isOk(statusCode),
      )
      return res.data;
    } catch (err: any) {
      failCB(err);
      return new FriendRequest();
    }
  }

  getFriendRequests(userId: number, failCB: (err: Error) => void): Promise<FriendRequest[]> {
    return Promise.resolve([]);
  }

  async getFriendRequestsFromRemote(userId: number, failCB: (err: Error) => void): Promise<FriendRequest[]> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.requestFriendRequests(
            { id: userId, },
          )
        ),
        ({ statusCode }) => isOk(statusCode),
      )
      return res.data;
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async quitChatroom(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<string> {
    try {
      const res = await fetchWithRetry(
        () => (
          this.serverApi.visitChatroom(
            { chatroomId },
            { timestamp: getCurrentDatetime() },
          )
        ),
        ({ statusCode }) => isOk(statusCode),
      );
      this.eventEmitter.emit(EventType.QUIT_CHATROOM, chatroomId);
      return res.data;
    } catch (err: any) {
      failCB(err);
      return '';
    }
  }

  async sendMessage(
    message: Message,
    failCB: (err: Error) => void,
  ): Promise<Message> {
    try {
      const response = await fetchWithRetry(
        () => {
          return this.serverApi.createMessage({
            temporaryId: message.temporaryId,
            chatroom: {
              id: message.chatroom.id
            },
            from: {
              id: message.from.id
            },
            content: message.content,
          })
        },
        ({ statusCode }) => isCreated(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return new Message();
    }
  }

  async getMessages(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<Message[]> {
    try {
      return [];
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getMessagesFromRemote(
    userId: number,
    roomId: number,
    failCB: (err: Error) => void,
  ): Promise<Message[]> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestMessages({ room_id: roomId })),
        ({ statusCode }) => isOk(statusCode),
      )
      return response.data;
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getChatroomSummaries(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<ChatroomSummary[]> {
    try {
      return [];
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getChatroomSummariesFromRemote(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<ChatroomSummary[]> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestChatroomSummaries()),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getChatroomSummary(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void
  ): Promise<ChatroomSummary> {
    try {
      return new ChatroomSummary();
    } catch (err: any) {
      failCB(err);
      return new ChatroomSummary();
    }
  }

  async getChatroomSummaryFromRemote(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void
  ): Promise<ChatroomSummary> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestChatroomSummary(
          {
            chatroomId
          },
        )),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return new ChatroomSummary();
    }
  }

  async getChatroomByFriendId(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void
  ): Promise<Chatroom> {
    try {
      return new Chatroom();
    } catch (err: any) {
      failCB(err);
      return new Chatroom();
    }
  }

  async getChatroomByFriendIdFromRemote(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void
  ): Promise<Chatroom> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestChatroomByFriendId({
          friend_id: friendId
        })),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return new Chatroom();
    }
  }

  async getUser(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<User> {
    try {
      return new User();
    } catch (err: any) {
      failCB(err);
      return new User();
    }
  }

  async getUserFromRemote(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<User> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestUser({
          id: userId
        })),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return new User();
    }
  }

  async getFriends(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<User[]> {
    try {
      return [];
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getFriendsFromRemote(
    userId: number,
    failCB: (err: Error) => void
  ): Promise<User[]> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestFriends({
          id: userId
        })),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return [];
    }
  }

  async getFriendInfo(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void
  ): Promise<FriendInfo> {
    try {
      const response = await fetchWithRetry(
        () => (this.serverApi.requestFriendInfo({
          id: userId, friendId
        })),
        ({ statusCode }) => isOk(statusCode),
      );
      return response.data;
    } catch (err: any) {
      failCB(err);
      return new FriendInfo();
    }
  }

  send<T>(event: EventType, payload: T) {
    const message = new WebSocketMessage(event, payload);
  }

  async connect(userId: number, token: string) {
    let url = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
    if (url[url.length - 1] == '/') url = url.substring(0, url.length - 1);
    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket(url + '?authorization=' + token);
    this.ws.onmessage = (event) => {
      const wsMsg: WebSocketMessage<unknown> = JSON.parse(event.data);
      switch (wsMsg.event) {
        case WebSocketEventType.NEW_MESSAGE: {
          const msg = wsMsg.payload as Message;
          this.eventEmitter.emit(EventType.NEW_MESSAGE, msg);
          break;
        }
        case WebSocketEventType.NEW_FRIEND_REQUEST: {
          const fq = wsMsg.payload as FriendRequest;
          this.eventEmitter.emit(EventType.NEW_FRIEND_REQUEST, fq);
          break;
        }
        case WebSocketEventType.NEW_FRIEND: {
          const friend = wsMsg.payload as User;
          this.eventEmitter.emit(EventType.NEW_FRIEND, friend);
          break;
        }
        case WebSocketEventType.NEW_CHATROOM: {
          const chatroom = wsMsg.payload as Chatroom;
          this.eventEmitter.emit(EventType.NEW_CHATROOM, chatroom);
          break;
        }
      }
    }
    this.ws.onopen = (event) => {
    }
    this.ws.onerror = (event) => {
    }
    this.ws.onclose = (event) => {
    }
  }

  async disconnect(userId: number, token: string) {
    if (this.ws) {
      this.ws.close();
    }
  }
}
