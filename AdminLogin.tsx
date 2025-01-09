'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdminStore } from '@/lib/stores/admin-store'

export default function AdminLoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const router = useRouter()
const login = useAdminStore((state) => state.login)

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const success = login(email, password)
  if (success) {
    router.push('/admin/dashboard')
  } else {
    setError('Invalid admin credentials')
  }
}

return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            Login as Admin
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
)
                }
