import { Chatroom, ChatroomSummary } from '@/types/global';
import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { useUser } from '@/hooks/global';
import { useClient } from '@/hooks/global';
import imjcManager from '@/imjc/imjc';
import { message } from 'antd';

interface ChatroomSummariesContext {
  summaries: ChatroomSummary[],
  setSummaries: (summaries: ChatroomSummary[]) => void,
  currentChatroom: Chatroom | null,
  setCurrentChatroom: (cm: Chatroom | null) => void;
  isQueryLoading: boolean,
  isQueryError: boolean,
}
const defaultDispatch = (summaries: ChatroomSummary[]) => { };
const defaultSetCurrentChatroom = (cm: Chatroom | null) => { };
export const ChatroomSummariesContext = createContext<ChatroomSummariesContext>({
  summaries: [],
  setSummaries: defaultDispatch,
  currentChatroom: null,
  setCurrentChatroom: defaultSetCurrentChatroom,
  isQueryLoading: false,
  isQueryError: false,
});

type Status = 'idle' | 'loading' | 'success' | 'fail';

const checkLoading = (status: Status) => ['idle', 'loading'].some(s => s === status);
const summarySorter = (s1: ChatroomSummary, s2: ChatroomSummary) => {
  const t1 = s1.latestMessage?.createTime || s1.joinTime;
  const t2 = s2.latestMessage?.createTime || s2.joinTime;
  return new Date(t2).getTime() - new Date(t1).getTime();
};

/// ------------------------------------------------------------

const ChatroomSummariesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useClient();
  const { user } = useUser();
  const [currentChatroom, setCurrentChatroom] = useState<Chatroom | null>(null);
  const [summaries, setSummaries] = useState<ChatroomSummary[]>([]);
  const [queryStatus, setQueryStatus] = useState<Status>('idle');

  const fetchSummaries = async () => {
    if (!user) return;
    setQueryStatus('loading');
    let success = true;
    const summaries = await imjcManager
      .getChatroomSummariesFromRemote(
        user.id,
        (err) => {
          success = false;
          setQueryStatus('fail');
          message.error('获取聊天室信息失败！')
        }
      );
    if (success) {
      setQueryStatus('success');
      setSummaries(summaries.toSorted(summarySorter));
    }
  }

  const wrappedSetSummaries = useCallback((summaries: ChatroomSummary[]) => {
    setSummaries(summaries.toSorted(summarySorter));
  }, [setSummaries]);

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <ChatroomSummariesContext.Provider
      value={{
        summaries,
        setSummaries: wrappedSetSummaries,
        currentChatroom,
        setCurrentChatroom,
        isQueryLoading: checkLoading(queryStatus),
        isQueryError: queryStatus === 'fail',
      }}
    >
      {children}
    </ChatroomSummariesContext.Provider>
  );
};

export default ChatroomSummariesProvider;