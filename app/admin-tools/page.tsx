// FILE: /app/admin-tools/page.tsx

'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockUsers = [
  { name: 'Alice Tan', email: 'alice@example.com', role: 'student' },
  { name: 'Bob Lim', email: 'bob@example.com', role: 'admin' },
  { name: 'Chong Mei', email: 'chong@example.com', role: 'student' },
  { name: 'Dana Raj', email: 'dana@example.com', role: 'student' }
]

export default function AdminToolsPage() {
  const { user } = useUser()
  const router = useRouter()
  const role = user?.publicMetadata?.role

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
    }
  }, [role, router])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🛠️ Admin Tools</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>📊 User Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">Total users: {mockUsers.length}</p>
            <p className="text-muted-foreground">Admins: {mockUsers.filter(u => u.role === 'admin').length}</p>
            <p className="text-muted-foreground">Students: {mockUsers.filter(u => u.role === 'student').length}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>👥 User List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockUsers.map((u, i) => (
                <li key={i} className="border p-3 rounded bg-white shadow-sm">
                  <p className="font-medium">{u.name} ({u.role})</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📝 Mock Exam Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Feature in development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📚 Flashcard Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Flashcard suggestions and approvals</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
