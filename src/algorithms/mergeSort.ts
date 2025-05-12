import { SortingStep } from '../types';

export const mergeSort = (array: number[]) => {
  const steps: SortingStep[] = [];
  const stats = { comparisons: 0, swaps: 0 };
  
  // Create a copy of the array to work with
  const arr = [...array];
  
  // Initialize the first step
  steps.push({
    array: arr.map(value => ({ value, status: 'unsorted' })),
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Merge Sort algorithm'
  });
  
  // Keep track of sorted elements
  const sortedIndices: number[] = [];
  
  // Call the recursive merge sort function
  mergeSortRecursive(arr, 0, arr.length - 1, steps, stats, sortedIndices);
  
  // Final step showing the sorted array
  steps.push({
    array: arr.map(value => ({ value, status: 'sorted' })),
    comparing: [],
    swapping: [],
    sorted: [...Array(arr.length).keys()],
    description: 'Array is now fully sorted'
  });
  
  return { steps, stats };
};

const mergeSortRecursive = (
  arr: number[],
  left: number,
  right: number,
  steps: SortingStep[],
  stats: { comparisons: number; swaps: number },
  sortedIndices: number[]
) => {
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Add step to show the division
    const subArrayIndices = Array.from({ length: right - left + 1 }, (_, i) => left + i);
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx)
          ? 'sorted'
          : subArrayIndices.includes(idx)
          ? 'comparing'
          : 'unsorted'
      })),
      comparing: subArrayIndices,
      swapping: [],
      sorted: [...sortedIndices],
      description: `Dividing array from index ${left} to ${right} at midpoint ${mid}`
    });
    
    // Recursively sort the first and second halves
    mergeSortRecursive(arr, left, mid, steps, stats, sortedIndices);
    mergeSortRecursive(arr, mid + 1, right, steps, stats, sortedIndices);
    
    // Merge the sorted halves
    merge(arr, left, mid, right, steps, stats, sortedIndices);
  } else if (left === right) {
    // A single element is already sorted
    if (!sortedIndices.includes(left)) {
      sortedIndices.push(left);
      
      // Add step to show a single element as sorted
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
        })),
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        description: `Single element at index ${left} is already sorted`
      });
    }
  }
};

const merge = (
  arr: number[],
  left: number,
  mid: number,
  right: number,
  steps: SortingStep[],
  stats: { comparisons: number; swaps: number },
  sortedIndices: number[]
) => {
  // Create temporary arrays
  const leftSubarray = arr.slice(left, mid + 1);
  const rightSubarray = arr.slice(mid + 1, right + 1);
  
  // Add step to show the arrays to be merged
  const leftIndices = Array.from({ length: mid - left + 1 }, (_, i) => left + i);
  const rightIndices = Array.from({ length: right - mid }, (_, i) => mid + 1 + i);
  
  steps.push({
    array: arr.map((value, idx) => ({
      value,
      status: sortedIndices.includes(idx)
        ? 'sorted'
        : leftIndices.includes(idx)
        ? 'comparing'
        : rightIndices.includes(idx)
        ? 'comparing'
        : 'unsorted'
    })),
    comparing: [...leftIndices, ...rightIndices],
    swapping: [],
    sorted: [...sortedIndices],
    description: `Merging subarrays: [${leftSubarray.join(', ')}] and [${rightSubarray.join(', ')}]`
  });
  
  let i = 0; // Initial index of left subarray
  let j = 0; // Initial index of right subarray
  let k = left; // Initial index of merged subarray
  
  while (i < leftSubarray.length && j < rightSubarray.length) {
    // Compare elements from both subarrays
    const comparing = [left + i, mid + 1 + j];
    
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
      description: `Comparing ${leftSubarray[i]} at index ${left + i} with ${rightSubarray[j]} at index ${mid + 1 + j}`
    });
    
    stats.comparisons++;
    
    if (leftSubarray[i] <= rightSubarray[j]) {
      // Add step to show placing element from left subarray
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx)
            ? 'sorted'
            : idx === k
            ? 'swapping'
            : 'unsorted'
        })),
        comparing: [],
        swapping: [k],
        sorted: [...sortedIndices],
        description: `Placing ${leftSubarray[i]} at index ${k}`
      });
      
      arr[k] = leftSubarray[i];
      i++;
    } else {
      // Add step to show placing element from right subarray
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx)
            ? 'sorted'
            : idx === k
            ? 'swapping'
            : 'unsorted'
        })),
        comparing: [],
        swapping: [k],
        sorted: [...sortedIndices],
        description: `Placing ${rightSubarray[j]} at index ${k}`
      });
      
      arr[k] = rightSubarray[j];
      j++;
      
      // Each time we place an element from the right array, we're doing an implicit swap
      stats.swaps++;
    }
    
    k++;
  }
  
  // Copy the remaining elements of left subarray, if any
  while (i < leftSubarray.length) {
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx)
          ? 'sorted'
          : idx === k
          ? 'swapping'
          : 'unsorted'
      })),
      comparing: [],
      swapping: [k],
      sorted: [...sortedIndices],
      description: `Placing remaining left subarray element ${leftSubarray[i]} at index ${k}`
    });
    
    arr[k] = leftSubarray[i];
    i++;
    k++;
  }
  
  // Copy the remaining elements of right subarray, if any
  while (j < rightSubarray.length) {
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx)
          ? 'sorted'
          : idx === k
          ? 'swapping'
          : 'unsorted'
      })),
      comparing: [],
      swapping: [k],
      sorted: [...sortedIndices],
      description: `Placing remaining right subarray element ${rightSubarray[j]} at index ${k}`
    });
    
    arr[k] = rightSubarray[j];
    j++;
    k++;
    
    // Each time we place an element from the right array, we're doing an implicit swap
    stats.swaps++;
  }
  
  // Mark the merged subarray as sorted
  for (let i = left; i <= right; i++) {
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i);
    }
  }
  
  // Add step to show the merged subarray
  const mergedIndices = Array.from({ length: right - left + 1 }, (_, i) => left + i);
  
  steps.push({
    array: arr.map((value, idx) => ({
      value,
      status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
    })),
    comparing: [],
    swapping: [],
    sorted: [...sortedIndices],
    description: `Merged subarray from index ${left} to ${right}: [${arr.slice(left, right + 1).join(', ')}]`
  });
};