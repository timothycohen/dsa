import {
  mergeSort,
  quickSort,
  radixSort,
  radixSort2,
} from '../s15-17_intermediate_sorting_algorithms';

test('sorts', () => {
  const unsorted0 = [1, 4, 302, 99, 32, 21, 243, 2, 7443, 36, 9, 7, 11];
  const expected0 = [1, 2, 4, 7, 9, 11, 21, 32, 36, 99, 243, 302, 7443];
  const unsorted1 = [536, 4444, 0, 899, 322, 2343, 25];
  const expected1 = [0, 25, 322, 536, 899, 2343, 4444];
  const unsorted2 = [2, 999, 75, 292349203];
  const expected2 = [2, 75, 999, 292349203];
  expect(mergeSort(unsorted0)).toStrictEqual(expected0);
  expect(quickSort(unsorted0)).toStrictEqual(expected0);
  expect(radixSort(unsorted0)).toStrictEqual(expected0);
  expect(radixSort2(unsorted0)).toStrictEqual(expected0);

  expect(mergeSort(unsorted1)).toStrictEqual(expected1);
  expect(quickSort(unsorted1)).toStrictEqual(expected1);
  expect(radixSort(unsorted1)).toStrictEqual(expected1);
  expect(radixSort2(unsorted1)).toStrictEqual(expected1);

  expect(mergeSort(unsorted2)).toStrictEqual(expected2);
  expect(quickSort(unsorted2)).toStrictEqual(expected2);
  expect(radixSort(unsorted2)).toStrictEqual(expected2);
  expect(radixSort2(unsorted2)).toStrictEqual(expected2);
});

test('handles negatives', () => {
  const unsorted1 = [536, 4444, 0, -3, -23, 899, 322, 2343, 25];
  const expected1 = [-23, -3, 0, 25, 322, 536, 899, 2343, 4444];
  const unsorted2 = [2, 999, -234, -22, -423, 75, 292349203];
  const expected2 = [-423, -234, -22, 2, 75, 999, 292349203];
  expect(mergeSort(unsorted1)).toStrictEqual(expected1);
  expect(quickSort(unsorted1)).toStrictEqual(expected1);

  expect(mergeSort(unsorted2)).toStrictEqual(expected2);
  expect(quickSort(unsorted2)).toStrictEqual(expected2);
});
