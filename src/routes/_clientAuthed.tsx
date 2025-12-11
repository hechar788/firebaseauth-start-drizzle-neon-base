import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SignIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/_clientAuthed')({
  component: ClientAuthedLayout,
})

function ClientAuthedLayout() {
  const { isSignedIn, isLoaded } = useUser()
  const redirectUrl =
    typeof window !== 'undefined' ? window.location.href : '/'

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <SignIn
          routing="hash"
          forceRedirectUrl={redirectUrl}
          signUpForceRedirectUrl={redirectUrl}
          appearance={{
            elements: {
              rootBox:
                'mx-auto flex items-center justify-center w-full max-w-md',
              card: 'shadow-2xl rounded-2xl border border-slate-800',
            },
          }}
        />
      </div>
    )
  }

  return <Outlet />
}
