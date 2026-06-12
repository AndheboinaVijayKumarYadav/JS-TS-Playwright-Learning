// Async pattern in Playwright context: https://playwright.dev

const loadResource = async (name: string, ms: number): Promise<string> => {
    return new Promise( resolve =>
         setTimeout(() => resolve(`Loaded ${name} in ${ms}ms`), ms)
        );
}

// sequential loading

const runSequentialAsync = async (): Promise<void> => {

    console.log('Starting sequential loading...')
    const start = Date.now()

    const a = await loadResource('login page',300)
    const b = await loadResource('dashboard', 300)
    const c = await loadResource('reports', 300)

    console.log(a)
    console.log(b)
    console.log(c)
    console.log(`Sequential loading took ${Date.now() - start}ms`)

}

// parallel loading
const runParallelAsync = async (): Promise<void> => {

    console.log('Starting parallel loading...')
    const start = Date.now()

    const [a,b,c] = await Promise.all([
        loadResource('login page',300),
        loadResource('dashboard', 300),
        loadResource('reports', 300)
    ])
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(`Parallel loading took ${Date.now() - start}ms`)
}

const main = async (): Promise<void> => {
    await runSequentialAsync()
    await runParallelAsync()
}

main()

// Output:
// Starting sequential loading...
// Loaded login page in 300ms
// Loaded dashboard in 300ms
// Loaded reports in 300ms
// Sequential loading took 900ms
// Starting parallel loading...
// Loaded login page in 300ms
// Loaded dashboard in 300ms
// Loaded reports in 300ms
// Parallel loading took 300ms

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Sequential — when order MATTERS
// await page.goto('/login')      ← must load first
// await page.fill('#user', 'x')  ← then fill
// await page.click('#login')     ← then click

// Parallel — when operations are INDEPENDENT
// const [users, products] = await Promise.all([
//   apiClient.getUsers(),      ← independent
//   apiClient.getProducts(),   ← independent
// ])