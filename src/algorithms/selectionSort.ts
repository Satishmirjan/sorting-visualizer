import { SortingStep } from '../types';

export const selectionSort = (array: number[]) => {
  const steps: SortingStep[] = [];
  const stats = { comparisons: 0, swaps: 0 };
  
  // Create a copy of the array to work with
  const arr = [...array];
  const n = arr.length;
  
  // Keep track of sorted elements
  const sortedIndices: number[] = [];
  
  // Initialize the first step
  steps.push({
    array: arr.map(value => ({ value, status: 'unsorted' })),
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Selection Sort algorithm'
  });
  
  for (let i = 0; i < n - 1; i++) {
    // Initialize minIndex as the first element of unsorted subarray
    let minIndex = i;
    
    // Step to show the current position we're trying to fill
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx)
          ? 'sorted'
          : idx === minIndex
          ? 'comparing'
          : 'unsorted'
      })),
      comparing: [minIndex],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Finding the minimum element to place at position ${i}`
    });
    
    // Find the minimum element in the unsorted subarray
    for (let j = i + 1; j < n; j++) {
      const comparing = [minIndex, j];
      
      // Step to show comparison
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx)
            ? 'sorted'
            : comparing.includes(idx)
            ? 'comparing'
            : 'unsorted'
        })),
        comparing,
        swapping: [],
        sorted: [...sortedIndices],
        description: `Comparing current minimum ${arr[minIndex]} with ${arr[j]}`
      });
      
      stats.comparisons++;
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        
        // Step to show new minimum
        steps.push({
          array: arr.map((value, idx) => ({
            value,
            status: sortedIndices.includes(idx)
              ? 'sorted'
              : idx === minIndex
              ? 'comparing'
              : 'unsorted'
          })),
          comparing: [minIndex],
          swapping: [],
          sorted: [...sortedIndices],
          description: `Found new minimum value ${arr[minIndex]} at position ${minIndex}`
        });
      }
    }
    
    // Swap the found minimum element with the first element of the unsorted subarray
    if (minIndex !== i) {
      const swapping = [i, minIndex];
      
      // Step to show swapping
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx)
            ? 'sorted'
            : swapping.includes(idx)
            ? 'swapping'
            : 'unsorted'
        })),
        comparing: [],
        swapping,
        sorted: [...sortedIndices],
        description: `Swapping ${arr[i]} at position ${i} with minimum ${arr[minIndex]} at position ${minIndex}`
      });
      
      // Perform the swap
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      stats.swaps++;
    }
    
    // Add the current position to sorted indices
    sortedIndices.push(i);
    
    // Step to show the element in its sorted position
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
      })),
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Element ${arr[i]} is now in its sorted position at index ${i}`
    });
  }
  
  // Add the last element to sorted indices
  sortedIndices.push(n - 1);
  
  // Final step showing the sorted array
  steps.push({
    array: arr.map(value => ({ value, status: 'sorted' })),
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    description: 'Array is now fully sorted'
  });
  
  return { steps, stats };
};