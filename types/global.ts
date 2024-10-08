export type FriendRequestType = 'PENDING' | 'ACCEPT' | 'REJECT';

export class UserInfo {
  'authenticatedToken': string;
  'userId': number;
}

export class Chatroom {
  id: number;
  type: 'SINGLE' | 'MULTIPLE';
  name: string;
  avatarUrl: string;
  createTime: string;

  constructor(
    id: number = -1,
    type: 'SINGLE' | 'MULTIPLE' = 'SINGLE',
    name: string = '',
    avatarUrl: string = '',
    createTime: string = '',
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.createTime = createTime;
  }
}

export class ChatroomSummary {
  unreadMessageCount: number;
  joinTime: string;
  latestVisitTime: string;
  onlineUserIds: number[];
  latestMessage: Message | null;
  chatroom: Chatroom;

  constructor(
    unreadMessageCount: number = -1,
    joinTime: string = '',
    latestVisitTime: string = '',
    onlineUserIds: number[] = [],
    latestMessage: Message | null = null,
    chatroom: Chatroom = new Chatroom(),
  ) {
    this.unreadMessageCount = unreadMessageCount;
    this.joinTime = joinTime;
    this.latestVisitTime = latestVisitTime;
    this.onlineUserIds = onlineUserIds;
    this.latestMessage = latestMessage;
    this.chatroom = chatroom;
  }
}

export class FriendInfo {
  user: User;
  createTime: string;

  constructor(
    user: User = new User(),
    createTime: string = '',
  ) {
    this.user = user;
    this.createTime = createTime
  }
}

export class Message {
  id: number;
  temporaryId: number;
  chatroom: Chatroom;
  from: User;
  content: string;
  createTime: string;

  constructor(
    id: number = -1,
    temporaryId: number = -1,
    chatroom: Chatroom = new Chatroom(),
    from: User = new User(),
    content: string = '',
    createTime: string = '',
  ) {
    this.id = id;
    this.temporaryId = temporaryId;
    this.chatroom = chatroom;
    this.from = from;
    this.content = content;
    this.createTime = createTime;
  }
}

export class User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  description: string;
  createTime: string;

  constructor(
    id: number = -1,
    username: string = '',
    email: string = '',
    avatarUrl: string = '',
    description: string = '',
    createTime: string = '',
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.description = description;
    this.createTime = createTime;
  }
}

export class FriendRequest {
  id: number;
  status: FriendRequestType;
  from: User;
  to: User;
  createTime: string;
  updateTime: string;
  constructor(
    id: number = -1,
    status: FriendRequestType = 'PENDING',
    from: User = new User(),
    to: User = new User(),
    createTime: string = '',
    updateTime: string = '',
  ) {
    this.id = id;
    this.status = status;
    this.from = from;
    this.to = to;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}