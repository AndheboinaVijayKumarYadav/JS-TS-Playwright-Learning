// ============================================
// TOPIC 3 — Generic Constraints
// ============================================

// ── THE PROBLEM ───────────────────────────────
// A plain generic accepts ANYTHING
function logLength<T>(item: T): void {
  // console.log(item.length) // ❌ error — T might not have .length
}

// ── THE SOLUTION — CONSTRAIN T ────────────────
// T extends { length: number } means:
// "T can be any type, AS LONG AS it has a length property"
function logLength2<T extends { length: number }>(item: T): number {
  return item.length // ✅ now safe — T guaranteed to have length
}

console.log(logLength2('hello'))      // 5  — string has length
console.log(logLength2([1, 2, 3]))    // 3  — array has length
console.log(logLength2({ length: 9 })) // 9 — object with length
// logLength2(42)                      // ❌ error — number has no length

// ── CONSTRAINT WITH keyof ─────────────────────
// T = object type, K = a KEY of that object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user8 = { name: 'Vijay', age: 30, active: true }

const name = getProperty(user8, 'name')   // typed as string
const age3 = getProperty(user8, 'age')     // typed as number
// getProperty(user8, 'email')            // ❌ error — 'email' not a key

console.log(name, age3) // Vijay 30

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Constrain to ensure a type has required shape:
// function processResponse<T extends { status: number }>(res: T)
//   — guarantees res has a status before using it
//
// keyof for type-safe property access:
// getConfig<K extends keyof Config>(key: K): Config[K]
//   — only valid config keys allowed, return type matches