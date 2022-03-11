export const factorial = (num: number): number => {
  if (num === 0 || num === 1) return num;
  return num * factorial(num - 1);
};

export const factIt = (num: number): number => {
  let sum = 1;
  for (let i = 1; i <= num; i++) {
    sum *= i;
  }
  return sum;
};

export const collectAllOdds = (arr: number[]): number[] => {
  const list: number[] = [];

  function helper(newArr: number[]): void {
    const num = newArr.pop();
    if (num === undefined) return;
    helper(newArr);
    if (num % 2 !== 0) list.push(num);
  }

  helper(arr);

  return list;
};

export const power = (base: number, exp: number): number => {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
};

export const powerIt = (base: number, exp: number): number => {
  let answer = 1;
  for (let i = 0; i < exp; i++) {
    answer *= base;
  }
  return answer;
};

export const productOfArray = (arr: number[]): number => {
  if (arr.length === 0) return 1;
  return arr.pop()! * productOfArray(arr);
};

export const recursiveRange = (num: number): number => {
  if (num === 1) return num;
  return num + recursiveRange(num - 1);
};

export const findFibNum = (position: number): number => {
  if (position === 0 || position === 1) return 1;
  let prev = [1, 1];
  let answer = 1;

  for (let i = 2; i < position; i++) {
    answer = prev[0] + prev[1];
    prev = [prev[1], answer];
  }

  return answer;
};

export const buildFib = (position: number): number => {
  const arr = [1, 1];

  for (let i = 1; i < position - 1; i++) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  }

  return arr[arr.length - 1];
};

export const fib = (position: number): number => {
  if (position <= 1) return position;
  return fib(position - 1) + fib(position - 2);
};

export const reverseStrArray = (str: string): string => str.split('').reverse().join('');

export const reverseStrIt = (str: string): string => {
  const answer = str.split('');
  let start = 0;
  let end = answer.length - 1;

  // keep swapping the first and last and moving in until reaching the middle
  while (start <= end) {
    const temp = answer[start];
    answer[start] = answer[end];
    answer[end] = temp;
    start++;
    end--;
  }

  return answer.join('');
};

export const reverseStrRec = (str: string): string => {
  const arr = str.split('');

  const swap = (indices: number[]): number[] => {
    if (indices[1] <= indices[0]) return indices;
    const temp = arr[indices[0]];
    arr[indices[0]] = arr[indices[1]];
    arr[indices[1]] = temp;
    return swap([indices[0] + 1, indices[1] - 1]);
  };

  swap([0, arr.length - 1]);

  return arr.join('');
};

export function reverseEZ(str: string): string {
  if (str.length <= 1) return str;
  return reverseEZ(str.slice(1)) + str[0];
}

export function isPalindrome(str: string): boolean {
  if (str.length === 0) return false;
  const arr = str.split('');

  // keep moving the window in towards itself and return false if ever they don't match
  const helper = (i: number, j: number): boolean => {
    if (i >= j) return true;
    if (arr[i] !== arr[j]) return false;
    return helper(i + 1, j - 1);
  };

  return helper(0, arr.length - 1);
}

export const isOdd = (val: number): boolean => val % 2 !== 0;

// return true if any of the callbacks return true
export const someRecursiveEZ = (arr: number[], cb: (val: number) => boolean) =>
  arr.reduce((a, c) => a || cb(c), false);

export function someRecursive(arr: number[], cb: (val: number) => boolean): boolean {
  if (arr.length === 0) return false;
  return cb(arr.pop()!) || someRecursive(arr, cb);
}

export function flatten(arr: any): any[] {
  const answer: any = [];

  // if it's not an array, push it to answer and return. otherwise, call recursively on each element
  const helper = (array: any): void => {
    if (!Array.isArray(array)) {
      answer.push(array);
      return;
    }
    array.forEach(helper);
  };
  helper(arr);

  return answer;
}

export function capitalizeFirst(arr: string[]): string[] {
  return arr.map(s => s[0].toUpperCase() + s.slice(1));
}

export const capitalizeWordsEZ = (arr: string[]): string[] => arr.map(x => x.toUpperCase());

export const capitalizeWords = (arr: string[]): string[] => {
  const helper = (str: string): string => {
    if (str.length === 1) return str[0].toUpperCase();
    return str[0].toUpperCase().concat(helper(str.slice(1)));
  };

  return arr.map(helper);
};

export function nestedEvenSum(obj: any): number {
  let total = 0;
  // recursively check elements. if the el is an object, get values and repeat
  // if it's a number, add it to the total and return
  const helper = (el: any): void => {
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

export function stringify(object: any): any {
  return Object.fromEntries(
    Object.entries(object).map(([k, v]) => {
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
    })
  );
}

export const stringify2 = (object: any): any => {
  const newObj: any = {};

  const helper = (obj: any): void => {
    if (Array.isArray(obj)) {
      obj.forEach(helper);
      return;
    }

    Object.keys(obj).forEach(k => {
      const val = obj[k];
      if (typeof val === 'number') {
        newObj[k] = val.toString();
      } else if (Array.isArray(val)) {
        newObj[k] = val.map(stringify2);
      } else if (typeof val === 'object') {
        newObj[k] = stringify2(obj[k]);
      } else {
        newObj[k] = val;
      }
    });
  };
  helper(object);

  return newObj;
};

export const collectStrings = (obj: any): string[] => {
  const answer: string[] = [];

  const helper = (val: any) => {
    if (typeof val === 'string') {
      answer.push(val);
      return;
    }
    if (typeof val !== 'object' || val === null) return;
    Object.values(val).forEach(v => {
      helper(v);
    });
  };

  helper(obj);

  return answer;
};
