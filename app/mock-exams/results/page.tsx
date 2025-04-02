// FILE: /app/mock-exams/results/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const subjects = [
  { slug: 'math', name: 'Mathematics' },
  { slug: 'biology', name: 'Biology' },
  { slug: 'chemistry', name: 'Chemistry' },
  { slug: 'physics', name: 'Physics' }
]

export default function MockExamResultsPage() {
  const [results, setResults] = useState<Record<string, number>>({})
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('mock-results')
    if (stored) {
      try {
        setResults(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse results')
      }
    }
  }, [])

  const resetResults = () => {
    localStorage.removeItem('mock-results')
    localStorage.removeItem('mock-completed')
    setResults({})
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 My Mock Exam Results</h1>
        <Link href="/mock-exams" className="text-sm text-blue-600 underline">
          ← Back to Mock Exams
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card key={subject.slug} className="shadow-sm border">
            <CardHeader>
              <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {results[subject.slug] !== undefined ? (
                <>
                  <p className="text-green-700 font-semibold text-lg">
                    Score: {results[subject.slug]}%
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/mock-exams/${subject.slug}`)}
                    >
                      Retake
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/mock-exams/review/${subject.slug}`)}
                    >
                      📘 Review
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground italic">Not attempted yet</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="destructive" onClick={resetResults}>
          🔁 Reset All Results
        </Button>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          ⬅ Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
