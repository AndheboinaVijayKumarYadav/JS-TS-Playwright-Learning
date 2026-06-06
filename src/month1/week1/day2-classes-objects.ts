// ============================================
// Classes + Objects
// ============================================

// ── OBJECT LITERAL ────────────────────────────
const userObject = {
  name: 'Vijay',
  role: 'admin',
  greet() {
    return `Hello I am ${this.name}`
  }
}
console.log(userObject.greet()) // Hello I am Vijay

// ── CLASS SYNTAX ──────────────────────────────
class User {
  name: string
  role: string

  constructor(name: string, role: string) {
    this.name = name
    this.role = role
  }

  greet(): string {
    return `Hello I am ${this.name} and I am a ${this.role}`
  }

  isAdmin(): boolean {
    return this.role === 'admin'
  }
}

// creating instances
const adminUser = new User('Vijay', 'admin')
const user2 = new User('Ravi', 'user')

console.log(adminUser.greet())   // Hello I am Vijay and I am a admin
console.log(user2.greet())       // Hello I am Ravi and I am a user
console.log(adminUser.isAdmin()) // true
console.log(user2.isAdmin())     // false

// ── CLASS WITH DEFAULT VALUES ─────────────────
class TestConfig {
  baseURL: string
  timeout: number
  headless: boolean

  constructor(
    baseURL: string = 'https://saucedemo.com',
    timeout: number = 30000,
    headless: boolean = true
  ) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.headless = headless
  }

  describe(): string {
    return `URL: ${this.baseURL} | Timeout: ${this.timeout} | Headless: ${this.headless}`
  }
}

const defaultConfig = new TestConfig()
const customConfig  = new TestConfig('https://staging.com', 60000, false)

console.log(defaultConfig.describe())
console.log(customConfig.describe())

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Every Page Object is a class
// This is exactly how LoginPage will look:

// class LoginPage {
//   private page: Page
//
//   constructor(page: Page) {
//     this.page = page  ← same pattern as above
//   }
//
//   async login(username: string, password: string) {
//     await this.page.fill('#user-name', username)
//     await this.page.fill('#password', password)
//     await this.page.click('#login-button')
//   }
// }