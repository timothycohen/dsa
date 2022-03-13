import { UndirectedWeightedGraph as Graph } from '../s28_undirected_weighted_graph';

test('addVertex and has', () => {
  const g = new Graph();

  // has returns false if the vertex doesn't exist
  expect(g.has('Dallas')).toBe(false);

  // new creations return true
  expect(g.addVertex('Dallas')).toBe(true);

  // duplicates return false
  expect(g.addVertex('Dallas')).toBe(false);

  // adding an edge adds verticies
  expect(g.has('Tokyo')).toBe(false);
  expect(g.has('Newark')).toBe(false);
  g.addEdge('Tokyo', 'Newark', 12);
  expect(g.has('Tokyo')).toBe(true);
  expect(g.has('Newark')).toBe(true);
});

test('addEdge and isConnected', () => {
  const g = new Graph();

  // not connected returns false even if verticies don't exist
  expect(g.isConnected('Tokyo', 'San Francisco')).toBe(false);
  expect(g.isConnected('San Francisco', 'Tokyo')).toBe(false);
  expect(g.isConnected('Tokyo', 'Dallas')).toBe(false);
  expect(g.isConnected('Dallas', 'Tokyo')).toBe(false);
  expect(g.isConnected('Dallas', 'Newark')).toBe(false);
  expect(g.isConnected('Newark', 'Dallas')).toBe(false);
  expect(g.isConnected('Athens', 'Newark')).toBe(false);

  // new creations return true
  expect(g.addEdge('Tokyo', 'San Francisco', 10)).toBe(true);
  expect(g.addEdge('Tokyo', 'Dallas', 13)).toBe(true);
  expect(g.addEdge('Dallas', 'Newark', 4)).toBe(true);
  g.addVertex('Athens');
  expect(g.isConnected('Athens', 'Newark')).toBe(false);
  expect(g.addEdge('Athens', 'Newark', 10)).toBe(true);

  // duplicates or same reference return false
  expect(g.addEdge('Tokyo', 'Dallas', 13)).toBe(false);
  expect(g.addEdge('Tokyo', 'Tokyo', 0)).toBe(false);

  // return true for both directions
  expect(g.isConnected('Tokyo', 'San Francisco')).toBe(true);
  expect(g.isConnected('San Francisco', 'Tokyo')).toBe(true);
  expect(g.isConnected('Tokyo', 'Dallas')).toBe(true);
  expect(g.isConnected('Dallas', 'Tokyo')).toBe(true);
  expect(g.isConnected('Dallas', 'Newark')).toBe(true);
  expect(g.isConnected('Newark', 'Dallas')).toBe(true);
  expect(g.isConnected('Athens', 'Newark')).toBe(true);

  // same reference returns false
  expect(g.isConnected('Newark', 'Newark')).toBe(false);

  // not connected returns false when verticies exist
  expect(g.isConnected('Tokyo', 'Newark')).toBe(false);
  expect(g.isConnected('Dallas', 'San Francisco')).toBe(false);
});

test('remove vertex', () => {
  const g = new Graph();

  g.addVertex('Seoul');
  g.addEdge('Tokyo', 'San Francisco', 10);
  g.addEdge('Tokyo', 'Dallas', 13);
  g.addEdge('Dallas', 'Newark', 4);

  // return true if removed and false otherwise
  expect(g.removeVertex('Seoul')).toBe(true);
  expect(g.has('Seoul')).toBe(false);
  expect(g.removeVertex('Seoul')).toBe(false);

  // removing a vertex removes all associated edges
  expect(g.removeVertex('Tokyo')).toBe(true);
  expect(g.has('Tokyo')).toBe(false);
  expect(g.removeVertex('Tokyo')).toBe(false);
  expect(g.isConnected('Tokyo', 'San Francisco')).toBe(false);
});

test('remove edge', () => {
  const g = new Graph();

  g.addEdge('Tokyo', 'San Francisco', 10);
  g.addEdge('Tokyo', 'Dallas', 13);
  g.addEdge('Dallas', 'Newark', 4);

  // return true if removed and false otherwise
  expect(g.removeEdge('Dallas', 'San Francisco')).toBe(false);
  expect(g.removeEdge('Tokyo', 'San Francisco')).toBe(true);
  expect(g.removeEdge('Tokyo', 'Dallas')).toBe(true);
  expect(g.removeEdge('Dallas', 'Newark')).toBe(true);

  // removing an edge will not remove an unconnected vertex
  expect(g.has('Tokyo')).toBe(true);
  expect(g.has('Dallas')).toBe(true);
  expect(g.has('Newark')).toBe(true);
  expect(g.has('San Francisco')).toBe(true);

  // the hard option will also remove any unnconnected verticies
  g.addEdge('Tokyo', 'San Francisco', 10);
  g.addEdge('Tokyo', 'Dallas', 13);
  g.addEdge('Dallas', 'Newark', 4);

  expect(g.removeEdge('Dallas', 'San Francisco', true)).toBe(false);
  expect(g.has('Tokyo')).toBe(true);
  expect(g.has('Dallas')).toBe(true);
  expect(g.has('Newark')).toBe(true);
  expect(g.has('San Francisco')).toBe(true);

  expect(g.removeEdge('Tokyo', 'San Francisco', true)).toBe(true);
  expect(g.has('Tokyo')).toBe(true);
  expect(g.has('Dallas')).toBe(true);
  expect(g.has('Newark')).toBe(true);
  expect(g.has('San Francisco')).toBe(false);

  expect(g.removeEdge('Tokyo', 'Dallas', true)).toBe(true);
  expect(g.has('Tokyo')).toBe(false);
  expect(g.has('Dallas')).toBe(true);
  expect(g.has('Newark')).toBe(true);
  expect(g.has('San Francisco')).toBe(false);

  expect(g.removeEdge('Dallas', 'Newark', true)).toBe(true);
  expect(g.has('Tokyo')).toBe(false);
  expect(g.has('Dallas')).toBe(false);
  expect(g.has('Newark')).toBe(false);
  expect(g.has('San Francisco')).toBe(false);
});

test('get all connections', () => {
  const g = new Graph();

  g.addEdge('Tokyo', 'San Francisco', 10);
  g.addEdge('Tokyo', 'Dallas', 13);
  g.addEdge('Dallas', 'Newark', 4);

  // return an array of strings if there are connections
  expect(g.getAllConnections('San Francisco')).toStrictEqual([{ name: 'Tokyo', weight: 10 }]);
  expect(g.getAllConnections('Tokyo')).toStrictEqual([
    { name: 'San Francisco', weight: 10 },
    { name: 'Dallas', weight: 13 },
  ]);
  expect(g.getAllConnections('Dallas')).toStrictEqual([
    { name: 'Tokyo', weight: 13 },
    { name: 'Newark', weight: 4 },
  ]);
  expect(g.getAllConnections('Newark')).toStrictEqual([{ name: 'Dallas', weight: 4 }]);
  // return undefined if the vertex does not exist
  g.removeEdge('Tokyo', 'San Francisco', true);
  expect(g.getAllConnections('Tokyo')).toStrictEqual([{ name: 'Dallas', weight: 13 }]);
  expect(g.getAllConnections('San Francisco')).toBe(undefined);

  // return [] if the vertex exists, but does not have any connections
  g.removeVertex('Dallas');
  expect(g.getAllConnections('Dallas')).toBe(undefined);
  expect(g.getAllConnections('Newark')).toStrictEqual([]);
  expect(g.getAllConnections('Tokyo')).toStrictEqual([]);

  g.removeVertex('Newark');
  g.removeVertex('Tokyo');
  expect(g.getAllConnections('Newark')).toBe(undefined);
  expect(g.getAllConnections('Tokyo')).toBe(undefined);
});

test('get weight', () => {
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('B', 'E', 3);
  g.addEdge('E', 'F', 1);
  g.addEdge('D', 'F', 1);
  g.addEdge('D', 'E', 3);
  g.addEdge('C', 'D', 2);
  g.addEdge('C', 'F', 4);
  g.addEdge('C', 'A', 2);

  // forward
  expect(g.getWeight('A', 'B')).toBe(4);
  expect(g.getWeight('B', 'E')).toBe(3);
  expect(g.getWeight('E', 'F')).toBe(1);
  expect(g.getWeight('D', 'F')).toBe(1);
  expect(g.getWeight('D', 'E')).toBe(3);
  expect(g.getWeight('C', 'D')).toBe(2);
  expect(g.getWeight('C', 'F')).toBe(4);
  expect(g.getWeight('C', 'A')).toBe(2);

  // reverse
  expect(g.getWeight('B', 'A')).toBe(4);
  expect(g.getWeight('E', 'B')).toBe(3);
  expect(g.getWeight('F', 'E')).toBe(1);
  expect(g.getWeight('F', 'D')).toBe(1);
  expect(g.getWeight('E', 'D')).toBe(3);
  expect(g.getWeight('D', 'C')).toBe(2);
  expect(g.getWeight('F', 'C')).toBe(4);
  expect(g.getWeight('A', 'C')).toBe(2);

  // empty or same
  expect(g.getWeight('Z', 'A')).toBe(false);
  expect(g.getWeight('F', 'F')).toBe(false);
  expect(g.getWeight('F', 'Z')).toBe(false);
  expect(g.getWeight('A', 'Z')).toBe(false);
  expect(g.getWeight('A', 'A')).toBe(false);
});
