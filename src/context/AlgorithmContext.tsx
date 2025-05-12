import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SortingAlgorithm, ArrayElement, SortingStep } from '../types';
import { generateRandomArray } from '../utils/arrayUtils';
import { getAlgorithmInfo } from '../utils/algorithmInfo';
import { 
  bubbleSort, 
  selectionSort, 
  insertionSort, 
  mergeSort, 
  quickSort 
} from '../algorithms';

interface AlgorithmContextType {
  array: ArrayElement[];
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>;
  algorithm: SortingAlgorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<SortingAlgorithm>>;
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  isSorting: boolean;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  sortingSteps: SortingStep[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  sortArray: () => void;
  resetArray: () => void;
  generateNewArray: (size?: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  arraySize: number;
  setArraySize: React.Dispatch<React.SetStateAction<number>>;
  sortingStats: {
    comparisons: number;
    swaps: number;
  };
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(undefined);

export const AlgorithmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [array, setArray] = useState<ArrayElement[]>(() => 
    generateRandomArray(20).map(value => ({ value, status: 'unsorted' }))
  );
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [arraySize, setArraySize] = useState<number>(20);
  const [sortingStats, setSortingStats] = useState({ comparisons: 0, swaps: 0 });

  const resetArray = () => {
    setCurrentStep(0);
    setSortingSteps([]);
    setIsSorting(false);
    
    // Keep the same array but reset all statuses
    setArray(array.map(el => ({ ...el, status: 'unsorted' })));
    setSortingStats({ comparisons: 0, swaps: 0 });
  };

  const generateNewArray = (size: number = arraySize) => {
    setCurrentStep(0);
    setSortingSteps([]);
    setIsSorting(false);
    setArraySize(size);
    
    const newArray = generateRandomArray(size).map(value => ({
      value,
      status: 'unsorted'
    }));
    
    setArray(newArray);
    setSortingStats({ comparisons: 0, swaps: 0 });
  };

  const sortArray = () => {
    if (isSorting && sortingSteps.length > 0) {
      // If already sorting and we have steps, just continue
      setIsSorting(true);
      return;
    }

    // Extract just the values from the array
    const values = array.map(item => item.value);
    let steps: SortingStep[] = [];
    let stats = { comparisons: 0, swaps: 0 };

    // Apply the selected algorithm
    switch (algorithm) {
      case 'bubble':
        ({ steps, stats } = bubbleSort(values));
        break;
      case 'selection':
        ({ steps, stats } = selectionSort(values));
        break;
      case 'insertion':
        ({ steps, stats } = insertionSort(values));
        break;
      case 'merge':
        ({ steps, stats } = mergeSort(values));
        break;
      case 'quick':
        ({ steps, stats } = quickSort(values));
        break;
      default:
        ({ steps, stats } = bubbleSort(values));
    }

    setSortingSteps(steps);
    setSortingStats(stats);
    setCurrentStep(0);
    setIsSorting(true);
  };

  const stepForward = () => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === sortingSteps.length - 1) {
      // This is the last step, mark sorting as complete
      setIsSorting(false);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AlgorithmContext.Provider
      value={{
        array,
        setArray,
        algorithm,
        setAlgorithm,
        animationSpeed,
        setAnimationSpeed,
        isSorting,
        setIsSorting,
        sortingSteps,
        currentStep,
        setCurrentStep,
        sortArray,
        resetArray,
        generateNewArray,
        stepForward,
        stepBackward,
        arraySize,
        setArraySize,
        sortingStats
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (context === undefined) {
    throw new Error('useAlgorithm must be used within an AlgorithmProvider');
  }
  return context;
};