import { SortingStep } from '../types';

export const insertionSort = (array: number[]) => {
  const steps: SortingStep[] = [];
  const stats = { comparisons: 0, swaps: 0 };
  
  // Create a copy of the array to work with
  const arr = [...array];
  const n = arr.length;
  
  // Keep track of sorted elements
  const sortedIndices: number[] = [0]; // The first element is already "sorted"
  
  // Initialize the first step
  steps.push({
    array: arr.map((value, idx) => ({
      value,
      status: idx === 0 ? 'sorted' : 'unsorted'
    })),
    comparing: [],
    swapping: [],
    sorted: [0],
    description: 'Starting Insertion Sort algorithm. First element is considered sorted.'
  });
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Step to show the current element we're trying to insert
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
      description: `Inserting element ${key} at position ${i} into the sorted portion`
    });
    
    // Comparing and shifting elements
    while (j >= 0 && arr[j] > key) {
      const comparing = [j, j + 1];
      
      // Step to show comparison
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx) && idx !== j && idx !== j + 1
            ? 'sorted'
            : comparing.includes(idx)
            ? 'comparing'
            : 'unsorted'
        })),
        comparing,
        swapping: [],
        sorted: sortedIndices.filter(idx => idx !== j && idx !== j + 1),
        description: `Comparing ${arr[j]} with ${key}`
      });
      
      stats.comparisons++;
      
      // Step to show shifting
      steps.push({
        array: arr.map((value, idx) => ({
          value,
          status: sortedIndices.includes(idx) && idx !== j && idx !== j + 1
            ? 'sorted'
            : idx === j || idx === j + 1
            ? 'swapping'
            : 'unsorted'
        })),
        comparing: [],
        swapping: [j, j + 1],
        sorted: sortedIndices.filter(idx => idx !== j && idx !== j + 1),
        description: `Shifting ${arr[j]} one position to the right`
      });
      
      // Perform the shift
      arr[j + 1] = arr[j];
      stats.swaps++;
      j--;
    }
    
    // Place the key in its correct position
    arr[j + 1] = key;
    
    // Add the current position to sorted indices
    sortedIndices.push(i);
    
    // Sort the sortedIndices array
    sortedIndices.sort((a, b) => a - b);
    
    // Step to show the result after insertion
    steps.push({
      array: arr.map((value, idx) => ({
        value,
        status: sortedIndices.includes(idx) ? 'sorted' : 'unsorted'
      })),
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      description: `Inserted ${key} into correct position. First ${i + 1} elements are now sorted.`
    });
  }
  
  // Final step showing the sorted array
  steps.push({
    array: arr.map(value => ({ value, status: 'sorted' })),
    comparing: [],
    swapping: [],
    sorted: [...Array(n).keys()],
    description: 'Array is now fully sorted'
  });
  
  return { steps, stats };
};