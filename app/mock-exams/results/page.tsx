'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Subject {
  name: string
  slug: string
}

export default function MockExamResultsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [scores, setScores] = useState<Record<string, number>>({})

  useEffect(() => {
    // Fetch current subject list
    fetch('/mock-exams/subjects.json')
      .then((res) => res.json())
      .then((data) => setSubjects(data))

    // Load saved scores
    const stored = localStorage.getItem('mock-results')
    if (stored) {
      const parsed = JSON.parse(stored)
      setScores(parsed)
    }
  }, [])

  const getSubjectName = (slug: string) => {
    return subjects.find((s) => s.slug === slug)?.name || slug
  }

  const hasResults = Object.keys(scores).length > 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">📊 My Mock Exam Results</h1>
        <Link href="/mock-exams" className="text-blue-600 underline text-sm">
          ← Back to Mock Exams
        </Link>
      </div>

      {hasResults ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(scores).map(([slug, score]) => (
            <Card key={slug}>
              <CardHeader>
                <CardTitle>{getSubjectName(slug)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600">Score: {score}%</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/mock-exams/${slug}`}>
                    <Button variant="outline">Retake</Button>
                  </Link>
                  <Link href={`/mock-exams/review/${slug}`}>
                    <Button variant="secondary">📘 Review</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No mock exam results found.</p>
      )}

      {hasResults && (
        <div className="mt-6 flex gap-2">
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.removeItem('mock-results')
              localStorage.removeItem('mock-answers')
              location.reload()
            }}
          >
            🗑️ Reset All Results
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">⬅️ Back to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
