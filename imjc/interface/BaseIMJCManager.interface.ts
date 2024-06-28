import { FriendInfo, User, Chatroom, ChatroomSummary, Message } from '@/types/global';

export interface IBaseIMJCManager {
  /**
   * 用户连接
   * @param userId
   * @param token
   * @returns
   * @returns
   */
  connect(
    userId: number,
    token: string,
  ): Promise<void>;

  /**
   * 用户断开连接
   * @param userId - 用户id
   * @param token - 用户凭证
   * @returns
   */
  disconnect(
    userId: number,
    token: string,
  ): Promise<void>;

  /**
   * 用户退出聊天室
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  quitChatroom(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<string>;

  /**
   * 发送消息
   * @param message
   * @param failCB
   * @returns
   */
  sendMessage(
    message: Message,
    failCB: (err: Error) => void,
  ): Promise<Message>;

  /**
   * 根据userId和chatroomId本地获取消息
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  getMessages(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<Message>>;

  /**
   * 根据userId和chatroomId从远程获取消息
   * @param userId
   * @param roomId
   * @param failCB
   * @returns
   */
  getMessagesFromRemote(
    userId: number,
    roomId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<Message>>;

  /**
   * 从本地获取聊天室概要信息
   * @param userId
   * @param failCB
   * @returns
   */
  getChatroomSummaries(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<ChatroomSummary>>;

  /**
   * 从服务器拉取聊天室概要信息
   * @param userId
   * @param failCB
   * @returns
   */
  getChatroomSummariesFromRemote(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<ChatroomSummary>>;

  /**
   * 从本地获取聊天室概要信息
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  getChatroomSummary(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<ChatroomSummary>;

  /**
   * 从远程获取聊天室概要信息
   * @param userId
   * @param chatroomId
   * @param failCB
   * @returns
   */
  getChatroomSummaryFromRemote(
    userId: number,
    chatroomId: number,
    failCB: (err: Error) => void,
  ): Promise<ChatroomSummary>;

  /**
   * 根据friendId从本地获取聊天室
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getChatroomByFriendId(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ): Promise<Chatroom>;

  /**
   * 根据friend_id从服务器拉取聊天室
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getChatroomByFriendIdFromRemote(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ): Promise<Chatroom>;

  /**
   * 从本地获取用户信息
   * @param userId
   * @param failCB
   * @returns
   */
  getUser(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<User>;

  /**
   * 从远程获取用户信息
   * @param userId
   * @param failCB
   * @returns
   */
  getUserFromRemote(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<User>;

  /**
   * 从本地获取好友列表
   * @param userId
   * @param failCB
   * @returns
   */
  getFriends(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<User>>;

  /**
   * 从远程获取好友列表
   * @param userId
   * @param failCB
   * @returns
   */
  getFriendsFromRemote(
    userId: number,
    failCB: (err: Error) => void,
  ): Promise<Array<User>>;

  /**
   * 从远程获取好友的详细信息
   * @param userId
   * @param friendId
   * @param failCB
   * @returns
   */
  getFriendInfo(
    userId: number,
    friendId: number,
    failCB: (err: Error) => void,
  ): Promise<FriendInfo>;
}