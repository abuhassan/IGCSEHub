// FILE: /app/subjects/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Stream {
  slug: string
  name: string
  description: string
  subjects: string[]
  groupStructure?: { [group: string]: string[] }
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('selected-stream')
    if (stored) {
      const stream: Stream = JSON.parse(stored)
      const allSubjects = stream.groupStructure
        ? Object.values(stream.groupStructure).flat()
        : stream.subjects
      setSubjects(allSubjects)
    }
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Subjects</h1>
      <p className="text-muted-foreground mb-4">Explore your selected subjects to access flashcards and mock exams.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((subject, index) => (
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
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Link href={`/mock-exams/${subject.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="outline" size="sm">Take Exam</Button>
                  </Link>
                  <Link href={`/flashcards/${subject.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="secondary" size="sm">Study Flashcards</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-6">
        <Link href="/dashboard" className="text-sm text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
