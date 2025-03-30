'use client'

import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
      <Link href="/" className="text-xl font-bold text-gray-800">
        IGCSEHub
      </Link>

      <div>
        <SignedIn>
          {/* Shows user dropdown with Sign Out */}
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          {/* Optional link to Sign In if not signed in */}
          <Link
            href="/sign-in"
            className="text-sm text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  )
}
