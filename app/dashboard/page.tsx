// FILE: /app/dashboard/page.tsx

'use client'

import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role || 'student'
  const firstName = user?.firstName || (role === 'admin' ? 'Admin' : 'Student')

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">👋 Welcome back, {firstName}!</h1>
      <p className="text-muted-foreground">Your current stream: <strong>Science Stream A</strong></p>

      {role === 'student' && (
        <div className="space-y-4">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-lg mb-2">📊 Your Progress</h2>
            <p>✅ Completed Mock Exams: 6</p>
            <p>📌 Checkpoints Marked: 0</p>
            <p>🧠 Flashcards: Estimated by subject viewer</p>
          </div>

          <div className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-lg mb-2">🎯 Next Step</h2>
            <p>
              Great work! <Link href="/mock-exams/results" className="text-blue-600 hover:underline">Review your results</Link> or plan with the <Link href="/planner" className="text-blue-600 hover:underline">Study Planner</Link>.
            </p>
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-4 text-gray-600">
          <p>You are logged in as an admin. Use the <Link href="/admin" className="text-blue-600 hover:underline">Admin Tools</Link> to view platform analytics and manage users.</p>
        </div>
      )}
    </motion.div>
  )
} 
