'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Sample fallback question (replace with fetch from JSON later)
const sampleQuestions = {
  math: [
    {
      question: 'What is the value of x in the equation 2x + 3 = 11?',
      choices: ['2', '4', '6', '8'],
      answer: '4',
      explanation: '2x + 3 = 11 ⇒ 2x = 8 ⇒ x = 4',
    },
    {
      question: 'Simplify: 3(2x - 1) + 4',
      choices: ['6x + 1', '6x + 7', '2x + 1', '5x + 3'],
      answer: '6x + 1',
      explanation: '3(2x - 1) + 4 = 6x - 3 + 4 = 6x + 1',
    },
  ],
  biology: [
    {
      question: 'What process do plants use to make food?',
      choices: ['Respiration', 'Digestion', 'Photosynthesis', 'Fermentation'],
      answer: 'Photosynthesis',
      explanation: 'Plants use photosynthesis to convert sunlight into food.',
    },
  ],
  chemistry: [
    {
      question: "What is the chemical symbol for Sodium?",
      choices: ["Na", "S", "So", "Sn"],
      answer: "Na",
      explanation: "Sodium's symbol is Na from Latin 'Natrium'."
    },
    // Add more
  ],
  physics: [
    {
      question: "What is the unit of force?",
      choices: ["Joule", "Watt", "Newton", "Pascal"],
      answer: "Newton",
      explanation: "The SI unit of force is Newton (N)."
    },
    // Add more
  ]
}

export default function QuizPage() {
  const { subject } = useParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    // Load questions based on subject param (later: fetch from /data)
    const qList = sampleQuestions[subject as keyof typeof sampleQuestions]
    if (!qList) {
      router.push('/mock-exams')
      return
    }
    setQuestions(qList)
  }, [subject, router])

  const handleSelect = (choice: string) => {
    if (selected) return // prevent double click
    setSelected(choice)
    const correct = questions[currentIndex].answer
    if (choice === correct) setScore((prev) => prev + 1)
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  if (questions.length === 0) return <p className="p-6">Loading questions...</p>

  if (showResult) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-lg">You scored {score} out of {questions.length}</p>
        <Button onClick={() => router.push('/mock-exams')}>Back to Subjects</Button>
      </div>
    )
  }

  const currentQ = questions[currentIndex]
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentIndex + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 font-medium">{currentQ.question}</p>
          <div className="space-y-2">
            {currentQ.choices.map((choice: string) => (
              <Button
                key={choice}
                variant="outline"
                className={`w-full text-left justify-start ${
                  selected === choice
                    ? choice === currentQ.answer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : ''
                }`}
                onClick={() => handleSelect(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>

          {selected && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Correct answer:</strong> {currentQ.answer}
              </p>
              <p>
                <strong>Explanation:</strong> {currentQ.explanation}
              </p>
              <Button onClick={handleNext} className="mt-4">
                {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
