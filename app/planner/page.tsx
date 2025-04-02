// FILE: /app/planner/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

const initialPlanner = {
  Mon: { Morning: '', Afternoon: '', Evening: '' },
  Tue: { Morning: '', Afternoon: '', Evening: '' },
  Wed: { Morning: '', Afternoon: '', Evening: '' },
  Thu: { Morning: '', Afternoon: '', Evening: '' },
  Fri: { Morning: '', Afternoon: '', Evening: '' },
  Sat: { Morning: '', Afternoon: '', Evening: '' },
  Sun: { Morning: '', Afternoon: '', Evening: '' },
}

type Planner = typeof initialPlanner

type TimeSlot = 'Morning' | 'Afternoon' | 'Evening'

type DayKey = keyof Planner

export default function PlannerPage() {
  const [planner, setPlanner] = useState<Planner>(initialPlanner)

  useEffect(() => {
    const stored = localStorage.getItem('study-planner')
    if (stored) {
      try {
        setPlanner(JSON.parse(stored))
      } catch {
        setPlanner(initialPlanner)
      }
    }
  }, [])

  const handleChange = (day: DayKey, slot: TimeSlot, value: string) => {
    const updated = {
      ...planner,
      [day]: {
        ...planner[day],
        [slot]: value,
      },
    }
    setPlanner(updated)
    localStorage.setItem('study-planner', JSON.stringify(updated))
  }

  const resetPlanner = () => {
    setPlanner(initialPlanner)
    localStorage.setItem('study-planner', JSON.stringify(initialPlanner))
  }

  const filledSlots = Object.values(planner).flatMap(day => Object.values(day)).filter(v => v.trim() !== '').length
  const totalSlots = Object.keys(initialPlanner).length * 3
  const progressPercent = Math.round((filledSlots / totalSlots) * 100)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">📅 Study Planner</h1>
        <p className="text-sm text-muted-foreground mb-1">You've filled {filledSlots} of {totalSlots} slots</p>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Day</th>
              <th className="border px-2 py-1">Morning</th>
              <th className="border px-2 py-1">Afternoon</th>
              <th className="border px-2 py-1">Evening</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(planner).map(([day, slots]) => (
              <tr key={day}>
                <td className="border px-2 py-1 font-medium">{day}</td>
                {(Object.keys(slots) as TimeSlot[]).map((slot) => (
                  <td key={slot} className="border px-2 py-1">
                    <Input
                      value={slots[slot]}
                      placeholder="-"
                      onChange={(e) => handleChange(day as DayKey, slot, e.target.value)}
                      className="hover:border-blue-500 focus:border-blue-600 focus:ring-0"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="destructive" onClick={resetPlanner}>
        🔁 Reset Planner
      </Button>

      <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
        🏠 Back to Dashboard
      </Button>
    </div>
  )
}
