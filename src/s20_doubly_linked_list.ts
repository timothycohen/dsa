// a doubly linked list is like a singly linked list, but with a prev property

class DoublyLinkedListNode<T> {
  val: T;

  next: null | DoublyLinkedListNode<unknown>;

  prev: null | DoublyLinkedListNode<unknown>;

  constructor(val: T) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  length: number;

  head: DoublyLinkedListNode<unknown> | null;

  tail: DoublyLinkedListNode<unknown> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push<T>(val: T): DoublyLinkedList {
    // make new node
    const newTail = new DoublyLinkedListNode(val);
    // if it's the first node, make head and tail both the new node
    if (this.head === null || this.tail === null) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      newTail.prev = this.tail;
      this.tail.next = newTail;
      this.tail = newTail;
    }
    // add 1 to length
    this.length++;
    return this;
  }

  pop(): DoublyLinkedListNode<unknown> | undefined {
    const oldTail = this.tail;
    // length 0
    if (oldTail === null) return undefined;
    // length 1
    if (oldTail.prev === null) {
      this.tail = null;
      this.head = null;
      this.length--;
      return oldTail;
    }

    const newTail = oldTail.prev;
    newTail.next = null;
    this.tail = newTail;
    this.length--;
    return oldTail;
  }

  shift(): DoublyLinkedListNode<unknown> | undefined {
    const oldHead = this.head;

    // length 0
    if (oldHead === null) return undefined;
    // length 1
    if (oldHead.next === null) {
      this.head = null;
      this.tail = null;
      this.length--;
      return oldHead;
    }

    const newHead = oldHead.next;
    newHead.prev = null;
    this.head = newHead;
    this.length--;
    return oldHead;
  }

  unshift<T>(val: T): DoublyLinkedList {
    // length 0
    if (this.head === null || this.tail === null) {
      return this.push(val);
    }

    const newHead = new DoublyLinkedListNode(val);
    const oldHead = this.head;
    oldHead.prev = newHead;
    newHead.next = oldHead;
    this.head = newHead;
    this.length++;
    return this;
  }

  get(index: number): DoublyLinkedListNode<unknown> | undefined {
    if (index < 0 || index >= this.length) return undefined;

    const dR = this.length - index;
    // closer to beginning than end
    if (index < dR) {
      let node = this.head;
      for (let i = 0; i < index; i++) {
        node = node!.next;
      }
      return node as DoublyLinkedListNode<unknown>;
    }
    let node = this.tail;
    for (let i = 0; i < dR - 1; i++) {
      node = node!.prev;
    }
    return node as DoublyLinkedListNode<unknown>;
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

    const newNode = new DoublyLinkedListNode(val);
    const oldNodeL = this.get(index - 1)!;
    const oldNodeR = oldNodeL.next!;
    oldNodeL.next = newNode;
    oldNodeR.prev = newNode;
    newNode.prev = oldNodeL;
    newNode.next = oldNodeR;
    this.length++;
    return true;
  }

  remove(index: number): DoublyLinkedListNode<unknown> | undefined {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index > this.length - 1 || index < 0) return undefined;

    const nodeL = this.get(index - 1)!;
    const nodeToRemove = nodeL.next!;
    const nodeR = nodeToRemove.next!;
    nodeL.next = nodeL.next!.next;
    nodeR.prev = nodeR.prev!.prev;
    this.length--;
    return nodeToRemove;
  }

  // each node's next becomes its prev and prev its next. the head and tail switch
  reverse(): DoublyLinkedList {
    // if the list is of length 0 or 1, a reverse will have no effect
    // writing this verbosely for the type checking
    if (this.head === null || this.tail === null || this.length === 1) return this;

    // store the old head and tail
    const oldHead = this.head;
    const oldTail = this.tail;

    const reverseNodeInPlace = <T>(node: DoublyLinkedListNode<T>): void => {
      if (node === null) return;
      const oldNext = node.next;
      const oldPrev = node.prev;
      // eslint-disable-next-line no-param-reassign
      node.prev = oldNext;
      // eslint-disable-next-line no-param-reassign
      node.next = oldPrev;
    };

    // reverse all nodes
    let tempNode: DoublyLinkedListNode<unknown> | null = this.head;
    for (let i = 0; i < this.length; i++) {
      if (tempNode === null) break;
      const nextNode: DoublyLinkedListNode<unknown> | null = tempNode.next;
      reverseNodeInPlace(tempNode);
      tempNode = nextNode;
    }

    // swap the head and tail
    this.head = oldTail;
    this.tail = oldHead;

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
      response += `tail | ${tailVal} | prev: ${this.tail?.prev}\n`;
    } else {
      response += `head | val: ${headVal} | nextVal: ${this.head?.next?.val}\n`;
      response += `tail | val: ${tailVal} | prevVal: ${this.tail?.prev?.val}\n`;
    }

    for (let i = 0; i < this.length; i++) {
      if (node === null) break;
      const prev = node.prev?.val;
      const next = node.next?.val;
      response += `index: ${i} | prevVal: ${prev} | val: ${node.val} | nextVal: ${next} \n`;
      node = node.next;
    }
    if (!q) console.log(response);
    return response;
  }
}

module.exports = { DoublyLinkedList };
