/* #################### Write a function that accepts a string and returns a reversed copy #################### */
const reverse = (str: string): string => {
  return Array.from(str).map((_char, i) => str[str.length-1-i]).join('')
}

const reverse2 = (str: string): string => {
  let answer = ''
  for (let i = 0; i < str.length; i++){
    answer += str[str.length-1-i]
  }
  return answer
}

const reverse3 = (str: string): string => {
  return str.split('').reverse().join('')
}

/* ########## Tests ########## */
// console.log(reverse('hi there'))
// console.log(reverse2('hi there'))
// console.log(reverse3('hi there'))

/* #################### Write a function that counts to N #################### */
const countToN = (n: number): number => {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += i;
  }
  return count;
}

const countToN2 = (n: number): number  => {
  return ((n+1) * n/2)
}

/* ########## Tests ########## */
// let t1 = performance.now()
// countToN(1000000000)
// let t2 = performance.now()
// countToN2(1000000000)
// let t3 = performance.now()

// console.log(`Time Elapsed for solution 1: ${t2 - t1} ms`)
// console.log(`Time Elapsed for solution 2: ${t3 - t2} ms`)

/* #################### Write a function that prints all pairs #################### */
const printAllPairs = (n: number): void => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i,j)
    }
  }
}

/* ########## Tests ########## */
// printAllPairs(7)



/* #################### Write a function which takes a string and returns a count of each character in the string #################### */

// punctuation? don't include
// case sensitivity ? H == h
// invalid input? return err
// empty input? return null
// numbers? treat as char

const countAllChars = (str: string): Record<string, number> | null => {
  let counter = {} as Record<string, number>

  const isLetter = (str: string): boolean => {
    if (str.length !== 1) return false
    if (str.toUpperCase() === str.toLowerCase()) return false
    return true
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase()
    if (!isLetter(char) && !Number.isInteger(parseInt(char, 10))) continue // not alphanumeric
    counter[char] = counter[char] + 1 || 1
  }

  if (Object.keys(counter).length === 0) return null

  return counter;
}

const countAllChars2 = (str: string): Record<string, number> | null => {
  let counter = {} as Record<string, number>

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase()
    if (/[a-z0-9]/.test(char)) counter[char] = counter[char] + 1 || 1
  }

  if (Object.keys(counter).length === 0) return null

  return counter;
}

const countAllChars3 = (str: string): Record<string, number> | null => {
  let counter = {} as Record<string, number>

  for (let char of str) {
    char.toLowerCase()
    if (/[a-z0-9]/.test(char)) counter[char] = counter[char] + 1 || 1
  }

  if (Object.keys(counter).length === 0) return null

  return counter;
}

const countAllChars4 = (str: string): Record<string, number> | null => {
  let counter = {} as Record<string, number>

  const isAlphaNumeric = (char: string) => {
    const code = char.charCodeAt(0)

    if (code > 47 && code < 58) return true // 0-9
    if (code > 96 && code < 123) return true // a-z
    if (code > 64 && code < 91) return true // A-Z
    return false
  }

  for (let char of str) {
    char.toLowerCase()
    if (isAlphaNumeric(char)) counter[char] = counter[char] + 1 || 1
  }

  if (Object.keys(counter).length === 0) return null

  return counter;
}

/* ########## Tests ########## */
// console.log(countAllChars('  fdsakj33209jf d!;3!'))
// console.log(countAllChars2('  fdsakj33209jf d!;3!'))
// console.log(countAllChars3('  fdsakj33209jf d!;3!'))
// console.log(countAllChars4('  fdsakj33209jf d!;3!'))


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

// Example: same([1, 2, 3, 4, 5], [1, 4, 9, 16, 25]) // true
// Example: same([1, 5, 2, 4, 3], [25, 4, 1, 16, 25]) // true
// Example: same([1, 5, 2, 4], [1, 4, 9, 16, 25]) // false

// O(n)
const same = (arr1: number[], arr2: number[]): boolean => {
  // return false if not the same length
  if (arr1.length !== arr2.length) return false;

  // create a frequency count of array 2
  let counter2 = {} as Record<string, number>
  for (let el of arr2) {
    counter2[el] = counter2[el]+1 || 1;
  }

  // create a frequency count of the squares of array 1
  let counter1 = {} as Record<string, number>
  for (let el1 of arr1) {
    const square = el1*el1
    counter1[square] = counter1[square]+1 || 1;
    // while adding to the counter, if the counter is larger than 2, return false. this won't change the outcome, but makes it exit asap
    if (counter1[square] > counter2[square]) return false
  }

  // if the k/v pairs in the counters are not equal, return false
  for (let key in counter1) {
    if (counter1[key] !== counter2[key]) return false
  }

  return true;
}

/* ########## Tests ########## */
// simplest path
same([1, 2, 3, 4, 5], [1, 4, 9, 16, 25]) === true
// different lengths (doesn't include 5 squared)
same([1, 2, 3, 4, 5], [1, 4, 9, 16]) === false
// different lengths (includes subset and extra number)
same([1, 2, 3, 4], [1, 4, 9, 16, 25]) === false
// order doesn't matter
same([1, 5, 2, 4, 3], [16, 1, 4, 9, 25]) === true
// duplicates are okay
same([1, 5, 2, 4, 3, 5], [25, 16, 1, 4, 9, 25]) === true
//frequency matters
same([1, 5, 2, 4], [1, 4, 25, 4, 25]) === false

// console.log("🚀 ~ file: notes.ts ~ line 214 ~ same([1, 2, 3, 4, 5], [1, 4, 9, 16, 25]) === true", same([1, 2, 3, 4, 5], [1, 4, 9, 16, 25]) === true)
// console.log("🚀 ~ file: notes.ts ~ line 215 ~ same([1, 2, 3, 4, 5], [1, 4, 9, 16]) === false", same([1, 2, 3, 4, 5], [1, 4, 9, 16]) === false)
// console.log("🚀 ~ file: notes.ts ~ line 216 ~ same([1, 2, 3, 4], [1, 4, 9, 16, 25]) === false", same([1, 2, 3, 4], [1, 4, 9, 16, 25]) === false)
// console.log("🚀 ~ file: notes.ts ~ line 217 ~ same([1, 5, 2, 4, 3], [16, 1, 4, 9, 25]) === true", same([1, 5, 2, 4, 3], [16, 1, 4, 9, 25]) === true)
// console.log("🚀 ~ file: notes.ts ~ line 218 ~ same([1, 5, 2, 4, 3, 5], [25, 16, 1, 4, 9, 25]) === true", same([1, 5, 2, 4, 3, 5], [25, 16, 1, 4, 9, 25]) === true)
// console.log("🚀 ~ file: notes.ts ~ line 219 ~ same([1, 5, 2, 4], [1, 4, 25, 4, 25]) === false", same([1, 5, 2, 4], [1, 4, 25, 4, 25]) === false)

/* #################### Write a function to check if two strings are perfect anagrams #################### */

const validAnagram = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  let count1 = {} as Record<string, number>
  for (let char of str1) {
    count1[char] = count1[char] + 1 || 1;
  }

  let count2 = {} as Record<string, number>
  for (let char of str2) {
    count2[char] = count2[char] + 1 || 1;
    if (count2[char] > count1[char]) return false; // not required, but exits early
  }

  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }

  return true
}



const validAnagram2 = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  let count = {} as Record<string, number>
  for (let char of str1) {
    count[char] = count[char] + 1 || 1;
  }

  for (let char of str2) {
    if (!count[char]) return false; // exit if 0 or undefined
    count[char] = count[char] - 1;
    if (count[char] === 0) delete count[char];
  }

  if (Object.keys(count).length) return false;

  return true
}

const validAnagram3 = (str1: string, str2: string): boolean => {
  if (str1.length !== str2.length) return false;

  let count = {} as Record<string, number>
  for (let char of str1) {
    count[char] = count[char] + 1 || 1;
  }

  for (let char of str2) {
    if (!count[char]) return false; // exit if 0 or undefined
    count[char] = count[char] - 1;
  }

  // because we checked for the length at the top, we don't need to check everything is 0 at the end
  return true
}

/* ########## Tests ########## */
// simplest path
validAnagram('anagram', 'nagaram') === true
validAnagram('qwerty', 'qeywrt') === true
validAnagram('texttwisttime', 'timetwisttext') === true
// empty strings are valid
validAnagram('', '') === true
// frequency matters
validAnagram('aaz', 'zza') === false
// different chars matter
validAnagram('rat', 'car') === true
// frequency (length) matters
validAnagram('awesome', 'awesom') === true

// console.log("validAnagram('anagram', 'nagaram') === true", validAnagram('anagram', 'nagaram') === true)
// console.log("validAnagram('qwerty', 'qeywrt') === true", validAnagram('qwerty', 'qeywrt') === true)
// console.log("validAnagram('texttwisttime', 'timetwisttext') === true", validAnagram('texttwisttime', 'timetwisttext') === true)
// console.log("validAnagram('', '') === true", validAnagram('', '') === true)
// console.log("validAnagram('aaz', 'zza') === false", validAnagram('aaz', 'zza') === false)
// console.log("validAnagram('rat', 'car') === true", validAnagram('rat', 'car') === false)
// console.log("validAnagram('awesome', 'awesom') === true", validAnagram('awesome', 'awesom') === false)
// console.log()
// console.log("validAnagram2('anagram', 'nagaram') === true", validAnagram2('anagram', 'nagaram') === true)
// console.log("validAnagram2('qwerty', 'qeywrt') === true", validAnagram2('qwerty', 'qeywrt') === true)
// console.log("validAnagram2('texttwisttime', 'timetwisttext') === true", validAnagram2('texttwisttime', 'timetwisttext') === true)
// console.log("validAnagram2('', '') === true", validAnagram2('', '') === true)
// console.log("validAnagram2('aaz', 'zza') === false", validAnagram2('aaz', 'zza') === false)
// console.log("validAnagram2('rat', 'car') === true", validAnagram2('rat', 'car') === false)
// console.log("validAnagram2('awesome', 'awesom') === true", validAnagram2('awesome', 'awesom') === false)
// console.log()
// console.log("validAnagram3('anagram', 'nagaram') === true", validAnagram3('anagram', 'nagaram') === true)
// console.log("validAnagram3('qwerty', 'qeywrt') === true", validAnagram3('qwerty', 'qeywrt') === true)
// console.log("validAnagram3('texttwisttime', 'timetwisttext') === true", validAnagram3('texttwisttime', 'timetwisttext') === true)
// console.log("validAnagram3('', '') === true", validAnagram3('', '') === true)
// console.log("validAnagram3('aaz', 'zza') === false", validAnagram3('aaz', 'zza') === false)
// console.log("validAnagram3('rat', 'car') === true", validAnagram3('rat', 'car') === false)
// console.log("validAnagram3('awesome', 'awesom') === true", validAnagram3('awesome', 'awesom') === false)

/* #################### Multiple Pointers: O(*n*) #################### */

/* #################### Write a function "sumZero" which accepts a sorted array of integers and returns the first pair where the sum is 0 and return an array that includes both values that sum to zero or undefined #################### */
const sumZero = (sArr: number[]): [number, number] | undefined => {
  if (sArr.length < 2) return undefined;
  let end = sArr.length - 1;
  let start = 0;
  if (sArr[start] > 0 && sArr[end] > 0) return undefined
  if (sArr[start] < 0 && sArr[end] < 0) return undefined

  while (end > start) {
    if (sArr[start] + sArr[end] === 0) return [sArr[start], sArr[end]]
    else if (sArr[start] + sArr[end] > 1) {
      end = end - 1
    }
    else start = start + 1
  }

  return undefined
}

/* ########## Tests ########## */
// console.log("JSON.stringify(sumZero([-3, -2, -1, 0, 1, 2, 3])) === JSON.stringify([-3, 3])", JSON.stringify(sumZero([-3, -2, -1, 0, 1, 2, 3])) === JSON.stringify([-3, 3]))
// console.log("sumZero([-2, -1, 0, 3]) === undefined", sumZero([-2, -1, 0, 3]) === undefined)
// console.log("sumZero([1, 2, 3]) === undefined", sumZero([1, 2, 3]) === undefined)

/* #################### Write a function "countUniqueValues" which accepts a sorted array and returns the count of the unique elements in the array #################### */

const countUniqueValues = (sArr: number[]): number => {
  let lastUnique;
  let count = 0;

  for (let index = 0; index <= sArr.length - 1; index++) {
    if (sArr[index] !== lastUnique) {
      lastUnique = sArr[index];
      count++
    }
  }

  return count;
}


const countUniqueValues2 = (sArr: number[]): number => {
  let i = 0;
  let j = 0;

  // move j ahead. if it's a new value, move i forward and place the value into array[i]
  for (let k = 0; k < sArr.length; k++) {
    j++;
    if (sArr[j] !== sArr[i]) {
      i++
      sArr[i] = sArr[j]
    }
  }
  // the quantity of unique values is i
  // can slice the array for the unique values
  // console.log(sArr.slice(0, i));
  return i;
};

const countUniqueValues3 = (sArr: number[]): number => {
  if (sArr.length === 0) return 0;
  let i = 0;

  // move j ahead. if it's a new value, move i forward and place the value into array[i]
  for (let j = 1; j < sArr.length; j++) {
    if (sArr[j] !== sArr[i]) {
      i++
      sArr[i] = sArr[j]
    }
  }
  // the quantity of unique values is i
  // can slice the array for the unique values
  // console.log(sArr.slice(0, i + 1))
  return i + 1;
};


/* ########## Tests ########## */
// console.log("countUniqueValues([1,1,1,1,1,2]) === 2", countUniqueValues([1,1,1,1,1,2]) === 2)
// console.log("countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) === 7", countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) === 7)
// console.log("countUniqueValues([]) === 0", countUniqueValues([]) === 0)
// console.log("countUniqueValues([-2,-1,-1,-0,1]) === 4", countUniqueValues([-2,-1,-1,-0,1]) === 4)
// console.log()
// console.log("countUniqueValues([4]) === 1", countUniqueValues([4]) === 1)

// console.log("countUniqueValues2([1,1,1,1,1,2]) === 2", countUniqueValues2([1,1,1,1,1,2]) === 2)
// console.log("countUniqueValues2([1,2,3,4,4,4,7,7,12,12,13]) === 7", countUniqueValues2([1,2,3,4,4,4,7,7,12,12,13]) === 7)
// console.log("countUniqueValues2([]) === 0", countUniqueValues2([]) === 0)
// console.log("countUniqueValues2([-2,-1,-1,-0,1]) === 4", countUniqueValues2([-2,-1,-1,-0,1]) === 4)
// console.log("countUniqueValues2([4]) === 1", countUniqueValues2([4]) === 1)

// console.log()
// console.log("countUniqueValues3([1,1,1,1,1,2]) === 2", countUniqueValues3([1,1,1,1,1,2]) === 2)
// console.log("countUniqueValues3([1,2,3,4,4,4,7,7,12,12,13]) === 7", countUniqueValues3([1,2,3,4,4,4,7,7,12,12,13]) === 7)
// console.log("countUniqueValues3([]) === 0", countUniqueValues3([]) === 0)
// console.log("countUniqueValues3([-2,-1,-1,-0,1]) === 4", countUniqueValues3([-2,-1,-1,-0,1]) === 4)
// console.log("countUniqueValues3([4]) === 1", countUniqueValues3([4]) === 1)


/* #################### Write a function which accepts a sorted array and returns an array of the unique values #################### */
const returnUniqueValues = (sArr: number[]): number[] => {
  let newArr = [] as number[];

  sArr.forEach(num => {
    if (newArr[newArr.length - 1] !== num) newArr.push(num)
  })

  return newArr
}

const returnUniqueValues2 = (sArr: number[]): number[] => {
  return sArr.reduce<number[]>((acc, curr) => {
    if (curr !== acc[acc.length - 1]) {acc.push(curr)}
    return acc
  }, [])
}

// console.log("JSON.stringify(returnUniqueValues([1,1,1,1,1,2])) === JSON.stringify([1,2])", JSON.stringify(returnUniqueValues([1,1,1,1,1,2])) === JSON.stringify([1,2]))
// console.log("JSON.stringify(returnUniqueValues([1,2,3,4,4,4,7,7,12,12,13])) === JSON.stringify([1,2,3,4,7,12,13])", JSON.stringify(returnUniqueValues([1,2,3,4,4,4,7,7,12,12,13])) === JSON.stringify([1,2,3,4,7,12,13]))
// console.log("JSON.stringify(returnUniqueValues([])) === JSON.stringify([])", JSON.stringify(returnUniqueValues([])) === JSON.stringify([]))
// console.log("JSON.stringify(returnUniqueValues([-2,-1,-1,-0,1])) === JSON.stringify([-2,-1,-1,-0,1])", JSON.stringify(returnUniqueValues([-2,-1,-1,-0,1])) === JSON.stringify([-2,-1,-0,1]))
// console.log()
// console.log("JSON.stringify(returnUniqueValues2([1,1,1,1,1,2])) === JSON.stringify([1,2])", JSON.stringify(returnUniqueValues2([1,1,1,1,1,2])) === JSON.stringify([1,2]))
// console.log("JSON.stringify(returnUniqueValues2([1,2,3,4,4,4,7,7,12,12,13])) === JSON.stringify([1,2,3,4,7,12,13])", JSON.stringify(returnUniqueValues2([1,2,3,4,4,4,7,7,12,12,13])) === JSON.stringify([1,2,3,4,7,12,13]))
// console.log("JSON.stringify(returnUniqueValues2([])) === JSON.stringify([])", JSON.stringify(returnUniqueValues2([])) === JSON.stringify([]))
// console.log("JSON.stringify(returnUniqueValues2([-2,-1,-1,-0,1])) === JSON.stringify([-2,-1,-1,-0,1])", JSON.stringify(returnUniqueValues2([-2,-1,-1,-0,1])) === JSON.stringify([-2,-1,-0,1]))


/* #################### Sliding Window #################### */

/* #################### Write a function to find the longest sequence of unique characters #################### */

// general strategy: keep an array of unique characters until the current char
// if that index is above the count of max unique characters, update the count
// return the count at the end
const uniqueCharCount = (str: string): number => {
  let count = 0;
  let unique = []

  // go through each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const indexInUnique = unique.indexOf(char)
    // if it's unique, add it to the unique array
    // if the unique array is longer than the count, update the count
    if (indexInUnique === -1) {
      unique.push(char)
      if (count < unique.length) count += 1
    }
    // else remove all the characters until the duplicate and then add the duplicate (which is now unique) to the end
    else {
      unique.splice(0, indexInUnique + 1)
      unique.push(char)
    }
  }
  return count
}

/* ########## Tests ########## */
// console.log("uniqueCharCount('abcdefghijklmnopqrstuvwxyz') === 26", uniqueCharCount('abcdefghijklmnopqrstuvwxyz') === 26)
// console.log("uniqueCharCount('abbbac') === 3", uniqueCharCount('abbbac') === 3)
// console.log("uniqueCharCount('abbcbaaaaaaddddabcdef') === 6", uniqueCharCount('abbcbaaaaaaddddabcdef') === 6)
// console.log("uniqueCharCount('asdffd3289efefe1') === 7", uniqueCharCount('asdffd3289efefe1') === 7)
// console.log("uniqueCharCount('') === 0", uniqueCharCount('') === 0)
// console.log("uniqueCharCount('3') === 1", uniqueCharCount('3') === 1)

/* #################### Write a function which accepts an array and a number and returns the max sum of n consecutive elements in the array #################### */
const maxSubarraySum = (arr: number[], n: number): number | null => {
  if (arr.length === 0) return null
  if (n > arr.length) return arr.reduce((a, c) => a + c)

  let maxSum = 0;
  let window = arr.slice(0, n);

  // loop the index until it's at the end
  for (let currIndex = n; currIndex < arr.length + 1; currIndex++) {
    // add the window together and if it's the highest number, update the maxCount
    const windowSum = window.reduce((a, c) => a + c)
    if (windowSum > maxSum) maxSum = windowSum;
    // move the window
    window.shift()
    window.push(arr[currIndex])
  }
  return maxSum
}

// first version was inefficient. had a nested loop (for and reduce)
// don't need to redo the entire sum each time. only need to add and subtract the ends
const maxSubarraySum2 = (arr: number[], n: number): number | null => {
  // handle edge cases
  if (arr.length === 0) return null
  if (n > arr.length) return arr.reduce((a, c) => a + c)

  // initialize the max sum and current sum
  let windowSum = 0;
  for (let i = 0; i < n; i++) { windowSum += arr[i] }
  let maxSum = windowSum;

  // loop the index from where the windowSum left off until it's at the end
  for (let i = n; i < arr.length; i++) {
    // calculate the new window sum by adding the current number and subtracting the first number
    windowSum = windowSum + arr[i] - arr[i - n]
    // if the windowSum is bigger than the maxSum, change maxSum to be that value
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

/* ########## Tests ########## */
// console.log("maxSubarraySum([1, 2, 3, 4], 2) === 7", maxSubarraySum([1, 2, 3, 4], 2) === 7)
// console.log("maxSubarraySum([3, 9, 1, 4], 2) === 12", maxSubarraySum([3, 9, 1, 4], 2) === 12)
// console.log("maxSubarraySum([3, 9, 1, 4, 1], 3) === 14", maxSubarraySum([3, 9, 1, 4, 1], 3) === 14)
// console.log("maxSubarraySum([1,2,5,2,8,1,5], 2) === 10", maxSubarraySum([1,2,5,2,8,1,5], 2) === 10)
// console.log("maxSubarraySum([1,2,5,2,8,1,5], 4) === 17", maxSubarraySum([1,2,5,2,8,1,5], 4) === 17)
// console.log("maxSubarraySum([4,2,1,6], 1) === 6", maxSubarraySum([4,2,1,6], 1) === 6)
// console.log("maxSubarraySum([4,2,1,6,2], 4) === 13", maxSubarraySum([4,2,1,6,2], 4) === 13)
// console.log("maxSubarraySum([], 4) === null", maxSubarraySum([], 4) === null)
// console.log("maxSubarraySum([3], 4) === null", maxSubarraySum([3], 4) === 3)
console.log()
console.log("maxSubarraySum2([1, 2, 3, 4], 2) === 7", maxSubarraySum2([1, 2, 3, 4], 2) === 7)
console.log("maxSubarraySum2([3, 9, 1, 4], 2) === 12", maxSubarraySum2([3, 9, 1, 4], 2) === 12)
console.log("maxSubarraySum2([3, 9, 1, 4, 1], 3) === 14", maxSubarraySum2([3, 9, 1, 4, 1], 3) === 14)
console.log("maxSubarraySum2([1,2,5,2,8,1,5], 2) === 10", maxSubarraySum2([1,2,5,2,8,1,5], 2) === 10)
console.log("maxSubarraySum2([1,2,5,2,8,1,5], 4) === 17", maxSubarraySum2([1,2,5,2,8,1,5], 4) === 17)
console.log("maxSubarraySum2([4,2,1,6], 1) === 6", maxSubarraySum2([4,2,1,6], 1) === 6)
console.log("maxSubarraySum2([4,2,1,6,2], 4) === 13", maxSubarraySum2([4,2,1,6,2], 4) === 13)
console.log("maxSubarraySum2([], 4) === null", maxSubarraySum2([], 4) === null)
console.log("maxSubarraySum2([3], 4) === null", maxSubarraySum2([3], 4) === 3)
