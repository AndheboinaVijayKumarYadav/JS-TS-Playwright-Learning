// ============================================
// WEEK 2 DAY 2 — Interfaces vs Types
// ============================================

// ── BASIC INTERFACE ───────────────────────────

interface UserNew {
    username: string,
    age: number,
}

const user3: UserNew = { username: "vijay", age: 30 }

// Optional properties
interface UserOptional {
    username: string,
    age: number,
    description?: string, // optional property
}

const user4: UserOptional = { username: "vijay", age: 30 } // ✅ valid
const user5: UserOptional = { username: "vijay", age: 30, description: "A software developer" } // ✅ valid

// interface with readonly property
interface UserReadonly {
    readonly id: number,
    username: string
}

const user6: UserReadonly = { id: 1, username: "vijay" }
// user6.id = 2 // ❌ error — cannot reassign readonly property 
// user6.username = "newname" // ✅ allowed — only id is readonly

console.log(user3, user4, user5, user6)

// ── EXTENDING INTERFACES ──────────────────────
// build on top of existing interfaces

interface Animal {
  name: string
  age: number
}

// Dog has everything Animal has, PLUS breed
interface Dog extends Animal {
  breed: string
}

const dog: Dog = {
  name: 'Rex',    // from Animal
  age: 3,         // from Animal
  breed: 'Lab',   // from Dog
}

// ── EXTENDING MULTIPLE ────────────────────────
interface Timestamped {
  createdAt: string
}

// combine multiple interfaces
interface BlogPost extends Animal, Timestamped {
  title: string
}
// BlogPost now needs: name, age, createdAt, title

// ── PLAYWRIGHT CONNECTION ─────────────────────
// This is how BasePage pattern works:
//
// interface IPage {
//   goto(): Promise<void>
// }
//
// interface ILoginPage extends IPage {
//   login(user: string, pass: string): Promise<void>
// }
//
// ILoginPage has goto() PLUS login()

console.log(dog)

// ============================================
// TOPIC 3 — Interface vs Type Alias
// ============================================

// ── TYPE ALIAS — using 'type' keyword ─────────
type UserType = {
  name: string
  age: number
}

const u: UserType = { name: 'Vijay', age: 30 }

// At first glance — interface and type look identical:
interface UserInterface {
  name: string
  age: number
}
// Both describe the same object shape

// ── WHERE THEY DIFFER ─────────────────────────

// 1. TYPE can do unions — INTERFACE cannot
type Status = 'active' | 'inactive' | 'pending'  // ✅ only type can do this
type ID = string | number                        // ✅ only type

// interface Status = 'active' | 'inactive'  // ❌ interface cannot do unions

// 2. TYPE can alias primitives and tuples
type Coordinates = [number, number]  // tuple
type Age = number                    // primitive alias

// 3. INTERFACE can be re-opened (declaration merging)
interface Window {
  title: string
}
interface Window {
  size: number  // merges with the one above — Window now has both
}
// type CANNOT do this — type cannot be redeclared

// 4. Both can extend, slightly different syntax
interface Admin extends UserInterface {
  permissions: string[]
}

type AdminType = UserType & {  // & = intersection (combine)
  permissions: string[]
}

console.log(u)

// USE INTERFACE when:
// ✅ describing object shapes (most common)
// ✅ you might extend it later
// ✅ building class contracts (implements)
// ✅ public API of a library

// USE TYPE when:
// ✅ union types: 'a' | 'b' | 'c'
// ✅ primitive aliases: type ID = string
// ✅ tuples: type Point = [number, number]
// ✅ complex type operations (mapped, conditional)