'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DUMMY_CREDENTIALS = {
  email: 'admin@email.com',
  password: 'Pass1234'
}

const DUMMY_USER = {
  email: 'admin@email.com',
  name: 'Admin User',
  role: 'admin' as const,
}

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      // Set a cookie with user data
      const userData = JSON.stringify(DUMMY_USER)
      document.cookie = `auth_token=dummy_token; path=/`
      document.cookie = `user_data=${userData}; path=/`
      router.push('/statistics')
    } else {
      setError('Invalid credentials. Use admin@email.com / Pass1234')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
