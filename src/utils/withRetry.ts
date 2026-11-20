export const withRetry = async <T>(request: () => Promise<T>, tries = 3): Promise<T> => {
  try {
    return await request()
  } catch (error) {
    if (tries <= 1) throw error
    return withRetry(request, tries - 1)
  }
}
