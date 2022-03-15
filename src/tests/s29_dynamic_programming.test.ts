import { logger } from '../logger';
import { fibRecursive, fibMemo, fibTab } from '../s29_dynamic_programming';

test('basic recusive fib', () => {
  expect(fibRecursive(-5)).toBe(undefined);
  expect(fibRecursive(0)).toBe(0);
  expect(fibRecursive(1)).toBe(1);
  expect(fibRecursive(2)).toBe(1);
  expect(fibRecursive(3)).toBe(2);
  expect(fibRecursive(4)).toBe(3);
  expect(fibRecursive(5)).toBe(5);
  expect(fibRecursive(6)).toBe(8);
  expect(fibRecursive(7)).toBe(13);
  expect(fibRecursive(8)).toBe(21);
  expect(fibRecursive(9)).toBe(34);
  expect(fibRecursive(10)).toBe(55);
  expect(fibRecursive(11)).toBe(89);
  expect(fibRecursive(12)).toBe(144);
});

test('fib recursively with a store', () => {
  expect(fibMemo(-5)).toBe(undefined);
  expect(fibMemo(0)).toBe(0);
  expect(fibMemo(1)).toBe(1);
  expect(fibMemo(2)).toBe(1);
  expect(fibMemo(3)).toBe(2);
  expect(fibMemo(4)).toBe(3);
  expect(fibMemo(5)).toBe(5);
  expect(fibMemo(6)).toBe(8);
  expect(fibMemo(7)).toBe(13);
  expect(fibMemo(8)).toBe(21);
  expect(fibMemo(9)).toBe(34);
  expect(fibMemo(10)).toBe(55);
  expect(fibMemo(11)).toBe(89);
  expect(fibMemo(12)).toBe(144);
});

test('fib iteratively with a store', () => {
  expect(fibTab(-5)).toBe(undefined);
  expect(fibTab(0)).toBe(0);
  expect(fibTab(1)).toBe(1);
  expect(fibTab(2)).toBe(1);
  expect(fibTab(3)).toBe(2);
  expect(fibTab(4)).toBe(3);
  expect(fibTab(5)).toBe(5);
  expect(fibTab(6)).toBe(8);
  expect(fibTab(7)).toBe(13);
  expect(fibTab(8)).toBe(21);
  expect(fibTab(9)).toBe(34);
  expect(fibTab(10)).toBe(55);
  expect(fibTab(11)).toBe(89);
  expect(fibTab(12)).toBe(144);
});

test('fibRecursive, fibMemo, fibTable speed', () => {
  const t1 = performance.now();
  expect(fibRecursive(40)).toBe(102334155);
  const t2 = performance.now();
  expect(fibMemo(40)).toBe(102334155);
  const t3 = performance.now();
  expect(fibTab(40)).toBe(102334155);
  const t4 = performance.now();
  logger.info(`fibRecursive Time ${t2 - t1}`);
  logger.info(`fibMemo Time ${t3 - t2}`);
  logger.info(`fibTab Time ${t4 - t3}`);
  expect(t2 - t1).toBeGreaterThan(t3 - t2);
  expect(t2 - t1).toBeGreaterThan(t4 - t3);
});
