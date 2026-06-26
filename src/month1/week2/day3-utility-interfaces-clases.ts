// ── GENERIC INTERFACE ─────────────────────────
// a typed "container" that works with any type
interface ApiResponse<T> {
  status: number
  data: T          // T is whatever type the response holds
  timestamp: string
}

// use with different data types
const userResponse: ApiResponse<{ name: string }> = {
  status: 200,
  data: { name: 'Vijay' },  // data is typed as { name: string }
  timestamp: '2024-01-01',
}

const numberResponse: ApiResponse<number[]> = {
  status: 200,
  data: [1, 2, 3],          // data is typed as number[]
  timestamp: '2024-01-01',
}

console.log(userResponse.data.name) // Vijay — fully typed
console.log(numberResponse.data)    // [1,2,3]

// ── GENERIC CLASS ─────────────────────────────
// a reusable container class
class DataStore<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  getAll(): T[] {
    return this.items
  }

  getFirst(): T | undefined {
    return this.items[0]
  }
}

// store of numbers
const numberStore = new DataStore<number>()
numberStore.add(1)
numberStore.add(2)
console.log(numberStore.getAll()) // [1, 2]

// store of strings
const stringStore = new DataStore<string>()
stringStore.add('a')
console.log(stringStore.getFirst()) // 'a'

// ── PLAYWRIGHT CONNECTION ─────────────────────
// Generic API response handler:
// async function get<T>(url: string): Promise<ApiResponse<T>>
//   const res = await get<Booking>('/booking/1')
//   res.data is typed as Booking — no casting needed