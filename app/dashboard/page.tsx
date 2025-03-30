'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded || !isSignedIn) {
    return <p className="text-center mt-10">Loading dashboard...</p>
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.firstName} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Subjects</CardTitle></CardHeader>
          <CardContent><p className="text-xl">6 Enrolled</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Next Checkpoint</CardTitle></CardHeader>
          <CardContent><p>Math – Algebra (in 3 days)</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Mock Exams</CardTitle></CardHeader>
          <CardContent><p>2 of 5 Completed</p></CardContent>
        </Card>
      </div>
    </>
  )
}
