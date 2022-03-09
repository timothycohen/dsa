// root: top node
// child: node directly connected to another node when moving away from the root
// parent: the converse of a child
// siblings: group of nodes with the same parent
// leaf: node with no children
// edge: connection between nodes

// examples: HTML DOM, JSON, network routing, abstract syntax trees,
// AI decision trees, directory structure, etc.

// binary tree nodes only have at most two child nodes
// binary search trees are sorted so that lesser values are to the left and greater to the right

class BSTNode<T> {
  left: BSTNode<T> | null;

  right: BSTNode<T> | null;

  constructor(public value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST<T> {
  root: BSTNode<T> | null = null;

  depth: number = 0;

  static #leftOrRight<T>(node: BSTNode<T>, val: T): 'left' | 'right' | 'found' {
    if (val > node.value) return 'right';
    if (val < node.value) return 'left';
    return 'found';
  }

  // return false if not inserted (already exists). true otherwise
  insert(val: T): boolean {
    let depthCount = 1;
    const newNode = new BSTNode(val);
    if (this.root === null) {
      this.depth = 1;
      this.root = newNode;
      return true;
    }

    let nodeToCheck: BSTNode<T> = this.root;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const direction = BST.#leftOrRight(nodeToCheck, val);
      depthCount++;
      if (direction === 'found') {
        return false;
      }
      if (nodeToCheck[direction] === null) {
        nodeToCheck[direction] = newNode;
        this.depth = Math.max(this.depth, depthCount);
        return true;
      }
      nodeToCheck = nodeToCheck[direction]!;
    }
  }

  contains(val: T): boolean {
    let nodeToCheck = this.root;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (nodeToCheck === null) return false;
      const direction = BST.#leftOrRight(nodeToCheck, val);
      if (direction === 'found') return true;
      if (nodeToCheck[direction] === null) return false;
      nodeToCheck = nodeToCheck[direction]!;
    }
  }

  print(q: 'q', parent = this.root): string {
    let log = '';
    const printNode = (node: BSTNode<T> | null): void => {
      if (!node) { log += 'dead end\n'; return; }
      if (!node.left && !node.right) { log += `${node.value} is a leaf\n`; return; }
      if (node.left && node.right) {
        log += `      ${node.value}\n${node.left.value} ⬅      ➡ ${node.right.value}`;
        log += `\tmoving left from ${node.value} to ${node.left.value}\n`; printNode(node.left);
        log += `\t\t...retracing and moving right from ${node.value} to ${node.right.value}\n`; printNode(node.right);
        return;
      }
      if (node.left) {
        log += `      ${node.value}\n${node.left.value} ⬅`;
        log += `\t\tmoving left from ${node.value} to ${node.left.value}\n`; printNode(node.left);
        return;
      }
      if (node.right) {
        log += `      ${node.value}\n        ➡ ${node.right.value}`;
        log += `\tmoving right from ${node.value} to ${node.right.value}\n`; printNode(node.right);
      }
    };

    printNode(parent);

    if (!q) console.log(log);
    return log;
  }
}

module.exports = { BST };
