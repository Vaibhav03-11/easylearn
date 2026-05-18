import { useCallback, useEffect, useRef } from 'react';
import { useSearchingStore } from '@/store/searchingStore';
import { generateLinearSearchSteps } from '@/lib/algorithms/linearSearch';
import { generateBinarySearchSteps } from '@/lib/algorithms/binarySearch';
import { SearchAlgorithmType } from '@/types/searching.types';

export const useSearching = (algorithm: SearchAlgorithmType = "linear-search") => {
  const {
    array,
    target,
    speed,
    isSearching,
    isPaused,
    currentStep,
    animationSteps,
    setIsSearching,
    setIsPaused,
    setCurrentStep,
    setAnimationSteps,
    setArray,
    setTarget,
    generateRandomArray
  } = useSearchingStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateSteps = useCallback(() => {
    let steps = [];
    switch (algorithm) {
      case "binary-search":
        steps = generateBinarySearchSteps(array, target);
        break;
      case "linear-search":
      default:
        steps = generateLinearSearchSteps(array, target);
        break;
    }
    setAnimationSteps(steps);
    setCurrentStep(0);
  }, [algorithm, array, target, setAnimationSteps, setCurrentStep]);

  useEffect(() => {
    calculateSteps();
  }, [calculateSteps]);

  useEffect(() => {
    if (isSearching && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < animationSteps.length - 1) {
            return prev + 1;
          }
          setIsSearching(false);
          return prev;
        });
      }, speed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSearching, isPaused, speed, animationSteps.length, setCurrentStep, setIsSearching]);

  const startSearching = () => {
    if (currentStep === animationSteps.length - 1) {
      setCurrentStep(0);
    }
    setIsSearching(true);
    setIsPaused(false);
  };

  const pauseSearching = () => {
    setIsPaused(true);
  };

  const resetSearching = () => {
    setIsSearching(false);
    setIsPaused(false);
    setCurrentStep(0);
  };

  const stepForward = () => {
    if (currentStep < animationSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return {
    array,
    target,
    isSearching,
    isPaused,
    currentStep,
    currentAnimationStep: animationSteps[currentStep] || { array, target, comparing: [], found: null },
    startSearching,
    pauseSearching,
    resetSearching,
    stepForward,
    stepBackward,
    setArray,
    setTarget,
    generateRandomArray
  };
};
