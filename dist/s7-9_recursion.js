"use strict";
const countDown = (num) => {
    if (num < 0)
        return;
    console.log(num);
    countDown(num - 1);
};
const factorial = (num) => {
    if (num === 0)
        return num;
    return num * factorial(num - 1);
};
const factIt = (num) => {
    let sum = 1;
    for (let i = 1; i <= num; i++) {
        sum *= i;
    }
    return sum;
};
// console.log(factorial(15) === factIt(15))
const collectAllOdds = (arr) => {
    let list = [];
    const helper = (newArr) => {
        if (newArr.length === 0)
            return;
        const num = newArr.pop();
        if (num % 2 !== 0)
            list.push(num);
        return helper(newArr);
    };
    helper(arr);
    return list;
};
// console.log(collectAllOdds([1,2,3,4,5,6,7,8,12, 25, 31]))
// write Math.power() : accept a base/exponent and return base^exponent
// don't worry about negative bases or exponents
const powerIt = (base, exp) => {
    let answer = 1;
    for (let i = 0; i < exp; i++) {
        answer *= base;
    }
    return answer;
};
const power = (base, exp) => {
    if (exp === 0)
        return 1;
    return base * power(base, exp - 1);
};
// console.log(power(3, 4))
const productOfArray = (arr) => {
    if (arr.length === 0)
        return 1;
    return arr.pop() * productOfArray(arr);
};
// console.log("productOfArray([1,2,3]) === 6", productOfArray([1,2,3]) === 6)
// console.log("productOfArray([1,2,3,10]) === 60", productOfArray([1,2,3,10]) === 60)
const recursiveRange = (num) => {
    if (num === 1)
        return num;
    return num + recursiveRange(num - 1);
};
// console.log("recursiveRange(6) === 21", recursiveRange(6) === 21)
// console.log("recursiveRange(10) === 55", recursiveRange(10) === 55)
const findFibNum = (position) => {
    if (position === 0 || position === 1)
        return 1;
    let prev = [1, 1];
    let answer = 1;
    for (let i = 2; i < position; i++) {
        answer = prev[0] + prev[1];
        prev = [prev[1], answer];
    }
    return answer;
};
const buildFib = (position) => {
    let arr = [1, 1];
    for (let i = 1; i < position - 1; i++) {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    }
    console.log(arr);
    return arr[arr.length - 1];
};
const fib = (position) => {
    if (position <= 1)
        return position;
    return fib(position - 1) + fib(position - 2);
};
// console.log("findFibNum(4) === 3", findFibNum(4) === 3)
// console.log("findFibNum(10) === 55", findFibNum(10) === 55)
// console.log("findFibNum(28) === 317811", findFibNum(28) === 317811)
// console.log("findFibNum(35) === 9227465", findFibNum(35) === 9227465)
// console.log("buildFib(4) === 3", buildFib(4) === 3)
// console.log("buildFib(10) === 55", buildFib(10) === 55)
// console.log("buildFib(28) === 317811", buildFib(28) === 317811)
// console.log("buildFib(35) === 9227465", buildFib(35) === 9227465)
// console.log("fib(4) === 3", fib(4) === 3)
// console.log("fib(10) === 55", fib(10) === 55)
// console.log("fib(28) === 317811", fib(28) === 317811)
// console.log("fib(35) === 9227465", fib(35) === 9227465)
const reverseStrArray = (str) => {
    return str.split('').reverse().join('');
};
const reverseStrIt = (str) => {
    let answer = str.split('');
    let start = 0;
    let end = answer.length - 1;
    // keep swapping the first and last and moving in until reaching the middle
    while (true) {
        const temp = answer[start];
        answer[start] = answer[end];
        answer[end] = temp;
        start++;
        end--;
        if (start > end)
            break;
    }
    return answer.join('');
};
const reverseStrRec = (str) => {
    let arr = str.split('');
    const swap = (indices) => {
        if (indices[1] <= indices[0])
            return indices;
        const temp = arr[indices[0]];
        arr[indices[0]] = arr[indices[1]];
        arr[indices[1]] = temp;
        return swap([indices[0] + 1, indices[1] - 1]);
    };
    swap([0, arr.length - 1]);
    return arr.join('');
};
function reverseEZ(str) {
    if (str.length <= 1)
        return str;
    return reverse(str.slice(1)) + str[0];
}
// console.log("reverseStrArray('rithmschool') === 'loohcsmhtir'", reverseStrArray('rithmschool') === 'loohcsmhtir')
// console.log("reverseStrIt('rithmschool') === 'loohcsmhtir'", reverseStrIt('rithmschool') === 'loohcsmhtir')
// console.log("reverseStrRec('rithmschool') === 'loohcsmhtir'", reverseStrRec('rithmschool') === 'loohcsmhtir')
function isPalindrome(str) {
    if (str.length === 0)
        return false;
    let arr = str.split('');
    // keep moving the window in towards itself and return false if ever they don't match
    const helper = (i, j) => {
        if (i >= j)
            return true;
        if (arr[i] !== arr[j])
            return false;
        return helper(i + 1, j - 1);
    };
    return helper(0, arr.length - 1);
}
// console.log("isPalindrome('awesome') === false", isPalindrome('awesome') === false)
// console.log("isPalindrome('foobar') === false", isPalindrome('foobar') === false)
// console.log("isPalindrome('tacocat') === true", isPalindrome('tacocat') === true)
// console.log("isPalindrome('amanaplanacanalpanama') === true", isPalindrome('amanaplanacanalpanama') === true)
// console.log("isPalindrome('amanaplanacanalpandemonium') === false", isPalindrome('amanaplanacanalpandemonium') === false)
const isOdd = (val) => val % 2 !== 0;
// easy one liner with reduce
// const someRecursive = (arr, cb) => arr.reduce((a, c) => a || cb(c), false)
// return true if any of the callbacks return true
function someRecursive(arr, cb) {
    if (arr.length === 0)
        return false;
    return cb(arr.pop()) || someRecursive(arr, cb);
}
// console.log("someRecursive([1,2,3,4], isOdd) === true", someRecursive([1,2,3,4], isOdd) === true)
// console.log("someRecursive([4,6,8,9], isOdd) === true", someRecursive([4,6,8,9], isOdd) === true)
// console.log("someRecursive([4,6,8], isOdd) === false", someRecursive([4,6,8], isOdd) === false)
// console.log("someRecursive([4,6,8], val => val > 10) === false", someRecursive([4,6,8], val => val > 10) === false)
function flatten(arr) {
    let answer = [];
    // if it's not an array, push it to answer and return. otherwise, call recursively on each element
    const helper = (array) => {
        if (!Array.isArray(array))
            return answer.push(array);
        array.forEach(helper);
    };
    helper(arr);
    return answer;
}
// console.log("JSON.stringify(flatten([1, 2, 3, [4, 5] ])) === JSON.stringify([1, 2, 3, 4, 5])", JSON.stringify(flatten([1, 2, 3, [4, 5] ])) === JSON.stringify([1, 2, 3, 4, 5]))
// console.log("JSON.stringify(flatten([1, [2, [3, 4], [[5]]]])) === JSON.stringify([1, 2, 3, 4, 5])", JSON.stringify(flatten([1, [2, [3, 4], [[5]]]])) === JSON.stringify([1, 2, 3, 4, 5]))
// console.log("JSON.stringify(flatten([[1],[2],[3]])) === JSON.stringify([1,2,3])", JSON.stringify(flatten([[1],[2],[3]])) === JSON.stringify([1,2,3]))
// console.log("JSON.stringify(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])) === JSON.stringify([1,2,3)", JSON.stringify(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])) === JSON.stringify([1,2,3]))
function capitalizeFirst(arr) {
    return arr.map(s => s[0].toUpperCase() + s.slice(1));
}
// console.log("JSON.stringify(capitalizeFirst(['car','taco','banana'])) === JSON.stringify(['Car','Taco','Banana'])", JSON.stringify(capitalizeFirst(['car','taco','banana'])) === JSON.stringify(['Car','Taco','Banana']))
function nestedEvenSum(obj) {
    let total = 0;
    // recursively check elements. if the el is an object, get values and repeat
    // if it's a number, add it to the total and return
    const helper = (el) => {
        if (typeof el === 'number' && el % 2 === 0) {
            total += el;
            return;
        }
        if (typeof el === 'object' && el !== null) {
            Object.values(el).forEach(helper);
        }
    };
    helper(obj);
    return total;
}
const obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
        }
    }
};
const obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' }
};
// console.log("nestedEvenSum(obj1) === 6", nestedEvenSum(obj1) === 6)
// console.log("nestedEvenSum(obj2) === 10", nestedEvenSum(obj2) === 10)
// const capitalizeWords = (arr: string[]): string[] => arr.map(x => x.toUpperCase())
const capitalizeWords = (arr) => {
    const helper = (str) => {
        if (str.length === 1)
            return str[0].toUpperCase();
        return str[0].toUpperCase().concat(helper(str.slice(1)));
    };
    return arr.map(helper);
};
// console.log(capitalizeWords(['i', 'am', 'learning', 'recursion']))
// console.log("JSON.stringify(capitalizeWords(['i', 'am', 'learning', 'recursion'])) === JSON.stringify(['I', 'AM', 'LEARNING', 'RECURSION'])", JSON.stringify(capitalizeWords(['i', 'am', 'learning', 'recursion'])) === JSON.stringify(['I', 'AM', 'LEARNING', 'RECURSION']))
// warn this passed my tests, but didn't pass the online test
function stringify(object) {
    return Object.fromEntries(Object
        .entries(object)
        .map(([k, v]) => {
        if (typeof v === 'number') {
            return [k, v.toString()];
        }
        if (Array.isArray(v)) {
            return [k, v.map(stringify)];
        }
        if (typeof v === 'object') {
            return [k, stringify(v)];
        }
        return [k, v];
    }));
}
const stringify2 = (object) => {
    let newObj = {};
    const helper = (obj) => {
        if (Array.isArray(obj))
            return obj.forEach(helper);
        for (let k in obj) {
            if (typeof obj[k] === 'number') {
                newObj[k] = obj[k].toString();
            }
            else if (typeof obj[k] === 'object') {
                newObj[k] = stringify2(obj[k]);
            }
            else {
                newObj[k] = obj[k];
            }
        }
    };
    helper(object);
    return newObj;
};
let obj = {
    num: 1,
    test: [
        { wow: 'okay', really: 'yes', number: 1000 }
    ],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
};
let answer = {
    num: "1",
    test: [
        { wow: 'okay', really: 'yes', number: "1000" }
    ],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
};
// console.log("JSON.stringify(stringifyNumbers(obj)) === JSON.stringify(answer)", JSON.stringify(stringify(obj)) === JSON.stringify(answer))
// console.log("JSON.stringify(stringify2(obj)) === JSON.stringify(answer)", JSON.stringify(stringify2(obj)) === JSON.stringify(answer))
const collectStrings = (obj) => {
    let answer = [];
    const helper = (val) => {
        if (typeof val === "string") {
            answer.push(val);
            return;
        }
        if (typeof val !== "object" || val === null)
            return;
        Object.entries(val).forEach(([k, v]) => {
            helper(v);
        });
    };
    helper(obj);
    return answer;
};
const collectObj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
};
// console.log(`collectStrings(collectObj) === ["foo", "bar", "baz"]`, JSON.stringify(collectStrings(collectObj)) === JSON.stringify(["foo", "bar", "baz"]))
