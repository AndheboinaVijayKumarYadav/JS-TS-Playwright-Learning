// ============================================
// DAY 1 — var, let, const + Scope
// ============================================

// ── VAR ──────────────────────────────────────
var userName = "vijay"
var userName = "ajay" // Allowed, but can lead to bugs and confusion
console.log(userName)

// ── LET ──────────────────────────────────────
let age = 25
age = 26 // Allowed
// let age = 27 // Error: Identifier 'age' has already been declared
console.log(age)

// ── CONST ───────────────────────────────────
const country = "India"
// country = "USA" // Error: Assignment to constant variable
console.log(country)

// Block Scope with let and const
if (true) {
    let blockScoped = "I am block scoped"
    var functionScoped = "I am function scoped"
    console.log(blockScoped) // Accessible here
    console.log(functionScoped) // Accessible here
}
// console.log(blockScoped) // Error: blockScoped is not defined
console.log(functionScoped) // Accessible here, but can lead to bugs

// ── TRICK QUESTION ───────────────────────────
// const object — can you change its properties?
const user = {
  name: 'Vijay',
  role: 'tester'
}
user.role = 'senior tester' // what happens here?
console.log(user) // Output: { name: 'Vijay', role: 'senior tester' }

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Why Playwright always uses const
// const page = await browser.newPage()
// page reference stays same — object inside changes
// same as user above — const protects reference not content
// explanation: when we declare a variable with const, it means that the reference to the value cannot be changed. However, if the value is an object (like a Page object in Playwright), we can still modify the properties of that object. This is why Playwright uses const for page — we want to ensure that the reference to the Page object remains constant, while allowing us to interact with and modify the content of that page as needed.
// const page = await browser.newPage()
// page always points to same Page object
// page.goto(), page.click() — change content inside
// page = somethingElse — ❌ blocked by const
// same concept — const protects the reference