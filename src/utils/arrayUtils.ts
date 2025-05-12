/**
 * Generates an array of random integers within a specified range
 * @param size The size of the array to generate
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns Array of random integers
 */
export const generateRandomArray = (
  size: number,
  min: number = 5,
  max: number = 100
): number[] => {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

/**
 * Delays execution for a specified time
 * @param ms Milliseconds to delay
 * @returns A promise that resolves after the delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Creates a deep copy of an array
 * @param arr Array to copy
 * @returns A new array that is a deep copy of the original
 */
export const cloneArray = <T>(arr: T[]): T[] => {
  return JSON.parse(JSON.stringify(arr));
};