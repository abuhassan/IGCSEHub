// FILE: /app/page.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="p-6 space-y-12">
      {/* Hero Section CTA */}
      <section className="bg-blue-50 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          Not sure what IGCSE is?
        </h2>
        <p className="text-muted-foreground mb-4">
          Learn why it's important and how it supports your academic journey.
        </p>
        <Button asChild className="text-white bg-blue-600 hover:bg-blue-700">
          <Link href="/blog">Find Out More</Link>
        </Button>
      </section>

      {/* Youth-Oriented Promo Section */}
      <section className="bg-gradient-to-r from-violet-100 to-pink-100 p-6 rounded-xl text-center shadow-lg">
        <h2 className="text-xl font-bold text-purple-800 mb-2">
          🎯 Ready to Crush Your Exams?
        </h2>
        <p className="text-gray-700 mb-4">
          Take quizzes, track your progress, and master your favorite subjects in a fun and interactive way.
        </p>
        <Button asChild variant="outline">
          <Link href="/sign-in">Get Started Free</Link>
        </Button>
      </section>

      {/* Welcome message */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to IGCSEHub</h1>
        <p className="text-muted-foreground">
          Your all-in-one platform for IGCSE mock exams, study planning, and progress tracking.
        </p>
      </div>
    </div>
  )
}
