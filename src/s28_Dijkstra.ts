import { UndirectedWeightedGraph } from './s28_undirected_weighted_graph';
import { logger } from './logger';
import { PriorityQueue } from './s24_binary_heap';

type SearchResults = {
  path: string[];
  weight: number;
};

// Dijkstra's algorithm finds the shortest path between two vertices in a weighted graph
export class Dijkstra extends UndirectedWeightedGraph {
  // Take in the starting and ending vertices and return the path array with total weight
  search(sv: string, ev: string): SearchResults | undefined {
    // If the desired vertices aren't in the graph, exit early
    if (this.adjacencyList[sv] === undefined) return undefined;
    if (this.adjacencyList[ev] === undefined) return undefined;

    // Create the data structures
    // { verticeName: smallest cumulative path weight from v1 }
    const smallestWeights: Record<string, number> = {};
    // { value: verticeName, priority: smallest cumulative path weight from v1 }
    const toVisitQueue = new PriorityQueue<string>();
    // { verticeName: neighbor that led to the smallest cumulative path weight from v1 }
    const shortestPathNeighbors: Record<string, string | null> = {};

    // Initialize the data structures
    Object.keys(this.adjacencyList).forEach(key => {
      // Set the defaults for all but the starting vertex
      const weight = key === sv ? 0 : Infinity;
      const shortestPathNeighbor = key === sv ? sv : null;
      smallestWeights[key] = weight;
      toVisitQueue.insert({ value: key, priority: weight });
      shortestPathNeighbors[key] = shortestPathNeighbor;
    });

    logger.debug(`🌱 Seeding the data structures
Initialized!
start: ${sv} | end: ${ev}
smallestWeights: ${Object.keys(smallestWeights).map(key => ` ${key}:${smallestWeights[key]}`)}
toVisitQueue: ${toVisitQueue.getValues().map(k => ` ${k.value}:${k.priority}`)}
shortestPathNeighbors: ${Object.keys(shortestPathNeighbors).map(
      key => ` ${key}:${shortestPathNeighbors[key]}`
    )}
    `);

    // take vertices out in order of their smallest cumulative weight to the start
    while (toVisitQueue.size) {
      const v1 = toVisitQueue.remove()!;

      logger.debug(`🐍 Extracting the next vertex
Popped ${v1.value}:${v1.priority} off the queue
The priority queue toVisitQueue is now: ${toVisitQueue
        .getValues()
        .map(k => ` ${k.value}:${k.priority}`)}
`);

      const neighbors = this.getAllConnections(v1.value);

      logger.debug(`🏠 ${v1.value}'s neighbors: ${neighbors?.map(e => ` ${e.name}`)}\n`);

      // For each of the vertices neighbors, calculate the cumulative weight from the starting vertex
      // If we find a shorter path, update the three data structures with that information
      if (neighbors !== undefined) {
        neighbors.forEach(neighbor => {
          const candidateWeight = neighbor.weight + smallestWeights[v1.value];
          const previousWeight = smallestWeights[neighbor.name];

          logger.debug(`⏲
Checking ${v1.value}'s neighbor: ${neighbor.name}
  Weight between ${v1.value} and ${sv} is: ${smallestWeights[v1.value]}
  Weight between ${neighbor.name} and ${v1.value} is ${neighbor.weight}
Checking candidate weight < previous weight | ${candidateWeight} < ${previousWeight}
          `);

          if (candidateWeight < previousWeight) {
            smallestWeights[neighbor.name] = candidateWeight;
            shortestPathNeighbors[neighbor.name] = v1.value;
            toVisitQueue.insert({ value: neighbor.name, priority: candidateWeight });

            logger.debug(`✍
Updating...
smallestWeights[${neighbor.name}]: ${smallestWeights[neighbor.name]}
toVisitQueue: ${toVisitQueue.getValues().map(k => ` ${k.value}:${k.priority}`)}
shortestPathNeighbors[${neighbor.name}]: ${shortestPathNeighbors[neighbor.name]}
            `);
          }
        });
      }
    }

    // Build and return the path by following each vertex's shortest neighbor
    const buildingPath: string[] = [];
    let currentVertex: string | null = ev;
    while (currentVertex !== null && currentVertex !== sv) {
      buildingPath.push(currentVertex);
      currentVertex = shortestPathNeighbors[currentVertex];
    }

    const path = buildingPath.concat(sv).reverse();
    const weight = smallestWeights[ev];

    logger.debug(`✅ Finished
start: ${sv} | end: ${ev}
path: ${path.map(a => ` ${a}`)} | weight: ${weight}
smallestWeights: ${Object.keys(smallestWeights).map(key => ` ${key}:${smallestWeights[key]}`)}
toVisitQueue size: ${toVisitQueue.size}
shortestPathNeighbors: ${Object.keys(shortestPathNeighbors).map(
      key => ` ${key}:${shortestPathNeighbors[key]}`
    )}
`);

    return { path, weight };
  }
}
