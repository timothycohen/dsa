import {
  factorial,
  factIt,
  collectAllOdds,
  power,
  powerIt,
  productOfArray,
  recursiveRange,
  findFibNum,
  buildFib,
  fib,
  reverseStrArray,
  reverseStrIt,
  reverseStrRec,
  reverseEZ,
  isPalindrome,
  isOdd,
  someRecursive,
  someRecursiveEZ,
  flatten,
  capitalizeFirst,
  capitalizeWordsEZ,
  capitalizeWords,
  nestedEvenSum,
  stringify,
  stringify2,
  collectStrings,
} from '../s7-9_recursion';

test('factorials', () => {
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(2);
  expect(factorial(3)).toBe(6);
  expect(factorial(4)).toBe(24);
  expect(factorial(5)).toBe(120);
  expect(factorial(6)).toBe(720);
  expect(factorial(7)).toBe(5040);
  expect(factIt(1)).toBe(1);
  expect(factIt(2)).toBe(2);
  expect(factIt(3)).toBe(6);
  expect(factIt(4)).toBe(24);
  expect(factIt(5)).toBe(120);
  expect(factIt(6)).toBe(720);
  expect(factIt(7)).toBe(5040);
});

test('collection', () => {
  expect(collectAllOdds([1, 2, 3, 4, 5, 6, 7, 8, 12, 25, 31])).toStrictEqual([1, 3, 5, 7, 25, 31]);
  expect(collectAllOdds([-234, -32, -33, -5, 2, 0, 17, 23])).toStrictEqual([-33, -5, 17, 23]);
});

test('power', () => {
  expect(power(3, 4)).toBe(81);
  expect(powerIt(3, 4)).toBe(81);

  expect(power(-5, 3)).toBe(-125);
  expect(powerIt(-5, 3)).toBe(-125);
});

test('productOfArray', () => {
  expect(productOfArray([1, 2, 3])).toBe(6);
  expect(productOfArray([1, 2, 3, 10])).toBe(60);
});

test('recursiveRange', () => {
  expect(recursiveRange(6)).toBe(21);
  expect(recursiveRange(10)).toBe(55);
});

test('Fibonacci', () => {
  expect(findFibNum(4)).toBe(3);
  expect(findFibNum(10)).toBe(55);
  expect(findFibNum(28)).toBe(317811);
  expect(findFibNum(35)).toBe(9227465);

  expect(buildFib(4)).toBe(3);
  expect(buildFib(10)).toBe(55);
  expect(buildFib(28)).toBe(317811);
  expect(buildFib(35)).toBe(9227465);

  expect(fib(4)).toBe(3);
  expect(fib(10)).toBe(55);
  expect(fib(28)).toBe(317811);
  expect(fib(35)).toBe(9227465);
});

test('Strings', () => {
  expect(reverseStrArray('rithmschool')).toBe('loohcsmhtir');
  expect(reverseStrIt('rithmschool')).toBe('loohcsmhtir');
  expect(reverseStrRec('rithmschool')).toBe('loohcsmhtir');
  expect(reverseEZ('rithmschool')).toBe('loohcsmhtir');
  expect(isPalindrome('awesome')).toBe(false);
  expect(isPalindrome('foobar')).toBe(false);
  expect(isPalindrome('tacocat')).toBe(true);
  expect(isPalindrome('amanaplanacanalpanama')).toBe(true);
  expect(isPalindrome('amanaplanacanalpandemonium')).toBe(false);
});

test('someRecursive', () => {
  expect(someRecursiveEZ([1, 2, 3, 4], isOdd)).toBe(true);
  expect(someRecursiveEZ([4, 6, 8, 9], isOdd)).toBe(true);
  expect(someRecursiveEZ([4, 6, 8], isOdd)).toBe(false);
  expect(someRecursiveEZ([4, 6, 8], val => val > 10)).toBe(false);
  expect(someRecursive([1, 2, 3, 4], isOdd)).toBe(true);
  expect(someRecursive([4, 6, 8, 9], isOdd)).toBe(true);
  expect(someRecursive([4, 6, 8], isOdd)).toBe(false);
  expect(someRecursive([4, 6, 8], val => val > 10)).toBe(false);
});

test('flatten', () => {
  expect(flatten([1, 2, 3, [4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
  expect(flatten([1, [2, [3, 4], [[5]]]])).toStrictEqual([1, 2, 3, 4, 5]);
  expect(flatten([[1], [2], [3]])).toStrictEqual([1, 2, 3]);
  expect(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])).toStrictEqual([1, 2, 3]);
});

test('capitalize', () => {
  expect(capitalizeFirst(['car', 'taco', 'banana'])).toStrictEqual(['Car', 'Taco', 'Banana']);
  expect(capitalizeWordsEZ(['i', 'am', 'learning', 'recursion'])).toStrictEqual([
    'I',
    'AM',
    'LEARNING',
    'RECURSION',
  ]);
  expect(capitalizeWords(['i', 'am', 'learning', 'recursion'])).toStrictEqual([
    'I',
    'AM',
    'LEARNING',
    'RECURSION',
  ]);
});

test('nestedEvenSum', () => {
  const obj1 = {
    outer: 2,
    obj: {
      inner: 2,
      otherObj: {
        superInner: 2,
        notANumber: true,
        alsoNotANumber: 'yup',
      },
    },
  };

  const obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' },
  };

  expect(nestedEvenSum(obj1)).toStrictEqual(6);
  expect(nestedEvenSum(obj2)).toStrictEqual(10);
});

test('stringify', () => {
  const obj = {
    num: 1,
    test: [{ wow: 'okay', really: 'yes', number: 1000 }],
    data: {
      val: 4,
      info: {
        isRight: true,
        random: 66,
      },
    },
  };

  const answer = {
    num: '1',
    test: [{ wow: 'okay', really: 'yes', number: '1000' }],
    data: {
      val: '4',
      info: {
        isRight: true,
        random: '66',
      },
    },
  };

  expect(stringify(obj)).toStrictEqual(answer);
  expect(stringify2(obj)).toStrictEqual(answer);
});

test('collectStrings', () => {
  const collectObj = {
    stuff: 'foo',
    data: {
      val: {
        thing: {
          info: 'bar',
          moreInfo: {
            evenMoreInfo: {
              weMadeIt: 'baz',
            },
          },
        },
      },
    },
  };

  expect(collectStrings(collectObj)).toStrictEqual(['foo', 'bar', 'baz']);
});
