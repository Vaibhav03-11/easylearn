import { SearchAnimationStep } from '@/types/searching.types';

export const generateLinearSearchSteps = (initialArray: number[], target: number): SearchAnimationStep[] => {
  const steps: SearchAnimationStep[] = [];
  const array = [...initialArray];

  const addStep = (comparing: number[] = [], found: number | null = null, logMessage?: string) => {
    steps.push({
      array: [...array],
      target,
      comparing,
      found,
      logMessage
    });
  };

  addStep([], null, `Starting Linear Search for target value: ${target}`);

  for (let i = 0; i < array.length; i++) {
    addStep([i], null, `Checking element at index ${i}. Is ${array[i]} == ${target}?`);
    
    if (array[i] === target) {
      addStep([i], i, `Target found! ${array[i]} == ${target} at index ${i}. Search complete.`);
      return steps;
    } else {
      addStep([i], null, `${array[i]} != ${target}. Moving to next element.`);
    }
  }

  addStep([], null, `Reached end of array. Target ${target} not found.`);
  return steps;
};
