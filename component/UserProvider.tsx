'use client'

import { User } from '@/types/global';
import { createContext, useContext, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'fail';

interface UserContextType {
  user: User | null;
  status: Status;
  setUser: (user: User | null) => void;
  setStatus: (status: 'idle' | 'loading' | 'success' | 'fail') => void;
}

const defaultUserDispatch = (user: User | null) => {};
const defaultStatusDispatch = (status: Status) => {};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: defaultUserDispatch,
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
  return (
    <UserContext.Provider value={{ user, status, setUser, setStatus }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}