import { FriendRequest, Message } from '@/types/global';
import { IBaseIMJCManager } from './interface/BaseIMJCManager.interface';
import WebIMJCManagerImpl from './web/imjc.proto';
import eventEmitter from './emitter';
import appServerApi from '@/api/appServerApi';
import ConnectionStatus from './constant/ConnectionStatus';
import { GetMessagesQuery } from './types/IMJC.type';

/*
  * IMJoye Chat聊天模块
 */
export class IMJCManager implements IBaseIMJCManager {
  private _self!: IBaseIMJCManager;

  get self(): IBaseIMJCManager {
    if (!this._self) {
      // TODO 识别不同平台
      const webImjcManager = new WebIMJCManagerImpl(
        appServerApi,
        eventEmitter,
      );
      this._self = webImjcManager;
    }
    return this._self;
  }

  getConnectionStatus(): ConnectionStatus {
    return this.self.getConnectionStatus();
  }

  /**
   * 退出聊天室
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  quitChatroom(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<string> {
    return this.self.quitChatroom(userId, chatroomId, failCB);
  }

  /**
   * 发送消息
   * @param message
   * @param failCB
   * @returns
   */
  sendMessage(
    message: Message,
    failCB: (err: Error) => void,
  ) {
    return this.self.sendMessage(message, failCB);
  }

  /**
   * 用户连接
   * @param userId
   * @param token
   * @returns
   */
  connect(userId: number, token: string) {
    return this.self.connect(userId, token);
  }

  /**
   * 用户断开连接
   * @returns
   */
  disconnect() {
    return this.self.disconnect();
  }

  /**
   * 从本地获取消息
   * @param userId
   * @param query
   * @param failCB
   * @returns
   */
  getMessages(
    userId: number,
    query: GetMessagesQuery,
    failCB: (err: Error) => void,
  ) {
    return this.self.getMessages(userId, query, failCB);
  }

  /**
   * 从服务器拉取消息
   * @param userId
   * @param query
   * @param failCB
   * @returns
   */
  getMessagesFromRemote(
    userId: number,
    query: GetMessagesQuery,
    failCB: (err: Error) => void,
  ) {
    return this.self.getMessagesFromRemote(userId, query, failCB);
  }

  /**
   * 从本地获取聊天室概要信息
   * @param userId
   * @param failCB
   * @returns
   */
  getChatroomSummaries(
    userId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getChatroomSummaries(userId, failCB);
  }

  /**
   * 从服务器拉取聊天室概要信息
   * @param userId
   * @param failCB
   * @returns
   */
  getChatroomSummariesFromRemote(
    userId: number,
    failCB: (err: Error) => void
  ) {
    return this.self.getChatroomSummariesFromRemote(userId, failCB);
  }

  /**
   * 从本地获取聊天室概要信息
   *
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  getChatroomSummary(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getChatroomSummary(userId, chatroomId, failCB);
  }

  /**
   * 从远程获取聊天室概要信息
   *
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  getChatroomSummaryFromRemote(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getChatroomSummaryFromRemote(userId, chatroomId, failCB);
  }

  /**
   * 根据friendId从本地获取聊天室
   *
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getChatroomByFriendId(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getChatroomByFriendId(userId, friendId, failCB);
  }

  /**
   * 根据friend_id从服务器拉取聊天室
   *
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getChatroomByFriendIdFromRemote(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getChatroomByFriendIdFromRemote(userId, friendId, failCB);
  }

  /**
   * 从本地获取用户信息
   *
   * @param userId
   * @param failCB
   * @returns
   */
  getUser(
    userId: number,
    failCB: (err: Error) => void
  ) {
    return this.self.getUser(userId, failCB);
  }

  /**
   * 从远程根据email获取用户信息
   * 
   * @param email
   * @param failCB
   * @returns
   */
  getUserByEmailFromRemote(
    email: string,
    failCB: (err: Error) => void,
  ) {
    return this.self.getUserByEmailFromRemote(email, failCB);
  }

  /**
   * 从本地获取好友请求
   * 
   * @param userId
   * @param failCB
   * @returns
   */
  getFriendRequests(
    userId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getFriendRequests(userId, failCB);
  }

  /**
   * 发送好友请求
   * 
   * @param from
   * @param to
   */
  sendFriendRequst(
    from: number,
    to: number,
    failCB: (err: Error) => void,
  ): Promise<FriendRequest> {
    return this.self.sendFriendRequst(from, to, failCB);
  }

  /**
   * 同意好友请求
   * 
   * @param userId
   * @param requestId
   * @param failCB
   * @returns
   */
  acceptFriendRequest(
    userId: number,
    requestId: number,
    failCB: (err: Error) => void,
  ): Promise<FriendRequest> {
    return this.self.acceptFriendRequest(userId, requestId, failCB);
  }

  /**
   * 拒绝好友请求
   * 
   * @param userId
   * @param requestId
   * @param failCB
   * @returns
   */
  rejectFriendRequest(
    userId: number,
    requestId: number,
    failCB: (err: Error) => void,
  ): Promise<FriendRequest> {
    return this.self.rejectFriendRequest(userId, requestId, failCB);
  }

  /**
   * 从远程获取好友请求
   * 
   * @param userId
   * @param failCB
   * @returns
   */
  getFriendRequestsFromRemote(
    userId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getFriendRequestsFromRemote(userId, failCB);
  }

  /**
   * 从远程获取用户信息
   *
   * @param userId
   * @param failCB
   * @returns
   */
  getUserFromRemote(
    userId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getUserFromRemote(userId, failCB);
  }

  /**
   * 从本地获取好友列表
   *
   * @param userId
   * @param failCB
   * @returns
   */
  getFriends(
    userId: number,
    failCB: (err: Error) => void
  ) {
    return this.self.getFriends(userId, failCB);
  }

  /**
   * 从远程获取好友列表
   *
   * @param userId
   * @param failCB
   * @returns
   */
  getFriendsFromRemote(
    userId: number,
    failCB: (err: Error) => void
  ) {
    return this.self.getFriendsFromRemote(userId, failCB);
  }

  /**
   * 从远程获取好友的详细信息
   *
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getFriendInfo(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ) {
    return this.self.getFriendInfo(userId, friendId, failCB);
  }
}

const imjcManager = new IMJCManager();
export default imjcManager;