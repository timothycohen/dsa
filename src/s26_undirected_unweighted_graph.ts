// Graphs are a collection of nodes and edges
// there is no root
// each node can have any number of connections
// it can be directed
// it can be weighted

// main implementations are a list or matrix
// a matrix has a spot representing the link between every two nodes
// because of that, it's very fast to access the connection between those two nodes, but very slow to add more nodes in
// an adjacency list only stores the nodes that are actually connected
// that means it uses less space and is mostly faster, but slower to actually query the datat
// generally, real world applications use adjacency lists because real world data is sparse

import { Stack } from './s21_stack';
import { Queue } from './s21_queue';

export class UndirectedUnweightedGraph {
  #adjacencyList: Record<string, Set<string>> = {};

  addVertex(vertexName: string): boolean {
    if (this.#adjacencyList[vertexName]) return false;
    this.#adjacencyList[vertexName] = new Set<string>();
    return true;
  }

  has(v1: string): boolean {
    return !!this.#adjacencyList[v1];
  }

  addEdge(v1: string, v2: string): boolean {
    if (v1 === v2) return false;
    if (this.#adjacencyList[v1] === undefined) this.addVertex(v1);
    if (this.#adjacencyList[v2] === undefined) this.addVertex(v2);
    const sizeBefore = this.#adjacencyList[v1].size;
    this.#adjacencyList[v1].add(v2);
    this.#adjacencyList[v2].add(v1);
    const sizeAfter = this.#adjacencyList[v1].size;
    if (sizeBefore === sizeAfter) return false;
    return true;
  }

  isConnected(v1: string, v2: string): boolean {
    const vertexNameOfSmallerSet =
      this.#adjacencyList[v1]?.size < this.#adjacencyList[v2]?.size ? v1 : v2;
    const vertexNameOfLargerSet = vertexNameOfSmallerSet === v1 ? v2 : v1;
    return this.#adjacencyList[vertexNameOfSmallerSet]?.has(vertexNameOfLargerSet) ?? false;
  }

  removeVertex(vertexName: string): boolean {
    const toRemove = this.has(vertexName);

    if (toRemove) {
      delete this.#adjacencyList[vertexName];
      Object.keys(this.#adjacencyList).forEach(key => {
        this.#adjacencyList[key].delete(vertexName);
      });
      return true;
    }
    return false;
  }

  removeEdge(v1: string, v2: string, hard: boolean = false): boolean {
    const toRemove = this.isConnected(v1, v2);

    if (toRemove) {
      this.#adjacencyList[v1].delete(v2);
      this.#adjacencyList[v2].delete(v1);
      if (hard) {
        if (this.#adjacencyList[v1].size === 0) this.removeVertex(v1);
        if (this.#adjacencyList[v2].size === 0) this.removeVertex(v2);
      }
      return true;
    }
    return false;
  }

  getAllConnections(vertexName: string): string[] | undefined {
    if (!this.#adjacencyList[vertexName]) return undefined;
    if (this.#adjacencyList[vertexName].size === 0) return [];
    return Array.from(this.#adjacencyList[vertexName]);
  }

  // recursive
  DFS(startingVertexName: string, noisy: boolean = false): string[] | undefined {
    if (!this.#adjacencyList[startingVertexName]) return undefined;

    const results: Set<string> = new Set();
    const visited: Record<string, boolean> = {};

    const visitNeighbors = (vertName: string): void => {
      results.add(vertName);
      visited[vertName] = true;
      if (noisy) console.log(`Looking at ${vertName}`);

      const connections = this.getAllConnections(vertName) ?? [];
      const unvisitedConnections = connections.filter(v => !visited[v]);
      unvisitedConnections.forEach(connection => visitNeighbors(connection));
    };

    visitNeighbors(startingVertexName);

    return Array.from(results);
  }

  // linked list stack iterative
  DFSIt(startingVertexName: string, noisy: boolean = false): string[] | undefined {
    if (!this.#adjacencyList[startingVertexName]) return undefined;

    const results: Set<string> = new Set();
    const visited: Record<string, boolean> = {};

    const stack = new Stack<string>();
    stack.push(startingVertexName);

    while (stack.depth) {
      const vertName = stack.pop()!.value;
      if (noisy) console.log(`Looking at ${vertName}`);

      if (!visited[vertName]) {
        results.add(vertName);
        visited[vertName] = true;

        const connections = this.getAllConnections(vertName) ?? [];
        const unvisitedConnections = connections.filter(v => !visited[v]);
        unvisitedConnections.forEach(connection => stack.push(connection));
      }
    }

    return Array.from(results);
  }

  // linked list queue iterative
  BFSIt(startingVertexName: string, noisy: boolean = false): string[] | undefined {
    if (!this.#adjacencyList[startingVertexName]) return undefined;

    const results: Set<string> = new Set();
    const visited: Record<string, boolean> = {};

    const queue = new Queue<string>();
    queue.add(startingVertexName);

    while (queue.size) {
      const vertName = queue.remove()!.value;
      if (noisy) console.log(`Looking at ${vertName}`);

      if (!visited[vertName]) {
        results.add(vertName);
        visited[vertName] = true;

        const connections = this.getAllConnections(vertName) ?? [];
        const unvisitedConnections = connections.filter(v => !visited[v]);
        unvisitedConnections.forEach(connection => queue.add(connection));
      }
    }

    return Array.from(results);
  }

  // DFS uses a stack and BFS uses a queue
  // A queue based on a linked list will be much faster because shifting reindexes the entire array
  // The array based stack should perform similarly because pop is O(1)
  search(startingVertexName: string, method: 'DFS' | 'BFS', noisy = false): string[] | undefined {
    if (!this.#adjacencyList[startingVertexName]) return undefined;

    const results: Set<string> = new Set();
    const visited: Record<string, boolean> = {};

    const stackOrQueue: string[] = [];
    stackOrQueue.push(startingVertexName);

    while (stackOrQueue.length) {
      const vertName = method === 'BFS' ? stackOrQueue.shift()! : stackOrQueue.pop()!;
      if (noisy) console.log(`Looking at ${vertName}`);

      if (!visited[vertName]) {
        results.add(vertName);
        visited[vertName] = true;

        const connections = this.getAllConnections(vertName) ?? [];
        const unvisitedConnections = connections.filter(v => !visited[v]);
        unvisitedConnections.forEach(connection => stackOrQueue.push(connection));
      }
    }

    return Array.from(results);
  }
}
