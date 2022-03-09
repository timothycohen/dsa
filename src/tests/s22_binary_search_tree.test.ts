const { BST } = require('../s22_binary_search_tree');

export {};

test('insert value in the correct order', () => {
  const bst = new BST();
  let res: boolean;

  res = bst.insert(5);
  res = bst.insert(2);
  res = bst.insert(6);
  res = bst.insert(8);
  res = bst.insert(7);

  expect(bst.root.value).toBe(5);
  expect(bst.root.right.value).toBe(6);
  expect(bst.root.right.right.value).toBe(8);
  expect(bst.root.right.right.left.value).toBe(7);
  expect(bst.root.left.value).toBe(2);
});

test('insert return is a bool representation of insertion success', () => {
  const bst = new BST();
  let res: boolean;

  res = bst.insert(5);
  expect(res).toBe(true);
  res = bst.insert(2);
  expect(res).toBe(true);
  res = bst.insert(6);
  expect(res).toBe(true);
  res = bst.insert(8);
  expect(res).toBe(true);
  res = bst.insert(5);
  expect(res).toBe(false);
  res = bst.insert(7);
  expect(res).toBe(true);
  res = bst.insert(6);
  expect(res).toBe(false);
});

test('correctly tracks the max depth', () => {
  const bst = new BST();
  let res: boolean;
  expect(bst.depth).toBe(0);
  res = bst.insert(5);
  expect(bst.depth).toBe(1);
  res = bst.insert(2);
  expect(bst.depth).toBe(2);
  res = bst.insert(6);
  expect(bst.depth).toBe(2);
  res = bst.insert(8);
  expect(bst.depth).toBe(3);
  res = bst.insert(5);
  expect(bst.depth).toBe(3);
  res = bst.insert(7);
  expect(bst.depth).toBe(4);
  res = bst.insert(6);
  expect(bst.depth).toBe(4);
});

test('contains returns a boolean designating presence', () => {
  const bst = new BST();
  let res: boolean;

  res = bst.insert(5);
  res = bst.insert(2);
  res = bst.insert(6);
  res = bst.insert(8);
  res = bst.insert(7);

  expect(bst.contains(5)).toBe(true);
  expect(bst.contains(2)).toBe(true);
  expect(bst.contains(6)).toBe(true);
  expect(bst.contains(8)).toBe(true);
  expect(bst.contains(7)).toBe(true);
  expect(bst.contains(435)).toBe(false);
  expect(bst.contains(0)).toBe(false);
  expect(bst.contains(-5)).toBe(false);
  expect(bst.contains(3)).toBe(false);
});

test('prints', () => {
  const bst = new BST();
  bst.insert(5);
  bst.insert(3);
  bst.insert(9);
  bst.insert(4);
  bst.insert(243);
  bst.insert(3);
  bst.insert(16);
  bst.insert(23);
  bst.insert(4);
  bst.insert(86);
  bst.insert(543);
  bst.insert(2);
  bst.insert(34);

  // console.log(JSON.stringify(bst.root, null, '    '));
  expect(JSON.stringify(bst.root)).toBe('{"value":5,"left":{"value":3,"left":{"value":2,"left":null,"right":null},"right":{"value":4,"left":null,"right":null}},"right":{"value":9,"left":null,"right":{"value":243,"left":{"value":16,"left":null,"right":{"value":23,"left":null,"right":{"value":86,"left":{"value":34,"left":null,"right":null},"right":null}}},"right":{"value":543,"left":null,"right":null}}}}');
  expect(bst.print('q').replace(/\s/g, '')).toBe(`      5
3 ⬅      ➡ 9       moving left from 5 to 3
      3
2 ⬅      ➡ 4       moving left from 3 to 2
2 is a leaf
           ...retracing and moving right from 3 to 4
4 is a leaf
           ...retracing and moving right from 5 to 9
      9
       ➡ 243       moving right from 9 to 243
      243
16 ⬅      ➡ 543     moving left from 243 to 16
      16
       ➡ 23       moving right from 16 to 23
      23
       ➡ 86       moving right from 23 to 86
      86
34 ⬅              moving left from 86 to 34
34 is a leaf
           ...retracing and moving right from 243 to 543
543 is a leaf`.replace(/\s/g, ''));
});

test('BFSArray', () => {
  const bst = new BST();
  bst.insert(5);
  bst.insert(3);
  bst.insert(9);
  bst.insert(4);
  bst.insert(243);
  bst.insert(3);
  bst.insert(16);
  bst.insert(23);
  bst.insert(4);
  bst.insert(86);
  bst.insert(543);
  bst.insert(2);
  bst.insert(34);
  const expected = [5, 3, 9, 2, 4, 243, 16, 543, 23, 86, 34];
  expect(bst.toArray('BFS')).toEqual(expected);
});

test('DFSArray', () => {
  const bst = new BST();
  bst.insert(5);
  bst.insert(3);
  bst.insert(9);
  bst.insert(4);
  bst.insert(243);
  bst.insert(3);
  bst.insert(16);
  bst.insert(23);
  bst.insert(4);
  bst.insert(86);
  bst.insert(543);
  bst.insert(2);
  bst.insert(34);
  const expectedPreOrder = [5, 3, 2, 4, 9, 243, 16, 23, 86, 34, 543];
  const expectedPostOrder = [2, 4, 3, 34, 86, 23, 16, 543, 243, 9, 5];
  const expectedInOrder = [2, 3, 4, 5, 9, 16, 23, 34, 86, 243, 543];
  expect(bst.toArray('DFS', { order: 'pre' })).toEqual(expectedPreOrder);
  expect(bst.toArray('DFS', { order: 'post' })).toEqual(expectedPostOrder);
  expect(bst.toArray('DFS', { order: 'order' })).toEqual(expectedInOrder);
  expect(bst.toArray()).toEqual(expectedInOrder);
  expect(bst.toArray('DFS')).toEqual(expectedInOrder);
  expect(bst.toArray('DFS', { order: 'reverse' })).toEqual(expectedInOrder.reverse());
});

test('build from array', () => {
  const array = [5, 3, 2, 4, 9, 243, 16, 23, 86, 34, 543];
  const expectedInOrder = [2, 3, 4, 5, 9, 16, 23, 34, 86, 243, 543];
  const tree = BST.build(array);
  expect(tree.toArray('DFS', { order: 'order' })).toEqual(expectedInOrder);
});

test('duplicate', () => {
  const array = [5, 3, 2, 4, 9, 243, 16, 23, 86, 34, 543];
  const tree = BST.build(array);
  const dup = BST.duplicate(tree);
  dup.insert(500);

  const treePostOrder = [2, 4, 3, 34, 86, 23, 16, 543, 243, 9, 5];
  expect(tree.toArray('DFS', { order: 'post' })).toEqual(treePostOrder);

  const dupPostOrder = [2, 4, 3, 34, 86, 23, 16, 500, 543, 243, 9, 5];
  expect(dup.toArray('DFS', { order: 'post' })).toEqual(dupPostOrder);
});
