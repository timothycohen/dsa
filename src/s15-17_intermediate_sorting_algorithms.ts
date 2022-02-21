// const mergeSort = (arr: number[]): number[] => {
//   // split the array in two
//   let arr2 = arr.splice(Math.ceil(arr.length / 2))

//   // keep splitting recursively until they're at a single element
//   if (arr2.length > 1) arr2 = mergeSort(arr2)
//   if (arr.length > 1) arr = mergeSort(arr)

//   // console.log(`MERGING ${arr} AND ${arr2}`)
//   return mergeTwoSortedArrays(arr, arr2)
// }

const mergeSort = (arr: number[]): number[] => {
  const mergeTwoSortedArrays = (arr1: number[], arr2: number[]): number[] => {
    let smallestIndex1 = 0;
    let smallestIndex2 = 0;
    let mergedSection = new Array<number>(arr1.length + arr2.length);

    for (let i = 0; i < mergedSection.length; i++) {
      if (arr1[smallestIndex1] < arr2[smallestIndex2] || arr2[smallestIndex2] === undefined) {
        mergedSection[i] = arr1[smallestIndex1]
        smallestIndex1++
      } else {
        mergedSection[i] = arr2[smallestIndex2]
        smallestIndex2++
      }
    }
    return mergedSection
  }

  // keep splitting recursively until they're at a single element
  if (arr.length === 1) return arr
  const mid = Math.ceil(arr.length / 2)
  const arr1 = mergeSort(arr.slice(0, mid))
  const arr2 = mergeSort(arr.slice(mid))

  // console.log(`MERGING ${arr1} AND ${arr2}`)
  return mergeTwoSortedArrays(arr1, arr2)
}

const quickSort = (arr: number[], left = 0, right = arr.length - 1): number[] => {
  // mutatesArray by placing everything less than the pivot to the left and greater than the right
  // returns the index of the pivot
  const pivotHelper = (arr: number[], start: number, end: number): number => {
    const pivotIndex = start;
    let lessThanCount = 0;

    for (let i = start + 1; i <= end; i++) {
      if (arr[i] < arr[pivotIndex]) {
        lessThanCount++
        [arr[i], arr[pivotIndex + lessThanCount]] = [arr[pivotIndex + lessThanCount], arr[i]]
      }
    }
    let newPivotIndex = pivotIndex + lessThanCount;
    [arr[pivotIndex], arr[newPivotIndex]] = [arr[newPivotIndex], arr[pivotIndex]];

    return newPivotIndex
  }

  if (left >= right) return arr
  const pivotIndex = pivotHelper(arr, left, right)
  quickSort(arr, left, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, right)

  return arr
}

const radixSort = (arr: number[], pos: number = 0): number[] => {
  const bucketize = (arr: number[], pos: number): number[][] => {
    const getNumAtPos = (num: number, pos: number): number => {
      let arr = num.toString().split('')
      if (pos > (arr.length - 1)) return 0
      return parseInt(arr[arr.length-1-pos], 10)
    }

    return arr.reduce((acc, curr, index) => {
      let bucketI = getNumAtPos(curr, pos)
      acc[bucketI] = [...acc[bucketI], curr]
      return acc
    }, new Array<number[]>(10).fill([]))
  }

  let bucket = bucketize(arr, pos)

  for (let i = 1; i < bucket.length - 1; i++) {
    if (bucket[i].length) break;
    return bucket.flat()
  }

  return radixSort(bucket.flat(), ++pos)
}

const radixSort2 = (arr: number[], pos: number = 0): number[] => {
  const getDigit = (num: number, pos: number) => Math.floor(Math.abs(num) / Math.pow(10, pos)) % 10;
  const digitCount = (num: number): number => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }
  const mostDigits = (arr: number[]): number => arr.reduce((acc, curr) => Math.max(digitCount(curr), acc), 0)
  const bucketize = (arr: number[], pos: number): number[][] => {
    let bucket = new Array<number[]>(10).fill([])
    for (let i = 0; i < arr.length; i++) {
      let bucketI = getDigit(arr[i], pos)
      bucket[bucketI] = [...bucket[bucketI], arr[i]]
    }
    return bucket;
  }

  for (let i = 0; i < mostDigits(arr); i++) {
    arr = bucketize(arr, i).flat()
  }

  return arr;
}

console.log("mergeSort([1,4,302,99,32,21,243,2,7443,36,9,7,11])", mergeSort([1,4,302,99,32,21,243,2,7443,36,9,7,11]))
console.log("quickSort([1,4,302,99,32,21,243,2,7443,36,9,7,11])", quickSort([1,4,302,99,32,21,243,2,7443,36,9,7,11]))
console.log("radixSort([1,4,302,99,32,21,243,2,7443,36,9,7,11])", radixSort([1,4,302,99,32,21,243,2,7443,36,9,7,11]))
console.log("radixSort2([1,4,302,99,32,21,243,2,7443,36,9,7,11])", radixSort2([1,4,302,99,32,21,243,2,7443,36,9,7,11]))