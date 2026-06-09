// Async - Await
// ── WHAT IS ASYNC/AWAIT ───────────────────────
// async/await is syntactic sugar over Promises
// Makes async code look and behave like sync code
// Every async function returns a Promise

// ── BASIC ASYNC FUNCTION ──────────────────────
const fetchProduct = async (id: number): Promise<string> => {
  if (id > 0) {
    return `Product ${id} loaded`
  }
  throw new Error(`Product ${id} not found`)
}

// ── CALLING WITH AWAIT ────────────────────────
const runBasic = async (): Promise<void> => {
  const result = await fetchProduct(1)
  console.log(result) // Product 1 loaded

  // without await — you get a Promise not a value
  const withoutAwait = fetchProduct(2)
  console.log(withoutAwait) // Promise { <pending> }

  const withAwait = await fetchProduct(2)
  console.log(withAwait) // Product 2 loaded
}

runBasic()

// ── TRY/CATCH WITH ASYNC ──────────────────────
const runWithErrorHandling = async (): Promise<void> => {
  // success case
  try {
    const product = await fetchProduct(1)
    console.log('Success:', product)
  } catch (error) {
    console.log('Error:', (error as Error).message)
  } finally {
    console.log('Finally always runs')
  }

  // failure case
  try {
    const product = await fetchProduct(-1)
    console.log('Success:', product)
  } catch (error) {
    console.log('Caught error:', (error as Error).message)
  } finally {
    console.log('Finally always runs')
  }
}

runWithErrorHandling()

// ── SEQUENTIAL VS PARALLEL ────────────────────
const runSequential = async (): Promise<void> => {
  console.log('--- Sequential ---')
  const start = Date.now()

  const p1 = await fetchProduct(1) // waits for this
  const p2 = await fetchProduct(2) // then this
  const p3 = await fetchProduct(3) // then this

  console.log(p1, p2, p3)
  console.log(`Sequential time: ${Date.now() - start}ms`)
}

const runParallel = async (): Promise<void> => {
  console.log('--- Parallel ---')
  const start = Date.now()

  const [p1, p2, p3] = await Promise.all([
    fetchProduct(1), // all three start together
    fetchProduct(2),
    fetchProduct(3),
  ])

  console.log(p1, p2, p3)
  console.log(`Parallel time: ${Date.now() - start}ms`)
}

runSequential()
runParallel()

// ── AWAIT IN LOOPS — COMMON MISTAKE ───────────
const productIds = [1, 2, 3]

/* forEach was built before async/await existed
It does not know how to wait for a Promise
It just calls the callback and moves on

for...of was designed to work with await
It pauses at each await before continuing

*/

// ❌ WRONG — forEach does not work with await
const wrongLoop = async (): Promise<void> => {
  console.log('--- Wrong loop ---')
  productIds.forEach(async (id) => {
    const product = await fetchProduct(id)
    console.log(product) // order not guaranteed
  })
}

// ✅ CORRECT — for...of works with await
const correctLoop = async (): Promise<void> => {
  console.log('--- Correct loop ---')
  for (const id of productIds) {
    const product = await fetchProduct(id)
    console.log(product) // order guaranteed
  }
}



wrongLoop()
correctLoop()

// ── ASYNC CLASS METHOD ────────────────────────
class ProductService {
  async getProduct(id: number): Promise<string> {
    const product = await fetchProduct(id)
    return product
  }

  async getMultiple(ids: number[]): Promise<string[]> {
    return Promise.all(ids.map(id => fetchProduct(id)))
  }
}

const service = new ProductService()

service.getProduct(1).then(p => console.log('Service:', p))
service.getMultiple([1, 2, 3]).then(products =>
  console.log('Multiple:', products)
)

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Every Playwright test is async
// test('login', async ({ page }) => {
//   await page.goto('/login')        ← await navigation
//   await page.fill('#user', 'user') ← await action
//   await page.click('#login-btn')   ← await click
//   await expect(page).toHaveURL('/dashboard') ← await assertion
// })

// Page object methods are async
// class LoginPage {
//   async login(user: string, pass: string): Promise<void> {
//     await this.page.fill('#user', user)
//     await this.page.fill('#pass', pass)
//     await this.page.click('#login-btn')
//   }
// }

// ❌ Forgetting await — silent bug
const title1 = page.title()
console.log(title1) // Promise { <pending> } — not the title

// ✅ With await
const title2 = await page.title()
console.log(title2) // 'Swag Labs' — actual value

// ❌ Forgetting await on assertion — test always passes
expect(page.title()).toBe('Swag Labs') // comparing Promise to string — wrong

// ✅ Correct
await expect(page).toHaveTitle('Swag Labs')