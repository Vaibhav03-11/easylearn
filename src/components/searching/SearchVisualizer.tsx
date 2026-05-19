"use client";

import { useState, useEffect } from 'react';
import { useSearching } from '@/hooks/useSearching';
import SearchArrayView from './SearchArrayView';
import SearchControls from './SearchControls';
import SearchInputPanel from './SearchInputPanel';
import { SearchAlgorithmType } from '@/types/searching.types';

interface Props {
  algorithm: SearchAlgorithmType;
}

export default function SearchVisualizer({ algorithm }: Props) {
  const { 
    startSearching, 
    pauseSearching, 
    resetSearching, 
    stepForward, 
    stepBackward, 
    currentAnimationStep 
  } = useSearching(algorithm);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[200px] w-full flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse text-gray-400 font-medium">Loading search visualizer...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <SearchInputPanel algorithm={algorithm} />
      <div className="w-full mt-4">
        <SearchArrayView step={currentAnimationStep} algorithm={algorithm} />
      </div>
      <SearchControls
        onPlay={startSearching}
        onPause={pauseSearching}
        onReset={resetSearching}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
      />
    </div>
  );
}
