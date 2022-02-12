"use strict";
/* ##### Given two positive integers, find out if the two numbers have the same frequency of digits. O(n) time complexity */
// make an object that counts the frequency of each number.
// +1 for num1 and -1 for num2.
const sameFrequency = (num1, num2) => {
    let count = {};
    const n1 = num1.toString();
    const n2 = num2.toString();
    for (let char of n1) {
        count[char] = count[char] + 1 || 1;
    }
    for (let char of n2) {
        if (count[char] < 1 || count[char] === undefined)
            return false;
        count[char] = count[char] - 1;
    }
    return true;
};
/* ########## Tests ########## */
// console.log("sameFrequency(182, 281) === true", sameFrequency(182, 281) === true)
// console.log("sameFrequency(34, 14) === false", sameFrequency(34, 14) === false)
// console.log("sameFrequency(3589578, 5879385) === true", sameFrequency(3589578, 5879385) === true)
// console.log("sameFrequency(22, 222) === false", sameFrequency(22, 222) === false)
/* ##### areThereDuplicates accepts a variable number of args and checks if there are duplicates in them. */
// easiest solution
const areThereDuplicatesEasy = (...args) => {
    return ((new Set(args)).size !== args.length);
};
// practice with freq counter OR multiple pointers pattern
// frequency counter version
const areThereDuplicatesF = (...args) => {
    let counter = {};
    for (let el of args) {
        counter[el] = counter[el] + 1 || 1;
        if (counter[el] > 1)
            return true;
    }
    return false;
};
/* ########## Tests ########## */
// console.log("areThereDuplicatesEasy(1,2,3) === false", areThereDuplicatesEasy(1,2,3) === false)
// console.log("areThereDuplicatesEasy(1,2,2) === true", areThereDuplicatesEasy(1,2,2) === true)
// console.log("areThereDuplicatesEasy('a','b','c', 'a') === true", areThereDuplicatesEasy('a','b','c', 'a') === true)
// console.log()
// console.log("areThereDuplicatesF(1,2,3) === false", areThereDuplicatesF(1,2,3) === false)
// console.log("areThereDuplicatesF(1,2,2) === true", areThereDuplicatesF(1,2,2) === true)
// console.log("areThereDuplicatesF('a','b','c', 'a') === true", areThereDuplicatesF('a','b','c', 'a') === true)
/* ##### averagePair takes a sorted array of integers and a target average. */
// return true if there is at least one pair of values where the pair equals the target average.
const averagePair = (sArr, targetAvg) => {
    if (sArr.length < 2)
        return false;
    let start = 0;
    let end = sArr.length - 1;
    // short circuit if obviously false
    if (sArr[start] > targetAvg || sArr[end] < targetAvg)
        return false;
    const calcAvg = (num1, num2) => (num1 + num2) / 2;
    // loop until start and end meet.
    while (start < end) {
        const avg = calcAvg(sArr[start], sArr[end]);
        // check if average is equal to the target avg
        if (avg === targetAvg)
            return true;
        // if less, move start index forwards
        else if (avg < targetAvg)
            start++;
        // if more, move end index backwards
        else
            end--;
    }
    return false;
};
// console.log("averagePair([1,2,3], 2.5) === true", averagePair([1,2,3], 2.5) === true)
// console.log("averagePair([1,2,3,5,6,7,10,12,19],8) === true", averagePair([1,2,3,5,6,7,10,12,19],8) === true)
// console.log("averagePair([-1,0,3,4,5,6], 4.1) === false", averagePair([-1,0,3,4,5,6], 4.1) === false)
/* ##### areThereDuplicates accepts a variable number of args and checks if there are duplicates in them. */
// isSubsequence which takes in two strings and checks whether the characters in the first forma  subsequence in the second.
const isSubsequence = (sub, str) => {
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
        }
        else {
            // reset the substring index and move the str index to the next occurence of the first letter in the substring
            subI = 0;
            strI = str.indexOf(sub[subI], strI);
            // if there is no further occurence of that letter, there's no substring
            if (strI === -1)
                return false;
        }
    }
    // if the substring has made it to the full length, it exists
    return true;
};
function isSubsequence2(str1, str2) {
    if (str1.length === 0)
        return true;
    if (str2.length === 0)
        return false;
    if (str2[0] === str1[0])
        return isSubsequence2(str1.slice(1), str2.slice(1));
    return isSubsequence2(str1, str2.slice(1));
}
/* ########## Tests ########## */
// console.log("isSubsequence('hello', 'hello world') === true", isSubsequence('hello', 'hello world') === true)
// console.log("isSubsequence('hell', 'hello world') === true", isSubsequence('hell', 'hello world') === true)
// console.log("isSubsequence('orl', 'hell world') === true", isSubsequence('orl', 'hell world') === true)
// console.log("isSubsequence('hello', 'l w') === false", isSubsequence('hello', 'l w') === false)
// console.log("isSubsequence('lo', 'hello world') === true", isSubsequence('lo', 'hello world') === true)
// console.log()
// console.log("isSubsequence2('hello', 'hello world') === true", isSubsequence2('hello', 'hello world') === true)
// console.log("isSubsequence2('hell', 'hello world') === true", isSubsequence2('hell', 'hello world') === true)
// console.log("isSubsequence2('orl', 'hell world') === true", isSubsequence2('orl', 'hell world') === true)
// console.log("isSubsequence2('hello', 'l w') === false", isSubsequence2('hello', 'l w') === false)
// console.log("isSubsequence2('lo', 'hello world') === true", isSubsequence2('lo', 'hello world') === true)
/* ##### find the max sum of a subarray given a specified length */
const maxSubarraySum3 = (arr, n) => {
    if (n > arr.length)
        return null;
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
// console.log("maxSubarraySum3([100,200,300,400], 2) === 700", maxSubarraySum3([100,200,300,400], 2) === 700)
// console.log("maxSubarraySum3([1,4,2,10,23,3,1,0,20], 4) === 39", maxSubarraySum3([1,4,2,10,23,3,1,0,20], 4) === 39)
// console.log("maxSubarraySum3([-3,4, 0, -2, 6, -1], 2) === 5", maxSubarraySum3([-3,4, 0, -2, 6, -1], 2) === 5)
// console.log("maxSubarraySum3([3, -2, 7, -4, 1, -1, 4, -2, 1],2) === 5", maxSubarraySum3([3, -2, 7, -4, 1, -1, 4, -2, 1],2) === 5)
// console.log("maxSubarraySum3([2,3], 3) === null", maxSubarraySum3([2,3], 3) === null)
/* ##### find the min length of a contiguous subarray that is greater than the target */
const minSubarrayLen = (arr, target) => {
    let minCount = Infinity;
    let i = 0;
    let j = 0;
    let sum = arr[0];
    while (i !== arr.length - 1 && j !== arr.length) {
        // if the sum isn't high enough, add j to get a bigger sum
        if (sum < target) {
            j++;
            sum += arr[j];
        }
        else {
            // if it's big enough, update the minimum count
            minCount = Math.min(minCount, j - i + 1);
            // subtract the i's element from the sum and increment it forward
            sum -= arr[i];
            i++;
        }
    }
    // if the minCount is infinity, it means that there was never a sum higher than the target, in which case return null
    if (minCount === Infinity)
        return null;
    return minCount;
};
/* ########## Tests ########## */
// console.log("minSubarrayLen([2,3,1,2,4,3], 7) === 2", minSubarrayLen([2,3,1,2,4,3], 7) === 2)
// console.log("minSubarrayLen([1,4,4], 4) === 1", minSubarrayLen([1,4,4], 4) === 1)
// console.log("minSubarrayLen([1,1,1,1,1,1,1,1], 11) === null", minSubarrayLen([1,1,1,1,1,1,1,1], 11) === null)
// console.log("minSubarrayLen([4,9,10,2], 5) === 1", minSubarrayLen([4,9,10,2], 5) === 1)
// console.log("minSubarrayLen([4,9,3,3,10,2], 5) === 1", minSubarrayLen([4,9,3,3,10,2], 5) === 1)
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
const findLongestSubstring = (str) => {
    let i = 0;
    let maxLength = 0;
    let window = [];
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
        }
        else {
            // if the char is not unique, contract the window to one after the index of the duplicate char
            i = foundIndex + 1;
            window.splice(0, i);
        }
    }
    return maxLength;
};
/* ########## Tests ########## */
console.log("findLongestSubstring('') === 0", findLongestSubstring('') === 0);
console.log("findLongestSubstring('rithmschool') === 7", findLongestSubstring('rithmschool') === 7);
console.log("findLongestSubstring('thisisawesome') === 6", findLongestSubstring('thisisawesome') === 6);
console.log("findLongestSubstring('thecatinthehat') === 7", findLongestSubstring('thecatinthehat') === 7);
console.log("findLongestSubstring('bbbbbb') === 1", findLongestSubstring('bbbbbb') === 1);
console.log("findLongestSubstring('longestsubstring') === 8", findLongestSubstring('longestsubstring') === 8);
console.log("findLongestSubstring('thisishowwedoit') === 6", findLongestSubstring('thisishowwedoit') === 6);
