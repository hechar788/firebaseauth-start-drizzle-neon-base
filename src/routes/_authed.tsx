import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { verifyAuthToken } from '../lib/firebase-admin'
import type { DecodedIdToken } from 'firebase-admin/auth'

interface AuthContext {
  user?: DecodedIdToken
}

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context, location }): Promise<AuthContext> => {
    // Get the auth token from the request (server-side only)
    const request = (context as any).request as Request | undefined

    if (!request) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }

    // Try to get token from Authorization header
    const authHeader = request.headers.get('Authorization')
    let token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null

    // If not in Authorization header, try to get it from cookies
    if (!token) {
      const cookies = request.headers.get('cookie')
      const cookieToken = cookies
        ?.split(';')
        .find((c) => c.trim().startsWith('firebase_token='))
        ?.split('=')[1]
      token = cookieToken || null
    }

    if (!token) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }

    const result = await verifyAuthToken(token)

    if (!result.success || !result.user) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }

    // Return the verified user data to child routes
    return {
      user: result.user,
    }
  },
  component: AuthedLayout,
})

function AuthedLayout() {
  return <Outlet />
}
