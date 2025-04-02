// FILE: /app/mock-exams/page.tsx

'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const subjects = [
  { slug: 'math', name: 'Mathematics' },
  { slug: 'biology', name: 'Biology' },
  { slug: 'chemistry', name: 'Chemistry' },
  { slug: 'physics', name: 'Physics' }
]

export default function MockExamPage() {
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mock Exam Subjects</h1>
      </div>
      <Link href="/mock-exams/results" className="text-sm text-blue-600 underline block mb-4 text-right">
        📊 View My Results
      </Link>
      <Button variant="outline" onClick={() => router.push('/dashboard')}>
        ← Back to Dashboard
      </Button>


      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.slug} href={`/mock-exams/${subject.slug}`}>
            <Card className="hover:shadow-md cursor-pointer">
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="text-sm text-muted-foreground">Start practicing questions for {subject.name}</p>
              <button
                  onClick={() => router.push(`/mock-exams/${subject.slug}`)}
                  className="mt-3 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  Take Exam
                </button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
