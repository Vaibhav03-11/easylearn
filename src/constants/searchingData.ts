import { SearchAlgorithmInfo } from "@/types/searching.types";

export const searchingAlgorithmsData: Record<string, SearchAlgorithmInfo> = {
  "linear-search": {
    id: "linear-search",
    name: "Linear Search",
    description: "Linear search is a sequential search algorithm that starts at one end and goes through each element of a list until the desired element is found.",
    intuition: "Check the first item. Is it what you want? If yes, stop. If no, check the next item. Keep going until you find it or run out of items.",
    analogies: [
      "Looking for a specific book on an unsorted shelf by reading every single spine from left to right.",
      "Finding your friend in a movie theater by scanning every single seat, row by row.",
      "Checking your pockets one by one to find your missing keys."
    ],
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)",
    useCases: [
      "When the list is very small",
      "When the list is unsorted",
      "When you only need to search once and sorting would take too long"
    ],
    pseudocode: `function linearSearch(array, target):
  for each element in array:
    if element == target:
      return element's index
  return not found`,
    implementations: {
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
      java: `public int linearSearch(int arr[], int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`
    }
  },
  "binary-search": {
    id: "binary-search",
    name: "Binary Search",
    description: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.",
    intuition: "Look at the middle item. Is it your target? If it's too big, your target must be in the left half. If it's too small, it's in the right half. Discard the other half and repeat.",
    analogies: [
      "Finding a word in a physical dictionary: You open it to the middle, see if your word is earlier or later, and then only search that half.",
      "The 'Guess My Number' game: I pick a number from 1 to 100. You guess 50. I say 'higher'. You know it's between 51 and 100, so you guess 75.",
      "Searching for a specific date in a calendar: You don't read every day from Jan 1st; you jump to the month, then the week."
    ],
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1)",
    useCases: [
      "When the array is already sorted",
      "When you need to perform many searches on the same dataset",
      "When the dataset is very large and linear search is too slow"
    ],
    pseudocode: `function binarySearch(array, target):
  low = 0
  high = length(array) - 1
  while low <= high:
    mid = (low + high) / 2
    if array[mid] == target:
      return mid
    if array[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return not found`,
    implementations: {
      python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      java: `public int binarySearch(int arr[], int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      cpp: `int binarySearch(int arr[], int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      javascript: `function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    }
  }
};
