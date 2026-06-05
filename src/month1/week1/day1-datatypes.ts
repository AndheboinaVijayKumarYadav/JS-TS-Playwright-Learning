// Data types + Operators
// Primitive data types
const userName: string = "Alice";
const userAge: number = 30;
const isAdmin: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// type of Operators
console.log(typeof userName); // string
console.log(typeof userAge); // number
console.log(typeof isAdmin); // boolean
console.log(typeof nothing); // object
console.log(typeof notDefined); // undefined

// == vs ===
console.log(0 == false)   // true  — type coercion happens
console.log(0 === false)  // false — strict — no coercion
console.log('' == false)  // true  — dangerous
console.log('' === false) // false — correct
// this would have worked in JavaScript, but TypeScript prevents it to avoid unintentional bugs

/* == vs === error in TypeScript = feature not bug

JavaScript would silently compare string to boolean
TypeScript says NO — this is unintentional

In Playwright:
expect(value).toBe(expected)     uses ===
expect(value).toEqual(expected)  deep equality
Never use == in test assertions
*/

// ── NULLISH COALESCING ?? ────────────────────
// already seen this in playwright.config.ts
const baseURL = null
const url = baseURL ?? 'https://saucedemo.com'
console.log(url) // https://saucedemo.com

// null ?? fallback      → fallback
// undefined ?? fallback → fallback
// '' ?? fallback        → ''  (empty string is NOT null)
// 0 ?? fallback         → 0   (zero is NOT null)

// ── TERNARY OPERATOR ─────────────────────────
const isCI = true
const retries = isCI ? 2 : 0
console.log(retries) // 2

// ── PLAYWRIGHT CONNECTION ─────────────────────
// typeof used to check response type
// === used in all assertions
// ?? used for all env variable defaults
// ternary used in playwright.config.ts for CI settings

// ── typeof null DANGER ───────────────────────
console.log(typeof null)          // 'object' — famous JS bug

// WRONG — null passes object check
const data = null
if (typeof data === 'object') {
  // data.property would crash here
  console.log('passed — but data is null!')
}

// CORRECT — always check null explicitly
if (data !== null && typeof data === 'object') {
  console.log('safe to access properties')
} else {
  console.log('data is null — handled safely')
}

// TYPESCRIPT WAY — optional chaining
const result = null
console.log(result?.toString() ?? 'was null') // 'was null'