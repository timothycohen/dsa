// good when the data is already sorted somewhat
const bubbleSort = <T>(arr: T[]): T[] => {
  let swap = false;
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
        swap = true;
      }
    }
    if (swap === false) break
    swap = false;
  }
  return arr;
}

// maybe the only strength is that it's simple to understand
const selectionSort = <T>(arr: T[]): T[] => {
  let indexOfMin: number;

  for (let i = 0; i < arr.length - 1; i++) {
    indexOfMin = i+1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[indexOfMin]) indexOfMin = j;
    }
    if (arr[i] > arr[indexOfMin]) [arr[i], arr[indexOfMin]] = [arr[indexOfMin], arr[i]]
  }

  return arr;
}

// good when the data is already sorted somewhat
// good for streaming data because the left half is already sorted
const insertionSort = <T>(arr: T[]): T[] => {
  for (let i = 1; i < arr.length; i++) {
    // pick a new number to compare to the left portion
    let comparedNum = arr[i];
    // loop from right to left in the left portion to determine where to insert the new number
    for (let j = i - 1; j >= 0; j--) {
      // if the left number is less than the compared number, then the compared number should be placed one to the right
      if (arr[j] <= comparedNum) {
        arr[j+1] = comparedNum
        break;
        // if it's not greater, move that left number over to the right
      } else {
        arr[j + 1] = arr[j]
      }
    }
  }

  return arr;
}

console.log("bubbleSort([1,4,99,32,43,2,43,6,9,7,11])", bubbleSort([1,4,99,32,43,2,43,6,9,7,11]))
console.log("selectionSort([1,4,99,32,43,2,43,6,9,7,11])", selectionSort([1,4,99,32,43,2,43,6,9,7,11]))
console.log("insertionSort([1,4,99,32,43,2,43,6,9,7,11])", insertionSort([1,4,99,32,43,2,43,6,9,7,11]))
