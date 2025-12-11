import { neon } from '@neondatabase/serverless'

export { db } from './db/index.ts'

let client: ReturnType<typeof neon>

export async function getClient() {
  if (!process.env.VITE_DATABASE_URL) {
    return undefined
  }
  if (!client) {
    client = await neon(process.env.VITE_DATABASE_URL!)
  }
  return client
}
