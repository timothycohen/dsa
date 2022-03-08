// Last In First Out

class StackNode<T> {
  value: T;

  under: StackNode<T> | null;

  constructor(val: T) {
    this.value = val;
    this.under = null;
  }
}

// point from top to bottom
// add and remove from the top
class Stack<T> {
  depth: number;

  bottom: StackNode<T> | null;

  top: StackNode<T> | null;

  constructor() {
    this.depth = 0;
    this.bottom = null;
    this.top = null;
  }

  push(val: T): undefined {
    if (val === undefined) return undefined;
    const oldTop = this.top;
    const newTop = new StackNode(val);
    if (oldTop === null) {
      this.top = newTop;
      this.bottom = newTop;
    } else {
      newTop.under = oldTop;
      this.top = newTop;
    }
    this.depth++;
    return undefined;
  }

  pop(): StackNode<T> | null {
    const oldTop = this.top;
    // stack depth of 0
    if (oldTop === null) {
      return null;
    }
    // stack depth of 1
    if (oldTop.under === null) {
      this.depth = 0;
      this.bottom = null;
      this.top = null;
      return oldTop;
    }

    this.depth--;
    this.top = oldTop.under;
    oldTop.under = null;
    return oldTop;
  }
}

module.exports = { Stack };
