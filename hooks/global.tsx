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
  return m2.id - m1.id;
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

export function useQueryChatroomSummary(id: number | string) {
  if (typeof id === 'string') {
    id = Number(id);
  }
  const { user } = useUser();
  const { summaries } = useChatroomSummaries();
  const [status, setStatus] = useState<Status>('idle');
  const [summary, setSummary] = useState<ChatroomSummary | null>(null);
  useEffect(() => {
    if (!user) return;
    if (Number.isNaN(id)) {
      setStatus('fail');
      return;
    }
    const summaryFromCache = summaries.find((s) => s.chatroom.id === id);
    if (summaryFromCache) {
      setStatus('success');
      setSummary(summaryFromCache);
      return;
    }
    const fetchChatSummary = async () => {
      let found = true;
      setStatus('loading');
      const summary = await imjcManager
        .getChatroomSummaryFromRemote(
          user.id,
          id,
          (err) => {
            found = false;
          },
        );
      if (found) {
        setStatus('success');
        setSummary(summary);
      } else {
        setStatus('fail');
      }
      setSummary(summary);
    }
    fetchChatSummary();
  }, []);
  return { summary, status };
}

type UseMessagesOptions = {
  pageSize?: number;
}

export function useMessages(summary: ChatroomSummary, options?: UseMessagesOptions) {
  const { pageSize } = { pageSize: 10, ...(options || {}) };
  const { user, status } = useUser();
  const [more, setMore] = useState(true);
  const [fetchMoreStatus, setFetchMoreStatus] = useState<Status>('idle');
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

  const fetchMessages = async (first: boolean) => {
    if (user === null || !more) return;
    if (first) {
      setQueryStatus('loading');
    } else {
      setFetchMoreStatus('loading');
    }
    let found = true;
    const { more: newMore, messages: fetchedMessages } = await imjcManager
      .getMessagesFromRemote(
        user.id,
        {
          chatroomId: summary.chatroom.id,
          oldestMessageId: messages.length === 0 ? undefined : messages[messages.length - 1].id,
          pageSize,
        },
        (err) => {
          found = false;
        }
      );
    if (found) {
      setMore(newMore);
      if (first) {
        setQueryStatus('success');
      } else {
        setFetchMoreStatus('success');
      }
      setMessages([...fetchedMessages, ...messages].sort(messageSorter));
    } else {
      if (first) {
        setQueryStatus('fail');
      } else {
        setFetchMoreStatus('fail');
      }
    }
  };

  const fetchMore = async () => {
    await fetchMessages(false);
  }

  useEffect(() => {
    fetchMessages(true);
  }, []);

  return {
    messages,
    send,
    setNewMessage,
    more,
    fetchMore,
    isFetchMoreLoading: checkLoading(fetchMoreStatus),
    isFetchMoreError: [status, queryStatus, fetchMoreStatus].includes('fail'),
    isQueryLoading: checkLoading(status) || checkLoading(queryStatus),
    isQueryError: [status, queryStatus].includes('fail'),
    isMutativeLoading: checkLoading(status) || checkLoading(queryStatus) || checkLoading(mutativeStatus),
    isMutativeError: [status, queryStatus, mutativeStatus].includes('fail'),
  }
}