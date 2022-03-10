/* eslint-disable max-len */

// max binary heap: each parent node is greater than its children
// no guarantees between sibling nodes
// compact as possible (left children are filled out first)
// storing the values in an array from top to bottom, left to right, the children are at 2n+1 & 2n+2

const createBH = <T>(isEqual: ((v1: T, v2: T) => boolean), isGreater: (v1: T, v2: T) => boolean) => {
  const values: T[] = [];

  const findChildrenIndices = (index: number): (number | null)[] => {
    if (index < 0) return [null, null];
    let index1: number | null = 2 * index + 1;
    let index2: number | null = 2 * index + 2;
    if (index1 > (values.length - 1)) index1 = null;
    if (index2 > values.length - 1) index2 = null;
    return [index1, index2];
  };

  const findParentIndex = (index: number): number | null => {
    if (index < 1 || index > values.length - 1) return null;
    return Math.floor((index - 1) / 2);
  };

  const getIndex = (val: T): number => {
    let foundIndex: number = -1;

    const helper = (parentIndex: number): void => {
      const parVal = values[parentIndex];

      if (isEqual(parVal, val)) { foundIndex = parentIndex; return; }
      const [ch1, ch2] = findChildrenIndices(parentIndex);
      if (ch1 !== null && isGreater(values[parentIndex], values[ch1])) {
        helper(ch1);
      }
      if (ch2 !== null && isGreater(values[parentIndex], values[ch2])) {
        helper(ch2);
      }
    };

    helper(0);
    return foundIndex;
  };

  const isValid = () => {
    // start at the top index
    // find the children
    // make sure the children are smaller than the parent
    // move to the children index and continue
    // break if the child is >= than the parent
    let valid = true;
    const helper = (parentIndex: number = 0): boolean => {
      const [ch1, ch2] = findChildrenIndices(parentIndex);
      if (ch1 !== null) {
        valid = (valid && isGreater(values[parentIndex], values[ch1]) && helper(ch1));
      }
      if (ch2 !== null) {
        valid = (valid && isGreater(values[parentIndex], values[ch2]) && helper(ch2));
      }
      return valid;
    };

    return helper();
  };

  const bubble = (childIndex: number = values.length - 1): void => {
    const parentIndex = findParentIndex(childIndex);
    if (parentIndex === null) return;
    if (isGreater(values[parentIndex], values[childIndex])) return;

    [values[childIndex], values[parentIndex]] = [values[parentIndex], values[childIndex]];
    bubble(parentIndex);
  };

  const sink = (parentIndex: number = 0): void => {
    const [ch1, ch2] = findChildrenIndices(parentIndex);
    let largerChild: number | null = null;

    if (ch1 !== null && ch2 !== null) {
      largerChild = isGreater(values[ch1], values[ch2]) ? ch1 : ch2;
    } else if (ch1 !== null) {
      largerChild = ch1;
    } else {
      largerChild = ch2;
    }
    if (largerChild === null || isGreater(values[parentIndex], values[largerChild])) return;

    [values[largerChild], values[parentIndex]] = [values[parentIndex], values[largerChild]];

    sink(largerChild);
  };

  const insert = (val: T): void => {
    if (getIndex(val) !== -1) return;
    values.push(val);
    bubble();
  };

  const remove = (): T | undefined => {
    const extracted = values[0];
    const tempRoot = values.pop();
    if (values.length === 0) return extracted;

    // when removing the root node, the structure will be lost
    // move the last element to the position where the root was and sink it down

    // using ! because if the length is not 0 after pop, there was definitely an element
    values[0] = tempRoot!;
    sink();

    return extracted;
  };

  return {
    getValues() { return [...values]; },
    isEqual,
    isGreater,
    findChildrenIndices,
    findParentIndex,
    getIndex,
    isValid,
    bubble,
    sink,
    insert,
    remove,
  };
};

const createNumBinaryHeap = () => {
  const isGreater = (v1: number, v2: number): boolean => v1 > v2;
  const isEqual = (v1: number, v2: number): boolean => v1 === v2;
  return createBH(isEqual, isGreater);
};

// limiting to primitives because of the strict equality used below
type Primitive = string | number | bigint | boolean | undefined | symbol | null;

const createPQNode = <T extends P>(value: T, priority?: number) => ({ value, priority: priority ?? 5 });

const createPriorityQueue = <T extends P>() => {
  // higher priority has a lower priority number
  const isGreater = (n1: PQNode<T>, n2: PQNode<T>): boolean => n1?.priority < n2?.priority;
  const isEqual = (n1: PQNode<T>, n2: PQNode<T>): boolean => (n1?.priority === n2?.priority) && (n1?.value === n2?.value);
  return createBH(isEqual, isGreater);
};

const createFIFOPQNode = <T extends P>(value: T, priority: number) => ({
  value,
  priority: priority ?? 5,
  creationTime: Date.now(),
});

const createFIFOPriorityQueue = <T extends P>() => {
  // higher priority has a lower priority number or same priority and earlier creation time
  const isGreater = (n1: FIFOPQNode<T>, n2: FIFOPQNode<T>): boolean => {
    if (n1.priority < n2?.priority) return true;
    if (n1?.priority === n2?.priority && n1?.creationTime < n2?.creationTime) return true;
    return false;
  };

  const isEqual = (n1: FIFOPQNode<T> | null, n2: FIFOPQNode<T> | null): boolean => {
    if (!n1 || !n2) return false;
    const reducer: (acc: boolean, key: keyof FIFOPQNode<T>) => boolean = (acc, key) => acc && (n1[key] === n2[key]);
    const keys = Object.keys(n1) as (keyof FIFOPQNode<T>)[];
    return keys.reduce(reducer, true);
  };

  return createBH(isEqual, isGreater);
};

module.exports = {
  createNumBinaryHeap, createPQNode, createPriorityQueue, createFIFOPQNode, createFIFOPriorityQueue,
};
