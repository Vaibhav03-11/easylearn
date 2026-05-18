"use client";

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

  const maxValue = Math.max(...(currentAnimationStep.array.length ? currentAnimationStep.array : [100]));

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
