'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table'
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function AdminDashboard() {
const [selectedUser, setSelectedUser] = useState<string | null>(null)
const users = useAuthStore((state) => state.users)
const deleteUser = useAuthStore((state) => state.deleteUser)
const approveUser = useAuthStore((state) => state.approveUser)
const rejectUser = useAuthStore((state) => state.rejectUser)

return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">User Management</h2>
    </div>

    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>License Keys</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    user.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    user.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.paymentStatus}
                </span>
              </TableCell>
              <TableCell>R{user.paymentAmount}</TableCell>
              <TableCell>{user.licenseKeys.length}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {user.status === 'pending_approval' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => approveUser(user.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => rejectUser(user.id)}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedUser(user.id)}
                  >
                    Details
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the user
          </DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className="space-y-4">
            {users
              .find((u) => u.id === selectedUser)
              ?.licenseKeys.map((key, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <p className="font-mono text-sm">{key}</p>
                </div>
              ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  </div>
)
                  }
