// FILE: /app/mock-exams/[subject]/page.tsx

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubjectQuizPage() {
  const { subject } = useParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<any[]>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/data/mock-exams/${subject}.json`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setQuestions(data)
      } catch {
        router.push('/mock-exams')
      }
    }
    fetchQuestions()
  }, [subject, router])

  useEffect(() => {
    if (showResult && subject) {
      const subjectKey = subject as string
      const key = 'mock-results'
      const stored = JSON.parse(localStorage.getItem(key) || '{}')
      localStorage.setItem(key, JSON.stringify({
        ...stored,
        [subjectKey]: Math.round((score / questions.length) * 100),
      }))

      const answerKey = 'mock-answers'
      const answerStore = JSON.parse(localStorage.getItem(answerKey) || '{}')
      localStorage.setItem(answerKey, JSON.stringify({
        ...answerStore,
        [subjectKey]: answers,
      }))
    }
  }, [showResult, subject, score, questions.length, answers])

  const handleSelect = (choice: string) => {
    if (selected) return
    setSelected(choice)

    const currentQuestion = questions[currentIndex]
    const correct = currentQuestion.answer
    const explanation = currentQuestion.explanation

    const record = {
      question: currentQuestion.question,
      selected: choice,
      correct,
      explanation
    }
    setAnswers((prev) => [...prev, record])

    if (choice === correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
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
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => router.push('/mock-exams?refresh=1')}>Back to Subjects</Button>
          <Button onClick={() => router.push(`/mock-exams/review/${subject}`)} variant="outline">Review My Answers</Button>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentIndex]
  return (
    <div className="p-6 space-y-4">
      <Link href="/mock-exams" className="text-sm text-blue-600 underline block mb-4">
        ← Back to Subjects
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Question {currentIndex + 1} of {questions.length}</CardTitle>
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
              <p><strong>Correct answer:</strong> {currentQ.answer}</p>
              <p><strong>Explanation:</strong> {currentQ.explanation}</p>
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
