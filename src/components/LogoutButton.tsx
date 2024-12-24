'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove the auth cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
} 