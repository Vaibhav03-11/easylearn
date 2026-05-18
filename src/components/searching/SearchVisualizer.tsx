"use client";

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
