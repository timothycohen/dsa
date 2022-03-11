// First In First Out

class QueueNode<T> {
  value: T;

  newer: QueueNode<T> | null;

  constructor(val: T) {
    this.value = val;
    this.newer = null;
  }
}

// point from oldest to newest
// add newest and remove oldest
export class Queue<T> {
  size: number;

  oldest: QueueNode<T> | null;

  newest: QueueNode<T> | null;

  constructor() {
    this.size = 0;
    this.oldest = null;
    this.newest = null;
  }

  add(val: T): undefined {
    if (val === undefined) return undefined;
    const oldNewest = this.newest;
    const newNewest = new QueueNode(val);

    // queue size of 0
    if (oldNewest === null) {
      this.newest = newNewest;
      this.oldest = newNewest;
    } else {
      oldNewest.newer = newNewest;
      this.newest = newNewest;
    }
    this.size++;
    return undefined;
  }

  remove(): QueueNode<T> | null {
    const oldOldest = this.oldest;
    // queue size of 0
    if (oldOldest === null) {
      return null;
    }
    // queue size of 1
    if (this.size === 1) {
      this.size = 0;
      this.oldest = null;
      this.newest = null;
      return oldOldest;
    }
    this.oldest = oldOldest.newer;
    this.size--;
    oldOldest.newer = null;
    return oldOldest;
  }
}
