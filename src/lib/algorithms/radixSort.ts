import { AnimationStep } from '@/types/sorting.types';

export const generateRadixSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  let sorted: number[] = [];

  const addStep = (comparing: number[] = [], swapping: number[] = [], logMessage?: string) => {
    steps.push({
      array: [...array],
      comparing,
      swapping,
      sorted: [...sorted],
      logMessage
    });
  };

  const getMax = (): number => {
    let mx = array[0];
    for (let i = 1; i < n; i++) {
      if (array[i] > mx) {
        mx = array[i];
      }
    }
    return mx;
  };

  const countingSort = (exp: number) => {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    addStep([], [], `Counting occurrences of digits at place value ${exp}`);

    for (let i = 0; i < n; i++) {
      const index = Math.floor(array[i] / exp) % 10;
      count[index]++;
      addStep([i], [], `Element ${array[i]} has digit ${index} at place value ${exp}`);
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(array[i] / exp) % 10;
      output[count[index] - 1] = array[i];
      count[index]--;
    }

    for (let i = 0; i < n; i++) {
      array[i] = output[i];
      addStep([], [i], `Placing ${array[i]} into array based on digit at place value ${exp}`);
    }
    
    addStep([], [], `Array after sorting by place value ${exp}`);
  };

  addStep([], [], "Starting Radix Sort. Finding the maximum number to know the number of digits.");
  
  const m = getMax();
  addStep([], [], `Maximum number is ${m}. We will process each digit.`);

  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
    countingSort(exp);
  }

  for(let i=0; i<n; i++) sorted.push(i);
  addStep([], [], "Sorting finished. The array is fully sorted.");

  return steps;
};
