import { AnimationStep } from '@/types/sorting.types';

export const generateBubbleSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  const sorted: number[] = [];

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    logMessage: "Starting Bubble Sort"
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        logMessage: `Comparing elements: ${array[j]} and ${array[j + 1]}`
      });

      if (array[j] > array[j + 1]) {
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          logMessage: `${array[j]} is greater than ${array[j + 1]}, so we swap them`
        });

        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          logMessage: `Swapped: Now it is ${array[j]} and ${array[j + 1]}`
        });
        
        swapped = true;
      } else {
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: [],
          sorted: [...sorted],
          logMessage: `${array[j]} is not greater than ${array[j + 1]}, no swap needed`
        });
      }
    }
    sorted.push(n - i - 1);
    
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      logMessage: `Pass complete. ${array[n - i - 1]} is now in its correct sorted position.`
    });

    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) {
        sorted.push(k);
      }
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        logMessage: "No swaps occurred in this pass. The array is completely sorted!"
      });
      break;
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    logMessage: "Sorting finished."
  });

  return steps;
};
