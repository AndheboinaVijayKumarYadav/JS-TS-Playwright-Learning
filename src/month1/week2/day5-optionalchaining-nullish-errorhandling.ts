// ============================================
// WEEK 2 DAY 5 — Optional Chaining + Nullish + Error Handling
// ============================================

// ── OPTIONAL CHAINING ?. ──────────────────────
// safely access nested properties that MIGHT not exist

interface User {
  name: string
  address?: {           // optional — might not exist
    city?: string       // optional — might not exist
    zip?: string
  }
}

const user12: User = { name: 'Vijay', address: { city: 'Hyderabad' } }
const user10: User = { name: 'Ravi' } // no address

// ❌ WITHOUT optional chaining — crashes if address is missing
// console.log(user10.address.city) // TypeError: cannot read 'city' of undefined

// ✅ WITH optional chaining — returns undefined safely
console.log(user12.address?.city) // 'Hyderabad'
console.log(user10.address?.city) // undefined — no crash

// chain multiple levels
console.log(user10.address?.zip?.length) // undefined — stops at first missing

// ── NULLISH COALESCING ?? ─────────────────────
// provide a fallback ONLY for null/undefined

const city1 = user12.address?.city ?? 'Unknown'
const city2 = user10.address?.city ?? 'Unknown'
console.log(city1) // 'Hyderabad'
console.log(city2) // 'Unknown' — fallback used

// ── ?? vs || — the critical difference ────────
const count = 0
console.log(count ?? 'no value')  // 0  — ?? only replaces null/undefined
console.log(count || 'no value')  // 'no value' — || replaces ALL falsy (0, '', false)

const text = ''
console.log(text ?? 'empty')  // '' — kept, not null/undefined
console.log(text || 'empty')  // 'empty' — || treats '' as falsy

// ── OPTIONAL CHAINING + NULLISH TOGETHER ──────
// the common real-world pattern
const displayCity = user10.address?.city ?? 'No city provided'
console.log(displayCity) // 'No city provided'

// ── TYPED ERROR HANDLING — catch (error: unknown) ──
// in modern TypeScript, catch errors are 'unknown' not 'any'

async function riskyOperation(): Promise<string> {
  throw new Error('Something failed')
}

async function handleError(): Promise<void> {
  try {
    await riskyOperation()
  } catch (error: unknown) {
    // error is 'unknown' — must narrow before using
    if (error instanceof Error) {
      console.log('Error message:', error.message) // ✅ safe — narrowed
    } else {
      console.log('Unknown error:', error)
    }
  }
}

handleError()

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Optional chaining for API responses:
// const city = response.data?.address?.city ?? 'N/A'
//
// Nullish for config defaults (you used this!):
// const url = process.env.BASE_URL ?? 'https://default.com'
//
// Typed error handling in tests:
// catch (error: unknown) {
//   if (error instanceof Error) throw new TestError(error.message)
// }


// 1. Optional chaining ?.
//    safely access nested props that might not exist
//    user?.address?.city → undefined instead of crash

// 2. Nullish coalescing ??
//    fallback ONLY for null/undefined (not 0, '', false)
//    value ?? 'default'

// 3. Typed error handling catch (error: unknown)
//    modern TS types catch errors as 'unknown'
//    must narrow (instanceof Error) before using .message