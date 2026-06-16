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