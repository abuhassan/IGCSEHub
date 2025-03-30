'use client'

import Link from 'next/link'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sampleSubjects = [
  { name: 'Mathematics', progress: 68 },
  { name: 'English', progress: 85 },
  { name: 'Biology', progress: 78 },
  { name: 'Chemistry', progress: 65 },
]

export default function SubjectsPage() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded || !isSignedIn) {
    return <p className="text-center mt-10">Loading subjects...</p>
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">My Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {sampleSubjects.map((subject) => (
        <Link key={subject.name} href={`/subjects/${subject.name.toLowerCase()}`}>
            <Card className="cursor-pointer hover:shadow-md transition">
            <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                Progress: {subject.progress}%
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                    ></div>
                </div>
                </div>
            </CardContent>
            </Card>
        </Link>
        ))}

      </div>
    </div>
  )
}
