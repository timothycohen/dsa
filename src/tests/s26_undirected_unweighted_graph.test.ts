import { UndirectedUnweightedGraph as Graph } from '../s26_undirected_unweighted_graph';

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
  g.addEdge('Tokyo', 'Newark');
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
  expect(g.addEdge('Tokyo', 'San Francisco')).toBe(true);
  expect(g.addEdge('Tokyo', 'Dallas')).toBe(true);
  expect(g.addEdge('Dallas', 'Newark')).toBe(true);
  g.addVertex('Athens');
  expect(g.isConnected('Athens', 'Newark')).toBe(false);
  expect(g.addEdge('Athens', 'Newark')).toBe(true);

  // duplicates or same reference return false
  expect(g.addEdge('Tokyo', 'Dallas')).toBe(false);
  expect(g.addEdge('Tokyo', 'Tokyo')).toBe(false);

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
  g.addEdge('Tokyo', 'San Francisco');
  g.addEdge('Tokyo', 'Dallas');
  g.addEdge('Dallas', 'Newark');

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

  g.addEdge('Tokyo', 'San Francisco');
  g.addEdge('Tokyo', 'Dallas');
  g.addEdge('Dallas', 'Newark');

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
  g.addEdge('Tokyo', 'San Francisco');
  g.addEdge('Tokyo', 'Dallas');
  g.addEdge('Dallas', 'Newark');

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

  g.addEdge('Tokyo', 'San Francisco');
  g.addEdge('Tokyo', 'Dallas');
  g.addEdge('Dallas', 'Newark');

  // return an array of strings if there are connections
  expect(g.getAllConnections('San Francisco')).toStrictEqual(['Tokyo']);
  expect(g.getAllConnections('Tokyo')).toStrictEqual(['San Francisco', 'Dallas']);
  expect(g.getAllConnections('Dallas')).toStrictEqual(['Tokyo', 'Newark']);
  expect(g.getAllConnections('Newark')).toStrictEqual(['Dallas']);

  // return undefined if the vertex does not exist
  g.removeEdge('Tokyo', 'San Francisco', true);
  expect(g.getAllConnections('Tokyo')).toStrictEqual(['Dallas']);
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

test('DFS recursively', () => {
  const g = new Graph();

  g.addEdge('Atlanta', 'Portland');
  g.addEdge('Portland', 'Dallas');
  g.addEdge('Dallas', 'Newark');
  g.addEdge('Newark', 'San Francisco');

  g.addEdge('Tokyo', 'Seoul');
  g.addEdge('Seoul', 'New Dehli');
  g.addEdge('New Dehli', 'Taipei');

  g.addEdge('Rome', 'Lisbon');
  g.addEdge('Lisbon', 'Barcelona');
  g.addEdge('Barcelona', 'Frankfurt');
  g.addEdge('Frankfurt', 'London');
  g.addEdge('London', 'Paris');

  expect(g.DFS('blahBlah')).toBe(undefined);
  expect(g.DFS('Tokyo')).toStrictEqual(['Tokyo', 'Seoul', 'New Dehli', 'Taipei']);
  expect(g.DFS('Atlanta')).toStrictEqual([
    'Atlanta',
    'Portland',
    'Dallas',
    'Newark',
    'San Francisco',
  ]);
  expect(g.DFS('Rome')).toStrictEqual([
    'Rome',
    'Lisbon',
    'Barcelona',
    'Frankfurt',
    'London',
    'Paris',
  ]);

  g.addEdge('Dallas', 'Lisbon');
  g.addEdge('Dallas', 'Seoul');
  g.addEdge('Portland', 'Tokyo');
  g.addEdge('Frankfurt', 'New Dehli');

  expect(g.DFS('Tokyo')?.sort()).toStrictEqual(
    [
      'Tokyo',
      'Seoul',
      'New Dehli',
      'Taipei',
      'Frankfurt',
      'Barcelona',
      'Lisbon',
      'Rome',
      'Dallas',
      'Portland',
      'Atlanta',
      'Newark',
      'San Francisco',
      'London',
      'Paris',
      // 'Dallas',
      // 'Portland',
    ].sort()
  );
});

test('DFSIt', () => {
  const g = new Graph();

  g.addEdge('Atlanta', 'Portland');
  g.addEdge('Portland', 'Dallas');
  g.addEdge('Dallas', 'Newark');
  g.addEdge('Newark', 'San Francisco');

  g.addEdge('Tokyo', 'Seoul');
  g.addEdge('Seoul', 'New Dehli');
  g.addEdge('New Dehli', 'Taipei');

  g.addEdge('Rome', 'Lisbon');
  g.addEdge('Lisbon', 'Barcelona');
  g.addEdge('Barcelona', 'Frankfurt');
  g.addEdge('Frankfurt', 'London');
  g.addEdge('London', 'Paris');

  expect(g.DFSIt('blahBlah')).toBe(undefined);
  expect(g.DFSIt('Tokyo')).toStrictEqual(['Tokyo', 'Seoul', 'New Dehli', 'Taipei']);
  expect(g.DFSIt('Atlanta')).toStrictEqual([
    'Atlanta',
    'Portland',
    'Dallas',
    'Newark',
    'San Francisco',
  ]);
  expect(g.DFSIt('Rome')).toStrictEqual([
    'Rome',
    'Lisbon',
    'Barcelona',
    'Frankfurt',
    'London',
    'Paris',
  ]);

  g.addEdge('Dallas', 'Lisbon');
  g.addEdge('Dallas', 'Seoul');
  g.addEdge('Portland', 'Tokyo');
  g.addEdge('Frankfurt', 'New Dehli');

  expect(g.DFSIt('Tokyo')?.sort()).toStrictEqual(
    [
      'Tokyo',
      'Portland',
      'Dallas',
      'Seoul',
      'New Dehli',
      'Frankfurt',
      'London',
      'Paris',
      'Barcelona',
      'Lisbon',
      'Rome',
      'Taipei',
      // 'Lisbon',
      'Newark',
      'San Francisco',
      'Atlanta',
      // 'Seoul',
    ].sort()
  );
});

test('BFSIt', () => {
  const g = new Graph();

  g.addEdge('Atlanta', 'Portland');
  g.addEdge('Portland', 'Dallas');
  g.addEdge('Dallas', 'Newark');
  g.addEdge('Newark', 'San Francisco');

  g.addEdge('Tokyo', 'Seoul');
  g.addEdge('Seoul', 'New Dehli');
  g.addEdge('New Dehli', 'Taipei');

  g.addEdge('Rome', 'Lisbon');
  g.addEdge('Lisbon', 'Barcelona');
  g.addEdge('Barcelona', 'Frankfurt');
  g.addEdge('Frankfurt', 'London');
  g.addEdge('London', 'Paris');

  expect(g.BFSIt('blahBlah')).toBe(undefined);
  expect(g.BFSIt('Tokyo')).toStrictEqual(['Tokyo', 'Seoul', 'New Dehli', 'Taipei']);
  expect(g.BFSIt('Atlanta')).toStrictEqual([
    'Atlanta',
    'Portland',
    'Dallas',
    'Newark',
    'San Francisco',
  ]);
  expect(g.BFSIt('Rome')).toStrictEqual([
    'Rome',
    'Lisbon',
    'Barcelona',
    'Frankfurt',
    'London',
    'Paris',
  ]);

  g.addEdge('Dallas', 'Lisbon');
  g.addEdge('Dallas', 'Seoul');
  g.addEdge('Portland', 'Tokyo');
  g.addEdge('Frankfurt', 'New Dehli');

  expect(g.BFSIt('Tokyo')?.sort()).toStrictEqual(
    [
      'Tokyo',
      'Seoul',
      'Portland',
      'New Dehli',
      'Dallas',
      'Atlanta',
      // 'Dallas',
      'Taipei',
      'Frankfurt',
      'Newark',
      'Lisbon',
      'Barcelona',
      'London',
      'San Francisco',
      'Rome',
      // 'Barcelona',
      'Paris',
    ].sort()
  );
});

test('BFS and DFS are ordered correctly', () => {
  const g = new Graph();
  g.addEdge('A', 'C');
  g.addEdge('C', 'E');
  g.addEdge('E', 'F');
  g.addEdge('E', 'D');
  g.addEdge('D', 'B');
  g.addEdge('B', 'A');

  /*
       A
     /  \
    B   C
   |    |
   D---E
   \  /
    F

  */

  expect(g.BFSIt('A')).toStrictEqual(['A', 'C', 'B', 'E', 'D', 'F']);
  expect(g.search('A', 'BFS')).toStrictEqual(['A', 'C', 'B', 'E', 'D', 'F']);

  expect(g.DFSIt('A')).toStrictEqual(['A', 'B', 'D', 'E', 'F', 'C']);
  expect(g.search('A', 'DFS')).toStrictEqual(['A', 'B', 'D', 'E', 'F', 'C']);

  expect(g.DFS('A')).toStrictEqual(['A', 'C', 'E', 'F', 'D', 'B']);
});
