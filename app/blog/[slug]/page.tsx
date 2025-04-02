// FILE: /app/blog/[slug]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  summary?: string
  date: string
  content: string
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetch('/blog/posts.json')
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const found = data.find((p) => p.slug === slug)
        if (found) setPost(found)
      })
  }, [slug])

  if (!post) {
    return <div className="p-6">Loading blog post...</div>
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <Link href="/blog" className="text-sm text-blue-600 underline">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-muted-foreground text-sm">Published on {post.date}</p>
      <article className="prose prose-sm max-w-none text-gray-800 whitespace-pre-line">
        {post.content}
      </article>
    </div>
  )
}
