"use strict";
// a singly linked list is similar to an array, but instead of indices it has nodes which point to each other with a next property
// the list itself only has three properties: head node, tail node, and length.
class SinglyLinkedListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class SinglyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    push(val) {
        // make new node
        let n = new SinglyLinkedListNode(val);
        // if it's the first node, make head and tail both the new node
        if (this.head === null) {
            this.head = n;
            this.tail = n;
        }
        else {
            // otherwise point the tail to the new node and make the new node the tail
            this.tail.next = n;
            this.tail = n;
        }
        // add 1 to length
        this.length++;
        return this;
    }
    pop() {
        let tail = this.tail;
        if (this.length === 0)
            return undefined;
        else if (this.length === 1) {
            this.tail = null;
            this.head = null;
            this.length--;
            return tail;
        }
        let node = this.head;
        for (let i = 0; i < this.length - 2; i++) {
            node = node.next;
        }
        this.tail = node;
        this.tail.next = null;
        this.length--;
        return tail;
    }
    shift() {
        if (this.head === null)
            return undefined;
        let head = this.head;
        this.head = this.head.next;
        head.next = null;
        this.length--;
        if (this.length === 0)
            this.tail = null;
        return head;
    }
    unshift(val) {
        let node = new SinglyLinkedListNode(val);
        node.next = this.head;
        this.head = node;
        this.length++;
        if (this.length === 1) {
            this.tail = node;
        }
        return this;
    }
    get(index) {
        if (index < 0 || index >= this.length)
            return undefined;
        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }
    set(index, val) {
        let node = this.get(index);
        if (node === undefined)
            return false;
        node.val = val;
        return true;
    }
    insert(index, val) {
        if (index === 0)
            return !!this.unshift(val);
        if (index === this.length)
            return !!this.push(val);
        if (index > this.length || index < 0)
            return false;
        let newNode = new SinglyLinkedListNode(val);
        let oldNode = this.get(index - 1);
        newNode.next = oldNode.next;
        oldNode.next = newNode;
        this.length++;
        return true;
    }
    remove(index) {
        if (index === 0)
            return this.shift();
        if (index === this.length - 1)
            return this.pop();
        if (index > this.length - 1 || index < 0)
            return undefined;
        const prevNode = this.get(index - 1);
        const removedNode = prevNode.next;
        prevNode.next = removedNode.next;
        this.length--;
        return removedNode;
    }
    reverse() {
        // if the list is of length 0 or 1, a reverse will have no effect
        if (this.length < 2)
            return this;
        // move through the list with both the current and next nodes
        let currentNode = this.head;
        let oldNextNewPrev = currentNode.next;
        // loop until one before the tail
        for (let i = 0; i < this.length - 2; i++) {
            // store the next node in a temp variable so the node can be progressed forward even after the next property has been swapped
            let tempNext = oldNextNewPrev.next;
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
        let oldHead = this.head;
        this.head = oldNextNewPrev;
        this.tail = oldHead;
        // set the tail.next to null
        this.tail.next = null;
        return this;
    }
    print() {
        console.log(JSON.stringify(this, null, 2));
    }
}
module.exports = { SinglyLinkedList };
