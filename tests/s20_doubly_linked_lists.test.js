const { DoublyLinkedList } = require('../dist/s20_doubly_linked_lists')

test('new list', () => {
  let list = new DoublyLinkedList;
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);
});
test('.push adds one to the end and returns the list', () => {
  let list = new DoublyLinkedList;
  list.push(5)
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(null);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(null);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(1);
  list.push(7)
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(list.tail);
  expect(list.tail.val).toBe(7);
  expect(list.tail.prev).toBe(list.head);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(2);
})
test('.pop removes one from the end and returns the node or undefined', () => {
  let list = new DoublyLinkedList;
  expect(list.pop()).toBe(undefined);

  list.push(5)
  let popped5 = list.pop();
  expect(popped5.val).toBe(5);
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);

  list.push(1)
  list.push(3)
  list.push(7)
  let popped7 = list.pop();

  expect(popped7.val).toBe(7);
  expect(list.length).toBe(2);
  expect(list.head.val).toBe(1);
  expect(list.tail.val).toBe(3);
  expect(list.tail.prev).toBe(list.head);
  expect(list.head.next).toBe(list.tail);
})
test('.shift removes one from the start and returns the node or undefined', () => {
  let list = new DoublyLinkedList;
  expect(list.shift()).toBe(undefined);

  list.push(5)
  let shifted5 = list.shift();
  expect(shifted5.val).toBe(5);
  expect(list.head).toBe(null);
  expect(list.tail).toBe(null);
  expect(list.length).toBe(0);

  list.push(1)
  list.push(3)
  list.push(7)
  let shifted1 = list.shift();

  expect(shifted1.val).toBe(1);
  expect(list.length).toBe(2);
  expect(list.head.val).toBe(3);
  expect(list.tail.val).toBe(7);
  expect(list.tail.prev).toBe(list.head);
  expect(list.head.next).toBe(list.tail);
})
test.skip('.unshift adds one to the start and returns the list', () => {
  let list = new DoublyLinkedList;
  list.unshift(5)
  expect(list.head.val).toBe(5);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(null);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(null);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(1);
  list.unshift(7)
  expect(list.head.val).toBe(7);
  expect(list.head.prev).toBe(null);
  expect(list.head.next).toBe(list.tail);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(list.head);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(2);
  list.unshift(2)
  expect(list.head.val).toBe(2);
  expect(list.head.prev).toBe(null);
  expect(list.head.next.val).toBe(7);
  expect(list.tail.val).toBe(5);
  expect(list.tail.prev).toBe(7);
  expect(list.tail.next).toBe(null);
  expect(list.length).toBe(3);
})
test.skip('.get returns the node at a position or undefined', () => {
  let list = new DoublyLinkedList;
  expect(list.get(0)).toBe(undefined)
  list.push(5)
  list.push(7)
  list.push(3)
  expect(list.get(0).val).toBe(5)
  expect(list.get(1).val).toBe(7)
  expect(list.get(2).val).toBe(3)
  expect(list.get(0).prev).toBe(null)
  expect(list.get(1).prev.val).toBe(5)
  expect(list.get(2).prev.val).toBe(7)
  expect(list.get(0).next.val).toBe(7)
  expect(list.get(1).next.val).toBe(3)
  expect(list.get(2).next).toBe(null)
  expect(list.get(-1)).toBe(undefined)
  expect(list.get(550)).toBe(undefined)
})
test.skip('.set changes the value of a node at a certain position and returns true/false based on success', () => {
  let list = new DoublyLinkedList;
  expect(list.set(0, 'hi')).toBe(false)

  list.push('hello')
  expect(list.set(-1, 'hi')).toBe(false)
  expect(list.set(0, 'hi')).toBe(true)
  expect(list.set(1, 'hi')).toBe(false)
  expect(list.get(0).val).toBe('hi')
  expect(list.get(0).prev).toBe(null)
  expect(list.get(0).next).toBe(null)

  list.push('there')
  expect(list.set(1, '!')).toBe(true)
  expect(list.get(0).val).toBe('hi')
  expect(list.get(0).next.val).toBe('!')
  expect(list.get(1).val).toBe('!')
  expect(list.get(1).prev.val).toBe('hi')
})
test.skip('.insert adds a node at the position and returns true/false based on success', () => {
  let list = new DoublyLinkedList;
  expect(list.insert(-1, 'hi')).toBe(false)
  expect(list.insert(1, 'hi')).toBe(false)
  expect(list.insert(0, 'hi')).toBe(true)
  expect(list.get(0).val).toBe('hi')
  list.push(1)
  list.push(2)
  list.push(3)
  expect(list.insert(3, '!!!')).toBe(true)
  expect(list.get(3).val).toBe('!!!')
  expect(list.get(3).prev.val).toBe(2)
  expect(list.get(3).next).toBe(3)
  expect(list.tail.val).toBe(3)
  expect(list.insert(1, 'wow')).toBe(true)
  expect(list.head.next.val).toBe('wow')
  expect(list.head.next.next.val).toBe(2)
  expect(list.head.next.prev.val).toBe(list.head.val)
})
test.skip('.remove deletes a node at the position and returns the removed node or undefined', () => {
  let list = new DoublyLinkedList;
  expect(list.remove(0)).toBe(undefined)
  expect(list.remove(-1)).toBe(undefined)
  expect(list.remove(1)).toBe(undefined)
  list.push(0)
  list.push('1')
  list.push(2)
  list.push(3)
  expect(list.remove(1).val).toBe('1')
  expect(list.get(1).val).toBe(2)
  expect(list.get(1).prev.val).toBe(0)
  expect(list.get(1).next.val).toBe(3)
})
test.skip('.reverse reverses the list', () => {
  let list = new DoublyLinkedList;
  list.push(5)
  list.push(4)
  list.push(3)
  list.push(2)
  list.push(1)
  list.reverse()
  expect(list.head.prev).toBe(null)
  expect(list.head.val).toBe(1)
  expect(list.head.next.val).toBe(2)
  expect(list.tail.val).toBe(5)
  expect(list.tail.prev.val).toBe(4)
  expect(list.tail.next).toBe(null)
  expect(list.get(1).val).toBe(2)
  expect(list.get(1).prev.val).toBe(1)
  expect(list.get(1).next.val).toBe(3)
})
test.skip('.print pretty prints the list', () => {
  let list = new DoublyLinkedList;
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  list.push(5)
  list.push(6)
  list.push(7)
  list.push(8)
  list.push(9)
  list.push(10)

  const consoleSpy = jest.spyOn(console, 'log');
  list.print()
  expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(list, null, 2));
})