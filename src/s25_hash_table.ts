// A hash function takes in an input of any size and maps to a number fixed size
// It should be fast, deterministic, and uniformly distributed

// The hashmap will have a finite keymap
// It needs some way to deal with collisions (two pieces of data have the same hash)
// 1) Separate chaining means each bucket can have joint data which we search
// 2) Linear probing: one piece of data per bucket. On collision, store at the next empty bucket. This limits the data size to the keymap length

type Primitive = string | number | bigint | boolean | undefined | symbol | null;
type KeyMap = [string, Primitive][][];

export class HashTable {
  #keyMap: KeyMap;

  constructor(bucketLen: number = 31) {
    this.#keyMap = Array(bucketLen);
    for (let i = 0; i < bucketLen; i++) {
      this.#keyMap[i] = [];
    }
  }

  #getBucket(key: string, max: number = 100): number {
    const shiftedChar = (str: string, index: number): number => str.charCodeAt(index) - 96;
    let bucket = 0;
    const it = Math.min(key.length, max);
    for (let i = 0; i < it; i++) {
      bucket += shiftedChar(key, i);
    }

    return Math.abs(bucket) % this.#keyMap.length;
  }

  set(key: string, val: Primitive): Primitive | undefined {
    const bucketPairsArr = this.#keyMap[this.#getBucket(key)];
    for (let i = 0; i < bucketPairsArr.length; i++) {
      if (bucketPairsArr[i][0] === key) {
        const prevVal = bucketPairsArr[i][1];
        bucketPairsArr[i][1] = val;
        return prevVal;
      }
    }
    bucketPairsArr.push([key, val]);
    return undefined;
  }

  get(key: string): Primitive | undefined {
    const bucketPairsArr = this.#keyMap[this.#getBucket(key)];

    for (let i = 0; i < bucketPairsArr.length; i++) {
      if (bucketPairsArr[i][0] === key) {
        return bucketPairsArr[i][1];
      }
    }
    return undefined;
  }

  remove(key: string): Primitive | undefined {
    const bucket = this.#keyMap[this.#getBucket(key)];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        const [pair] = bucket.splice(i, 1);
        return pair[1];
      }
    }
    return undefined;
  }

  #vals(type: 'e'): [string, Primitive][];
  #vals(type: 'k'): string[];
  #vals(type: 'v'): Primitive[];
  #vals(type: 'e' | 'k' | 'v'): (Primitive | string | [string, Primitive])[] {
    const set = new Set<Primitive | string | [string, Primitive]>();
    for (let i = 0; i < this.#keyMap.length; i++) {
      for (let j = 0; j < this.#keyMap[i].length; j++) {
        if (type === 'e') {
          set.add([this.#keyMap[i][j][0], this.#keyMap[i][j][1]]);
        } else if (type === 'k') {
          set.add(this.#keyMap[i][j][0]);
        } else {
          set.add(this.#keyMap[i][j][1]);
        }
      }
    }
    return Array.from(set);
  }

  get entries(): [string, Primitive][] {
    return this.#vals('e');
  }

  get keys(): string[] {
    return this.#vals('k');
  }

  get values(): Primitive[] {
    return this.#vals('v');
  }
}
