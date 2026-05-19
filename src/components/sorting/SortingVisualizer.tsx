"use client";

import { useState, useEffect } from 'react';
import { useSorting } from '@/hooks/useSorting';
import BarChart from './BarChart';
import Controls from './Controls';
import InputPanel from './InputPanel';
import { SortingAlgorithmType } from '@/types/sorting.types';

interface Props {
  algorithm: SortingAlgorithmType;
}

import SortingLog from './SortingLog';

export default function SortingVisualizer({ algorithm }: Props) {
  const { 
    startSorting, 
    pauseSorting, 
    resetSorting, 
    stepForward, 
    stepBackward, 
    currentAnimationStep 
  } = useSorting(algorithm);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const maxValue = Math.max(...(currentAnimationStep.array.length ? currentAnimationStep.array : [100]));

  if (!isMounted) {
    return <div className="h-[400px] w-full flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse text-gray-400 font-medium">Loading sorting visualizer...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <InputPanel />
      <div className="w-full mt-4">
        <BarChart step={currentAnimationStep} maxValue={maxValue} />
      </div>
      <Controls
        onPlay={startSorting}
        onPause={pauseSorting}
        onReset={resetSorting}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
      />
      <SortingLog />
    </div>
  );
}
