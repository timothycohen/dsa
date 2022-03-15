// There are two requirements to implement dynamic programming
// Overlapping subproblems: Because fib(i) is fib(i-1) + fib(i-2), fib(i+1) and fib(i) both contain fib(i-1)
// Optimal substructure: If the optimal solution contains the optimal solutions of the previous iteration.
// Dijkstra's algorithm worked because by recording the optimal path to a vertex, we could then follow the optimal solutions from neighbor to neighbor without losing the optimal solution of the whole

// To make this more performant, we could store the value of, say f(3), so we didn't need to call f(2) + f(1) when f(3) shows in (f4) and f(5)
export const fibRecursive = (index: number): number | undefined => {
  // f(5) => f(4) + f(3)
  // f(4) => f(3) + f(2)
  // f(3) => f(2) + f(1)
  // f(2) => 1
  // f(1) => 0
  if (index < 0) return undefined;
  if (index === 1) return 1;
  if (index === 0) return 0;
  return fibRecursive(index - 1)! + fibRecursive(index - 2)!;
};

// storing this inside the outer function will rewrite the store each time
// this is true even if it's wrapped in if(store[index] === undefined)
// or if it's wrapped in a recursive helper function
export const fibMemo = (index: number): number | undefined => {
  const store: number[] = [0, 1];

  const result = (function fibM(i: number): number | undefined {
    if (store[i] !== undefined) return store[i];
    if (i < 0) return undefined;

    const res = fibM(i - 1)! + fibM(i - 2)!;

    store[i] = res;
    // move the store into the global, outer, or inner scope to see that only the global scope prevents rewrites
    // logger.info(`Adding: store[${i}]: ${res}`);

    return res;
  })(index);

  return result;
};

export const fibTab = (index: number): number | undefined => {
  const store: number[] = [0, 1];
  if (index < 0) return undefined;

  for (let i = 2; i <= index; i++) {
    store[i] = store[i - 2] + store[i - 1];
  }

  return store[index];
};
