// Algorithm types
export type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

// Element status for visualization
export type ElementStatus = 'unsorted' | 'comparing' | 'swapping' | 'sorted';

// Array element with its current status
export interface ArrayElement {
  value: number;
  status: ElementStatus;
}

// Step in the sorting animation
export interface SortingStep {
  array: ArrayElement[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  description: string;
}

// Algorithm information
export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  isStable: boolean;
}