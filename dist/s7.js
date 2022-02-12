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
console.log("reverseStrArray('rithmschool') === 'loohcsmhtir'", reverseStrArray('rithmschool') === 'loohcsmhtir');
console.log("reverseStrIt('rithmschool') === 'loohcsmhtir'", reverseStrIt('rithmschool') === 'loohcsmhtir');
console.log("reverseStrRec('rithmschool') === 'loohcsmhtir'", reverseStrRec('rithmschool') === 'loohcsmhtir');
