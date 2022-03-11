import { Stack } from '../s21_stack';

test('new stack', () => {
  const stack = new Stack<number>();

  expect(stack.pop()).toBe(null);
  stack.push(0);
  expect(stack.pop()?.value).toBe(0);
  stack.push(0);
  stack.push(1);
  stack.push(2);
  stack.push(3);
  expect(stack.pop()?.value).toBe(3);
  expect(stack.pop()?.value).toBe(2);
  expect(stack.push(324)).toBe(undefined);
  expect(stack.pop()?.value).toBe(324);
  expect(stack.pop()?.value).toBe(1);
  expect(stack.pop()?.value).toBe(0);
  expect(stack.pop()).toBe(null);
});
