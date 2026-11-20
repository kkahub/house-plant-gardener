export const latestOnly = <P extends unknown[], T>(request: (...args: P) => Promise<T>) => {
  let latest: Promise<T>

  return async (...args: P) => {
    let current = (latest = request(...args))
    let result = await current

    while (current !== latest) {
      current = latest
      result = await current
    }

    return result
  }
}
