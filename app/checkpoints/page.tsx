// FILE: /app/checkpoints/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useUser } from '@clerk/nextjs'

interface Topic {
  title: string
  objectives: string[]
}

interface CheckpointSubject {
  subject: string
  topics: Topic[]
}

const physicsCheckpoints: CheckpointSubject = {
  subject: 'Physics',
  topics: [
    {
      title: 'General Physics',
      objectives: [
        'Use and describe the use of common measuring devices',
        'Estimate physical quantities in everyday use',
        'Understand scalar and vector quantities'
      ]
    },
    {
      title: 'Thermal Physics',
      objectives: [
        'Describe the concept of temperature and how it is measured',
        'Understand the particle model of matter',
        'Explain changes of state and latent heat'
      ]
    },
    {
      title: 'Waves',
      objectives: [
        'Describe the properties of waves',
        'Understand reflection, refraction and diffraction',
        'Describe electromagnetic waves and their uses'
      ]
    },
    {
      title: 'Electricity and Magnetism',
      objectives: [
        'Understand electric charge, current and voltage',
        'Describe series and parallel circuits',
        'Understand magnetic effects of electric current'
      ]
    },
    {
      title: 'Atomic Physics',
      objectives: [
        'Describe structure of atoms and isotopes',
        'Understand radioactivity and its properties',
        'Discuss uses and dangers of radioactive substances'
      ]
    }
  ]
}

export default function CheckpointsPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const { user } = useUser()
  const role = user?.publicMetadata?.role as string

  useEffect(() => {
    const stored = localStorage.getItem('physics-checkpoints')
    if (stored) setCheckedItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('physics-checkpoints', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggle = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const reset = () => {
    setCheckedItems({})
  }

  const total = physicsCheckpoints.topics.reduce((acc, topic) => acc + topic.objectives.length, 0)
  const completed = Object.values(checkedItems).filter(Boolean).length
  const progress = (completed / total) * 100

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📘 Physics Checkpoints</h1>
      <p className="text-muted-foreground">Viewing as: <span className="font-semibold">{role}</span></p>
      <Progress value={progress} className="w-full max-w-xl" />
      <p className="text-muted-foreground">Progress: {completed} of {total} objectives completed</p>

      {physicsCheckpoints.topics.map((topic) => (
        <div key={topic.title} className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📂 {topic.title}</h2>
          <ul className="space-y-2">
            {topic.objectives.map((objective, index) => {
              const key = `${topic.title}-${index}`
              return (
                <li key={key} className="flex items-center justify-between border rounded px-3 py-2">
                  <span>{objective}</span>
                  <Switch checked={!!checkedItems[key]} onCheckedChange={() => toggle(key)} />
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <div className="mt-8">
        <Button variant="destructive" onClick={reset}>
          Reset All Checkpoints
        </Button>
      </div>
    </div>
  )
}
