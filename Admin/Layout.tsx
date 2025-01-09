'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/lib/stores/admin-store'

export default function AdminLayout({
children,
}: {
children: React.ReactNode
}) {
const router = useRouter()
const pathname = usePathname()
const isAdmin = useAdminStore((state) => state.isAdmin)
const logout = useAdminStore((state) => state.logout)

useEffect(() => {
  if (!isAdmin && pathname !== '/admin/login') {
    router.push('/admin/login')
  }
}, [isAdmin, router, pathname])

if (pathname === '/admin/login') {
  return children
}

if (!isAdmin) {
  return null
}

return (
  <div className="min-h-screen bg-gray-50">
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <h1 className="text-xl font-bold">Quick Pro Admin</h1>
        <Button
          variant="outline"
          onClick={() => {
            logout()
            router.push('/admin/login')
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
    <main className="mx-auto max-w-7xl p-4">{children}</main>
  </div>
)
}
