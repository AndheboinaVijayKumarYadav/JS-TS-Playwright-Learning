// Promise

// Promise is a built-in object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// A Promise is in one of these states:
// - pending: initial state, neither fulfilled nor rejected.
// - fulfilled: meaning that the operation completed successfully.
// - rejected: meaning that the operation failed.
// A Promise is created using the Promise constructor, which takes a function as an argument. This function is called the executor function, and it is executed immediately by the Promise implementation. The executor function takes two arguments: resolve and reject. These are functions that you can call to change the state of the Promise to fulfilled or rejected, respectively.
// Example of creating a Promise that resolves after 1 second

// ── CREATING A PROMISE ────────────────────────
const fetchData = (success: boolean): Promise<string> =>
  new Promise((resolve, reject) => {
    if (success) {
      resolve('Data fetched successfully');
    } else {
      reject(new Error('Fetch failed'));
    }
  });

// ── .then() .catch() .finally() ───────────────
fetchData(true)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.log('Error:', error))
  .finally(() => console.log('Always runs'));

fetchData(false)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.log('Error:', (error as Error).message))
  .finally(() => console.log('Always runs'));

// ── SIMULATING REAL ASYNC ─────────────────────
const fetchUser = (id: number): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      id > 0
        ? resolve(`User ${id} found`)
        : reject(new Error(`Invalid id: ${id}`));
    }, 100);
  });

fetchUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.log((err as Error).message));

fetchUser(-1)
  .then((user) => console.log(user))
  .catch((err) => console.log((err as Error).message));

// ── PROMISE.ALL — all must pass ───────────────
const p1 = Promise.resolve('First done');
const p2 = Promise.resolve('Second done');
const p3 = Promise.resolve('Third done');

Promise.all([p1, p2, p3]).then((results) =>
  console.log('All results:', results),
);

// ── PROMISE.ALL FAILURE ───────────────────────
// One fails → entire Promise.all fails
Promise.all([Promise.resolve('Passed'), Promise.reject(new Error('Failed'))])
  .then((results) => console.log(results))
  .catch((err) => console.log('One failed:', (err as Error).message));

// ── PROMISE.ALLSETTLED ────────────────────────
// One fails → still gets all results
Promise.allSettled([
  Promise.resolve('Passed'),
  Promise.reject(new Error('Failed')),
]).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('Fulfilled:', result.value);
    } else {
      console.log('Rejected:', result.reason);
    }
  });
});

// ── ASYNC / AWAIT ──────────────────────────────
const fetchProduct = (id: number): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      id > 0
        ? resolve(`Product ${id} loaded`)
        : reject(new Error(`Product ${id} not found`));
    }, 100);
  });

const loadProduct = async (id: number): Promise<void> => {
  try {
    const product = await fetchProduct(id);
    console.log('Async/await success:', product);
  } catch (error) {
    console.log('Async/await error:', (error as Error).message);
  } finally {
    console.log('Async/await cleanup');
  }
};

loadProduct(2);
loadProduct(-2);

// ── PROMISE CHAINING ──────────────────────────
const chainExample = (): Promise<number> =>
  Promise.resolve(1)
    .then((value) => {
      console.log('Start chain:', value);
      return value + 1;
    })
    .then((value) => {
      console.log('Second .then:', value);
      return Promise.resolve(value * 2);
    })
    .then((value) => {
      console.log('Final value:', value);
      return value;
    });

chainExample();

// ── PROMISE.RACE ──────────────────────────────
const slow = new Promise<string>((resolve) =>
  setTimeout(() => resolve('Slow done'), 200),
);
const fast = new Promise<string>((resolve) =>
  setTimeout(() => resolve('Fast done'), 50),
);

Promise.race([slow, fast]).then((result) =>
  console.log('Race result:', result),
);

// ── PROMISE.ANY ───────────────────────────────
Promise.any([
  Promise.reject(new Error('First failed')),
  Promise.reject(new Error('Second failed')),
  Promise.resolve('Third succeeded'),
])
  .then((result) => console.log('Any succeeded:', result))
  .catch((error) => console.log('Any failed:', (error as Error).message));

// ── PROMISE HELPERS ──────────────────────────
Promise.resolve('Quick success').then((result) => console.log(result));
Promise.reject(new Error('Quick failure')).catch((err) =>
  console.log((err as Error).message),
);

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Promise.all — parallel page setup
// await Promise.all([
//   page.goto('/login'),
//   page.waitForLoadState('networkidle')
// ])

// Promise.allSettled — parallel API calls
// where some may fail but you want all results
// const results = await Promise.allSettled([
//   apiClient.getUser(1),
//   apiClient.getUser(2),
//   apiClient.getUser(3),
// ])
