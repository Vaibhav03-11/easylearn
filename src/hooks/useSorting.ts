import { useCallback, useEffect, useRef } from 'react';
import { useSortingStore } from '@/store/sortingStore';
import { generateBubbleSortSteps } from '@/lib/algorithms/bubbleSort';
import { generateQuickSortSteps } from '@/lib/algorithms/quickSort';
import { generateSelectionSortSteps } from '@/lib/algorithms/selectionSort';
import { generateInsertionSortSteps } from '@/lib/algorithms/insertionSort';
import { generateMergeSortSteps } from '@/lib/algorithms/mergeSort';
import { generateHeapSortSteps } from '@/lib/algorithms/heapSort';
import { generateRadixSortSteps } from '@/lib/algorithms/radixSort';
import { SortingAlgorithmType } from '@/types/sorting.types';

export const useSorting = (algorithm: SortingAlgorithmType = "bubble-sort") => {
  const {
    array,
    speed,
    isSorting,
    isPaused,
    currentStep,
    animationSteps,
    setIsSorting,
    setIsPaused,
    setCurrentStep,
    setAnimationSteps,
    setArray
  } = useSortingStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateSteps = useCallback(() => {
    let steps = [];
    switch (algorithm) {
      case "quick-sort":
        steps = generateQuickSortSteps(array);
        break;
      case "selection-sort":
        steps = generateSelectionSortSteps(array);
        break;
      case "insertion-sort":
        steps = generateInsertionSortSteps(array);
        break;
      case "merge-sort":
        steps = generateMergeSortSteps(array);
        break;
      case "heap-sort":
        steps = generateHeapSortSteps(array);
        break;
      case "radix-sort":
        steps = generateRadixSortSteps(array);
        break;
      case "bubble-sort":
      default:
        steps = generateBubbleSortSteps(array);
        break;
    }
    setAnimationSteps(steps);
    setCurrentStep(0);
  }, [algorithm, array, setAnimationSteps, setCurrentStep]);

  useEffect(() => {
    if (animationSteps.length === 0 && !isSorting) {
      calculateSteps();
    }
  }, [array, algorithm, calculateSteps, animationSteps.length, isSorting]);

  const startSorting = useCallback(() => {
    if (animationSteps.length === 0) calculateSteps();
    setIsSorting(true);
    setIsPaused(false);
  }, [animationSteps.length, calculateSteps, setIsSorting, setIsPaused]);

  const pauseSorting = useCallback(() => {
    setIsPaused(true);
  }, [setIsPaused]);

  const resetSorting = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setArray([...animationSteps[0]?.array || array]);
  }, [setIsSorting, setIsPaused, setCurrentStep, setArray, animationSteps, array]);

  const stepForward = useCallback(() => {
    if (currentStep < animationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, animationSteps.length, setCurrentStep]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  useEffect(() => {
    if (isSorting && !isPaused && currentStep < animationSteps.length - 1) {
      const delay = 1000 - speed * 9; // Map 1-100 to roughly 1000ms - 100ms
      intervalRef.current = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, delay);
    } else if (currentStep >= animationSteps.length - 1 && isSorting) {
      setIsSorting(false);
      setIsPaused(false);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isSorting, isPaused, currentStep, animationSteps.length, speed, setCurrentStep, setIsSorting, setIsPaused]);

  return {
    startSorting,
    pauseSorting,
    resetSorting,
    stepForward,
    stepBackward,
    currentAnimationStep: animationSteps[currentStep] || { array, comparing: [], swapping: [], sorted: [] }
  };
};
