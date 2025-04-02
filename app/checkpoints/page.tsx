// FILE: /app/checkpoints/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const initialTopics = {
  biology: {
    name: 'Biology',
    topics: {
      'Characteristics of Living Organisms': false,
      'Cell Structure': false,
      'Biological Molecules': false,
      'Movement in and out of Cells': false,
      'Enzymes': false,
      'Plant Nutrition': false,
      'Transport in Plants': false,
      'Transport in Animals': false,
      'Respiration': false,
      'Co-ordination and Response': false
    }
  },
  physics: {
    name: 'Physics',
    topics: {
      'Motion': false,
      'Forces and Momentum': false,
      'Energy, Work and Power': false,
      'Thermal Physics': false,
      'Waves': false,
      'Light': false,
      'Sound': false,
      'Electricity': false,
      'Magnetism and Electromagnetism': false,
      'Radioactivity': false
    }
  },
  chemistry: {
    name: 'Chemistry',
    topics: {
      'States of Matter': false,
      'Elements, Compounds and Mixtures': false,
      'Atomic Structure': false,
      'Chemical Bonding': false,
      'The Periodic Table': false,
      'Chemical Energetics': false,
      'Rates of Reaction': false,
      'Acids, Bases and Salts': false,
      'The Mole Concept': false,
      'Metals': false
    }
  }
};

export default function CheckpointsPage() {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const stored = localStorage.getItem('checkpoints')
    if (stored) {
      try {
        setData(JSON.parse(stored))
      } catch {
        setData(initialTopics)
      }
    } else {
      setData(initialTopics)
    }
  }, [])

  const handleToggle = (subject: string, topic: string) => {
    const updated = {
      ...data,
      [subject]: {
        ...data[subject],
        topics: {
          ...data[subject].topics,
          [topic]: !data[subject].topics[topic]
        }
      }
    }
    setData(updated)
    localStorage.setItem('checkpoints', JSON.stringify(updated))
  }

  const resetAll = () => {
    const resetData = { ...data }
    for (const subject in resetData) {
      for (const topic in resetData[subject].topics) {
        resetData[subject].topics[topic] = false
      }
    }
    setData(resetData)
    localStorage.setItem('checkpoints', JSON.stringify(resetData))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📌 Checkpoint Tracker</h1>
        <Button variant="destructive" onClick={resetAll}>
          Reset All
        </Button>
      </div>

      {Object.entries(data).map(([subject, details]) => {
        const subjectDetails = details as {
          name: string;
          topics: { [topic: string]: boolean };
        };
        return (
          <Card key={subject} className="border shadow-sm">
            <CardHeader>
              <CardTitle>{subjectDetails.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(subjectDetails.topics).map(([topic, done]) => (
                <div key={topic} className="flex items-center justify-between border-b py-2">
                  <span>{topic}</span>
                  <Switch checked={done} onCheckedChange={() => handleToggle(subject, topic)} />
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
          ⬅ Back to Dashboard
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = '/mock-exams'}>
          🎯 Go to Mock Exams
        </Button>
      </div>
    </div>
  );
}
