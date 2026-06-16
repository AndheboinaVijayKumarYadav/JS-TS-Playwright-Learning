// ============================================
// WEEK 2 DAY 1 — TypeScript Fundamentals
// ============================================

// ── WHAT IS TYPESCRIPT ────────────────────────
// TypeScript = JavaScript + a type system
// It compiles DOWN to JavaScript (browsers run JS, not TS)
// The types exist only at COMPILE time — they vanish at runtime

// ── WHY TS EXISTS — catch errors before runtime ──

// JavaScript — this bug is invisible until it crashes at runtime
// function getLength(text) {
//   return text.length
// }
// getLength(42)  // 42.length is undefined — silent bug in JS

// TypeScript — caught BEFORE you run it
function getLength(text: string): number {
  return text.length
}
// getLength(42)  // ❌ TS error: number not assignable to string
getLength('hello') // ✅ 5

console.log(getLength('hello'))

// ── THE CORE VALUE ────────────────────────────
// JS finds the bug:  when the code RUNS (maybe in production)
// TS finds the bug:  when you WRITE the code (in your editor)

// Types
// ── BASIC TYPES ───────────────────────────────
const userName1: string = 'Vijay'
const age2: number = 30
const isActive: boolean = true

// arrays
const scores: number[] = [90, 85, 78]
const names: string[] = ['a', 'b', 'c']

// ── any — TURNS OFF type checking (dangerous) ──
let anything: any = 'hello'
anything = 42          // allowed
anything = true        // allowed
 // anything.foo.bar.baz   // ❌ NO error — but crashes at runtime
// any = "stop checking, trust me" — defeats the purpose of TS

// ── unknown — SAFE version of any ─────────────
let value: unknown = 'hello'
value = 42             // allowed (like any)
// value.toUpperCase() // ❌ TS error — must check type first

// must narrow before using
if (typeof value === 'string') {
  console.log(value.toUpperCase()) // ✅ now allowed — TS knows it's a string
}

// ── TYPE ANNOTATIONS ──────────────────────────
// Explicit annotation — you state the type
const city: string = 'Hyderabad'

// Type inference — TS figures it out for you
const country3 = 'India' // TS infers: string (no annotation needed)

// Function annotations
function add(a: number, b: number): number {
  //          ^param types    ^return type
  return a + b
}

// When to annotate vs let TS infer:
// — annotate function PARAMETERS (TS cannot guess these)
// — annotate function RETURN types (catches mistakes)
// — let TS INFER simple variables (const x = 5 is obviously number)

// ── UNION TYPES — value can be ONE OF several ─
let id: string | number
id = 'ABC123'  // ✅ string allowed
id = 42        // ✅ number allowed
// id = true   // ❌ boolean not in the union

// union forces you to handle each type
function printId(id: string | number): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()) // string method
  } else {
    console.log(id.toFixed(2))    // number method
  }
}
printId('abc')  // ABC
printId(42)     // 42.00

// ── LITERAL TYPES — exact allowed values ──────
// not just "any string" — only THESE specific strings
let role1: 'admin' | 'user' | 'locked'
role1 = 'admin'   // ✅ allowed
role1 = 'user'    // ✅ allowed
// role1 = 'guest' // ❌ error — not in the allowed set

// literal types are PERFECT for test data
type Environment = 'dev' | 'staging' | 'prod'
const env: Environment = 'staging' // only these 3 allowed

console.log(env)

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Literal types you will use:
// type Browser = 'chromium' | 'firefox' | 'webkit'
// type TestTag = '@smoke' | '@regression' | '@api'
//
// Union types in real code:
// async getValue(): Promise<string | null>
//   — might return a string OR null
//
// Your AuthRequest, Booking interfaces already use
// string, number, boolean — basic types in action