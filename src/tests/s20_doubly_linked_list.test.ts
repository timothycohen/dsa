const { DoublyLinkedList } = require('../s20_doubly_linked_list');

export {};

test('new list', () => {
  const list = new DoublyLinkedList();
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);
});
test('.push adds one to the end and returns the list', () => {
  const list = new DoublyLinkedList();
  list.push(5);
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(null);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(null);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(1);
  list.push(7);
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(list.tail);
  expect(list.tail.val).toBe(7);
  expect(list.tail.prev).toBe(list.head);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(2);
  list.push(2);
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(list.tail.prev);
  expect(list.tail.val).toBe(2);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(3);
});
test('.pop removes one from the end and returns the node or undefined', () => {
  const list = new DoublyLinkedList();
  expect(list.pop()).toBe(undefined);

  list.push(5);
  const popped5 = list.pop();
  expect(popped5.val).toBe(5);
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);

  list.push(1);
  list.push(3);
  list.push(7);
  const popped7 = list.pop();

  expect(popped7.val).toBe(7);
  expect(list.length).toBe(2);
  expect(list.head.val).toBe(1);
  expect(list.tail.val).toBe(3);
  expect(list.tail.prev).toBe(list.head);
  expect(list.head.next).toBe(list.tail);
});
test('.shift removes one from the start and returns the node or undefined', () => {
  const list = new DoublyLinkedList();
  expect(list.shift()).toBe(undefined);

  list.push(5);
  const shifted5 = list.shift();
  expect(shifted5.val).toBe(5);
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);

  list.push(1);
  list.push(3);
  list.push(7);
  const shifted1 = list.shift();

  expect(shifted1.val).toBe(1);
  expect(list.length).toBe(2);
  expect(list.head.val).toBe(3);
  expect(list.tail.val).toBe(7);
  expect(list.tail.prev).toBe(list.head);
  expect(list.head.next).toBe(list.tail);
});
test('.unshift adds one to the start and returns the list', () => {
  const list = new DoublyLinkedList();
  list.unshift(5);
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(null);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(null);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(1);
  list.unshift(7);
  expect(list.head.val).toBe(7);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(list.tail);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(list.head);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(2);
  list.unshift(2);
  expect(list.head.val).toBe(2);
  expect(list.head.prev).toBe(null);
  expect(list.head.next.val).toBe(7);
  expect(list.head.next).toBe(list.tail.prev);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev.val).toBe(7);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(3);
});
test('.get returns the node at a position or undefined', () => {
  const list = new DoublyLinkedList();
  expect(list.get(0)).toBe(undefined);
  list.push(25);
  list.unshift(3);
  list.push(2);
  list.unshift(7);
  list.push(17);
  list.unshift(5);
  list.push(999);

  expect(list.get(-1)).toBe(undefined);
  expect(list.get(550)).toBe(undefined);
  expect(list.get(0).val).toBe(5);
  expect(list.get(1).val).toBe(7);
  expect(list.get(2).val).toBe(3);
  expect(list.get(3).val).toBe(25);
  expect(list.get(4).val).toBe(2);
  expect(list.get(5).val).toBe(17);
  expect(list.get(6).val).toBe(999);

  expect(list.get(0).next.val).toBe(7);
  expect(list.get(1).next.val).toBe(3);
  expect(list.get(2).next.val).toBe(25);
  expect(list.get(3).next.val).toBe(2);
  expect(list.get(4).next.val).toBe(17);
  expect(list.get(5).next.val).toBe(999);
  expect(list.get(6).next).toBe(null);

  expect(list.get(0).prev).toBe(null);
  expect(list.get(1).prev.val).toBe(5);
  expect(list.get(2).prev.val).toBe(7);
  expect(list.get(3).prev.val).toBe(3);
  expect(list.get(4).prev.val).toBe(25);
  expect(list.get(5).prev.val).toBe(2);
  expect(list.get(6).prev.val).toBe(17);
});
test('.set changes the value of a node at a certain position and returns true/false based on success', () => {
  const list = new DoublyLinkedList();
  expect(list.set(0, 'hi')).toBe(false);

  list.push('hello');
  expect(list.set(-1, 'hi')).toBe(false);
  expect(list.set(0, 'hi')).toBe(true);
  expect(list.set(1, 'hi')).toBe(false);
  expect(list.get(0).val).toBe('hi');
  expect(list.get(0).prev).toBe(null);
  expect(list.get(0).next).toBe(null);

  list.push('there');
  expect(list.set(1, '!')).toBe(true);
  expect(list.get(0).val).toBe('hi');
  expect(list.get(0).next.val).toBe('!');
  expect(list.get(1).val).toBe('!');
  expect(list.get(1).prev.val).toBe('hi');
});
test('.insert adds a node at the position and returns true/false based on success', () => {
  const list = new DoublyLinkedList();
  expect(list.insert(-1, 'hi')).toBe(false);
  expect(list.insert(1, 'hi')).toBe(false);
  expect(list.insert(0, 0)).toBe(true);
  expect(list.get(0).val).toBe(0);
  list.push(1);
  expect(list.insert(2, 2)).toBe(true);
  list.push(3);
  expect(list.insert(4, 4)).toBe(true);
  expect(list.get(0).prev).toBe(null);
  expect(list.get(0).next.val).toBe(1);
  expect(list.get(1).prev.val).toBe(0);
  expect(list.get(1).next.val).toBe(2);
  expect(list.get(2).prev.val).toBe(1);
  expect(list.get(2).next.val).toBe(3);
  expect(list.get(3).prev.val).toBe(2);
  expect(list.get(3).next.val).toBe(4);
  expect(list.tail.val).toBe(4);
  expect(list.tail.prev.prev).toBe(list.head.next.next);
});
test('.remove deletes a node at the position and returns the removed node or undefined', () => {
  const list = new DoublyLinkedList();
  expect(list.remove(0)).toBe(undefined);
  expect(list.remove(-1)).toBe(undefined);
  expect(list.remove(1)).toBe(undefined);
  list.push(0);
  list.push('1');
  list.push(2);
  list.push(3);
  expect(list.remove(1).val).toBe('1');
  expect(list.get(1).val).toBe(2);
  expect(list.get(1).prev.val).toBe(0);
  expect(list.get(1).next.val).toBe(3);

  expect(list.remove(0).val).toBe(0);
  expect(list.get(0).val).toBe(2);
  expect(list.get(0).prev).toBe(null);
  expect(list.length).toBe(2);

  expect(list.remove(1).val).toBe(3);
  expect(list.get(0).val).toBe(2);
  expect(list.get(0).next).toBe(null);
  expect(list.get(0).prev).toBe(null);
  expect(list.tail).toBe(list.head);

  expect(list.remove(0).val).toBe(2);
  expect(list.tail).toBe(list.head);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);
});
test('.reverse reverses the list', () => {
  const list = new DoublyLinkedList();
  list.push(3);
  list.push(2);
  list.unshift(4);
  list.push(1);
  list.push(0);
  list.reverse();

  expect(list.get(0).val).toBe(0);
  expect(list.get(0).prev).toBe(null);
  expect(list.get(0).next.val).toBe(1);
  expect(list.get(1).val).toBe(1);
  expect(list.get(1).prev.val).toBe(0);
  expect(list.get(1).next.val).toBe(2);
  expect(list.get(2).val).toBe(2);
  expect(list.get(2).prev.val).toBe(1);
  expect(list.get(2).next.val).toBe(3);
  expect(list.get(3).val).toBe(3);
  expect(list.get(3).prev.val).toBe(2);
  expect(list.get(3).next.val).toBe(4);
  expect(list.get(4).val).toBe(4);
  expect(list.get(4).prev.val).toBe(3);
  expect(list.get(4).next).toBe(null);

  expect(list.get(0)).toBe(list.head);
  expect(list.get(4)).toBe(list.tail);
  expect(list.length).toBe(5);
});
test('.print pretty prints the list', () => {
  const unshifted = new DoublyLinkedList();

  const expected0 = `
  length: 0
  head | undefined
  tail | undefined
  `;
  expect(unshifted.print('q').replace(/\s/g, '')).toBe(expected0.replace(/\s/g, ''));

  unshifted.unshift(0);
  const expected1 = `
  length: 1
  head | 0 | next: null
  tail | 0 | prev: null
  index: 0 | prevVal: undefined | val: 0 | nextVal: undefined
  `;
  expect(unshifted.print('q').replace(/\s/g, '')).toBe(expected1.replace(/\s/g, ''));

  unshifted.unshift(1);
  unshifted.unshift(2);
  unshifted.unshift(3);
  unshifted.unshift(4);
  unshifted.unshift(5);
  unshifted.unshift(6);
  unshifted.unshift(7);
  unshifted.unshift(8);
  unshifted.unshift(9);
  const expected = `
    length: 10
    head | val: 9 | nextVal: 8
    tail | val: 0 | prevVal: 1
    index: 0 | prevVal: undefined | val: 9 | nextVal: 8
    index: 1 | prevVal: 9 | val: 8 | nextVal: 7
    index: 2 | prevVal: 8 | val: 7 | nextVal: 6
    index: 3 | prevVal: 7 | val: 6 | nextVal: 5
    index: 4 | prevVal: 6 | val: 5 | nextVal: 4
    index: 5 | prevVal: 5 | val: 4 | nextVal: 3
    index: 6 | prevVal: 4 | val: 3 | nextVal: 2
    index: 7 | prevVal: 3 | val: 2 | nextVal: 1
    index: 8 | prevVal: 2 | val: 1 | nextVal: 0
    index: 9 | prevVal: 1 | val: 0 | nextVal: undefined`;
  expect(unshifted.print('q').replace(/\s/g, '')).toBe(expected.replace(/\s/g, ''));

  const pushed = new DoublyLinkedList();
  pushed.push(0);
  pushed.push(1);
  pushed.push(2);
  pushed.push(3);
  pushed.push(4);
  pushed.push(5);
  pushed.push(6);
  pushed.push(7);
  pushed.push(8);
  pushed.push(9);
  const expected2 = `
  length: 10
  head | val: 0 | nextVal: 1
  tail | val: 9 | prevVal: 8
  index: 0 | prevVal: undefined | val: 0 | nextVal: 1
  index: 1 | prevVal: 0 | val: 1 | nextVal: 2
  index: 2 | prevVal: 1 | val: 2 | nextVal: 3
  index: 3 | prevVal: 2 | val: 3 | nextVal: 4
  index: 4 | prevVal: 3 | val: 4 | nextVal: 5
  index: 5 | prevVal: 4 | val: 5 | nextVal: 6
  index: 6 | prevVal: 5 | val: 6 | nextVal: 7
  index: 7 | prevVal: 6 | val: 7 | nextVal: 8
  index: 8 | prevVal: 7 | val: 8 | nextVal: 9
  index: 9 | prevVal: 8 | val: 9 | nextVal: undefined`;

  expect(pushed.print('q').replace(/\s/g, '')).toBe(expected2.replace(/\s/g, ''));
});
