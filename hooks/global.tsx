import { ChatroomSummariesContext } from "@/component/ChatroomSummariesProvider";
import { ThemeContext } from "@/component/ThemeProvider";
import { UserContext } from "@/component/UserProvider";
import imjcManager from "@/imjc/imjc";
import { ChatroomSummary, Message, User } from "@/types/global";
import { getCurrentDatetime } from "@/utils/datetime";
import { message } from "antd";
import { useContext, useEffect, useState } from "react";

type Status = 'idle' | 'loading' | 'success' | 'fail';

const checkLoading = (status: Status) => ['idle', 'loading'].some(s => s === status);

const messageSorter = (m1: Message, m2: Message) => {
  const t1 = new Date(m1.createTime).getTime();
  const t2 = new Date(m2.createTime).getTime();
  if (t1 === t2) return m1.id - m2.id;
  return t1 - t2;
}

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function useUser() {
  return useContext(UserContext);
}


export function useChatroomSummaries() {
  return useContext(ChatroomSummariesContext);
}

export function useMessages(summary: ChatroomSummary) {
  const { user, status } = useUser();
  const [queryStatus, setQueryStatus] = useState<Status>('idle');
  const [mutativeStatus, setMutativeStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);

  const setNewMessage = (message: Message) => {
    const newMessages = [...messages, message].sort(messageSorter);
    setMessages(newMessages);
  }

  const send = async (content: string) => {
    if (content.trim() === '') {
      message.warning('发送消息不能为空哦～');
      return;
    }
    const partialMessage = new Message(
      undefined,
      undefined,
      summary.chatroom,
      user as User,
      content,
      getCurrentDatetime(),
    );
    setMutativeStatus('loading');
    let success = true;
    await imjcManager
      .sendMessage(
        partialMessage,
        (err) => {
          success = false;
        }
      );
    if (success) {
      setMutativeStatus('success');
    } else {
      setMutativeStatus('fail');
    }
  }

  const fetchMessages = async () => {
    if (user === null) return;
    setQueryStatus('loading');
    let found = true;
    const messages = await imjcManager
      .getMessagesFromRemote(
        user.id,
        summary.chatroom.id,
        (err) => {
          found = false;
        }
      );
    if (found) {
      setQueryStatus('success');
      setMessages([...messages.reverse()]);
    } else {
      setQueryStatus('fail');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    send,
    setNewMessage,
    isQueryLoading: checkLoading(status) || checkLoading(queryStatus),
    isQueryError: status === 'fail' || queryStatus === 'fail',
    isMutativeLoading: checkLoading(status) || checkLoading(queryStatus) || checkLoading(mutativeStatus),
    isMutativeError: status === 'fail' || queryStatus === 'fail' || mutativeStatus === 'fail',
  }
}