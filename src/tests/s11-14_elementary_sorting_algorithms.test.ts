import { bubbleSort, selectionSort, insertionSort } from '../s11-14_elementary_sorting_algorithms';

test('sorts', () => {
  const unsorted0 = [1, 4, 302, 99, 32, 21, 243, 2, 7443, 36, 9, 7, 11];
  const expected0 = [1, 2, 4, 7, 9, 11, 21, 32, 36, 99, 243, 302, 7443];
  const unsorted1 = [536, 4444, 0, 899, 322, 2343, 25];
  const expected1 = [0, 25, 322, 536, 899, 2343, 4444];
  const unsorted2 = [2, 999, 75, 292349203];
  const expected2 = [2, 75, 999, 292349203];

  expect(bubbleSort(unsorted0)).toStrictEqual(expected0);
  expect(selectionSort(unsorted0)).toStrictEqual(expected0);
  expect(insertionSort(unsorted0)).toStrictEqual(expected0);

  expect(bubbleSort(unsorted1)).toStrictEqual(expected1);
  expect(selectionSort(unsorted1)).toStrictEqual(expected1);
  expect(insertionSort(unsorted1)).toStrictEqual(expected1);

  expect(bubbleSort(unsorted2)).toStrictEqual(expected2);
  expect(selectionSort(unsorted2)).toStrictEqual(expected2);
  expect(insertionSort(unsorted2)).toStrictEqual(expected2);
});
