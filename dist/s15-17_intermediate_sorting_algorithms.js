"use strict";
const mergeTwoSortedArrays = (arr1, arr2) => {
    let smallestIndex1 = 0;
    let smallestIndex2 = 0;
    let mergedSection = new Array(arr1.length + arr2.length);
    for (let i = 0; i < mergedSection.length; i++) {
        if (arr1[smallestIndex1] < arr2[smallestIndex2] || arr2[smallestIndex2] === undefined) {
            mergedSection[i] = arr1[smallestIndex1];
            smallestIndex1++;
        }
        else {
            mergedSection[i] = arr2[smallestIndex2];
            smallestIndex2++;
        }
    }
    return mergedSection;
};
const mergeSort = (arr) => {
    // split the array in two
    let arr2 = arr.splice(Math.ceil(arr.length / 2));
    // keep splitting recursively until they're at a single element
    if (arr2.length > 1)
        arr2 = mergeSort(arr2);
    if (arr.length > 1)
        arr = mergeSort(arr);
    // console.log(`MERGING ${arr} AND ${arr2}`)
    return mergeTwoSortedArrays(arr, arr2);
};
const mergeSort2 = (arr) => {
    // keep splitting recursively until they're at a single element
    if (arr.length === 1)
        return arr;
    const mid = Math.ceil(arr.length / 2);
    const arr1 = mergeSort2(arr.slice(0, mid));
    const arr2 = mergeSort2(arr.slice(mid));
    // console.log(`MERGING ${arr1} AND ${arr2}`)
    return mergeTwoSortedArrays(arr1, arr2);
};
// mutatesArray by placing everything less than the pivot to the left and greater than the right
// returns the index of the pivot
const pivotHelper = (arr, start, end) => {
    const pivotIndex = start;
    let lessThanCount = 0;
    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < arr[pivotIndex]) {
            lessThanCount++;
            [arr[i], arr[pivotIndex + lessThanCount]] = [arr[pivotIndex + lessThanCount], arr[i]];
        }
    }
    let newPivotIndex = pivotIndex + lessThanCount;
    [arr[pivotIndex], arr[newPivotIndex]] = [arr[newPivotIndex], arr[pivotIndex]];
    return newPivotIndex;
};
const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right)
        return arr;
    const pivotIndex = pivotHelper(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
    return arr;
};
console.log("quickSort([1,4,99,32,43,2,43,6,9,7,11])", quickSort([1, 4, 99, 32, 43, 2, 43, 6, 9, 7, 11]));
console.log("mergeSort([1,4,99,32,43,2,43,6,9,7,11])", mergeSort([1, 4, 99, 32, 43, 2, 43, 6, 9, 7, 11]));
