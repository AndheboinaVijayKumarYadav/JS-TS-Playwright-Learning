// functions + arrow functions

// ── FUNCTION DECLARATION ──────────────────────
function add(a: number, b: number): number {
  return a + b
}
console.log(add(2, 3)) // 5

// ── FUNCTION EXPRESSION ───────────────────────
const multiply = function(a: number, b: number): number {
  return a * b
}
console.log(multiply(2, 3)) // 6

// ── ARROW FUNCTION ────────────────────────────
const divide = (a: number, b: number): number => {
  return a / b
}
console.log(divide(10, 2)) // 5

// implicit return — no curly braces needed
const square = (n: number): number => n * n
console.log(square(4)) // 16

// single param — no brackets needed
const double = (n: number): number => n * 2
console.log(double(5)) // 10

// ── DEFAULT PARAMETERS ────────────────────────
const greet = (name: string, role: string = 'tester'): string => {
  return `${name} is a ${role}`
}
console.log(greet('Vijay'))           // Vijay is a tester
console.log(greet('Vijay', 'admin'))  // Vijay is a admin

// ── REST PARAMETERS ───────────────────────────
const logSteps = (...steps: string[]): void => {
  steps.forEach(step => console.log(`Step: ${step}`))
}
logSteps('open browser', 'login', 'add to cart', 'checkout')

// ── THIS CONTEXT — CRITICAL DIFFERENCE ────────
const timer = {
  seconds: 0,

  // regular function — this works correctly
  startRegular: function() {
    console.log('Regular this.seconds:', this.seconds) // 0 ✅
  },

  // arrow function — this is WRONG inside object method
  startArrow: () => {
    // console.log(this.seconds) // undefined ❌
    console.log('Arrow this is not the object — it is outer scope')
  }
}

timer.startRegular()
timer.startArrow()

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Arrow functions used in:
// test('login test', async ({ page }) => { })
//                            ↑ arrow function

// fixtures use arrow functions:
// loginPage: async ({ page }, use) => { }

// forEach on locators:
// const items = await page.locator('.item').all()
// items.forEach(item => item.click()) // arrow function

// Regular functions used in:
// Class methods — always regular, never arrow
// class LoginPage {
//   async login() { }  // regular — this works correctly
// }