'use client'

import { User } from '@/types/global';
import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext({})

const UserContext = createContext<{ 
  user: User | null,
  status: 'idle' | 'loading' | 'success' | 'fail',
  setUser: (user: User | null) => void,
}>(null as any);

export function UserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, status: 'idle', setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}