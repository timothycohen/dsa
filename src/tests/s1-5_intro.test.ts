import {
  reverse,
  reverse2,
  reverse3,
  countToNIt,
  countToN2,
  allPairs,
  countAllChars,
  countAllChars2,
  countAllChars3,
  countAllChars4,
  same,
  validAnagram,
  validAnagram2,
  validAnagram3,
  sumZero,
  countUniqueValues,
  countUniqueValues2,
  countUniqueValues3,
  returnUniqueValues,
  returnUniqueValues2,
  uniqueCharCount,
  maxSubarraySum,
  maxSubarraySum2,
} from '../s1-5_intro';

test('reverse', () => {
  expect(reverse('hi there')).toBe('ereht ih');
  expect(reverse2('hi there')).toBe('ereht ih');
  expect(reverse3('hi there')).toBe('ereht ih');
});

test('reverse', () => {
  const t1 = performance.now();
  expect(countToNIt(3425326)).toBe(5866430815801);
  const t2 = performance.now();
  expect(countToN2(3425326)).toBe(5866430815801);
  const t3 = performance.now();
  expect(t2 - t1).toBeGreaterThan(t3 - t2);
});

test('allPairs', () => {
  expect(allPairs(7)).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
  ]);
});

test('countAllChars', () => {
  const answer = { '0': 1, '2': 1, '3': 3, '9': 1, a: 1, d: 2, f: 2, j: 2, k: 1, s: 1 };
  expect(countAllChars('  fdsakj33209jf d!;3!')).toStrictEqual(answer);
  expect(countAllChars2('  fdsakj33209jf d!;3!')).toStrictEqual(answer);
  expect(countAllChars3('  fdsakj33209jf d!;3!')).toStrictEqual(answer);
  expect(countAllChars4('  fdsakj33209jf d!;3!')).toStrictEqual(answer);
});

test('same', () => {
  expect(same([1, 2, 3, 4, 5], [1, 4, 9, 16, 25])).toBe(true);
  // different lengths (doesn't include 5 squared)
  expect(same([1, 2, 3, 4, 5], [1, 4, 9, 16])).toBe(false);
  // different lengths (includes subset and extra number)
  expect(same([1, 2, 3, 4], [1, 4, 9, 16, 25])).toBe(false);
  // order doesn't matter
  expect(same([1, 5, 2, 4, 3], [16, 1, 4, 9, 25])).toBe(true);
  // duplicates are okay
  expect(same([1, 5, 2, 4, 3, 5], [25, 16, 1, 4, 9, 25])).toBe(true);
  // frequency matters
  expect(same([1, 5, 2, 4], [1, 4, 25, 4, 25])).toBe(false);
});

test('validAnagram', () => {
  expect(validAnagram('anagram', 'nagaram')).toBe(true);
  expect(validAnagram('qwerty', 'qeywrt')).toBe(true);
  expect(validAnagram('texttwisttime', 'timetwisttext')).toBe(true);
  // empty strings are valid
  expect(validAnagram('', '')).toBe(true);
  // frequency matters
  expect(validAnagram('aaz', 'zza')).toBe(false);
  // different chars matter
  expect(validAnagram('rat', 'car')).toBe(false);
  // frequency (length) matters
  expect(validAnagram('awesome', 'awesom')).toBe(false);

  expect(validAnagram2('anagram', 'nagaram')).toBe(true);
  expect(validAnagram2('qwerty', 'qeywrt')).toBe(true);
  expect(validAnagram2('texttwisttime', 'timetwisttext')).toBe(true);
  expect(validAnagram2('', '')).toBe(true);
  expect(validAnagram2('aaz', 'zza')).toBe(false);
  expect(validAnagram2('rat', 'car')).toBe(false);
  expect(validAnagram2('awesome', 'awesom')).toBe(false);

  expect(validAnagram3('anagram', 'nagaram')).toBe(true);
  expect(validAnagram3('qwerty', 'qeywrt')).toBe(true);
  expect(validAnagram3('texttwisttime', 'timetwisttext')).toBe(true);
  expect(validAnagram3('', '')).toBe(true);
  expect(validAnagram3('aaz', 'zza')).toBe(false);
  expect(validAnagram3('rat', 'car')).toBe(false);
  expect(validAnagram3('awesome', 'awesom')).toBe(false);
});

test('sumZero', () => {
  expect(sumZero([-3, -2, -1, 0, 1, 2, 3])).toStrictEqual([-3, 3]);
  expect(sumZero([-2, -1, 0, 3])).toStrictEqual(undefined);
  expect(sumZero([1, 2, 3])).toStrictEqual(undefined);
});

test('countUniqueValues', () => {
  expect(countUniqueValues([1, 1, 1, 1, 1, 2])).toBe(2);
  expect(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7);
  expect(countUniqueValues([])).toBe(0);
  expect(countUniqueValues([-2, -1, -1, -0, 1])).toBe(4);
  expect(countUniqueValues([4])).toBe(1);

  expect(countUniqueValues2([1, 1, 1, 1, 1, 2])).toBe(2);
  expect(countUniqueValues2([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7);
  expect(countUniqueValues2([])).toBe(0);
  expect(countUniqueValues2([-2, -1, -1, -0, 1])).toBe(4);
  expect(countUniqueValues2([4])).toBe(1);

  expect(countUniqueValues3([1, 1, 1, 1, 1, 2])).toBe(2);
  expect(countUniqueValues3([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7);
  expect(countUniqueValues3([])).toBe(0);
  expect(countUniqueValues3([-2, -1, -1, -0, 1])).toBe(4);
  expect(countUniqueValues3([4])).toBe(1);
});

test('unique', () => {
  expect(returnUniqueValues([1, 1, 1, 1, 1, 2])).toStrictEqual([1, 2]);
  expect(returnUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toStrictEqual([
    1, 2, 3, 4, 7, 12, 13,
  ]);
  expect(returnUniqueValues([])).toStrictEqual([]);
  expect(returnUniqueValues([-2, -1, -1, -0, 1])).toStrictEqual([-2, -1, -0, 1]);
  expect(returnUniqueValues2([1, 1, 1, 1, 1, 2])).toStrictEqual([1, 2]);
  expect(returnUniqueValues2([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toStrictEqual([
    1, 2, 3, 4, 7, 12, 13,
  ]);
  expect(returnUniqueValues2([])).toStrictEqual([]);
  expect(returnUniqueValues2([-2, -1, -1, -0, 1])).toStrictEqual([-2, -1, -0, 1]);

  expect(uniqueCharCount('abcdefghijklmnopqrstuvwxyz')).toBe(26);
  expect(uniqueCharCount('abbbac')).toBe(3);
  expect(uniqueCharCount('abbcbaaaaaaddddabcdef')).toBe(6);
  expect(uniqueCharCount('asdffd3289efefe1')).toBe(7);
  expect(uniqueCharCount('')).toBe(0);
  expect(uniqueCharCount('3')).toBe(1);
});

test('maxSubarraySum', () => {
  expect(maxSubarraySum([1, 2, 3, 4], 2)).toBe(7);
  expect(maxSubarraySum([3, 9, 1, 4], 2)).toBe(12);
  expect(maxSubarraySum([3, 9, 1, 4, 1], 3)).toBe(14);
  expect(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)).toBe(10);
  expect(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)).toBe(17);
  expect(maxSubarraySum([4, 2, 1, 6], 1)).toBe(6);
  expect(maxSubarraySum([4, 2, 1, 6, 2], 4)).toBe(13);
  expect(maxSubarraySum([], 4)).toBe(null);
  expect(maxSubarraySum([3], 4)).toBe(3);

  expect(maxSubarraySum2([1, 2, 3, 4], 2)).toBe(7);
  expect(maxSubarraySum2([3, 9, 1, 4], 2)).toBe(12);
  expect(maxSubarraySum2([3, 9, 1, 4, 1], 3)).toBe(14);
  expect(maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 2)).toBe(10);
  expect(maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 4)).toBe(17);
  expect(maxSubarraySum2([4, 2, 1, 6], 1)).toBe(6);
  expect(maxSubarraySum2([4, 2, 1, 6, 2], 4)).toBe(13);
  expect(maxSubarraySum2([], 4)).toBe(null);
  expect(maxSubarraySum2([3], 4)).toBe(3);
});
