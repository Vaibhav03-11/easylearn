import { AlgorithmInfo } from "@/types/sorting.types";

export const sortingAlgorithmsData: Record<string, AlgorithmInfo> = {
  "bubble-sort": {
    id: "bubble-sort",
    name: "Bubble Sort",
    description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.",
    intuition: "Think of it as lighter elements bubbling up to the top (or heavier elements sinking to the bottom) of the array, one by one.",
    analogies: [
      "Air bubbles rising in a fish tank: The largest/heaviest elements 'bubble' up to the top by pushing past smaller ones.",
      "Standing in a height line: You swap places with the person standing immediately next to you if they are shorter, repeating until everyone is strictly ordered by height.",
      "Sorting a physical deck of cards by slowly sliding adjacent cards past one another until they are in sequence."
    ],
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stability: true,
    inPlace: true,
    useCases: ["When the array is almost sorted", "When memory space is strictly limited"],
    pseudocode: `function bubbleSort(array):\n  n = length(array)\n  for i from 0 to n-1:\n    for j from 0 to n-i-2:\n      if array[j] > array[j+1]:\n        swap(array[j], array[j+1])`,
    implementations: {
      python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr`,
      java: `public void bubbleSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n}`,
      cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1])\n                swap(arr[j], arr[j + 1]);\n}`,
      javascript: `function bubbleSort(arr) {\n    const n = arr.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}`
    }
  },
  "quick-sort": {
    id: "quick-sort",
    name: "Quick Sort",
    description: "Quick Sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.",
    intuition: "Select an element. Put all smaller elements on its left and larger on its right. Then recursively do the same for the left and right halves.",
    analogies: [
      "Splitting a classroom by grades: A teacher picks a median score (e.g., 70). Everyone below 70 goes to the left, everyone above goes to the right. Then the process repeats for the sub-groups.",
      "Packing luggage by weight limit: You pick an arbitrary box as a baseline. Lighter items go in the carry-on pile, heavier items go in checked baggage pile, and you repeat.",
      "Sorting mixed coins: Picking a quarter as a pivot. You push pennies and nickels to the left, and half-dollars to the right, then recursively sort the smaller piles."
    ],
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stability: false,
    inPlace: true,
    useCases: ["General-purpose sorting in standard libraries", "When average-case performance is critical"],
    pseudocode: `function quickSort(arr, low, high):\n  if low < high:\n    pi = partition(arr, low, high)\n    quickSort(arr, low, pi - 1)\n    quickSort(arr, pi + 1, high)`,
    implementations: {
      python: `def partition(arr, low, high):\n    i = (low - 1)\n    pivot = arr[high]\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i = i + 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return (i + 1)\n\ndef quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)`,
      java: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            int temp = arr[i];\n            arr[i] = arr[j];\n            arr[j] = temp;\n        }\n    }\n    int temp = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp;\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
      cpp: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
      javascript: `function partition(arr, low, high) {\n    let pivot = arr[high];\n    let i = low - 1;\n    for (let j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\nfunction quickSort(arr, low, high) {\n    if (low < high) {\n        let pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`
    }
  },
  "selection-sort": {
    id: "selection-sort",
    name: "Selection Sort",
    description: "Selection sort divides the array into sorted and unsorted parts. It repeatedly selects the smallest (or largest) element from the unsorted sublist and swaps it with the leftmost unsorted element.",
    intuition: "Find the smallest item. Put it at the beginning. Find the next smallest. Put it next. Repeat.",
    analogies: [
      "Choosing teams in gym class: The captain scans the entire crowd and always picks the absolute best available player first to add to their sorted team.",
      "Picking the cheapest apples: You search the entire produce pile to find the single cheapest apple, put it in your cart, and repeat the full search for the next one.",
      "Organizing a bookshelf: Finding the thinnest book and placing it at the start, then finding the next thinnest from the remaining pile, and so on."
    ],
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stability: false,
    inPlace: true,
    useCases: ["When memory writes are a costly operation", "Small arrays"],
    pseudocode: `function selectionSort(arr):\n  for i from 0 to n-1:\n    min_idx = i\n    for j from i+1 to n:\n      if arr[j] < arr[min_idx]:\n        min_idx = j\n    swap arr[min_idx] and arr[i]`,
    implementations: {
      python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[min_idx] > arr[j]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
      java: `void sort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}`,
      cpp: `void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min_idx = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        swap(arr[min_idx], arr[i]);\n    }\n}`,
      javascript: `function selectionSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n; i++) {\n        let min = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min]) {\n                min = j;\n            }\n        }\n        if (min != i) {\n            let tmp = arr[i];\n            arr[i] = arr[min];\n            arr[min] = tmp;\n        }\n    }\n    return arr;\n}`
    }
  },
  "insertion-sort": {
    id: "insertion-sort",
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position in the already sorted portion.",
    intuition: "Take one element, compare it with the previous elements, and insert it in the right spot.",
    analogies: [
      "Sorting a hand of playing cards: You pick up one card at a time from the table and immediately insert it into its correct position among the cards you're already holding.",
      "Arranging files in a filing cabinet: Taking a brand new folder and physically sliding it between two existing alphabetically sorted folders.",
      "A tailor arranging threads by color gradient: Taking a new spool and shifting the existing ones over slightly to make room for it in the perfect sequence."
    ],
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stability: true,
    inPlace: true,
    useCases: ["When the array is nearly sorted", "Small datasets"],
    pseudocode: `function insertionSort(arr):\n  for i from 1 to n-1:\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n      arr[j+1] = arr[j]\n      j = j - 1\n    arr[j+1] = key`,
    implementations: {
      python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i-1\n        while j >= 0 and key < arr[j] :\n                arr[j + 1] = arr[j]\n                j -= 1\n        arr[j + 1] = key`,
      java: `void sort(int arr[]) {\n    int n = arr.length;\n    for (int i = 1; i < n; ++i) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      cpp: `void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
      javascript: `function insertionSort(arr) {\n    for (let i = 1; i < arr.length; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n    return arr;\n}`
    }
  },
  "merge-sort": {
    id: "merge-sort",
    name: "Merge Sort",
    description: "A divide and conquer algorithm that splits the array in halves, recursively sorts them, and then merges the sorted halves.",
    intuition: "If you have two sorted lists, it's easy to merge them into one. Keep dividing until lists have 1 element (which is inherently sorted), then merge.",
    analogies: [
      "Grading exam papers: Dividing a massive stack of tests among multiple teachers, having them sort their small piles, and then combining the sorted piles back together.",
      "Tournament brackets (like the World Cup): Teams play in small groups, and the winners merge into larger and larger groups until one overall sorted ranking emerges.",
      "Organizing a massive library: Two librarians completely sort their respective halves of a room, then walk down the main aisle together zippering their ordered books into one master list."
    ],
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stability: true,
    inPlace: false,
    useCases: ["Sorting linked lists", "When stable sorting is needed with guaranteed O(n log n)"],
    pseudocode: `function mergeSort(arr):\n  if length of arr <= 1 return arr\n  mid = length of arr / 2\n  left = mergeSort(arr[0..mid])\n  right = mergeSort(arr[mid..end])\n  return merge(left, right)`,
    implementations: {
      python: `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr)//2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] <= R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1`,
      java: `void merge(int arr[], int l, int m, int r) {\n    // Merge implementation\n}\nvoid sort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        sort(arr, l, m);\n        sort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}`,
      cpp: `void merge(int arr[], int l, int m, int r) {\n    // Merge implementation\n}\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
      javascript: `function mergeSort(arr) {\n    if (arr.length <= 1) return arr;\n    const mid = Math.floor(arr.length / 2);\n    const left = mergeSort(arr.slice(0, mid));\n    const right = mergeSort(arr.slice(mid));\n    return merge(left, right);\n}`
    }
  },
  "heap-sort": {
    id: "heap-sort",
    name: "Heap Sort",
    description: "Converts the array into a max heap, then repeatedly swaps the root (maximum) element with the last element and heapifies the remaining elements.",
    intuition: "Find the maximum element using a heap tree structure, place it at the end, and repeat for the remaining elements.",
    analogies: [
      "Hospital Emergency Room (Priority Queue): The triage nurse continuously identifies the patient with the absolute highest severity (the root), treats them, and immediately re-evaluates the rest of the waiting room.",
      "A CEO delegating tasks: The most critical, highest-priority task is handled first, removed from the queue, and the remaining tasks are automatically reshuffled by importance.",
      "Mining for gold: You sift the dirt vigorously so the largest, heaviest nuggets bubble strictly to the very top of the pan to be extracted one by one."
    ],
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stability: false,
    inPlace: true,
    useCases: ["When memory is strictly limited", "When worst-case O(n log n) is required"],
    pseudocode: `function heapSort(arr):\n  buildMaxHeap(arr)\n  for i from n-1 down to 1:\n    swap(arr[0], arr[i])\n    heapify(arr, 0, i)`,
    implementations: {
      python: `def heapify(arr, n, i):\n    largest = i\n    l = 2 * i + 1\n    r = 2 * i + 2\n    if l < n and arr[l] > arr[largest]:\n        largest = l\n    if r < n and arr[r] > arr[largest]:\n        largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]\n        heapify(arr, i, 0)`,
      java: `public void sort(int arr[]) {\n    int n = arr.length;\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        int temp = arr[0];\n        arr[0] = arr[i];\n        arr[i] = temp;\n        heapify(arr, i, 0);\n    }\n}`,
      cpp: `void heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
      javascript: `function heapSort(arr) {\n    let n = arr.length;\n    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (let i = n - 1; i > 0; i--) {\n        let temp = arr[0];\n        arr[0] = arr[i];\n        arr[i] = temp;\n        heapify(arr, i, 0);\n    }\n    return arr;\n}`
    }
  },
  "radix-sort": {
    id: "radix-sort",
    name: "Radix Sort",
    description: "A non-comparative sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value.",
    intuition: "Sort elements digit by digit, starting from the least significant digit to the most significant digit.",
    analogies: [
      "Sorting mail at the post office: The machine first sorts by state, then by city, then by zip code, and finally by street number to find the exact route.",
      "Searching a physical dictionary: You find the section for the first letter 'A', then within that find 'R', then 'P' to eventually narrow down to 'Apple'.",
      "Sorting a massive deck of lottery tickets: First sorting them all into 10 piles based entirely on the last digit, gathering them up, and then re-sorting by the second-to-last digit."
    ],
    timeComplexity: { best: "O(nk)", average: "O(nk)", worst: "O(nk)" },
    spaceComplexity: "O(n + k)",
    stability: true,
    inPlace: false,
    useCases: ["Sorting large numbers of integers with a small range of digits", "When O(n) performance is needed and numbers are small"],
    pseudocode: `function radixSort(arr):\n  max = getMax(arr)\n  for exp = 1 to max/exp > 0:\n    countingSort(arr, exp)`,
    implementations: {
      python: `def radix_sort(arr):\n    max1 = max(arr)\n    exp = 1\n    while max1 / exp >= 1:\n        counting_sort(arr, exp)\n        exp *= 10`,
      java: `static void radixsort(int arr[], int n) {\n    int m = getMax(arr, n);\n    for (int exp = 1; m / exp > 0; exp *= 10)\n        countSort(arr, n, exp);\n}`,
      cpp: `void radixsort(int arr[], int n) {\n    int m = getMax(arr, n);\n    for (int exp = 1; m / exp > 0; exp *= 10)\n        countSort(arr, n, exp);\n}`,
      javascript: `function radixSort(arr) {\n    const max = Math.max(...arr);\n    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {\n        countingSort(arr, exp);\n    }\n    return arr;\n}`
    }
  }
};
