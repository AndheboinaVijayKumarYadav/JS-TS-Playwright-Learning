// ============================================
// TOPIC 3 — Async Class Methods
// ============================================

// Simulate a page interaction delay
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

// ── ASYNC METHODS IN A CLASS ──────────────────
// This mimics a Playwright Page Object
class LoginPageSimulator {
  private url: string = '/login'
  private loggedIn: boolean = false

  // async method — returns Promise<void>
  async goto(): Promise<void> {
    await delay(100) // simulate navigation
    console.log(`Navigated to ${this.url}`)
  }

  // async method with parameters
  async login(username: string, password: string): Promise<void> {
    await delay(50) // simulate filling username
    console.log(`Filled username: ${username}`)

    await delay(50) // simulate filling password
    console.log(`Filled password: ${'*'.repeat(password.length)}`)

    await delay(50) // simulate click
    this.loggedIn = true
    console.log('Clicked login button')
  }

  // async method returning a value
  async isLoggedIn(): Promise<boolean> {
    await delay(20)
    return this.loggedIn
  }
}

// ── USING THE ASYNC CLASS ─────────────────────
const runLoginFlow = async (): Promise<void> => {
  console.log('--- Login Flow ---')

  const loginPage = new LoginPageSimulator()

  await loginPage.goto()                          // await navigation
  await loginPage.login('standard_user', 'secret') // await login steps

  const status = await loginPage.isLoggedIn()      // await + get value
  console.log('Logged in?', status)
}

runLoginFlow()
console.log('Login flow initiated...') // runs before async steps complete


// ── PLAYWRIGHT CONNECTION ─────────────────────
// This is EXACTLY how a real Page Object works:
//
// class LoginPage {
//   constructor(private page: Page) {}
//
//   async goto(): Promise<void> {
//     await this.page.goto('/login')
//   }
//
//   async login(user: string, pass: string): Promise<void> {
//     await this.page.fill('#user-name', user)
//     await this.page.fill('#password', pass)
//     await this.page.click('#login-button')
//   }
//
//   async isLoggedIn(): Promise<boolean> {
//     return await this.page.locator('.inventory').isVisible()
//   }
// }
//
// Every method is async because every Playwright action is async