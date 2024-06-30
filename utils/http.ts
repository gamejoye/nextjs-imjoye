export async function fetchWithRetry<T>(
  callback: () => (Promise<T>),
  isSuccess: (arg: T) => boolean,
  retries = 3,
  delay = 500,
): Promise<T> {
  try {
    const response = await callback();
    if (isSuccess(response)) return response;
    if (!isSuccess(response) && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(callback, isSuccess, retries - 1, delay);
    }
    throw new Error('网络开了一点小差～');
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(callback, isSuccess, retries - 1, delay);
    }
    throw error;
  }
}