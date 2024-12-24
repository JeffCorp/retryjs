'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSession } from '@/hooks/useSession'
import { Session } from '@/types/auth'

const SessionContext = createContext<Session | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession()

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }
  return context
} 