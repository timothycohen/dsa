/* eslint-disable no-restricted-syntax */
/* #################### Write a function that accepts a string and returns a reversed copy #################### */
export const reverse = (str: string): string =>
  Array.from(str)
    .map((_char, i) => str[str.length - 1 - i])
    .join('');

export const reverse2 = (str: string): string => {
  let answer = '';
  for (let i = 0; i < str.length; i++) {
    answer += str[str.length - 1 - i];
  }
  return answer;
};

export const reverse3 = (str: string): string => str.split('').reverse().join('');

/* #################### Write a function that counts to N #################### */
export const countToNIt = (n: number): number => {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += i;
  }
  return count;
};

export const countToN2 = (n: number): number => ((n + 1) * n) / 2;

/* #################### Write a function that returns all pairs #################### */
export const allPairs = (n: number): number[][] => {
  const pairs: number[][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs;
};

/* #################### Write a function which takes a string and returns a count of each character in the string #################### */

// punctuation? don't include
// case sensitivity ? H == h
// invalid input? return err
// empty input? return null
// numbers? treat as char

export const countAllChars = (str: string): Record<string, number> | null => {
  const counter = {} as Record<string, number>;

  const isLetter = (str: string): boolean => {
    if (str.length !== 1) return false;
    if (str.toUpperCase() === str.toLowerCase()) return false;
    return true;
  };

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (isLetter(char) || Number.isInteger(parseInt(char, 10)))
      counter[char] = counter[char] + 1 || 1;
  }

  if (Object.keys(counter).length === 0) return null;

  return counter;
};

export const countAllChars2 = (str: string): Record<string, number> | null => {
  const counter = {} as Record<string, number>;

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (/[a-z0-9]/.test(char)) counter[char] = counter[char] + 1 || 1;
  }

  if (Object.keys(counter).length === 0) return null;

  return counter;
};

export const countAllChars3 = (str: string): Record<string, number> | null => {
  const counter = {} as Record<string, number>;

  Object.values(str).forEach(char => {
    char.toLowerCase();
    if (/[a-z0-9]/.test(char)) counter[char] = counter[char] + 1 || 1;
  });

  if (Object.keys(counter).length === 0) return null;

  return counter;
};

export const countAllChars4 = (str: string): Record<string, number> | null => {
  const counter = {} as Record<string, number>;

  const isAlphaNumeric = (char: string) => {
    const code = char.charCodeAt(0);

    if (code > 47 && code < 58) return true; // 0-9
    if (code > 96 && code < 123) return true; // a-z
    if (code > 64 && code < 91) return true; // A-Z
    return false;
  };

  Object.values(str).forEach(char => {
    char.toLowerCase();
    if (isAlphaNumeric(char)) counter[char] = counter[char] + 1 || 1;
  });

  if (Object.keys(counter).length === 0) return null;

  return counter;
};

/* ######################### Colt Steele's Problem Solving Approach ######################### */
/* STEP 1 Understand the problem
 * say the problem in your own words
 */
/* STEP 2 Make concrete examples
 * inputs (overloading? ranges? types? invalid inputs? casting?)
 * outputs (types? what to return on an invalid input?)
 * edge cases
 */
/* STEP 3 Break it down
 * write pseudocode for each step
 */
/* STEP 4 Solve simplify the problem into smaller steps
 * start solving the pseudocode you can
 */
/* STEP 5 Look back and refactor
 * Check result accuracy.
 * How can you improve the performance? Is there a way to avoid loops or costly computations?
 * Can you understand it at a glance? How intuitive is it?
 * Does it follow style guidelines?
 * Can you use the result for another problem?
 * Can you derive it differently? How have other people solved this problem?
 */

/* ######################### Problem Solving Patterns ######################### */

/* #################### Frequency Counter: O(*n*) #################### */

/* #################### Write a function "same" which takes in two arrays and returns true if the second array is each el in the first array squared in any order #################### */

// O(n)
export const same = (arr1: number[], arr2: number[]): boolean => {
  // return false if not the same length
  if (arr1.length !== arr2.length) return false;

  // create a frequency count of array 2
  const counter2 = {} as Record<string, number>;
  arr2.forEach(el => {
    counter2[el] = counter2[el] + 1 || 1;
  });

  // create a frequency count of the squares of array 1
  const counter1 = {} as Record<string, number>;
  // eslint-disable-next-line no-restricted-syntax
  for (const el1 of arr1) {
    const square = el1 * el1;
    counter1[square] = counter1[square] + 1 || 1;
    // while adding to the counter, if the counter is larger than 2, return false. this won't change the outcome, but makes it exit asap
    if (counter1[square] > counter2[square]) return false;
  }

  // if the k/v pairs in the counters are not equal, return false
  // eslint-disable-next-line no-restricted-syntax
  for (const key in counter1) {
    if (counter1[key] !== counter2[key]) return false;
  }

  return true;
};

/* #################### Write a function to check if two strings are perfect anagrams #################### */

export const validAnagram = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  const count1 = {} as Record<string, number>;

  Object.values(str1).forEach(char => {
    count1[char] = count1[char] + 1 || 1;
  });

  const count2 = {} as Record<string, number>;
  for (const char of str2) {
    count2[char] = count2[char] + 1 || 1;
    if (count2[char] > count1[char]) return false; // not required, but exits early
  }

  for (const key in count1) {
    if (count1[key] !== count2[key]) return false;
  }

  return true;
};

export const validAnagram2 = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  const count = {} as Record<string, number>;
  for (const char of str1) {
    count[char] = count[char] + 1 || 1;
  }

  for (const char of str2) {
    if (!count[char]) return false; // exit if 0 or undefined
    count[char] -= 1;
    if (count[char] === 0) delete count[char];
  }

  if (Object.keys(count).length) return false;

  return true;
};

export const validAnagram3 = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  const count = {} as Record<string, number>;
  for (const char of str1) {
    count[char] = count[char] + 1 || 1;
  }

  for (const char of str2) {
    if (!count[char]) return false; // exit if 0 or undefined
    count[char] -= 1;
  }

  // because we checked for the length at the top, we don't need to check everything is 0 at the end
  return true;
};

/* #################### Multiple Pointers: O(*n*) #################### */

/* #################### Write a function "sumZero" which accepts a sorted array of integers and returns the first pair where the sum is 0 and return an array that includes both values that sum to zero or undefined #################### */
export const sumZero = (sArr: number[]): [number, number] | undefined => {
  if (sArr.length < 2) return undefined;
  let end = sArr.length - 1;
  let start = 0;
  if (sArr[start] > 0 && sArr[end] > 0) return undefined;
  if (sArr[start] < 0 && sArr[end] < 0) return undefined;

  while (end > start) {
    if (sArr[start] + sArr[end] === 0) return [sArr[start], sArr[end]];
    if (sArr[start] + sArr[end] > 1) {
      end -= 1;
    } else start += 1;
  }

  return undefined;
};

/* #################### Write a function "countUniqueValues" which accepts a sorted array and returns the count of the unique elements in the array #################### */

export const countUniqueValues = (sArr: number[]): number => {
  let lastUnique;
  let count = 0;

  for (let index = 0; index <= sArr.length - 1; index++) {
    if (sArr[index] !== lastUnique) {
      lastUnique = sArr[index];
      count++;
    }
  }

  return count;
};

export const countUniqueValues2 = (sArr: number[]): number => {
  let i = 0;
  let j = 0;

  // move j ahead. if it's a new value, move i forward and place the value into array[i]
  for (let k = 0; k < sArr.length; k++) {
    j++;
    if (sArr[j] !== sArr[i]) {
      i++;
      sArr[i] = sArr[j];
    }
  }
  // the quantity of unique values is i
  // can slice the array for the unique values
  // console.log(sArr.slice(0, i));
  return i;
};

export const countUniqueValues3 = (sArr: number[]): number => {
  if (sArr.length === 0) return 0;
  let i = 0;

  // move j ahead. if it's a new value, move i forward and place the value into array[i]
  for (let j = 1; j < sArr.length; j++) {
    if (sArr[j] !== sArr[i]) {
      i++;
      sArr[i] = sArr[j];
    }
  }
  // the quantity of unique values is i
  // can slice the array for the unique values
  // console.log(sArr.slice(0, i + 1))
  return i + 1;
};

/* #################### Write a function which accepts a sorted array and returns an array of the unique values #################### */
export const returnUniqueValues = (sArr: number[]): number[] => {
  const newArr = [] as number[];

  sArr.forEach(num => {
    if (newArr[newArr.length - 1] !== num) newArr.push(num);
  });

  return newArr;
};

export const returnUniqueValues2 = (sArr: number[]): number[] =>
  sArr.reduce<number[]>((acc, curr) => {
    if (curr !== acc[acc.length - 1]) {
      acc.push(curr);
    }
    return acc;
  }, []);

/* #################### Sliding Window #################### */

/* #################### Write a function to find the longest sequence of unique characters #################### */

// general strategy: keep an array of unique characters until the current char
// if that index is above the count of max unique characters, update the count
// return the count at the end
export const uniqueCharCount = (str: string): number => {
  let count = 0;
  const unique = [];

  // go through each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const indexInUnique = unique.indexOf(char);
    // if it's unique, add it to the unique array
    // if the unique array is longer than the count, update the count
    if (indexInUnique === -1) {
      unique.push(char);
      if (count < unique.length) count += 1;
    }
    // else remove all the characters until the duplicate and then add the duplicate (which is now unique) to the end
    else {
      unique.splice(0, indexInUnique + 1);
      unique.push(char);
    }
  }
  return count;
};

/* #################### Write a function which accepts an array and a number and returns the max sum of n consecutive elements in the array #################### */
export const maxSubarraySum = (arr: number[], n: number): number | null => {
  if (arr.length === 0) return null;
  if (n > arr.length) return arr.reduce((a, c) => a + c);

  let maxSum = 0;
  const window = arr.slice(0, n);

  // loop the index until it's at the end
  for (let currIndex = n; currIndex < arr.length + 1; currIndex++) {
    // add the window together and if it's the highest number, update the maxCount
    const windowSum = window.reduce((a, c) => a + c);
    if (windowSum > maxSum) maxSum = windowSum;
    // move the window
    window.shift();
    window.push(arr[currIndex]);
  }
  return maxSum;
};

// first version was inefficient. had a nested loop (for and reduce)
// don't need to redo the entire sum each time. only need to add and subtract the ends
export const maxSubarraySum2 = (arr: number[], n: number): number | null => {
  // handle edge cases
  if (arr.length === 0) return null;
  if (n > arr.length) return arr.reduce((a, c) => a + c);

  // initialize the max sum and current sum
  let windowSum = 0;
  for (let i = 0; i < n; i++) {
    windowSum += arr[i];
  }
  let maxSum = windowSum;

  // loop the index from where the windowSum left off until it's at the end
  for (let i = n; i < arr.length; i++) {
    // calculate the new window sum by adding the current number and subtracting the first number
    windowSum = windowSum + arr[i] - arr[i - n];
    // if the windowSum is bigger than the maxSum, change maxSum to be that value
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
};
