import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import { AlgorithmProvider } from './context/AlgorithmContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 drop-shadow-lg">Sorting Algorithm Visualizer</h1>
            <p className="text-gray-600 italic mt-1">Visualize and learn how sorting algorithms work</p>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <AlgorithmProvider>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SortingVisualizer />
            </div>
            <div className="lg:col-span-1">
              <AlgorithmInfo />
            </div>
          </div>
        </AlgorithmProvider>
      </main>

      <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white text-center py-4 font-semibold tracking-wide shadow-inner rounded-t-xl mt-8 animate-fade-in">
        Made with <span className="text-red-400">❤️</span> by Satish
      </footer>
    </div>
  );
}

export default App;