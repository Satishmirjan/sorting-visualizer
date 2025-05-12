import { ArrayElement, SortingStep } from '../types';

export const bubbleSort = (array: number[]) => {
  const steps: SortingStep[] = [];
  const stats = { comparisons: 0, swaps: 0 };
  
  // Create a copy of the array to work with
  const arr = [...array];
  const n = arr.length;
  
  // Initialize the first step
  steps.push({
    array: arr.map(value => ({ value, status: 'unsorted' })),
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Bubble Sort algorithm'
  });
  
  // Keep track of sorted elements (at the end of the array)
  const sortedIndices: number[] = [];
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Elements being compared
      const comparing = [j, j + 1];
      
      // Add step for comparison
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
        description: `Comparing elements at positions ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`
      });
      
      stats.comparisons++;
      
      if (arr[j] > arr[j + 1]) {
        // Elements being swapped
        const swapping = [j, j + 1];
        
        // Add step for swapping
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
          description: `Swapping elements at positions ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`
        });
        
        // Perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        stats.swaps++;
      }
    }
    
    // After each pass, the largest element is at the end
    sortedIndices.push(n - i - 1);
    
    // Add step to mark the largest element as sorted
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
      })),
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Element ${arr[n - i - 1]} is now in its sorted position`
    });
    
    // If no swaps were made in a pass, the array is already sorted
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
      
      // Add final step to mark all elements as sorted
      steps.push({
        array: arr.map(value => ({ value, status: 'sorted' })),
        comparing: [],
        swapping: [],
        sorted: [...Array(n).keys()],
        description: 'Array is now fully sorted. No swaps needed in the last pass.'
      });
      
      break;
    }
  }
  
  // If we didn't break early, add a final step showing the sorted array
  if (!steps[steps.length - 1].sorted.length === arr.length) {
    steps.push({
      array: arr.map(value => ({ value, status: 'sorted' })),
      comparing: [],
      swapping: [],
      sorted: [...Array(n).keys()],
      description: 'Array is now fully sorted'
    });
  }
  
  return { steps, stats };
};