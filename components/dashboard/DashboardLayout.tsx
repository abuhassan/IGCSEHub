'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Checkpoints', href: '/checkpoints' },
  { label: 'Planner', href: '/planner' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useUser()
  const role = user?.publicMetadata?.role as string
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={clsx(
        "md:w-64 w-full md:block",
        open ? "block" : "hidden md:block",
        "bg-gray-100 p-6 border-b md:border-b-0 md:border-r"
      )}>
        <h2 className="text-xl font-bold mb-6 text-gray-800">IGCSEHub</h2>
        <p className="text-sm text-muted-foreground mb-6">Role: <span className="font-medium">{role}</span></p>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block px-2 py-1 rounded hover:text-blue-600",
                pathname === item.href ? "font-bold text-blue-700 bg-blue-100" : "text-gray-700"
              )}
            >
              {item.label}
            </Link>
          ))}
          {role === 'admin' && (
            <Link
              href="/admin-tools"
              className="block px-2 py-1 text-red-600 font-medium hover:text-red-700"
            >
              Admin Tools
            </Link>
          )}
        </nav>
      </aside>

      {/* Toggle on mobile */}
      <button
        className="md:hidden px-4 py-2 text-sm bg-gray-200 border-b"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Menu' : 'Show Menu'}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  )
}
