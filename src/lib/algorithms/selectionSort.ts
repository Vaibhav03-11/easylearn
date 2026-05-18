import { AnimationStep } from '@/types/sorting.types';

export const generateSelectionSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  const sorted: number[] = [];

  const addStep = (comparing: number[] = [], swapping: number[] = [], logMessage?: string) => {
    steps.push({
      array: [...array],
      comparing,
      swapping,
      sorted: [...sorted],
      logMessage
    });
  };

  addStep([], [], "Starting Selection Sort");

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    addStep([i], [], `Finding the minimum element in the unsorted portion, starting with index ${i} (${array[i]})`);

    for (let j = i + 1; j < n; j++) {
      addStep([minIdx, j], [], `Comparing current minimum (${array[minIdx]}) with element at index ${j} (${array[j]})`);
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
        addStep([minIdx], [], `Found new minimum: ${array[minIdx]} at index ${minIdx}`);
      }
    }

    if (minIdx !== i) {
      addStep([], [i, minIdx], `Minimum found is ${array[minIdx]}, swapping it with the first unsorted element ${array[i]}`);
      
      const temp = array[minIdx];
      array[minIdx] = array[i];
      array[i] = temp;
      
      addStep([], [i, minIdx], `Swapped. Now element ${array[i]} is at its correct sorted position.`);
    } else {
      addStep([], [], `Element ${array[i]} is already the minimum, no swap needed.`);
    }
    
    sorted.push(i);
    addStep([], [], `Element ${array[i]} is now sorted.`);
  }

  // The last element is inherently sorted
  sorted.push(n - 1);
  addStep([], [], "Sorting finished. The array is fully sorted.");

  return steps;
};
