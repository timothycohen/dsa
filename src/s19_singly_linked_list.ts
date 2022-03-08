// a singly linked list is similar to an array, but has linked nodes instead of indices
// the list itself only has three properties: head node, tail node, and length.

class SinglyLinkedListNode<T> {
  val: T;

  next: null | SinglyLinkedListNode<unknown>;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  length: number;

  head: SinglyLinkedListNode<unknown> | null;

  tail: SinglyLinkedListNode<unknown> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push<T>(val: T): SinglyLinkedList {
    // make new node
    const n = new SinglyLinkedListNode(val);
    // if it's the first node, make head and tail both the new node
    if (this.head === null) {
      this.head = n;
      this.tail = n;
    } else {
    // otherwise point the tail to the new node and make the new node the tail
      this.tail!.next = n;
      this.tail = n;
    }
    // add 1 to length
    this.length++;
    return this;
  }

  pop(): SinglyLinkedListNode<unknown> | undefined {
    const { tail } = this;
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
      this.length--;
      return tail!;
    }

    let node = this.head;
    for (let i = 0; i < this.length - 2; i++) {
      node = node!.next;
    }
    this.tail = node;
    this!.tail!.next = null;
    this.length--;
    return tail!;
  }

  shift(): SinglyLinkedListNode<unknown> | undefined {
    if (this.head === null) return undefined;
    const { head } = this;
    this.head = this.head.next;
    head.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;
    return head;
  }

  unshift<T>(val: T): SinglyLinkedList {
    const node = new SinglyLinkedListNode(val);
    node.next = this.head;
    this.head = node;
    this.length++;
    if (this.length === 1) {
      this.tail = node;
    }
    return this;
  }

  get(index: number): SinglyLinkedListNode<unknown> | undefined {
    if (index < 0 || index >= this.length) return undefined;

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node!.next;
    }
    return node as SinglyLinkedListNode<unknown>;
  }

  set<T>(index: number, val: T): boolean {
    const node = this.get(index);
    if (node === undefined) return false;
    node.val = val;
    return true;
  }

  insert<T>(index: number, val: T): boolean {
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    if (index > this.length || index < 0) return false;

    const newNode = new SinglyLinkedListNode(val);
    const oldNode = this.get(index - 1);
    newNode.next = oldNode!.next;
    oldNode!.next = newNode;
    this.length++;
    return true;
  }

  remove(index: number): SinglyLinkedListNode<unknown> | undefined {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index > this.length - 1 || index < 0) return undefined;

    const prevNode = this.get(index - 1);
    const removedNode = prevNode!.next;
    prevNode!.next = removedNode!.next;
    this.length--;

    return removedNode!;
  }

  reverse(): SinglyLinkedList {
    // if the list is of length 0 or 1, a reverse will have no effect
    if (this.length < 2) return this;

    // move through the list with both the current and next nodes
    let currentNode = this.head!;
    let oldNextNewPrev = currentNode.next!;

    // loop until one before the tail
    for (let i = 0; i < this.length - 2; i++) {
      // store the next node in a temp variable so the node can be progressed forward later
      const tempNext = oldNextNewPrev.next!;
      // flip the pointer so now the next is pointing to the current
      oldNextNewPrev.next = currentNode;
      // move the current and next nodes forward one
      currentNode = oldNextNewPrev;
      oldNextNewPrev = tempNext;
    }
    // handle the head and tail separately
    // flip the pointer
    oldNextNewPrev.next = currentNode;
    // swap the head and tail
    const oldHead = this.head;
    this.head = oldNextNewPrev;
    this.tail = oldHead;
    // set the tail.next to null
    this.tail!.next = null;

    return this;
  }

  print(q?: 'q' | undefined): string {
    let node = this.head;
    let response = '';

    const headVal = this.head?.val;
    const tailVal = this.tail?.val;
    response += `length: ${this.length}\n`;

    if (this.length === 0) {
      response += `head | ${headVal}\n`;
      response += `tail | ${tailVal}\n`;
    } else if (this.length === 1) {
      response += `head | ${headVal} | next: ${this.head?.next}\n`;
      response += `tail | ${tailVal}\n`;
    } else {
      response += `head | val: ${headVal} | nextVal: ${this.head?.next?.val}\n`;
      response += `tail | val: ${tailVal}\n`;
    }

    for (let i = 0; i < this.length; i++) {
      if (node === null) break;
      const next = node.next?.val;
      response += `index: ${i} | val: ${node.val} | nextVal: ${next} \n`;
      node = node.next;
    }
    if (!q) console.log(response);
    return response;
  }
}

module.exports = { SinglyLinkedList };
