'use client' // ⬅️ Required to use Clerk hooks like useUser

import { SignIn, useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!isSignedIn && <SignIn routing="hash" />}
    </div>
  )
}
