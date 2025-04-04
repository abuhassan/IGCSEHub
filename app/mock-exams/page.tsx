// FILE: /app/mock-exams/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface Stream {
  slug: string
  name: string
  description: string
  subjects: string[]
  groupStructure?: { [group: string]: string[] }
}

export default function MockExamsPage() {
  const [streamSubjects, setStreamSubjects] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('selected-stream')
    if (stored) {
      const stream: Stream = JSON.parse(stored)
      const allSubjects = stream.groupStructure
        ? Object.values(stream.groupStructure).flat()
        : stream.subjects
      setStreamSubjects(allSubjects)
    }
  }, [])

  const handleStartExam = (subject: string) => {
    router.push(`/mock-exams/${subject.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 Mock Exams</h1>
        <Link href="/mock-exams/results">
          <Button variant="outline">View Results</Button>
        </Link>
      </div>

      {streamSubjects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No subjects found for your stream. Please select a stream from your dashboard.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {streamSubjects.map((subject, index) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Start practicing questions for {subject}
                  </p>
                  <Button
                    onClick={() => handleStartExam(subject)}
                    className="mt-3 w-full"
                  >
                    Take Exam
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Link href="/dashboard" className="text-sm text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
