"use client";

import { useSearchingStore } from '@/store/searchingStore';
import { useState } from 'react';
import { SearchAlgorithmType } from '@/types/searching.types';
import { Play, RotateCcw, Target, Hash } from 'lucide-react';

interface Props {
  algorithm: SearchAlgorithmType;
}

export default function SearchInputPanel({ algorithm }: Props) {
  const { array, target, setArray, setTarget, generateRandomArray, isSearching } = useSearchingStore();
  const [inputValue, setInputValue] = useState(array.join(', '));
  const [targetValue, setTargetValue] = useState(target.toString());

  const handleApply = () => {
    const newArray = inputValue
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
      
    const newTarget = parseInt(targetValue.trim());

    if (newArray.length > 0 && !isNaN(newTarget)) {
      // If binary search, enforce sorting
      if (algorithm === 'binary-search') {
        newArray.sort((a, b) => a - b);
        setInputValue(newArray.join(', '));
      }
      setArray(newArray);
      setTarget(newTarget);
    }
  };

  const handleRandomize = () => {
    generateRandomArray(15, algorithm === 'binary-search');
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Hash className="w-3 h-3" /> Array Elements
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isSearching}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-gray-700 disabled:opacity-50"
          placeholder="e.g., 10, 25, 30, 45"
        />
        {algorithm === 'binary-search' && (
          <p className="text-[10px] text-amber-500 mt-1 font-medium">* Array will be automatically sorted for Binary Search</p>
        )}
      </div>

      <div className="w-full md:w-32">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Target className="w-3 h-3" /> Target
        </label>
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          disabled={isSearching}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono text-blue-600 font-bold disabled:opacity-50"
          placeholder="e.g., 42"
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button
          onClick={handleApply}
          disabled={isSearching}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> Apply
        </button>
        <button
          onClick={handleRandomize}
          disabled={isSearching}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm disabled:opacity-50"
          title="Randomize Array"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
