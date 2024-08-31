import { Message } from "@/types/global";

export class GetMessagesQuery {
  chatroomId: number;
  pageSize: number;
  oldestMessageId?: number;

  constructor(
    chatroomId: number,
    pageSize: number,
    oldestMessageId?: number
  ) {
    this.chatroomId = chatroomId;
    this.pageSize = pageSize;
    this.oldestMessageId = oldestMessageId;
  }
}

export class GetMessagesResult {
  more: boolean;
  messages: Array<Message>;

  constructor(
    more: boolean,
    messages: Array<Message>,
  ) {
    this.more = more;
    this.messages = messages;
  }
}
