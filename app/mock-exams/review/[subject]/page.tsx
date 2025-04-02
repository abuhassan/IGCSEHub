// FILE: /app/mock-exams/review/[subject]/page.tsx

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ReviewAnswersPage() {
  const { subject } = useParams()
  const router = useRouter()
  const [answers, setAnswers] = useState<any[]>([])

  useEffect(() => {
    const key = 'mock-answers'
    const stored = JSON.parse(localStorage.getItem(key) || '{}')
    const subjectAnswers = stored[subject as string]
    if (!subjectAnswers || subjectAnswers.length === 0) {
      router.push('/mock-exams')
    } else {
      setAnswers(subjectAnswers)
    }
  }, [subject, router])

  if (!answers.length) return <p className="p-6">Loading review...</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 Review Your Answers</h1>
        <Link href="/mock-exams" className="text-sm text-blue-600 underline">
          ← Back to Subjects
        </Link>
      </div>

      <div className="grid gap-4">
        {answers.map((entry, idx) => (
          <Card key={idx} className="shadow-sm border">
            <CardHeader>
              <CardTitle>Q{idx + 1}: {entry.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Your Answer:</strong>{' '}
                <span className={entry.selected === entry.correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {entry.selected}
                </span>
              </p>
              <p><strong>Correct Answer:</strong> {entry.correct}</p>
              <p><strong>Explanation:</strong> {entry.explanation}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="secondary" onClick={() => router.push('/mock-exams')}>
          ← Back to Subjects
        </Button>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          🏠 Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
