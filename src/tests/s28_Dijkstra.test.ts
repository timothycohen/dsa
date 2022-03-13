import { Dijkstra as Graph } from '../s28_Dijkstra';

test('Dijkstra', () => {
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('B', 'E', 3);
  g.addEdge('E', 'F', 1);
  g.addEdge('D', 'F', 1);
  g.addEdge('D', 'E', 3);
  g.addEdge('C', 'D', 2);
  g.addEdge('C', 'F', 4);
  g.addEdge('C', 'A', 2);

  /*
    A--4--B--3--E
    |          /
    |        3 |
    |      /   |
    2     D    1
    |   /   \  |
    | 2      1 |
    |          \
    C-----4----F
  */

  let answer;
  answer = g.search('A', 'B');
  expect(answer?.path).toStrictEqual(['A', 'B']);
  expect(answer?.weight).toBe(4);

  answer = g.search('A', 'C');
  expect(answer?.path).toStrictEqual(['A', 'C']);
  expect(answer?.weight).toBe(2);

  answer = g.search('A', 'D');
  expect(answer?.path).toStrictEqual(['A', 'C', 'D']);
  expect(answer?.weight).toBe(4);

  answer = g.search('A', 'F');
  expect(answer?.path).toStrictEqual(['A', 'C', 'D', 'F']);
  expect(answer?.weight).toBe(5);

  answer = g.search('F', 'A');
  expect(answer?.path).toStrictEqual(['F', 'D', 'C', 'A']);
  expect(answer?.weight).toBe(5);

  answer = g.search('B', 'D');
  expect(answer?.path).toStrictEqual(['B', 'E', 'F', 'D']);
  expect(answer?.weight).toBe(5);

  answer = g.search('E', 'A');
  expect(answer?.path).toStrictEqual(['E', 'F', 'D', 'C', 'A']);
  expect(answer?.weight).toBe(6);
});

test('same path', () => {
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('B', 'E', 3);
  g.addEdge('E', 'F', 1);
  g.addEdge('D', 'F', 1);
  g.addEdge('D', 'E', 3);
  g.addEdge('C', 'D', 2);
  g.addEdge('C', 'F', 4);
  g.addEdge('C', 'A', 2);

  const answer = g.search('A', 'A');
  expect(answer?.path).toStrictEqual(['A']);
  expect(answer?.weight).toBe(0);
});

test('vertex or vertices not in graph', () => {
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('B', 'E', 3);
  g.addEdge('E', 'F', 1);
  g.addEdge('D', 'F', 1);
  g.addEdge('D', 'E', 3);
  g.addEdge('C', 'D', 2);
  g.addEdge('C', 'F', 4);
  g.addEdge('C', 'A', 2);

  let answer;

  answer = g.search('A', 'ZZZ');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);

  answer = g.search('AAA', 'ZZZ');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);

  answer = g.search('ZZZ', 'A');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);

  answer = g.search('ZZZ', 'AAA');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);
});

test('unreachable vertex exits gracefully', () => {
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('B', 'E', 3);
  g.addEdge('E', 'F', 1);
  g.addEdge('D', 'F', 1);
  g.addEdge('D', 'E', 3);
  g.addEdge('C', 'D', 2);
  g.addEdge('C', 'F', 4);
  g.addEdge('C', 'A', 2);
  g.addVertex('ZZZ');

  let answer;

  answer = g.search('ZZZ', 'AAA');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);

  answer = g.search('AAA', 'ZZZ');
  expect(answer?.path).toBe(undefined);
  expect(answer?.weight).toBe(undefined);
});
