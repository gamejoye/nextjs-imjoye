'use client'

import ConnectionStatus from '@/imjc/constant/ConnectionStatus';
import { EventType } from '@/imjc/constant/EventType';
import eventEmitter from '@/imjc/emitter';
import imjcManager from '@/imjc/imjc';
import { User } from '@/types/global';
import { UserInfoUtil } from '@/utils/userInfo';
import { createContext, useContext, useEffect, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'fail';

interface UserContextType {
  user: User | null;
  status: Status;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setUser: (user: User | null) => void;
  setStatus: (status: 'idle' | 'loading' | 'success' | 'fail') => void;
}

const defaultUserDispatch = (user: User | null) => { };
const defaultStatusDispatch = (status: Status) => { };
const defaltConnectionDispatch = (status: ConnectionStatus) => { };

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: defaultUserDispatch,
  connectionStatus: ConnectionStatus.Idle,
  setConnectionStatus: defaltConnectionDispatch,
  status: 'idle',
  setStatus: defaultStatusDispatch
});

export function UserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Idle);
  useEffect(() => {
    const { userId, authenticatedToken } = UserInfoUtil.getUserInfo();
    const shouldTryConnect = !!authenticatedToken && (connectionStatus === ConnectionStatus.Idle || connectionStatus === ConnectionStatus.UnConnected);
    if (shouldTryConnect) {
      imjcManager.connect(userId, authenticatedToken);
    }
  }, [user, connectionStatus, setConnectionStatus]);
  useEffect(() => {
    const handleConnectStatusChanged = (status: ConnectionStatus) => {
      setConnectionStatus(status);
    };
    eventEmitter.on(EventType.CONNECTION_STATUS_CHANGED, handleConnectStatusChanged);
    return () => {
      eventEmitter.off(EventType.CONNECTION_STATUS_CHANGED, handleConnectStatusChanged);
    }
  }, [user, connectionStatus, setConnectionStatus]);
  return (
    <UserContext.Provider
      value={{
        user,
        status,
        setUser,
        setStatus,
        connectionStatus,
        setConnectionStatus
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
