// FILE: /app/blog/page.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface BlogPost {
  slug: string
  title: string
  summary?: string
  date: string
  content: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/blog/posts.json')
      .then((res) => res.json())
      .then((data: BlogPost[]) => setPosts(data))
  }, [])

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    (post.summary && post.summary.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📰 Blog</h1>

      <div className="mb-6">
        <Input
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.summary || 'No summary provided.'}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 underline text-sm"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No blog posts found.</p>
      )}
    </div>
  )
}
