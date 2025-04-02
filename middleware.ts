import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/blog(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return

  const { userId } = await auth()

  if (!userId) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in',
      },
    })
  }
})

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|favicon.ico).*)',
    // add this line to make blog public
    '/blog(.*)',
  ],
}

