import {
  createNumBinaryHeap,
  createPQNode,
  createPriorityQueue,
  createFIFOPQNode,
  createFIFOPriorityQueue,
} from '../s24_binary_heap_F';

test('insert value in the correct order', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  expect(bh.getValues()).toStrictEqual([9, 7, 8, -5, 6, 3, 5]);
});

test('getIndex returns index or -1 if not found', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  expect(bh.getIndex(3)).toEqual(5);
  expect(bh.getIndex(9)).toEqual(0);
  expect(bh.getIndex(-5)).toEqual(3);
  expect(bh.getIndex(7)).toEqual(1);
  expect(bh.getIndex(8)).toEqual(2);
  expect(bh.getIndex(5)).toEqual(6);
  expect(bh.getIndex(6)).toEqual(4);
});

test('insert prevents duplicates', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  bh.insert(6);
  bh.insert(5);
  bh.insert(3);
  bh.insert(-5);
  bh.insert(9);
  bh.insert(8);
  bh.insert(7);

  expect(bh.getValues()).toStrictEqual([9, 7, 8, -5, 6, 3, 5]);
});

test('values can not be modified directly', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  expect(bh.isValid()).toBe(true);
  bh.getValues().push(-9999);
  expect(bh.isValid()).toBe(true);
  bh.getValues().push(9999);
  expect(bh.isValid()).toBe(true);
});

test('remove returns the root value', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  expect(bh.remove()).toBe(9);
  expect(bh.remove()).toBe(8);
  expect(bh.remove()).toBe(7);
  expect(bh.remove()).toBe(6);
  expect(bh.remove()).toBe(5);
  expect(bh.remove()).toBe(3);
  expect(bh.remove()).toBe(-5);
  expect(bh.remove()).toBe(undefined);
  expect(bh.remove()).toBe(undefined);
  expect(bh.getValues()).toStrictEqual([]);
});

test('remove keeps the tree structure', () => {
  const bh = createNumBinaryHeap();
  bh.insert(5);
  bh.insert(-5);
  bh.insert(6);
  bh.insert(9);
  bh.insert(7);
  bh.insert(3);
  bh.insert(8);

  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
  bh.remove();
  expect(bh.isValid()).toBe(true);
});

test('priority queue', () => {
  // The priority queue has no guarantees in the order between siblings (same priorities)
  // it is not FIFO within priority
  const pq = createPriorityQueue();
  pq.insert(createPQNode('ouch', 4)); // first 4
  pq.insert(createPQNode('?!?!?!', 1)); // first 1
  pq.insert(createPQNode('GEEBUS', 2)); // first 2
  pq.insert(createPQNode('hmm', 5)); // first 5
  pq.insert(createPQNode('OWW', 3)); // first 3
  expect(pq.remove()?.value).toBe('?!?!?!'); // removed first 1
  pq.insert(createPQNode('YOWZA', 1)); // second 1
  pq.insert(createPQNode('AHHHHHHH', 3)); // second 3
  pq.insert(createPQNode('NOPENOPE', 1)); // third 1
  expect(pq.remove()?.value).toBe('NOPENOPE'); // removed third 1
  expect(pq.remove()?.value).toBe('YOWZA'); // removed second 1
  expect(pq.remove()?.value).toBe('GEEBUS'); // removed first 2
  expect(pq.remove()?.value).toBe('AHHHHHHH'); // removed second 3
  expect(pq.remove()?.value).toBe('OWW'); // removed first 3
  expect(pq.remove()?.value).toBe('ouch'); // removed first 4
  expect(pq.remove()?.value).toBe('hmm'); // removed first 5
  expect(pq.remove()).toBe(undefined);
});

// creationTime stores ms and so many insertions might have the same insertion time
// (but then they're as good as the same priority)
// for testing, wrap insertions in a 1ms pause
test('fifo priority queue', async () => {
  const pq = createFIFOPriorityQueue();

  const pause = (cb: void) =>
    new Promise(r => {
      setTimeout(() => {
        r(cb);
      }, 1);
    });
  await pause(pq.insert(createFIFOPQNode('ouch', 4))); // first 4
  await pause(pq.insert(createFIFOPQNode('?!?!?!', 1))); // first 1
  await pause(pq.insert(createFIFOPQNode('GEEBUS', 2))); // first 2
  await pause(pq.insert(createFIFOPQNode('hmm', 5))); // first 5
  await pause(pq.insert(createFIFOPQNode('OWW', 3))); // first 3

  expect(pq.remove()?.value).toBe('?!?!?!'); // removed first 1

  await pause(pq.insert(createFIFOPQNode('YOWZA', 1))); // second 1
  await pause(pq.insert(createFIFOPQNode('AHHHHHHH', 3))); // second 3
  await pause(pq.insert(createFIFOPQNode('NOPENOPE', 1))); // third 1

  expect(pq.remove()?.value).toBe('YOWZA'); // removed second 1
  expect(pq.remove()?.value).toBe('NOPENOPE'); // removed third 1
  expect(pq.remove()?.value).toBe('GEEBUS'); // removed first 2
  expect(pq.remove()?.value).toBe('OWW'); // removed first 3
  expect(pq.remove()?.value).toBe('AHHHHHHH'); // removed second 3
  expect(pq.remove()?.value).toBe('ouch'); // removed first 4
  expect(pq.remove()?.value).toBe('hmm'); // removed first 5
  expect(pq.remove()).toBe(undefined);
});
