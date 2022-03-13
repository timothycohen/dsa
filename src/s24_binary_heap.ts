// max binary heap: each parent node is greater than its children
// no guarantees between sibling nodes
// compact as possible (left children are filled out first)
// storing the values in an array from top to bottom, left to right, the children are at 2n+1 & 2n+2

export abstract class BH<T> {
  #values: T[] = [];

  // extending classes supply their own comparison functions to make this generic
  abstract isEqual(v1: T, v2: T): boolean;
  abstract isGreater(v1: T, v2: T): boolean;

  findParentIndex(index: number): number | null {
    if (index < 1 || index > this.#values.length - 1) return null;
    return Math.floor((index - 1) / 2);
  }

  findChildrenIndices(index: number): (number | null)[] {
    if (index < 0) return [null, null];
    let index1: number | null = 2 * index + 1;
    let index2: number | null = 2 * index + 2;
    if (index1 > this.#values.length - 1) index1 = null;
    if (index2 > this.#values.length - 1) index2 = null;
    return [index1, index2];
  }

  getIndex(val: T): number {
    let foundIndex: number = -1;

    const helper = (parentIndex: number): void => {
      const parVal = this.#values[parentIndex];

      if (this.isEqual(parVal, val)) {
        foundIndex = parentIndex;
        return;
      }
      const [ch1, ch2] = this.findChildrenIndices(parentIndex);
      if (ch1 !== null && this.isGreater(this.#values[parentIndex], this.#values[ch1])) {
        helper(ch1);
      }
      if (ch2 !== null && this.isGreater(this.#values[parentIndex], this.#values[ch2])) {
        helper(ch2);
      }
    };

    helper(0);
    return foundIndex;
  }

  isValid() {
    // start at the top index
    // find the children
    // make sure the children are smaller than the parent
    // move to the children index and continue
    // break if the child is >= than the parent
    let valid = true;
    const helper = (parentIndex: number = 0): boolean => {
      const [ch1, ch2] = this.findChildrenIndices(parentIndex);
      if (ch1 !== null) {
        valid =
          valid && this.isGreater(this.#values[parentIndex], this.#values[ch1]) && helper(ch1);
      }
      if (ch2 !== null) {
        valid =
          valid && this.isGreater(this.#values[parentIndex], this.#values[ch2]) && helper(ch2);
      }
      return valid;
    };

    return helper();
  }

  bubble(childIndex: number = this.#values.length - 1): void {
    const parentIndex = this.findParentIndex(childIndex);
    if (parentIndex === null) return;
    if (this.isGreater(this.#values[parentIndex], this.#values[childIndex])) return;

    [this.#values[childIndex], this.#values[parentIndex]] = [
      this.#values[parentIndex],
      this.#values[childIndex],
    ];
    this.bubble(parentIndex);
  }

  sink(parentIndex: number = 0): void {
    const [ch1, ch2] = this.findChildrenIndices(parentIndex);
    let largerChild: number | null = null;

    if (ch1 !== null && ch2 !== null) {
      largerChild = this.isGreater(this.#values[ch1], this.#values[ch2]) ? ch1 : ch2;
    } else if (ch1 !== null) {
      largerChild = ch1;
    } else {
      largerChild = ch2;
    }
    if (
      largerChild === null ||
      this.isGreater(this.#values[parentIndex], this.#values[largerChild])
    )
      return;

    [this.#values[largerChild], this.#values[parentIndex]] = [
      this.#values[parentIndex],
      this.#values[largerChild],
    ];

    this.sink(largerChild);
  }

  insert(val: T): void {
    if (this.getIndex(val) !== -1) return;
    this.#values.push(val);
    this.bubble();
  }

  root(): T | undefined {
    return this.#values[0];
  }

  remove(): T | undefined {
    const extracted = this.#values[0];
    const tempRoot = this.#values.pop();
    if (this.#values.length === 0) return extracted;

    // when removing the root node, the structure will be lost
    // move the last element to the position where the root was and sink it down

    // using ! because if the length is not 0 after pop, there was definitely an element
    this.#values[0] = tempRoot!;
    this.sink();

    return extracted;
  }

  getValues() {
    return [...this.#values];
  }

  get size() {
    return this.#values.length;
  }
}

export class BinaryHeap extends BH<number> {
  isGreater = (v1: number, v2: number): boolean => v1 > v2;

  isEqual = (v1: number, v2: number): boolean => v1 === v2;
}

// limiting to primitives because of the strict equality used below
type P = string | number | bigint | boolean | undefined | symbol | null;

export class PQNode<T extends P> {
  constructor(public value: T, public priority: number) {
    this.value = value;
    this.priority = priority ?? 5;
  }
}

export class PriorityQueue<T extends P> extends BH<PQNode<T>> {
  // higher priority has a lower priority number
  isGreater = (n1: PQNode<T>, n2: PQNode<T>): boolean => n1?.priority < n2?.priority;

  isEqual = (n1: PQNode<T>, n2: PQNode<T>): boolean =>
    n1?.priority === n2?.priority && n1?.value === n2?.value;
}

export class FIFOPQNode<T extends P> {
  creationTime: number;

  constructor(public value: T, public priority: number) {
    this.value = value;
    this.priority = priority ?? 5;
    this.creationTime = Date.now();
  }
}

export class FIFOPriorityQueue<T extends P> extends BH<FIFOPQNode<T>> {
  // higher priority has a lower priority number or same priority and earlier creation time
  isGreater = (n1: FIFOPQNode<T>, n2: FIFOPQNode<T>): boolean => {
    if (n1.priority < n2?.priority) return true;
    if (n1?.priority === n2?.priority && n1?.creationTime < n2?.creationTime) return true;
    return false;
  };

  isEqual = (n1: FIFOPQNode<T> | null, n2: FIFOPQNode<T> | null): boolean => {
    if (!n1 || !n2) return false;
    const reducer: (acc: boolean, key: keyof FIFOPQNode<T>) => boolean = (acc, key) =>
      acc && n1[key] === n2[key];
    const keys = Object.keys(n1) as (keyof FIFOPQNode<T>)[];
    return keys.reduce(reducer, true);
  };
}
