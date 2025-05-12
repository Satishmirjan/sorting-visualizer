import { SortingStep } from '../types';

export const quickSort = (array: number[]) => {
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
    description: 'Starting Quick Sort algorithm'
  });
  
  // Keep track of sorted elements
  const sortedIndices: number[] = [];
  
  // Call the recursive quick sort function
  quickSortRecursive(arr, 0, arr.length - 1, steps, stats, sortedIndices);
  
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

const quickSortRecursive = (
  arr: number[],
  low: number,
  high: number,
  steps: SortingStep[],
  stats: { comparisons: number; swaps: number },
  sortedIndices: number[]
) => {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high, steps, stats, sortedIndices);
    
    // The pivot is now in its final sorted position
    if (!sortedIndices.includes(pivotIndex)) {
      sortedIndices.push(pivotIndex);
      sortedIndices.sort((a, b) => a - b);
    }
    
    // Add step to show the pivot in its sorted position
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
      })),
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Pivot ${arr[pivotIndex]} is now in its correct position at index ${pivotIndex}`
    });
    
    // Recursively sort the elements before and after the pivot
    quickSortRecursive(arr, low, pivotIndex - 1, steps, stats, sortedIndices);
    quickSortRecursive(arr, pivotIndex + 1, high, steps, stats, sortedIndices);
  } else if (low === high) {
    // A single element is already sorted
    if (!sortedIndices.includes(low)) {
      sortedIndices.push(low);
      sortedIndices.sort((a, b) => a - b);
      
      // Add step to show a single element as sorted
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
        })),
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices],
        description: `Single element at index ${low} is already sorted`
      });
    }
  }
};

const partition = (
  arr: number[],
  low: number,
  high: number,
  steps: SortingStep[],
  stats: { comparisons: number; swaps: number },
  sortedIndices: number[]
) => {
  // Choose the rightmost element as the pivot
  const pivot = arr[high];
  
  // Add step to show the subarray and selected pivot
  const subArrayIndices = Array.from({ length: high - low + 1 }, (_, i) => low + i);
  
  steps.push({
    array: arr.map((value, idx) => ({
      value,
      status: sortedIndices.includes(idx)
        ? 'sorted'
        : idx === high
        ? 'comparing'
        : subArrayIndices.includes(idx)
        ? 'unsorted'
        : 'unsorted'
    })),
    comparing: [high],
    swapping: [],
    sorted: [...sortedIndices],
    description: `Partitioning subarray from index ${low} to ${high}. Pivot: ${pivot}`
  });
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // Compare element with pivot
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx)
          ? 'sorted'
          : idx === j || idx === high
          ? 'comparing'
          : 'unsorted'
      })),
      comparing: [j, high],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Comparing element ${arr[j]} at index ${j} with pivot ${pivot}`
    });
    
    stats.comparisons++;
    
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      
      // Swap elements if necessary
      if (i !== j) {
        steps.push({
          array: arr.map((value, idx) => ({
            value,
            status: sortedIndices.includes(idx)
              ? 'sorted'
              : idx === i || idx === j
              ? 'swapping'
              : 'unsorted'
          })),
          comparing: [],
          swapping: [i, j],
          sorted: [...sortedIndices],
          description: `Swapping ${arr[i]} at index ${i} with ${arr[j]} at index ${j}`
        });
        
        // Perform the swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        stats.swaps++;
      } else {
        steps.push({
          array: arr.map((value, idx) => ({
            value,
            status: sortedIndices.includes(idx)
              ? 'sorted'
              : idx === i
              ? 'comparing'
              : 'unsorted'
          })),
          comparing: [i],
          swapping: [],
          sorted: [...sortedIndices],
          description: `Element ${arr[i]} at index ${i} is already in the correct side of the pivot`
        });
      }
    }
  }
  
  // Swap the pivot element with the element at (i + 1)
  const pivotFinalPosition = i + 1;
  
  steps.push({
    array: arr.map((value, idx) => ({
      value,
      status: sortedIndices.includes(idx)
        ? 'sorted'
        : idx === pivotFinalPosition || idx === high
        ? 'swapping'
        : 'unsorted'
    })),
    comparing: [],
    swapping: [pivotFinalPosition, high],
    sorted: [...sortedIndices],
    description: `Placing pivot ${pivot} in its correct position by swapping with element at index ${pivotFinalPosition}`
  });
  
  // Perform the swap
  [arr[pivotFinalPosition], arr[high]] = [arr[high], arr[pivotFinalPosition]];
  stats.swaps++;
  
  return pivotFinalPosition;
};