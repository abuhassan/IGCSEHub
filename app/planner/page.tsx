// FILE: /app/planner/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

interface Stream {
  slug: string
  name: string
  description: string
  subjects: string[]
  groupStructure?: { [group: string]: string[] }
}

type TimeSlot = 'Morning' | 'Afternoon' | 'Evening'
type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'

const defaultSchedule: Record<Day, Record<TimeSlot, string>> = {
  Mon: { Morning: '', Afternoon: '', Evening: '' },
  Tue: { Morning: '', Afternoon: '', Evening: '' },
  Wed: { Morning: '', Afternoon: '', Evening: '' },
  Thu: { Morning: '', Afternoon: '', Evening: '' },
  Fri: { Morning: '', Afternoon: '', Evening: '' }
}

export default function PlannerPage() {
  const [schedule, setSchedule] = useState(defaultSchedule)
  const [streamSubjects, setStreamSubjects] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('study-planner')
    if (stored) {
      setSchedule(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const streamData = localStorage.getItem('selected-stream')
    if (streamData) {
      const stream: Stream = JSON.parse(streamData)
      const allSubjects = stream.groupStructure
        ? Object.values(stream.groupStructure).flat()
        : stream.subjects
      setStreamSubjects(allSubjects)
    }
  }, [])

  const handleChange = (day: Day, slot: TimeSlot, value: string) => {
    const updated = {
      ...schedule,
      [day]: {
        ...schedule[day],
        [slot]: value
      }
    }
    setSchedule(updated)
    localStorage.setItem('study-planner', JSON.stringify(updated))
  }

  const resetPlanner = () => {
    localStorage.removeItem('study-planner')
    setSchedule(defaultSchedule)
  }

  const filledCount = Object.values(schedule).flatMap(slot => Object.values(slot)).filter(Boolean).length
  const totalSlots = Object.keys(schedule).length * 3
  const percent = (filledCount / totalSlots) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🗓️ Study Planner</h1>
        <Button onClick={resetPlanner} variant="outline">Reset</Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {filledCount} of {totalSlots} slots filled
        </p>
        <Progress value={percent} className="h-2" />
      </div>

      <div className="grid gap-6">
        {Object.entries(schedule).map(([day, slots]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle>{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(slots).map(([slot, subject]) => (
                <div key={slot} className="flex items-center gap-2 mb-3">
                  <p className="w-24 text-sm text-muted-foreground">{slot}</p>
                  <select
                    className="w-full px-2 py-1 border rounded text-sm"
                    value={subject}
                    onChange={(e) => handleChange(day as Day, slot as TimeSlot, e.target.value)}
                  >
                    <option value="">-- Select Subject --</option>
                    {streamSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Link href="/dashboard" className="text-sm text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
