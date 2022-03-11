/* ##### Given two positive integers, find out if the two numbers have the same frequency of digits. O(n) time complexity */
// make an object that counts the frequency of each number.
// +1 for num1 and -1 for num2.
export const sameFrequency = (num1: number, num2: number): boolean => {
  const count: Record<string, number> = {};
  const n1 = num1.toString();
  const n2 = num2.toString();

  Object.values(n1).forEach(char => {
    count[char] = count[char] + 1 || 1;
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const char of n2) {
    if (count[char] < 1 || count[char] === undefined) return false;
    count[char] -= 1;
  }
  return true;
};

/* ##### areThereDuplicates accepts a variable number of args and checks if there are duplicates in them. */

// easiest solution
export const areThereDuplicatesEasy = (...args: any[]) => new Set(args).size !== args.length;

// practice with freq counter OR multiple pointers pattern

// frequency counter version
export const areThereDuplicatesF = <T extends string | number>(...args: T[]): boolean => {
  const counter = {} as Record<T, number>;

  // eslint-disable-next-line no-restricted-syntax
  for (const el of args) {
    counter[el] = counter[el] + 1 || 1;
    if (counter[el] > 1) return true;
  }
  return false;
};

/* ##### averagePair takes a sorted array of integers and a target average. */
// return true if there is at least one pair of values where the pair equals the target average.
export const averagePair = (sArr: number[], targetAvg: number): boolean => {
  if (sArr.length < 2) return false;
  let start = 0;
  let end = sArr.length - 1;
  // short circuit if obviously false
  if (sArr[start] > targetAvg || sArr[end] < targetAvg) return false;

  const calcAvg = (num1: number, num2: number): number => (num1 + num2) / 2;

  // loop until start and end meet.
  while (start < end) {
    const avg = calcAvg(sArr[start], sArr[end]);
    // check if average is equal to the target avg
    if (avg === targetAvg) return true;
    // if less, move start index forwards
    if (avg < targetAvg) start++;
    // if more, move end index backwards
    else end--;
  }

  return false;
};

// isSubsequence which takes in two strings and checks whether the characters in the first forma  subsequence in the second.
export const isSubsequence = (sub: string, str: string): boolean => {
  // return str.includes(sub)

  // declare two indices
  let subI = 0;
  let strI = str.indexOf(sub[subI]);

  // loop until the substring is at the end
  while (subI !== sub.length) {
    // if there is a match, move to the next digit
    if (sub[subI] === str[strI]) {
      subI++;
      strI++;
    } else {
      // reset the substring index and move the str index to the next occurence of the first letter in the substring
      subI = 0;
      strI = str.indexOf(sub[subI], strI);
      // if there is no further occurence of that letter, there's no substring
      if (strI === -1) return false;
    }
  }
  // if the substring has made it to the full length, it exists
  return true;
};

export function isSubsequence2(str1: string, str2: string): boolean {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence2(str1.slice(1), str2.slice(1));
  return isSubsequence2(str1, str2.slice(1));
}

/* ##### find the max sum of a subarray given a specified length */
export const maxSubarraySum3 = (arr: number[], n: number): number | null => {
  if (n > arr.length) return null;

  // initialize the sum and max
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
  }
  let max = sum;

  // add the digit to the right and subtract from the left.
  for (let i = n; i < arr.length; i++) {
    sum = sum - arr[i - n] + arr[i];
    max = Math.max(max, sum);
  }
  return max;
};

/* ##### find the min length of a contiguous subarray that is greater than the target */
export const minSubarrayLen = (arr: number[], target: number): number | null => {
  let minCount = Infinity;
  let i = 0;
  let j = 0;
  let sum = arr[0];

  while (i !== arr.length - 1 && j !== arr.length) {
    // if the sum isn't high enough, add j to get a bigger sum
    if (sum < target) {
      j++;
      sum += arr[j];
    } else {
      // if it's big enough, update the minimum count
      minCount = Math.min(minCount, j - i + 1);
      // subtract the i's element from the sum and increment it forward
      sum -= arr[i];
      i++;
    }
  }

  // if the minCount is infinity, it means that there was never a sum higher than the target, in which case return null
  if (minCount === Infinity) return null;
  return minCount;
};

/* ##### find the length of the longest substring with unique chars  */

// buggy bc i need to check that the object index isn't less than the current window index...
// tried to use an object for performance, but switching to an array
// const findLongestSubstring = (str: string): number => {
//   let counter: Record<string, number> = {}
//   let i = 0;
//   let j = 0;
//   let maxLength = 1;

//   // keep going until there's no more possibility of finding a longer string (str.length - maxLength)
//   while ((str.length - maxLength) !== 0){
//     // if the char is unique in this window, add k/v as char/index to the object and calculate the maxlength as the max of the previous maxLength and the window length
//     if (counter[str[j]] <= i || counter[str[j]] === undefined  ) {
//       counter[str[j]] = j
//       maxLength = Math.max(maxLength, j - i + 1)
//     } else {
//       // if the char is not unique, contract the window to the index of the duplicate char
//       i = counter[str[j]]
//     }
//     // move the window forward one
//     j++;
//   }
//   console.log(str.slice(i, j))
//   return maxLength;
// }

export const findLongestSubstring = (str: string): number => {
  let i = 0;
  let maxLength = 0;
  const window: string[] = [];

  // move the window forward one
  for (let j = 0; j < str.length; j++) {
    // get the new char
    const char = str[j];
    // see if that char is already in the window
    const foundIndex = window.findIndex(c => c === char);
    // push the char onto the front of the window
    window.push(char);
    // if the char is unique in this window, calculate the maxlength as the max of the previous maxLength and the new window length
    if (foundIndex === -1) {
      maxLength = Math.max(maxLength, window.length);
    } else {
      // if the char is not unique, contract the window to one after the index of the duplicate char
      i = foundIndex + 1;
      window.splice(0, i);
    }
  }
  return maxLength;
};
