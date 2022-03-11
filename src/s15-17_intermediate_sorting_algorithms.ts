export const mergeSort = (arr: number[]): number[] => {
  const mergeTwoSortedArrays = (arr1: number[], arr2: number[]): number[] => {
    let smallestIndex1 = 0;
    let smallestIndex2 = 0;
    const mergedSection = new Array<number>(arr1.length + arr2.length);

    for (let i = 0; i < mergedSection.length; i++) {
      if (arr1[smallestIndex1] < arr2[smallestIndex2] || arr2[smallestIndex2] === undefined) {
        mergedSection[i] = arr1[smallestIndex1];
        smallestIndex1++;
      } else {
        mergedSection[i] = arr2[smallestIndex2];
        smallestIndex2++;
      }
    }
    return mergedSection;
  };

  // keep splitting recursively until they're at a single element
  if (arr.length === 1) return arr;
  const mid = Math.ceil(arr.length / 2);
  const arr1 = mergeSort(arr.slice(0, mid));
  const arr2 = mergeSort(arr.slice(mid));

  return mergeTwoSortedArrays(arr1, arr2);
};

export const quickSort = (arr: number[], left = 0, right = arr.length - 1): number[] => {
  // mutatesArray by placing everything less than the pivot to the left and greater to the right

  // returns the index of the pivot
  const pivotHelper = (arr: number[], start: number, end: number): number => {
    const pivotIndex = start;
    let lessThanCount = 0;

    for (let i = start + 1; i <= end; i++) {
      if (arr[i] < arr[pivotIndex]) {
        lessThanCount++;
        [arr[i], arr[pivotIndex + lessThanCount]] = [arr[pivotIndex + lessThanCount], arr[i]];
      }
    }
    const newPivotIndex = pivotIndex + lessThanCount;
    [arr[pivotIndex], arr[newPivotIndex]] = [arr[newPivotIndex], arr[pivotIndex]];

    return newPivotIndex;
  };

  if (left >= right) return arr;
  const pivotIndex = pivotHelper(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);

  return arr;
};

export const radixSort = (arr: number[]): number[] => {
  // we get the right most digit
  // we put all the ...0 into bucket[0], ...1 into bucket[1], etc.
  // then they are flattened by pulling out of the bucket in the order they were stored in
  // repeat with the further digits until the largest number has had all its numbers checked
  const getNumAtPos = (num: number, pos: number): number => {
    const arr = num.toString().split('');
    if (pos > arr.length - 1) return 0;
    const digit = arr[arr.length - 1 - pos];
    const int = parseInt(digit, 10);
    if (!Number.isInteger(int)) {
      throw new Error(`received ${digit} but only positive numbers are supported`);
    }
    return int;
  };

  const bucketize = (arr: number[], pos: number): number[][] =>
    arr.reduce((acc, curr) => {
      const bucketI = getNumAtPos(curr, pos);
      acc[bucketI] = [...acc[bucketI], curr];
      return acc;
    }, new Array<number[]>(10).fill([]));

  const digitCount = (num: number): number => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  };

  const mostDigits = arr.reduce((acc: number, curr: number) => Math.max(acc, digitCount(curr)), 0);

  let bucket: number[][] = bucketize(arr, 0);

  const iterate = (arr: number[], pos: number): void => {
    if (pos === mostDigits - 1) return;
    bucket = bucketize(arr, pos);
    iterate(bucket.flat(), ++pos);
  };

  iterate(bucket.flat(), 1);

  return arr;
};

export const radixSort2 = (arr: number[]): number[] => {
  const getDigit = (num: number, pos: number) => Math.floor(Math.abs(num) / 10 ** pos) % 10;

  const digitCount = (num: number): number => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  };

  const mostDigits = (arr: number[]): number =>
    arr.reduce((acc, curr) => Math.max(digitCount(curr), acc), 0);

  const bucketize = (arr: number[], pos: number): number[][] => {
    const bucket = new Array<number[]>(10).fill([]);
    for (let i = 0; i < arr.length; i++) {
      const bucketI = getDigit(arr[i], pos);
      bucket[bucketI] = [...bucket[bucketI], arr[i]];
    }
    return bucket;
  };

  for (let i = 0; i < mostDigits(arr); i++) {
    arr = bucketize(arr, i).flat();
  }

  return arr;
};
