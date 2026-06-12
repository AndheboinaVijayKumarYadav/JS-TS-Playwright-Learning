// ============================================
// TOPIC 4 — Error Propagation in Async Chains
// ============================================

const delayMs = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

// ── ERROR THROWN IN ASYNC FUNCTION ────────────
const fetchData = async (shouldFail: boolean): Promise<string> => {
  await delayMs(50)
  if (shouldFail) {
    throw new Error('Data fetch failed')
  }
  return 'Data fetched'
}

// ── HOW ERROR PROPAGATES UP ───────────────────
// An error thrown in an async function
// becomes a REJECTED promise
// which propagates up to the nearest try/catch

const level3 = async (): Promise<string> => {
  return await fetchData(true) // throws here
}

const level2 = async (): Promise<string> => {
  return await level3() // error passes through — not caught
}

const level1 = async (): Promise<void> => {
  try {
    const result = await level2() // error bubbles up to here
    console.log(result)
  } catch (error) {
    console.log('Caught at level1:', (error as Error).message)
  }
}

level1()

// ── ERROR WITHOUT TRY/CATCH — UNHANDLED ───────
const unhandledExample = async (): Promise<void> => {
  // This will cause an unhandled rejection warning
  // if not caught somewhere
  const result = await fetchData(true)
  console.log(result) // never reached
}

unhandledExample().catch(err =>
  console.log('Caught via .catch():', (err as Error).message)
)

// ── PARTIAL FAILURE IN PROMISE.ALL ────────────
const runParallelWithFailure = async (): Promise<void> => {
  try {
    const results = await Promise.all([
      fetchData(false), // succeeds
      fetchData(true),  // fails — kills entire Promise.all
      fetchData(false), // would succeed but result lost
    ])
    console.log(results)
  } catch (error) {
    console.log('Promise.all failed:', (error as Error).message)
  }
}

runParallelWithFailure()

// ── PROMISE.ALLSETTLED — HANDLE PARTIAL ───────
const runAllSettled = async (): Promise<void> => {
  const results = await Promise.allSettled([
    fetchData(false),
    fetchData(true),
    fetchData(false),
  ])

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Call ${index}: success — ${result.value}`)
    } else {
      console.log(`Call ${index}: failed — ${(result.reason as Error).message}`)
    }
  })
}

runAllSettled()

// Errors propagate UPWARD through async chains
// They keep travelling up until a try/catch handles them
// A middle function without try/catch = pass-through, not catcher

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Error propagation in page objects:
//
// class CheckoutPage {
//   async completeCheckout(): Promise<void> {
//     await this.fillShipping()   // if this throws
//     await this.fillPayment()    // these never run
//     await this.confirmOrder()   // error bubbles up to the test
//   }
// }
//
// In the test:
// test('checkout', async () => {
//   try {
//     await checkoutPage.completeCheckout()
//   } catch (error) {
//     // test fails with the actual error message
//   }
// })
