import React from 'react';
import { useAlgorithm } from '../context/AlgorithmContext';
import { getAlgorithmInfo } from '../utils/algorithmInfo';
import { Info, Clock, Box, Layers } from 'lucide-react';

const AlgorithmInfo: React.FC = () => {
  const { algorithm } = useAlgorithm();
  const info = getAlgorithmInfo(algorithm);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
        <div className="bg-white p-6 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Info className="text-indigo-600" size={20} />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Algorithm Details
            </h2>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {info.name}
        </h3>
        
        <p className="text-gray-700 leading-relaxed">{info.description}</p>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
              <Clock size={16} className="mr-2 text-blue-500" />
              Time Complexity
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">Best</div>
                <div className="font-mono font-medium text-blue-600">{info.timeComplexity.best}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">Average</div>
                <div className="font-mono font-medium text-indigo-600">{info.timeComplexity.average}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-gray-500 text-sm">Worst</div>
                <div className="font-mono font-medium text-purple-600">{info.timeComplexity.worst}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
              <Box size={16} className="mr-2 text-purple-500" />
              Space Complexity
            </h4>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-mono font-medium text-purple-600">{info.spaceComplexity}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-5 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center mb-3">
              <Layers size={16} className="mr-2 text-pink-500" />
              Properties
            </h4>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stable Sort</span>
                <span className={info.isStable ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                  {info.isStable ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Characteristics</h4>
          <ul className="space-y-2">
            {getAlgorithmCharacteristics(algorithm).map((char, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">{char}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const getAlgorithmCharacteristics = (algorithm: string): string[] => {
  switch (algorithm) {
    case 'bubble':
      return [
        'Simple to implement and understand',
        'Best for small datasets or nearly sorted data',
        'In-place sorting algorithm (requires no extra space)',
        'Can be optimized to stop early if no swaps occur'
      ];
    case 'selection':
      return [
        'Always performs the same number of comparisons',
        'Minimizes the number of swaps',
        'In-place sorting algorithm',
        'Performance is independent of input data arrangement'
      ];
    case 'insertion':
      return [
        'Efficient for small data sets',
        'Adaptive - works well with partially sorted arrays',
        'Low overhead and simple implementation',
        'Stable sort that maintains relative order of equal elements'
      ];
    case 'merge':
      return [
        'Divide and conquer algorithm',
        'Consistent O(n log n) performance',
        'Stable sort that preserves order of equal elements',
        'Requires additional space proportional to the array size'
      ];
    case 'quick':
      return [
        'Very fast for large datasets in practice',
        'In-place sorting with low memory usage',
        'Pivot selection strategy impacts performance',
        'Worst case can be avoided with good pivot selection'
      ];
    default:
      return [];
  }
};

export default AlgorithmInfo;