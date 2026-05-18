import { AnimationStep } from '@/types/sorting.types';

export const generateHeapSortSteps = (initialArray: number[]): AnimationStep[] => {
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

  const heapify = (size: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      addStep([largest, left], [], `Comparing root ${array[largest]} with left child ${array[left]}`);
      if (array[left] > array[largest]) {
        largest = left;
        addStep([], [], `Left child ${array[left]} is larger`);
      }
    }

    if (right < size) {
      addStep([largest, right], [], `Comparing largest ${array[largest]} with right child ${array[right]}`);
      if (array[right] > array[largest]) {
        largest = right;
        addStep([], [], `Right child ${array[right]} is larger`);
      }
    }

    if (largest !== i) {
      addStep([], [i, largest], `Swapping root ${array[i]} with largest child ${array[largest]}`);
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;
      addStep([], [i, largest], `Swapped. Continuing to heapify down...`);
      
      heapify(size, largest);
    }
  };

  addStep([], [], "Starting Heap Sort. First, we build a Max Heap.");

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    addStep([], [], `Heapifying from index ${i}`);
    heapify(n, i);
  }

  addStep([], [], "Max Heap is built. Now we repeatedly extract the maximum element.");

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    addStep([], [0, i], `Swapping root (maximum) ${array[0]} with the last unsorted element ${array[i]}`);
    
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    
    sorted.push(i);
    addStep([], [], `Element ${array[i]} is now sorted at index ${i}`);

    addStep([], [], `Heapifying the reduced heap of size ${i}`);
    heapify(i, 0);
  }

  sorted.push(0);
  addStep([], [], "Sorting finished. The array is fully sorted.");

  return steps;
};
