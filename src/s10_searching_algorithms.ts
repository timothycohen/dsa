export const indexOf = (arr: string[], val: string): number => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
};

export const binaryIndexOf = (arr: string[], val: string): number => {
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
    if (wordToCheck === val) return middleIndex;
    // if the desired word is alphabetically before the word to check, make one less than the middleIndex the new end index
    if (val < wordToCheck) end = middleIndex - 1;
    // if the desired word is alphabetically after the word to check, make one more than the middleIndex the new start index
    if (val > wordToCheck) start = middleIndex + 1;
  }
  return -1;
};

export const naiveStringSearch = (str: string, sub: string): number => {
  let count = 0;
  // loop over longer string
  for (let i = 0; i < str.length; i++) {
    // loop over shorter string
    for (let j = 0; j < sub.length; j++) {
      // if chars don't match, break loop
      if (sub[j] !== str[i + j]) break;
      // if we hit the end of the shorter string, add a count
      if (j === sub.length - 1) count++;
    }
  }
  return count;
};

// build a prefix/suffix table of the search string
const buildKNPTable = (searchStr: string): number[] => {
  const table: number[] = [0];
  let i = 0;
  for (let j = 1; j < searchStr.length; j++) {
    if (searchStr[i] === searchStr[j]) {
      table[j] = i + 1;
      i++;
    } else if (searchStr[i] !== searchStr[j]) {
      table[j] = table[i - 1] || 0;
    }
  }
  return table;
};

// TODO draw the owl
const KNP = (str: string, searchStr: string): number => {
  const table = buildKNPTable(searchStr);
  // console.log(str);
  // console.log(table);
  return 0;
};

KNP('wowahfjkdshafkjlds', 'ddsgwaddsgz');
