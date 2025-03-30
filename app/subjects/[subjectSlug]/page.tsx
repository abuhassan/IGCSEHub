'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const subjectData = {
  mathematics: {
    name: 'Mathematics',
    topics: [
      { name: 'Number Systems', completed: true },
      { name: 'Algebra (Linear Eq)', completed: true },
      { name: 'Algebra (Quadratic Eq)', completed: false },
      { name: 'Geometry', completed: false },
      { name: 'Trigonometry', completed: false },
    ],
  },
  biology: {
    name: 'Biology',
    topics: [
      { name: 'Photosynthesis', completed: true },
      { name: 'Respiration', completed: true },
      { name: 'Digestion', completed: false },
    ],
  },
}

export default function SubjectDetailPage() {
  const { subjectSlug } = useParams()
  const subjectKey = subjectSlug as keyof typeof subjectData
  const subject = subjectData[subjectKey]

  const [topics, setTopics] = useState(subject?.topics ?? [])

  // ✅ Load saved progress from localStorage
  useEffect(() => {
    if (!subject) return
    const stored = localStorage.getItem(`subjectProgress-${subjectKey}`)
    if (stored) {
      try {
        setTopics(JSON.parse(stored))
      } catch (e) {
        console.error('Error parsing localStorage:', e)
      }
    }
  }, [subjectKey])

  // ✅ Save progress to localStorage on change
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem(`subjectProgress-${subjectKey}`, JSON.stringify(topics))
    }
  }, [topics, subjectKey])

  if (!subject) {
    return (
      <div className="p-6">
        <p>Subject not found</p>
        <Link href="/subjects" className="text-blue-600 underline">
          ← Back to Subjects
        </Link>
      </div>
    )
  }

  const toggleCompletion = (index: number) => {
    const updated = [...topics]
    updated[index].completed = !updated[index].completed
    setTopics(updated)
  }

  const completedCount = topics.filter((t) => t.completed).length
  const progressPercent = Math.round((completedCount / topics.length) * 100)

  return (
    <div className="p-6 space-y-4">
      <Link href="/subjects" className="text-sm text-blue-600 hover:underline">
        ← Back to Subjects
      </Link>

      <h1 className="text-2xl font-bold">{subject.name}</h1>

      <div className="bg-gray-200 h-3 rounded-full w-full">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm text-muted-foreground">Progress: {progressPercent}%</p>

      <div className="grid gap-4">
        {topics.map((topic, index) => (
          <Card key={topic.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {topic.name}
                <Button
                  size="sm"
                  variant={topic.completed ? 'secondary' : 'outline'}
                  onClick={() => toggleCompletion(index)}
                >
                  {topic.completed ? '✓ Completed' : 'Mark as Done'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={
                  topic.completed
                    ? 'text-green-600 font-medium'
                    : 'text-gray-500 italic'
                }
              >
                {topic.completed ? 'Done ✔' : 'Not started'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
