import {
  sameFrequency,
  areThereDuplicatesEasy,
  areThereDuplicatesF,
  averagePair,
  isSubsequence,
  isSubsequence2,
  maxSubarraySum3,
  minSubarrayLen,
  findLongestSubstring,
} from '../s6_problem_solving_challenges';

test('sameFrequency', () => {
  expect(sameFrequency(182, 281)).toBe(true);
  expect(sameFrequency(34, 14)).toBe(false);
  expect(sameFrequency(3589578, 5879385)).toBe(true);
  expect(sameFrequency(22, 222)).toBe(false);
});

test('areThereDuplicatesEasy', () => {
  expect(areThereDuplicatesEasy(1, 2, 3)).toBe(false);
  expect(areThereDuplicatesEasy(1, 2, 2)).toBe(true);
  expect(areThereDuplicatesEasy('a', 'b', 'c', 'a')).toBe(true);

  expect(areThereDuplicatesF(1, 2, 3)).toBe(false);
  expect(areThereDuplicatesF(1, 2, 2)).toBe(true);
  expect(areThereDuplicatesF('a', 'b', 'c', 'a')).toBe(true);
});

test('averagePair', () => {
  expect(averagePair([1, 2, 3], 2.5)).toBe(true);
  expect(averagePair([1, 2, 3, 5, 6, 7, 10, 12, 19], 8)).toBe(true);
  expect(averagePair([-1, 0, 3, 4, 5, 6], 4.1)).toBe(false);
});

test('isSubsequence', () => {
  expect(isSubsequence('hello', 'hello world')).toBe(true);
  expect(isSubsequence('hell', 'hello world')).toBe(true);
  expect(isSubsequence('orl', 'hell world')).toBe(true);
  expect(isSubsequence('hello', 'l w')).toBe(false);
  expect(isSubsequence('lo', 'hello world')).toBe(true);

  expect(isSubsequence2('hello', 'hello world')).toBe(true);
  expect(isSubsequence2('hell', 'hello world')).toBe(true);
  expect(isSubsequence2('orl', 'hell world')).toBe(true);
  expect(isSubsequence2('hello', 'l w')).toBe(false);
  expect(isSubsequence2('lo', 'hello world')).toBe(true);
});

test('maxSubarraySum', () => {
  expect(maxSubarraySum3([100, 200, 300, 400], 2)).toBe(700);
  expect(maxSubarraySum3([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)).toBe(39);
  expect(maxSubarraySum3([-3, 4, 0, -2, 6, -1], 2)).toBe(5);
  expect(maxSubarraySum3([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)).toBe(5);
  expect(maxSubarraySum3([2, 3], 3)).toBe(null);
});

test('minSubarrayLen', () => {
  expect(minSubarrayLen([2, 3, 1, 2, 4, 3], 7)).toBe(2);
  expect(minSubarrayLen([1, 4, 4], 4)).toBe(1);
  expect(minSubarrayLen([1, 1, 1, 1, 1, 1, 1, 1], 11)).toBe(null);
  expect(minSubarrayLen([4, 9, 10, 2], 5)).toBe(1);
  expect(minSubarrayLen([4, 9, 3, 3, 10, 2], 5)).toBe(1);
});

test('findLongestSubstring', () => {
  expect(findLongestSubstring('')).toBe(0);
  expect(findLongestSubstring('rithmschool')).toBe(7);
  expect(findLongestSubstring('thisisawesome')).toBe(6);
  expect(findLongestSubstring('thecatinthehat')).toBe(7);
  expect(findLongestSubstring('bbbbbb')).toBe(1);
  expect(findLongestSubstring('longestsubstring')).toBe(8);
  expect(findLongestSubstring('thisishowwedoit')).toBe(6);
});
