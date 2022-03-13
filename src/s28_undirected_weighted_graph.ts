class Edge {
  constructor(public name: string, public weight: number) {}
}

export class UndirectedWeightedGraph {
  /*  {
      'Atlanta': [
        {name: 'Portland': weight: 5},
        {name: 'Seattle': weight: 6},
      ],
      'Tokyo': [
        {name: 'Seoul': weight: 3},
        {name: 'New Dehli': weight: 6},
      ],
    },
*/

  protected adjacencyList: Record<string, Edge[]> = {};

  // adding a vertex will set its edge to an empty array
  addVertex(vertexName: string): boolean {
    if (this.adjacencyList[vertexName]) return false;
    this.adjacencyList[vertexName] = [];
    return true;
  }

  has(vertexName: string): boolean {
    return !!this.adjacencyList[vertexName];
  }

  addEdge(v1: string, v2: string, weight: number): boolean {
    // can't have an edge without two vertices
    if (v1 === v2) return false;

    // adding an edge will create vertices if they don't exist
    if (this.adjacencyList[v1] === undefined) this.addVertex(v1);
    if (this.adjacencyList[v2] === undefined) this.addVertex(v2);

    // if the edge already exists, return false
    // otherwise, add the bidirectional edge and return true
    if (!this.adjacencyList[v1].find(edge => edge.name === v2)) {
      this.adjacencyList[v1].push({ name: v2, weight });
      this.adjacencyList[v2].push({ name: v1, weight });
      return true;
    }
    return false;
  }

  getWeight(v1: string, v2: string): number | false {
    // If either of the vertices don't exist, return false
    if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return false;

    // Find the vertex with the shortest edge size to save time
    const vertexNameWithSmallerEdgeList =
      this.adjacencyList[v1].length < this.adjacencyList[v2].length ? v1 : v2;
    const vertexNameWithLargerEdgeList = vertexNameWithSmallerEdgeList === v1 ? v2 : v1;

    // return the weight of the connection if the vertex's edge contains the other and otherwise false
    const edges = this.adjacencyList[vertexNameWithSmallerEdgeList];
    const connection = edges.find(edge => edge.name === vertexNameWithLargerEdgeList);
    if (connection === undefined) return false;

    return connection.weight;
  }

  isConnected(v1: string, v2: string): boolean {
    const res = this.getWeight(v1, v2);
    if (res === false) return false;
    return true;
  }

  removeVertex(vertexName: string): boolean {
    // don't remove if the vertex doesn't exist
    if (!this.has(vertexName)) return false;

    // remove the key and all its edges
    delete this.adjacencyList[vertexName];

    // map through each of the other keys and remove associated edge
    Object.keys(this.adjacencyList).forEach(key => {
      this.adjacencyList[key] = this.adjacencyList[key].filter(edge => edge.name !== vertexName);
    });
    return true;
  }

  removeEdge(v1: string, v2: string, hard: boolean = false): boolean {
    // don't remove if the edge doesn't exist
    if (!this.isConnected(v1, v2)) return false;

    this.adjacencyList[v1] = this.adjacencyList[v1].filter(edge => edge.name !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(edge => edge.name !== v1);

    // if the hard flag is set, remove any vertices that don't have connections
    if (hard) {
      if (this.adjacencyList[v1].length === 0) this.removeVertex(v1);
      if (this.adjacencyList[v2].length === 0) this.removeVertex(v2);
    }
    return true;
  }

  getAllConnections(vertexName: string): Edge[] | undefined {
    if (!this.has(vertexName)) return undefined;
    if (this.adjacencyList[vertexName].length === 0) return [];
    return [...this.adjacencyList[vertexName]];
  }
}
