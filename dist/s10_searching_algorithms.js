"use strict";
const indexOf = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val)
            return i;
    }
    return -1;
};
// console.log("indexOf(['0', '1', '2', '3', '77'], '3') === 3", indexOf(['0', '1', '2', '3', '77'], '3') === 3)
// console.log("indexOf(['0', '1', '2', '3', '77'], '77') === 4", indexOf(['0', '1', '2', '3', '77'], '77') === 4)
// console.log("indexOf(['0', '1', '2', '3', '77'], '11') === -1", indexOf(['0', '1', '2', '3', '77'], '11') === -1)
const binaryIndexOf = (arr, val) => {
    // define a start and end index
    let start = 0;
    let end = arr.length - 1;
    // loop until the start is greater than the end, because if we haven't found it by then, it's not in the array
    while (start <= end) {
        // calculate the middle of those two indices
        const middleIndex = start + Math.floor((end - start) / 2);
        // check the word at that middle index
        const wordToCheck = arr[middleIndex];
        // if it's the word, return the index
        if (wordToCheck === val)
            return middleIndex;
        // if the desired word is alphabetically before the word to check, make one less than the middleIndex the new end index
        if (val < wordToCheck)
            end = middleIndex - 1;
        // if the desired word is alphabetically after the word to check, make one more than the middleIndex the new start index
        if (val > wordToCheck)
            start = middleIndex + 1;
    }
    return -1;
};
const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];
// console.log("binaryIndexOf(['0', '1', '2', '3', '77'], '3') === 3", binaryIndexOf(['0', '1', '2', '3', '77'], '3') === 3)
// console.log("binaryIndexOf(['0', '1', '2', '3', '77'], '77') === 4", binaryIndexOf(['0', '1', '2', '3', '77'], '77') === 4)
// console.log("binaryIndexOf(['0', '1', '2', '3', '77'], '11') === -1", binaryIndexOf(['0', '1', '2', '3', '77'], '11') === -1)
// console.log("binaryIndexOf(states, 'Florida') === 10", binaryIndexOf(states, 'Florida') === 10)
// console.log("binaryIndexOf(states, 'Florrida') === -1", binaryIndexOf(states, 'Florrida') === -1)
const naiveStringSearch = (str, sub) => {
    let count = 0;
    // loop over longer string
    for (let i = 0; i < str.length; i++) {
        // loop over shorter string
        for (let j = 0; j < sub.length; j++) {
            // if chars don't match, break loop
            if (sub[j] !== str[i + j])
                break;
            // if we hit the end of the shorter string, add a count
            if (j === sub.length - 1)
                count++;
        }
    }
    return count;
};
console.log("naiveStringSearch('hel lo hello helphello', 'hell') === 2", naiveStringSearch('hel lo hello helphello', 'hell') === 2);
// todo draw the owl
const KNP = (str, searchStr) => {
    const table = buildKNPTable(searchStr);
    console.log(table);
    return 0;
};
// build a prefix/suffix table of the search string
const buildKNPTable = (searchStr) => {
    let table = [0];
    let i = 0;
    for (let j = 1; j < searchStr.length; j++) {
        if (searchStr[i] === searchStr[j]) {
            table[j] = i + 1;
            i++;
            continue;
        }
        if (searchStr[i] !== searchStr[j]) {
            table[j] = table[i - 1] || 0;
        }
    }
    return table;
};
KNP('wowahfjkdshafkjlds', 'ddsgwaddsgz');
