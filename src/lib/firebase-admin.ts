import { initializeApp, getApps, cert, type App } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'

let app: App | undefined
let auth: Auth | undefined

export function getFirebaseAdmin() {
  if (!app) {
    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })
    } else {
      app = getApps()[0]
    }
  }

  if (!auth) {
    auth = getAuth(app)
  }

  return { app, auth }
}

export async function verifyAuthToken(token: string) {
  try {
    const { auth } = getFirebaseAdmin()
    const decodedToken = await auth.verifyIdToken(token)
    return { success: true, user: decodedToken }
  } catch (error) {
    console.error('Error verifying auth token:', error)
    return { success: false, user: null }
  }
}
