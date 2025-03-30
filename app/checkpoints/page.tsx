'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const checkpoints = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Algebra (Quadratic Equations)',
    dueDate: '2025-04-04',
    status: 'upcoming',
  },
  {
    id: 2,
    subject: 'Biology',
    topic: 'Photosynthesis',
    dueDate: '2025-03-25',
    status: 'done',
  },
  {
    id: 3,
    subject: 'English',
    topic: 'Essay Practice',
    dueDate: '2025-03-28',
    status: 'missed',
  },
]

export default function CheckpointsPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded || !isSignedIn) {
    return <p className="text-center mt-10">Loading checkpoints...</p>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Checkpoints</h1>

      <div className="grid gap-4">
        {checkpoints.map((cp) => (
          <Card key={cp.id}>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
              <CardTitle>{cp.subject} – {cp.topic}</CardTitle>
              <Badge variant={getBadgeVariant(cp.status)}>{cp.status.toUpperCase()}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Due: {new Date(cp.dueDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getBadgeVariant(status: string) {
  switch (status) {
    case 'done':
      return 'default'
    case 'missed':
      return 'destructive'
    case 'upcoming':
      return 'secondary'
    default:
      return 'outline'
  }
}
