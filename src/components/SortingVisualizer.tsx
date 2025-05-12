import React, { useEffect, useRef } from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import ControlPanel from './ControlPanel';
import { Activity, BarChart4 } from 'lucide-react';

const SortingVisualizer: React.FC = () => {
  const {
    array,
    isSorting,
    sortingSteps,
    currentStep,
    stepForward,
    animationSpeed,
    sortingStats
  } = useAlgorithm();
  
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (sortingSteps.length > 0 && currentStep < sortingSteps.length) {
      const currentStepData = sortingSteps[currentStep];
    }
  }, [currentStep, sortingSteps]);

  useEffect(() => {
    if (isSorting && sortingSteps.length > 0) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      
      const timeoutId = setTimeout(() => {
        animationRef.current = requestAnimationFrame(() => {
          stepForward();
        });
      }, 1000 - animationSpeed * 9);
      
      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isSorting, currentStep, sortingSteps, animationSpeed, stepForward]);

  const maxValue = Math.max(...array.map(item => item.value));
  const currentArray = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].array
    : array;

  const getBarColor = (idx: number) => {
    if (sortingSteps.length > 0 && currentStep < sortingSteps.length) {
      const { comparing, swapping, sorted } = sortingSteps[currentStep];
      if (comparing.includes(idx)) return 'bg-gradient-to-t from-yellow-400 to-yellow-300';
      if (swapping.includes(idx)) return 'bg-gradient-to-t from-red-500 to-red-400';
      if (sorted.includes(idx)) return 'bg-gradient-to-t from-emerald-500 to-emerald-400';
    }
    return 'bg-gradient-to-t from-blue-500 to-blue-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1">
        <div className="bg-white p-6 rounded-t-lg">
          <ControlPanel />
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart4 className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Visualization
            </h2>
          </div>
          {sortingSteps.length > 0 && (
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              Step: {currentStep + 1} / {sortingSteps.length}
            </div>
          )}
        </div>
        
        <div className="bar-container relative h-80 md:h-96 flex items-end justify-center rounded-xl p-6 bg-gray-50">
          {currentArray.map((element, idx) => {
            const heightPercentage = (element.value / maxValue) * 100;
            
            return (
              <div
                key={idx}
                className={`array-bar mx-1 ${getBarColor(idx)}`}
                style={{
                  height: `${Math.max(5, heightPercentage)}%`,
                  width: `${Math.max(6, 90 / currentArray.length)}px`
                }}
              >
                {currentArray.length <= 20 && (
                  <div className="text-xs text-center text-white font-bold py-1">
                    {element.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-gray-700">{sortingSteps[currentStep].description}</p>
          </div>
        )}
        
        <div className="flex justify-between">
          <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
            <Activity size={18} className="text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              Comparisons: {sortingStats.comparisons > 0 ? sortingStats.comparisons : '-'}
            </span>
          </div>
          <div className="flex items-center px-4 py-2 bg-purple-50 rounded-lg">
            <Activity size={18} className="text-purple-600 mr-2" />
            <span className="text-purple-700 font-medium">
              Swaps: {sortingStats.swaps > 0 ? sortingStats.swaps : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;