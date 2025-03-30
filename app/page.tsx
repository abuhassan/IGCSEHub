'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo-placeholder.png"
            alt="IGCSEHub logo"
            width={140}
            height={120}
            className="rounded"
          />
          <span className="font-bold text-2xl tracking-tight">IGCSEHub</span>
        </div>
        <nav className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-medium bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-6 pt-16 pb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Study Smarter for IGCSE
        </h1>
        <p className="max-w-2xl text-gray-600 text-lg mb-8">
          Master your subjects with flashcards, quizzes, and progress tracking. Built for students like you — focused, efficient, and on your terms.
        </p>
        <SignedOut>
          <Link
            href="/sign-up"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 text-lg"
          >
            Start Learning
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">📚 Flashcards</h3>
            <p className="text-gray-600">
              Reinforce concepts fast with topic-specific flashcards tailored for IGCSE.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📝 Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with smart quizzes that mirror real IGCSE questions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📈 Progress Tracking</h3>
            <p className="text-gray-600">
              Visualize your improvement and get smart study suggestions.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t mt-12 py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} IGCSEHub. All rights reserved.</p>
      </footer>

    </main>
  )
}
