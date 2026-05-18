import { AnimationStep } from '@/types/sorting.types';

export const generateQuickSortSteps = (initialArray: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const array = [...initialArray];
  const sorted: number[] = [];

  const addStep = (comparing: number[] = [], swapping: number[] = [], pivot?: number, logMessage?: string) => {
    steps.push({
      array: [...array],
      comparing,
      swapping,
      sorted: [...sorted],
      pivot,
      logMessage
    });
  };

  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    addStep([], [], high, `Selected pivot: ${pivot} at index ${high}`);

    for (let j = low; j < high; j++) {
      addStep([j, high], [], high, `Comparing element ${array[j]} with pivot ${pivot}`);
      
      if (array[j] < pivot) {
        i++;
        addStep([], [i, j], high, `${array[j]} < ${pivot}, preparing to swap with element at index ${i} (${array[i]})`);
        
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        
        addStep([], [i, j], high, `Swapped: Now element at index ${i} is ${array[i]}`);
      } else {
        addStep([], [], high, `${array[j]} >= ${pivot}, no swap needed`);
      }
    }

    addStep([], [i + 1, high], high, `Moving pivot ${pivot} to its correct sorted position at index ${i + 1}`);
    
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    
    sorted.push(i + 1);
    addStep([], [i + 1, high], high, `Pivot ${pivot} is now sorted at index ${i + 1}`);
    
    return i + 1;
  };

  const quickSort = (low: number, high: number) => {
    if (low < high) {
      addStep([], [], undefined, `Starting Quick Sort on sub-array from index ${low} to ${high}`);
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
      addStep([], [], undefined, `Element at index ${low} (${array[low]}) is trivially sorted`);
    }
  };

  addStep([], [], undefined, "Starting Quick Sort algorithm");
  quickSort(0, array.length - 1);
  
  for(let i=0; i<array.length; i++) {
    if(!sorted.includes(i)) sorted.push(i);
  }
  addStep([], [], undefined, "Quick Sort finished. The array is fully sorted.");

  return steps;
};
