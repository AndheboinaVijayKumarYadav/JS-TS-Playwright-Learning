// ============================================
// WEEK 2 DAY 3 — Utility Types
// ============================================

interface User {
  id: number
  name: string
  email: string
  role: string
}

// ── Partial<T> — all properties OPTIONAL ──────
// useful for updates where you only change some fields
type PartialUser = Partial<User>
// equivalent to: { id?: number; name?: string; email?: string; role?: string }

const update: PartialUser = { name: 'New Name' } // ✅ only one field needed
console.log('Partial:', update)

function updateUser(id: number, changes: Partial<User>): void {
  console.log(`Updating user ${id} with`, changes)
}
updateUser(1, { email: 'new@email.com' }) // ✅ only email

// ── Required<T> — all properties REQUIRED ─────
interface AppConfig {
  timeout?: number
  retries?: number
}
type FullConfig = Required<AppConfig>
// now timeout and retries are MANDATORY

const cfg: FullConfig = { timeout: 5000, retries: 2 } // ✅ both required
console.log('Required:', cfg)

// ── Pick<T, K> — select SPECIFIC properties ───
type UserPreview = Pick<User, 'id' | 'name'>
// only { id: number; name: string }

const preview: UserPreview = { id: 1, name: 'Vijay' }
console.log('Pick:', preview)

// ── Omit<T, K> — EXCLUDE specific properties ──
type UserWithoutEmail = Omit<User, 'email'>
// everything EXCEPT email: { id, name, role }

const noEmail5: UserWithoutEmail = { id: 1, name: 'Vijay', role: 'admin' } as UserWithoutEmail
console.log('Omit:', noEmail5)

// ── Record<K, V> — key-value map ──────────────
// object with specific key type and value type
type UserRoleMap = Record<string, User>
const userMap: UserRoleMap = {
  vijay: { id: 1, name: 'Vijay', email: 'v@x.com', role: 'admin' },
  ravi: { id: 2, name: 'Ravi', email: 'r@x.com', role: 'user' },
}
console.log('Record:', Object.keys(userMap))

// Record with literal keys — restricts allowed keys
type EnvUrls = Record<'dev' | 'staging' | 'prod', string>
const urls: EnvUrls = {
  dev: 'http://localhost:3000',
  staging: 'https://staging.app.com',
  prod: 'https://app.com',
}
console.log('Env URLs:', urls)

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Partial<Booking>  → update only some booking fields (PATCH)
// Pick<User, 'username' | 'password'>  → just credentials
// Omit<User, 'password'>  → user data without sensitive field
// Record<'dev'|'staging'|'prod', string>  → env URL config

// Partial<T>   → PATCH/update requests (change some fields)
// Required<T>  → enforce all optional fields are now present
// Pick<T, K>   → extract a subset (just credentials from User)
// Omit<T, K>   → remove fields (User without password)
// Record<K, V> → typed maps (env → URL, role → credentials)