// FILE: /app/flashcards/[subject]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Flashcard {
  question: string
  answer: string
}

export default function FlashcardViewer() {
  const { subject } = useParams()
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const res = await fetch(`/data/flashcards/${subject}.json`)
        const data = await res.json()

        // Shuffle the flashcards before setting
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setFlashcards(shuffled)
      } catch {
        setFlashcards([])
      }
    }
    loadFlashcards()
  }, [subject])

  const handleNext = () => {
    setShowAnswer(false)
    setCurrentIndex((prev) => (prev + 1 < flashcards.length ? prev + 1 : 0))
  }

  const current = flashcards[currentIndex]

  return (
    <div className="p-6 space-y-6">
      <Link href="/subjects" className="text-sm text-blue-600 underline">
        ← Back to Subjects
      </Link>

      <h1 className="text-2xl font-bold">📖 Flashcards: {subject}</h1>

      {flashcards.length === 0 ? (
        <p className="text-sm text-muted-foreground">No flashcards found.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Card {currentIndex + 1} of {flashcards.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-lg font-medium">{current.question}</p>
            {showAnswer && <p className="text-green-700">Answer: {current.answer}</p>}
            <div className="mt-4 space-x-2">
              <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
              <Button onClick={handleNext} variant="secondary">Next</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}