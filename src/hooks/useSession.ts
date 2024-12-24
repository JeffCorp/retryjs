'use client'

import { useState, useEffect } from 'react'
import { User, Session } from '@/types/auth'

export function useSession(): Session {
  const [session, setSession] = useState<Session>({
    user: null,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check if we have an auth token
    const hasAuthToken = document.cookie.includes('auth_token')
    
    if (hasAuthToken) {
      // In a real app, you'd validate the token and fetch user data
      // For now, we'll use dummy data
      setSession({
        user: {
          email: 'admin@email.com',
          name: 'Admin User',
          role: 'admin',
        },
        isAuthenticated: true,
      })
    }
  }, [])

  return session
} 