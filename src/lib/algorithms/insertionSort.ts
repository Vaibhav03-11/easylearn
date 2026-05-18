import { AnimationStep } from '@/types/sorting.types';

export const generateInsertionSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  const sorted: number[] = [0];

  const addStep = (comparing: number[] = [], swapping: number[] = [], logMessage?: string) => {
    steps.push({
      array: [...array],
      comparing,
      swapping,
      sorted: [...sorted],
      logMessage
    });
  };

  addStep([], [], "Starting Insertion Sort. The first element is considered sorted.");

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    addStep([i], [], `Selecting element ${key} at index ${i} to insert into the sorted portion.`);

    while (j >= 0 && array[j] > key) {
      addStep([j, j + 1], [], `Comparing ${array[j]} and ${key}. ${array[j]} is larger, so we shift it right.`);
      
      array[j + 1] = array[j];
      addStep([], [j, j + 1], `Shifted ${array[j + 1]} to index ${j + 1}.`);
      j = j - 1;
    }

    array[j + 1] = key;
    sorted.push(i);
    addStep([], [j + 1], `Inserted ${key} at index ${j + 1}. The sorted portion has grown.`);
  }

  addStep([], [], "Sorting finished. The array is fully sorted.");

  return steps;
};
