import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/example')({
  component: ExamplePage,
})

function ExamplePage() {
  const context = Route.useRouteContext()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Protected Route Example
        </h1>
        <p className="text-gray-300 mb-6">
          This route is protected by server-side Firebase authentication.
        </p>

        {context.user && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Information
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">UID:</span> {context.user.uid}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                {context.user.email || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Email Verified:</span>{' '}
                {context.user.email_verified ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
