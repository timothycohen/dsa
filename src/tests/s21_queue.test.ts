import { Queue } from '../s21_queue';

test('new queue', () => {
  const queue = new Queue<number>();

  // size 0
  expect(queue.remove()).toBe(null);
  // size 1
  queue.add(0);
  expect(queue.remove()?.value).toBe(0);
  // size > 1
  queue.add(0);
  queue.add(1);
  queue.add(2);
  queue.add(3);
  expect(queue.remove()?.value).toBe(0);
  expect(queue.remove()?.value).toBe(1);
  expect(queue.add(324)).toBe(undefined);
  expect(queue.remove()?.value).toBe(2);
  expect(queue.remove()?.value).toBe(3);
  expect(queue.remove()?.value).toBe(324);
  expect(queue.remove()).toBe(null);
});
