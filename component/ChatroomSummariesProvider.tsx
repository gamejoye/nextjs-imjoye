import { ChatroomSummary } from '@/types/global';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useUser } from '@/hooks/global';
import { useClient } from '@/hooks/global';
import imjcManager from '@/imjc/imjc';
import { message } from 'antd';

interface ChatroomSummariesContext {
  summaries: ChatroomSummary[],
  setSummaries: (summaries: ChatroomSummary[]) => void,
  isQueryLoading: boolean,
  isQueryError: boolean,
}
const defaultDispatch = (summaries: ChatroomSummary[]) => { };
export const ChatroomSummariesContext = createContext<ChatroomSummariesContext>({
  summaries: [],
  setSummaries: defaultDispatch,
  isQueryLoading: false,
  isQueryError: false,
});

type Status = 'idle' | 'loading' | 'success' | 'fail';

const checkLoading = (status: Status) => ['idle', 'loading'].some(s => s === status);

/// ------------------------------------------------------------

const ChatroomSummariesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useClient();
  const { user } = useUser();
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
      setSummaries(summaries);
    }
  }

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <ChatroomSummariesContext.Provider
      value={{
        summaries,
        setSummaries,
        isQueryLoading: checkLoading(queryStatus),
        isQueryError: queryStatus === 'fail',
      }}
    >
      {children}
    </ChatroomSummariesContext.Provider>
  );
};

export default ChatroomSummariesProvider;