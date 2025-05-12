import { AlgorithmInfo, SortingAlgorithm } from '../types';

export const getAlgorithmInfo = (algorithm: SortingAlgorithm): AlgorithmInfo => {
  switch (algorithm) {
    case 'bubble':
      return {
        name: 'Bubble Sort',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until no more swaps are needed.',
        isStable: true
      };
    case 'selection':
      return {
        name: 'Selection Sort',
        timeComplexity: {
          best: 'O(n²)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'Selection Sort divides the array into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the beginning of the unsorted region.',
        isStable: false
      };
    case 'insertion':
      return {
        name: 'Insertion Sort',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        description: 'Insertion Sort builds the final sorted array one item at a time. It works by taking each element from the unsorted part and inserting it into its correct position in the sorted part.',
        isStable: true
      };
    case 'merge':
      return {
        name: 'Merge Sort',
        timeComplexity: {
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        description: 'Merge Sort is a divide and conquer algorithm that divides the array into two halves, sorts each half, and then merges the sorted halves. It guarantees O(n log n) time complexity.',
        isStable: true
      };
    case 'quick':
      return {
        name: 'Quick Sort',
        timeComplexity: {
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        description: 'Quick Sort selects a "pivot" element and partitions the array around it, with elements less than the pivot to one side and elements greater than the pivot to the other. It then recursively sorts the sub-arrays.',
        isStable: false
      };
    default:
      return {
        name: 'Unknown Algorithm',
        timeComplexity: {
          best: '-',
          average: '-',
          worst: '-'
        },
        spaceComplexity: '-',
        description: 'Information not available',
        isStable: false
      };
  }
};