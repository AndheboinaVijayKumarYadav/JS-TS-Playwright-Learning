// ── OBJECT DESTRUCTURING ─────────────────────
const user = { username: 'Vijay', role: 'admin', score: 90 }

// old way
const oldName = user.username
const oldRole = user.role

// destructuring way
const { username, role } = user
console.log(username, role) // Vijay admin

// rename while destructuring
const { username: userName, role: userRole } = user
console.log(userName, userRole) // Vijay admin

// default value if property missing
interface User {
  name: string
  role: string
  score: number
  active?: boolean  // optional — may or may not exist
}

const user1: User = { name: 'Vijay', role: 'admin', score: 90 }

const { score, active = true } = user1
console.log(score, active) // 90 true

// playwright connection:
// Real use case — optional test data
interface TestUser {
  username: string
  password: string
  role: 'admin' | 'user' | 'locked'
  active?: boolean   // optional — not all test users need this
}

const testUser: TestUser = { username: 'admin', password: 'pass123', role: 'admin' }
const { username: username3, password, active: active1 = true } = testUser
// if active not provided — defaults to true


// ── ARRAY DESTRUCTURING ───────────────────────
const colors = ['red', 'green', 'blue']

const [first, second] = colors
console.log(first, second) // red green

// skip elements
const [, , third] = colors
console.log(third) // blue

// rest operator
const [head, ...rest] = colors
console.log(head) // red
console.log(rest) // ['green', 'blue']

// ── SPREAD OPERATOR ───────────────────────────
// spread array
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]
console.log(combined) // [1,2,3,4,5,6]

// spread object
const baseUser = { username: 'Vijay', role: 'admin' }
const extendedUser = { ...baseUser, score: 90, active: true }
console.log(extendedUser)

// ── TEMPLATE LITERALS ─────────────────────────
const testName = 'Vijay'
const environment = 'staging'

// old way
const oldMsg = 'Running tests for ' + testName + ' on ' + environment

// template literal
const newMsg = `Running tests for ${testName} on ${environment}`
console.log(newMsg)

// multiline
const report = `
Test Summary:
  User: ${testName}
  Env:  ${environment}
  Date: ${new Date().toDateString()}
`
console.log(report)

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Object destructuring — fixtures
// const { page, loginPage } = fixtures

// Spread — browser args in playwright.config.ts
// use: { ...devices['Desktop Chrome'] }

// Spread — merging config objects
// const config = { ...baseConfig, ...envConfig }

// Template literals — dynamic URLs
// await page.goto(`${baseURL}/login`)

// Template literals — assertion messages
// expect(title).toBe(`${appName} Login`)