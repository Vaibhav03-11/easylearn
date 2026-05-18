import { SearchAnimationStep } from '@/types/searching.types';

export const generateBinarySearchSteps = (initialArray: number[], target: number): SearchAnimationStep[] => {
  const steps: SearchAnimationStep[] = [];
  // Binary search requires a sorted array
  const array = [...initialArray].sort((a, b) => a - b);
  const n = array.length;

  const addStep = (comparing: number[] = [], found: number | null = null, low?: number, high?: number, mid?: number, logMessage?: string) => {
    steps.push({
      array: [...array],
      target,
      comparing,
      found,
      low,
      high,
      mid,
      logMessage
    });
  };

  let low = 0;
  let high = n - 1;

  addStep([], null, 0, n - 1, undefined, `Starting Binary Search for target: ${target}. Array must be sorted. Initial search space: indices ${low} to ${high}.`);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    addStep([], null, low, high, mid, `Calculating middle index: (${low} + ${high}) / 2 = ${mid}. Middle element is ${array[mid]}.`);
    
    addStep([mid], null, low, high, mid, `Comparing middle element ${array[mid]} with target ${target}.`);

    if (array[mid] === target) {
      addStep([mid], mid, low, high, mid, `Target found! ${array[mid]} == ${target} at index ${mid}. Search complete.`);
      return steps;
    }

    if (array[mid] < target) {
      addStep([mid], null, low, high, mid, `${array[mid]} < ${target}. Target must be in the right half. Moving 'low' to ${mid + 1}.`);
      low = mid + 1;
    } else {
      addStep([mid], null, low, high, mid, `${array[mid]} > ${target}. Target must be in the left half. Moving 'high' to ${mid - 1}.`);
      high = mid - 1;
    }
    
    if (low <= high) {
        addStep([], null, low, high, undefined, `New search space is from index ${low} to ${high}.`);
    }
  }

  addStep([], null, low, high, undefined, `'low' (${low}) is now greater than 'high' (${high}). Target ${target} not found in array.`);
  return steps;
};
