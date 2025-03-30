'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const subjects = [
    { slug: 'math', name: 'Mathematics' },
    { slug: 'biology', name: 'Biology' },
    { slug: 'chemistry', name: 'Chemistry' },
    { slug: 'physics', name: 'Physics' },
  ]
  

export default function MockExamSubjectPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded || !isSignedIn) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Choose a Subject for Mock Exam</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.slug} href={`/mock-exams/${subject.slug}`}>
            <Card className="hover:shadow-md cursor-pointer">
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Start practicing questions for {subject.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
