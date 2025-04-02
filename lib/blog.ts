import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogMeta {
  title: string
  date: string
  summary?: string
  slug: string
}

export function getAllBlogPosts(): BlogMeta[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const filenames = fs.readdirSync(blogDir)

  return filenames.map((filename) => {
    const slug = filename.replace(/\\.md$/, '')
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf8')
    const { data } = matter(fileContent)
    return {
      ...(data as Omit<BlogMeta, 'slug'>),
      slug,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
