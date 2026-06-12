// Async pattern in Playwright context: https://playwright.dev

const loadResource = async (name: string, ms: number): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Loaded ${name} in ${ms}ms`), ms),
  );
};

// sequential loading

const runSequentialAsync = async (): Promise<void> => {
  console.log('Starting sequential loading...');
  const start = Date.now();

  const a = await loadResource('login page', 300);
  const b = await loadResource('dashboard', 300);
  const c = await loadResource('reports', 300);

  console.log(a);
  console.log(b);
  console.log(c);
  console.log(`Sequential loading took ${Date.now() - start}ms`);
};

// parallel loading
const runParallelAsync = async (): Promise<void> => {
  console.log('Starting parallel loading...');
  const start = Date.now();

  const [a, b, c] = await Promise.all([
    loadResource('login page', 300),
    loadResource('dashboard', 300),
    loadResource('reports', 300),
  ]);
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(`Parallel loading took ${Date.now() - start}ms`);
};

const main = async (): Promise<void> => {
  await runSequentialAsync();
  await runParallelAsync();
  await loadDashboardData();
  await loadMultipleUsers();
};

main();

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

// ============================================
// TOPIC 2 — Promise.all for Parallel API Calls
// ============================================

// Simulate API calls returning typed data
interface ApiUser {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// Simulated API client
const api = {
  getUser: (id: number): Promise<ApiUser> =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ id, name: `User-${id}` }), 200),
    ),

  getProducts: (): Promise<Product[]> =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: 1, title: 'Backpack', price: 29.99 },
            { id: 2, title: 'Bike Light', price: 9.99 },
          ]),
        200,
      ),
    ),

  getConfig: (): Promise<{ theme: string }> =>
    new Promise((resolve) => setTimeout(() => resolve({ theme: 'dark' }), 200)),
};

// ── PARALLEL API CALLS ────────────────────────
const loadDashboardData = async (): Promise<void> => {
  console.log('--- Loading dashboard ---');
  const start = Date.now();

  // All three API calls fire at the same time
  const [user, products, config] = await Promise.all([
    api.getUser(1),
    api.getProducts(),
    api.getConfig(),
  ]);

  console.log('User:', user);
  console.log('Products:', products);
  console.log('Config:', config);
  console.log(`Loaded in ${Date.now() - start}ms`); // ~200ms not 600ms
};


// ── PROMISE.ALL WITH MAP — dynamic list ───────
const loadMultipleUsers = async (): Promise<void> => {
  console.log('--- Loading multiple users ---');

  const userIds = [1, 2];

  // map each id to an API call, Promise.all runs them parallel
  const users = await Promise.all(userIds.map((id) => api.getUser(id)));

  console.log('All users:', users);
};



// ── PLAYWRIGHT CONNECTION ─────────────────────
// Real hybrid test — parallel data setup via API
// before running UI test
//
// const [user, products] = await Promise.all([
//   apiClient.createUser(testData),
//   apiClient.seedProducts(productList),
// ])
// // now both exist — proceed with UI test
//
// This is 3x faster than creating them one by one
