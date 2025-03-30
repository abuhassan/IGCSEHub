'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

// Day types
type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
const days: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const slots = ['Morning', 'Afternoon', 'Evening']

// Default static schedule
const defaultSchedule: Record<Day, Record<string, string>> = {
  Mon: { Morning: 'Mathematics', Afternoon: 'English', Evening: 'Free' },
  Tue: { Morning: 'Biology', Afternoon: 'Chemistry', Evening: 'Revision' },
  Wed: { Morning: '', Afternoon: '', Evening: '' },
  Thu: { Morning: '', Afternoon: '', Evening: '' },
  Fri: { Morning: '', Afternoon: '', Evening: '' },
  Sat: { Morning: '', Afternoon: '', Evening: '' },
  Sun: { Morning: '', Afternoon: '', Evening: '' },
}

export default function PlannerPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  const [schedule, setSchedule] = useState(defaultSchedule)
  const [open, setOpen] = useState(false)
  const [editDay, setEditDay] = useState<Day | null>(null)
  const [editSlot, setEditSlot] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('weekly-planner')
    if (stored) {
      try {
        setSchedule(JSON.parse(stored))
      } catch {
        console.warn('Invalid planner data')
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('weekly-planner', JSON.stringify(schedule))
  }, [schedule])

  const handleEdit = (day: Day, slot: string) => {
    setEditDay(day)
    setEditSlot(slot)
    setInputValue(schedule[day][slot] || '')
    setOpen(true)
  }

  const handleSave = () => {
    if (editDay && editSlot) {
      setSchedule((prev) => ({
        ...prev,
        [editDay]: {
          ...prev[editDay],
          [editSlot]: inputValue,
        },
      }))
    }
    setOpen(false)
  }

  const handleReset = () => {
    const confirmReset = confirm('Clear the entire week planner?')
    if (confirmReset) {
      setSchedule(defaultSchedule)
      localStorage.removeItem('weekly-planner')
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <p className="text-center mt-10">Loading planner...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Planner</h1>

      <button
        onClick={handleReset}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Planner
      </button>

      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 text-left border-b">Time</th>
              {days.map((day) => (
                <th key={day} className="p-3 text-center border-b">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot}>
                <td className="p-3 font-medium border-r border-b">{slot}</td>
                {days.map((day) => (
                  <td key={`${day}-${slot}`} className="p-2 border-b border-r text-center">
                    <Card
                      className="min-h-[60px] cursor-pointer hover:bg-blue-50 transition"
                      onClick={() => handleEdit(day, slot)}
                    >
                      <CardContent className="p-2 text-sm text-gray-700">
                        {schedule[day][slot] || (
                          <span className="text-gray-400 italic">Click to add</span>
                        )}
                      </CardContent>
                    </Card>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editDay} – {editSlot}</DialogTitle>
          </DialogHeader>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter subject or activity"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
