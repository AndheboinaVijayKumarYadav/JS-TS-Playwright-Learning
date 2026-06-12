const config = { retries: 0, headless: true }
const ciConfig = { ...config, retries: 2, workers: 4 }
console.log(ciConfig)

// Concept: When spreading, later properties overwrite earlier ones. ...config copies retries: 0 first, then retries: 2 overwrites it. workers: 4 is added as new.

// Playwright link: use: { ...devices['Desktop Chrome'], headless: false } — your headless overrides the device default.

Promise.allSettled([
    Promise.resolve('ok'),
    Promise.reject('fail')
])

// Concept: Promise.allSettled allows you to handle multiple promises and get their results regardless of whether they fulfilled or rejected. This is useful when you want to continue processing even if some promises fail, as it provides a way to see the outcome of each promise without short-circuiting on the first rejection.

// allSettled does NOT change parallel vs sequential — both run in parallel. The difference is how FAILURES are reported:
// Promise.all → if one promise rejects, the whole thing rejects, you lose the others
// Promise.allSettled → never rejects, returns an array of { status, value } or { status, reason } for each


// typescriptPromise.allSettled([Promise.resolve('ok'), Promise.reject('fail')])
// // [
// //   { status: 'fulfilled', value: 'ok' },
// //   { status: 'rejected', reason: 'fail' }
// // ]

// Playwright link: Use allSettled for parallel API calls where some may fail but you still want every result.

const getUser = async (id: number): Promise<string> => {
  if (id === 0) throw new Error('Invalid ID')
  return `User-${id}`
}

const run = async () => {
  try {
    const user = await getUser(0)
    console.log(user)
  } catch (e) {
    console.log('Caught:', (e as Error).message)
  }
}

run()
console.log('After run()')

// Output: 
// After run()
// Caught: Invalid ID
// Concept: The async function run() starts executing and hits the await getUser(0). Since getUser(0) throws an error, the promise it returns is rejected. The control flow jumps to the catch block, which logs the error message. Meanwhile, the console.log('After run()') executes immediately after calling run(), demonstrating that the asynchronous code does not block the main thread.
// playwright link: Use try/catch around await to handle errors gracefully in async functions.
// This is why forgetting await causes tests to "pass" instantly — the assertion is scheduled but the test ends before it runs.


// forEach with await ✓ CORRECT

// Concept: forEach ignores the Promise returned by an async callback. It calls each callback and moves on without waiting — so all iterations fire in parallel and finish in random order. Use for...of when you need to await in sequence.

// Concept: An async arrow function is still a function. typeof returns 'function'. (When you CALL it, it returns a Promise — but the function itself is a function.)

const a: number = 5
const b: string = '5'
console.log(a == b)
console.log(String(a) === b)

//Takeaway: The safe answer is always: convert types explicitly (String(a)) then use ===. Never rely on == coercion.

// Concept: A Promise is an object. typeof any non-primitive (objects, arrays, Promises, functions-except-function) → 'object'. There is no 'promise' typeof. Only after await do you get the resolved value (42).

function getData(): string {
    return "hello"
}

let val: unknown = getData()
val.toUpperCase()  // ✗ TS error — must narrow first
if (typeof val === 'string') {
  val.toUpperCase()  // ✓ now allowed
}

let val2: any = getData()
val2.toUpperCase()  // ✓ no error — but could crash at runtime

const obj = { a: 1, b: 2 } as const
obj.a = 5  // ✗ TS error — 'a' is readonly due to 'as const'
// concept: 'as const' makes the entire object readonly and its properties literal types. This means you cannot reassign obj.a to a different value, and obj.a is of type 1, not number. This is useful for ensuring immutability and preserving literal types in TypeScript.

const timer3 = {
  label: 'MyTimer',
  start() { return `${this.label} started` },
  stop: () => { return `${this?.label} stopped` }
}
console.log(timer3.start())  // MyTimer started
console.log(timer3.stop())   // undefined stopped
// Concept: Regular functions (start) have their own 'this' context, which refers to the object they are called on (timer3). Arrow functions (stop) do not have their own 'this'; they capture 'this' from the surrounding context. In this case, since stop is defined in the global scope, 'this' is undefined when stop is called, resulting in undefined for this.label. This is why timer3.stop() returns "undefined stopped".

const slow2 = new Promise(r => setTimeout(() => r('slow'), 100))
const fast3 = new Promise(r => setTimeout(() => r('fast'), 10))
Promise.all([slow2, fast3]).then(console.log)

// output: ['slow', 'fast'] after 100ms
// Concept: Promise.all waits for all promises to resolve and returns their results in the order they were passed in, regardless of the order in which they actually resolved. So even though fast3 resolves first, the output will be ['slow', 'fast'] because slow2 was listed first in the array passed to Promise.all.


interface Config {
  retries?: number
  timeout: number
}
const applyDefaults = (config: Config): Required<Config> => ({
  retries: config.retries ?? 0,
  timeout: config.timeout,
})
console.log(applyDefaults({ timeout: 5000 }))
console.log(applyDefaults({ timeout: 3000, retries: 2 }))
// output: { retries: 0, timeout: 5000 }
// output: { retries: 2, timeout: 3000 }

// When retries is not passed → config.retries is undefined → undefined ?? 0 → 0
// When retries: 2 is passed → 2 ?? 0 → 2
// Required<Config> describes the RETURN type (all properties present, none optional) — it does NOT force the caller to pass every property
