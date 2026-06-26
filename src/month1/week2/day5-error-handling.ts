async function check(): Promise<void> {
  try {
    throw new Error('test error')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Caught:', error.message)
    }
  }
}
check()