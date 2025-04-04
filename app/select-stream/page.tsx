// FILE: /app/select-stream/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { BookOpenIcon } from 'lucide-react'

interface Stream {
  slug: string
  name: string
  description: string
  subjects: string[]
  groupStructure?: { [group: string]: string[] }
}

export default function SelectStreamPage() {
  const [streams, setStreams] = useState<Stream[]>([])
  const router = useRouter()

  useEffect(() => {
    const exampleStreams: Stream[] = [
      {
        slug: 'science-a',
        name: 'Science Stream A',
        description: 'Core science stream with emphasis on Mathematics and Biology.',
        subjects: [],
        groupStructure: {
          'Group I (Languages)': ['English as a Second Language'],
          'Group II (Humanities)': ['Geography'],
          'Group III (Sciences)': ['Biology', 'Chemistry', 'Physics'],
          'Group IV (Mathematics)': ['Mathematics'],
          'Group V (Creative/Technical)': ['ICT']
        }
      },
      {
        slug: 'science-b',
        name: 'Science Stream B',
        description: 'Alternative science stream with Computer Science option.',
        subjects: [],
        groupStructure: {
          'Group I (Languages)': ['English as a Second Language'],
          'Group II (Humanities)': ['History'],
          'Group III (Sciences)': ['Biology', 'Computer Science'],
          'Group IV (Mathematics)': ['Mathematics'],
          'Group V (Creative/Technical)': ['Design and Technology']
        }
      },
      {
        slug: 'arts',
        name: 'Arts & Humanities Stream',
        description: 'For students interested in social sciences, languages, and the arts.',
        subjects: [],
        groupStructure: {
          'Group I (Languages)': ['English - First Language', 'Foreign Language French'],
          'Group II (Humanities)': ['Literature in English', 'History', 'Geography'],
          'Group III (Sciences)': ['Environmental Management'],
          'Group IV (Mathematics)': ['Mathematics'],
          'Group V (Creative/Technical)': ['Art and Design']
        }
      },
      {
        slug: 'commerce',
        name: 'Commerce Stream',
        description: 'Focuses on economics, business, and commercial studies.',
        subjects: [],
        groupStructure: {
          'Group I (Languages)': ['English as a Second Language'],
          'Group II (Humanities)': ['Economics'],
          'Group III (Sciences)': ['Business Studies'],
          'Group IV (Mathematics)': ['Mathematics'],
          'Group V (Creative/Technical)': ['ICT']
        }
      }
    ]
    setStreams(exampleStreams)
  }, [])

  const handleSelect = (stream: Stream) => {
    localStorage.setItem('selected-stream', JSON.stringify(stream))
    router.push('/dashboard')
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎯 Select Your Stream</h1>
      <p className="text-muted-foreground mb-6">
        Choose a subject stream that best fits your academic goals. You can change this later in your settings.
      </p>

      <p className="text-sm text-muted-foreground mb-4">
        ⚠️ These are suggested streams. To qualify for the Cambridge ICE award, you must take at least 7 subjects across 5 subject groups. <br />
        You can add or remove subjects later to match your personal study plan.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {streams.map((stream, index) => (
          <motion.div
            key={stream.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col justify-between">
              <CardHeader className="flex gap-2 items-center">
                <BookOpenIcon className="text-blue-600" />
                <CardTitle>{stream.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 text-gray-600">{stream.description}</p>

                {stream.groupStructure ? (
                  <div className="mb-4">
                    {Object.entries(stream.groupStructure).map(([group, subs]) => (
                      <div key={group} className="mb-2">
                        <p className="font-medium text-sm">{group}</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {subs.map((subj) => (
                            <li key={subj}>{subj}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="text-sm text-muted-foreground list-disc list-inside mb-4">
                    {stream.subjects.map((subj) => (
                      <li key={subj}>{subj}</li>
                    ))}
                  </ul>
                )}

                <Button onClick={() => handleSelect(stream)} className="w-full mt-auto">
                  Select {stream.name}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-6">
        <p className="text-sm text-muted-foreground">
          Want to qualify for Cambridge ICE?{' '}
          <a href="/blog/what-is-igcse" className="underline text-blue-600">
            Read more here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
