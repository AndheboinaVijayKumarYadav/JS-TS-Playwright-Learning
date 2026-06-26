// ============================================
// WEEK 2 DAY 5 — TS Classes
// ============================================

// ── ACCESS MODIFIERS ──────────────────────────
class BankAccount {
  public owner: string        // accessible everywhere (default)
  private balance: number     // only inside this class
  protected accountType: string // this class + subclasses
  readonly accountId: string  // set once, never changed

  constructor(owner: string, accountId: string) {
    this.owner = owner
    this.balance = 0
    this.accountType = 'standard'
    this.accountId = accountId
  }

  // public method — anyone can call
  deposit(amount: number): void {
    this.balance += amount
  }

  // public method to read private balance safely
  getBalance(): number {
    return this.balance
  }
}

const account = new BankAccount('Vijay', 'ACC123')
account.deposit(100)
console.log(account.owner)       // ✅ public
console.log(account.getBalance()) // ✅ 100 via public method
// console.log(account.balance)  // ❌ error — private
// account.accountId = 'NEW'     // ❌ error — readonly

// ── INHERITANCE — extends + super ─────────────
class SavingsAccount extends BankAccount {
  private interestRate: number

  constructor(owner: string, accountId: string, rate: number) {
    super(owner, accountId)  // call parent constructor FIRST
    this.interestRate = rate
    this.accountType = 'savings' // ✅ protected — accessible in subclass
  }

  addInterest(): void {
    // can access protected accountType from parent
    console.log(`Adding interest to ${this.accountType} account`)
  }
}

const savings = new SavingsAccount('Ravi', 'SAV456', 0.05)
savings.deposit(1000)            // ✅ inherited public method
savings.addInterest()            // ✅ own method
console.log(savings.getBalance()) // ✅ inherited

// ── PLAYWRIGHT CONNECTION ─────────────────────
// This is EXACTLY your page object pattern:
//
// class BasePage {
//   protected page: Page          // subclasses can use it
//   constructor(page: Page) { this.page = page }
//   async goto(url: string) { await this.page.goto(url) }
// }
//
// class LoginPage extends BasePage {
//   async login() {
//     await this.page.fill(...)  // protected page accessible
//   }
// }

// static method example
class Example {
  // STATIC — belongs to the class itself
  static create(): Example {
    return new Example()
  }

  // PRIVATE METHOD — internal helper
  private validate(): boolean {
    return true
  }

  // GETTER — looks like a property when used
  get status(): string {
    return 'active'
  }
}

const e = Example.create()  // static — no 'new' needed, called on class
console.log(e.status)       // getter — no () — looks like a property


// static + abstract example
// ── STATIC METHODS — belong to the CLASS ──────
class PageFactory {
  // static — called on the class, not an instance
  static createTimestamp(): string {
    return new Date().toISOString()
  }

  // static factory method — common pattern
  static buildUrl(base: string, path: string): string {
    return `${base}${path}`
  }
}

// called on the CLASS directly — no 'new'
console.log(PageFactory.createTimestamp())
console.log(PageFactory.buildUrl('https://app.com', '/login'))

// ── ABSTRACT CLASS — a template, can't instantiate ──
abstract class BasePageTemplate {
  // abstract method — NO implementation, subclass MUST provide it
  abstract goto(): Promise<void>

  // concrete method — shared by all subclasses
  log(message: string): void {
    console.log(`[Page] ${message}`)
  }
}

// const x = new BasePageTemplate() // ❌ error — can't instantiate abstract

class HomePage extends BasePageTemplate {
  // MUST implement goto() — abstract forces it
  async goto(): Promise<void> {
    this.log('Navigating to home') // inherited concrete method
  }
}

const home = new HomePage()
home.goto()