"use client";

import { useSortingStore } from '@/store/sortingStore';
import { useSorting } from '@/hooks/useSorting';
import BarChart from './BarChart';
import Controls from './Controls';
import InputPanel from './InputPanel';

export default function ComparisonView() {
  const { 
    startSorting: start1, 
    pauseSorting: pause1, 
    resetSorting: reset1, 
    currentAnimationStep: step1 
  } = useSorting('bubble-sort');

  const { 
    startSorting: start2, 
    pauseSorting: pause2, 
    resetSorting: reset2, 
    currentAnimationStep: step2 
  } = useSorting('quick-sort');

  const { isSorting, isPaused, setIsSorting, setIsPaused } = useSortingStore();

  const handlePlay = () => {
    start1();
    start2();
    setIsSorting(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    pause1();
    pause2();
    setIsPaused(true);
  };

  const handleReset = () => {
    reset1();
    reset2();
    setIsSorting(false);
    setIsPaused(false);
  };

  const maxValue1 = Math.max(...(step1.array.length ? step1.array : [100]));
  const maxValue2 = Math.max(...(step2.array.length ? step2.array : [100]));

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <InputPanel />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-[#1E293B] mb-4">Bubble Sort</h3>
          <BarChart step={step1} maxValue={maxValue1} />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-[#1E293B] mb-4">Quick Sort</h3>
          <BarChart step={step2} maxValue={maxValue2} />
        </div>
      </div>

      <Controls
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onStepForward={() => {}}
        onStepBackward={() => {}}
      />
    </div>
  );
}
