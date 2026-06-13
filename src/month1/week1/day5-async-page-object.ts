// ============================================
// DAY 5 — Topic 5 — Async Page Object
// Full error handling — capstone of Day 5
// ============================================

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

// ── CUSTOM ERROR for clearer failures ─────────
class PageActionError extends Error {
  constructor(action: string, reason: string) {
    super(`Page action '${action}' failed: ${reason}`)
    this.name = 'PageActionError'
  }
}

// ── SIMULATED PAGE OBJECT ─────────────────────
class CheckoutPageSimulator {
  private cartItems: string[] = []
  private isShippingFilled: boolean = false
  private isPaymentFilled: boolean = false

  // add item — async with validation
  async addItem(item: string): Promise<this> {
    await wait(30)
    if (!item) {
      throw new PageActionError('addItem', 'item name is empty')
    }
    this.cartItems.push(item)
    console.log(`Added: ${item}`)
    return this // enables chaining
  }

  // fill shipping — depends on cart having items
  async fillShipping(address: string): Promise<this> {
    await wait(30)
    if (this.cartItems.length === 0) {
      throw new PageActionError('fillShipping', 'cart is empty')
    }
    this.isShippingFilled = true
    console.log(`Shipping set: ${address}`)
    return this
  }

  // fill payment — depends on shipping
  async fillPayment(card: string): Promise<this> {
    await wait(30)
    if (!this.isShippingFilled) {
      throw new PageActionError('fillPayment', 'shipping not filled first')
    }
    this.isPaymentFilled = true
    console.log(`Payment set: ${'*'.repeat(card.length)}`)
    return this
  }

  // confirm — depends on payment
  async confirmOrder(): Promise<string> {
    await wait(30)
    if (!this.isPaymentFilled) {
      throw new PageActionError('confirmOrder', 'payment not filled')
    }
    console.log('Order confirmed')
    return `Order confirmed with ${this.cartItems.length} items`
  }
}

// ── SUCCESSFUL FLOW ───────────────────────────
const successfulCheckout = async (): Promise<void> => {
  console.log('--- Successful Checkout ---')
  const checkout = new CheckoutPageSimulator()

  try {
    await checkout.addItem('Backpack')
    await checkout.fillShipping('123 Main St')
    await checkout.fillPayment('4111111111111111')
    const result = await checkout.confirmOrder()
    console.log('Result:', result)
  } catch (error) {
    console.log('Checkout failed:', (error as Error).message)
  }
}

// ── FAILING FLOW — wrong order ────────────────
const failingCheckout = async (): Promise<void> => {
  console.log('--- Failing Checkout (skip shipping) ---')
  const checkout = new CheckoutPageSimulator()

  try {
    await checkout.addItem('Bike Light')
    // skip fillShipping — go straight to payment
    await checkout.fillPayment('4111111111111111') // throws here
    await checkout.confirmOrder()
  } catch (error) {
    console.log('Checkout failed:', (error as Error).message)
  }
}

const main2 = async (): Promise<void> => {
  await successfulCheckout()
  await failingCheckout()
}

main2()

// ── PLAYWRIGHT CONNECTION ─────────────────────
// This is a near-exact template for a real page object:
//
// class CheckoutPage {
//   constructor(private page: Page) {}
//
//   async fillShipping(address: string): Promise<void> {
//     try {
//       await this.page.fill('#address', address)
//     } catch (error) {
//       throw new PageActionError('fillShipping', (error as Error).message)
//     }
//   }
// }
//
// Custom errors make test failures readable:
// "Page action 'fillShipping' failed: timeout"
// instead of a generic Playwright error