// FILE: /app/admin/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role || 'student'
  const router = useRouter()

  const [currentTab, setCurrentTab] = useState('overview')
  const [results, setResults] = useState<any>({})
  const [checkpoints, setCheckpoints] = useState<any>({})

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/dashboard')
    }
  }, [role, router])

  useEffect(() => {
    const resultData = localStorage.getItem('mock-results')
    if (resultData) setResults(JSON.parse(resultData))

    const checkpointData = localStorage.getItem('checkpoint-progress')
    if (checkpointData) setCheckpoints(JSON.parse(checkpointData))
  }, [])

  const totalCheckpoints = Object.values(checkpoints).reduce((acc: number, subject: any) => {
    const count = Object.values(subject || {}).filter(Boolean).length
    return acc + count
  }, 0)

  const mostPracticedSubject = Object.entries(results).reduce(
    (top, [subject, score]) => {
      return !top || (results[subject] > results[top]) ? subject : top
    },
    ''
  )

  const averageScore = mostPracticedSubject && results[mostPracticedSubject]

  const tabContent: Record<string, React.ReactNode> = {
    overview: (
      <div className="space-y-2">
        <p>Total Completed Mock Exams: <strong>{Object.keys(results).length}</strong></p>
        <p>Total Checkpoints Marked: <strong>{totalCheckpoints}</strong></p>
        {mostPracticedSubject && (
          <>
            <p>🏆 Most Practiced Subject: <strong>{mostPracticedSubject}</strong></p>
            <p>📊 Average Score: <strong>{averageScore}%</strong></p>
          </>
        )}
      </div>
    ),
    details: (
      <div>
        <p>More stats coming soon...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">🛠️ Admin Dashboard</h1>
      <Tabs defaultValue="overview" onValueChange={(val) => setCurrentTab(val)}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>📈 Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {tabContent[currentTab]}
        </CardContent>
      </Card>
    </motion.div>
  )
}
