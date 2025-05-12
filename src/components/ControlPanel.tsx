import React, { useState } from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Sliders } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const {
    algorithm,
    setAlgorithm,
    isSorting,
    setIsSorting,
    sortArray,
    resetArray,
    generateNewArray,
    arraySize,
    setArraySize,
    animationSpeed,
    setAnimationSpeed,
    stepForward,
    stepBackward,
    sortingSteps,
    currentStep
  } = useAlgorithm();
  
  const [manualInput, setManualInput] = useState<string>('');
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value as any);
    resetArray();
  };

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    setArraySize(size);
    generateNewArray(size);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(parseInt(e.target.value));
  };

  const handleManualInputSubmit = () => {
    try {
      // Parse and validate the input
      const numbers = manualInput
        .split(',')
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => {
          const parsed = parseInt(n);
          if (isNaN(parsed)) {
            throw new Error(`Invalid number: ${n}`);
          }
          return parsed;
        });

      if (numbers.length < 2) {
        alert('Please enter at least 2 numbers');
        return;
      }

      // Set the new array and close the modal
      setArraySize(numbers.length);
      generateNewArray(numbers.length);
      setIsInputModalOpen(false);
      setManualInput('');
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  const isStepControlEnabled = sortingSteps.length > 0;
  const isLastStep = currentStep === sortingSteps.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Algorithm</label>
          <select
            value={algorithm}
            onChange={handleAlgorithmChange}
            disabled={isSorting}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white px-3 py-2 border text-gray-900"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Array Size</label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={handleArraySizeChange}
            disabled={isSorting}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          <div className="text-xs text-gray-500 mt-1 text-center">{arraySize} elements</div>
        </div>

        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Animation Speed</label>
          <input
            type="range"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-gray-500 mt-1 text-center">
            {animationSpeed < 33 ? 'Slow' : animationSpeed < 66 ? 'Medium' : 'Fast'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => isSorting ? setIsSorting(false) : sortArray()}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium shadow-sm ${
            isSorting
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isLastStep}
        >
          {isSorting ? (
            <>
              <Pause size={16} className="mr-1" /> Pause
            </>
          ) : (
            <>
              <Play size={16} className="mr-1" /> Start Sorting
            </>
          )}
        </button>

        <button
          onClick={resetArray}
          className="flex items-center px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium shadow-sm"
          disabled={isSorting && !isLastStep}
        >
          <RefreshCw size={16} className="mr-1" /> Reset
        </button>

        <button
          onClick={() => generateNewArray()}
          className="flex items-center px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium shadow-sm"
          disabled={isSorting && !isLastStep}
        >
          <Sliders size={16} className="mr-1" /> Random Array
        </button>

        <button
          onClick={() => setIsInputModalOpen(true)}
          className="flex items-center px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium shadow-sm"
          disabled={isSorting && !isLastStep}
        >
          Manual Input
        </button>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={stepBackward}
          disabled={!isStepControlEnabled || currentStep === 0 || isSorting}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step backward"
        >
          <SkipBack size={18} />
        </button>
        
        <button
          onClick={stepForward}
          disabled={!isStepControlEnabled || isLastStep || isSorting}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step forward"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Manual Input Modal */}
      {isInputModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Enter Numbers</h3>
            <p className="text-sm text-gray-600 mb-4">Enter comma-separated numbers (e.g., 5, 3, 8, 1, 9)</p>
            
            <textarea
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="w-full border rounded-md p-2 mb-4 h-24"
              placeholder="5, 3, 8, 1, 9"
            ></textarea>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsInputModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleManualInputSubmit}
                className="px-4 py-2 rounded-md bg-blue-500 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;