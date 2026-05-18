import { AnimationStep } from '@/types/sorting.types';

export const generateMergeSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  // For merge sort, we show sorted state differently, basically full array is sorted at the end.
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

  const merge = (left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = left;

    addStep([], [], `Merging sub-arrays: [${left}..${mid}] and [${mid + 1}..${right}]`);

    while (i < n1 && j < n2) {
      addStep([left + i, mid + 1 + j], [], `Comparing ${L[i]} and ${R[j]}`);
      
      if (L[i] <= R[j]) {
        array[k] = L[i];
        addStep([], [k], `${L[i]} is smaller, placing it at index ${k}`);
        i++;
      } else {
        array[k] = R[j];
        addStep([], [k], `${R[j]} is smaller, placing it at index ${k}`);
        j++;
      }
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      addStep([], [k], `Copying remaining element ${L[i]} to index ${k}`);
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      addStep([], [k], `Copying remaining element ${R[j]} to index ${k}`);
      j++;
      k++;
    }
    
    // If this is the final merge, mark elements as sorted
    if (left === 0 && right === n - 1) {
      for(let x=left; x<=right; x++) sorted.push(x);
    }
    addStep([], [], `Merged sub-array [${left}..${right}]`);
  };

  const mergeSort = (left: number, right: number) => {
    if (left >= right) {
      return;
    }
    const mid = left + Math.floor((right - left) / 2);
    
    addStep([mid], [], `Dividing array from ${left} to ${right} at middle index ${mid}`);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  };

  addStep([], [], "Starting Merge Sort. Divide and Conquer strategy.");
  mergeSort(0, n - 1);
  addStep([], [], "Sorting finished. The array is fully sorted.");

  return steps;
};
