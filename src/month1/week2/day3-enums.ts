// ============================================
// WEEK 2 DAY 3 — Enums + Utility Types
// ============================================

// ── NUMERIC ENUM (default) ────────────────────
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
console.log(Direction.Up)    // 0
console.log(Direction.Right) // 3

// ── STRING ENUM (most useful for testing) ─────
enum UserRole {
  Admin = 'admin',
  Standard = 'standard',
  Locked = 'locked',
}
console.log(UserRole.Admin) // 'admin'

// string enums are readable in logs and debugging
const role9: UserRole = UserRole.Standard
console.log(`User role: ${role9}`) // User role: standard

// ── ENUM IN A FUNCTION ────────────────────────
function getCredentials(role: UserRole): string {
  switch (role) {
    case UserRole.Admin:
      return 'admin / admin123'
    case UserRole.Standard:
      return 'standard_user / secret'
    case UserRole.Locked:
      return 'locked_out_user / secret'
  }
}
console.log(getCredentials(UserRole.Admin))

// ── CONST ENUM (performance) ──────────────────
// const enum is inlined at compile time — no runtime object
const enum Environment1 {
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}
const env2 = Environment1.Staging
console.log(env2) // 'staging'

// ── PLAYWRIGHT CONNECTION ─────────────────────
// enum UserRole — pick test user by role
// enum Browser { Chromium, Firefox, Webkit }
// enum TestTag { Smoke = '@smoke', Regression = '@regression' }

// You learned literal unions in Day 1:
type RoleUnion = 'admin' | 'standard' | 'locked'

// Now enums:
enum RoleEnum {
  Admin = 'admin',
  Standard = 'standard',
  Locked = 'locked',
}

// WHEN TO USE WHICH:

// Union of literals (type)
// ✅ simpler, no runtime code
// ✅ when you just need to restrict values
// ✅ lighter — preferred by many modern teams

// Enum
// ✅ when you want a NAMED reference (UserRole.Admin)
// ✅ when values group together as a concept
// ✅ autocomplete shows all options
// ⚠️ generates runtime code (except const enum)