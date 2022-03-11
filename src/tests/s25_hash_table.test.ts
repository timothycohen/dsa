import { HashTable } from '../s25_hash_table';

it('can be set', () => {
  const ht = new HashTable();

  expect(ht.set('hi', 'howdy')).toBe(undefined);
  expect(ht.set('wowza', 324)).toBe(undefined);
  expect(ht.set('okay', true)).toBe(undefined);
  expect(ht.set('key 1000', undefined)).toBe(undefined);
  expect(ht.set('yeppers', null)).toBe(undefined);
});

it('can be accessed', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  ht.set('wowza', 324);
  ht.set('okay', true);
  ht.set('key 1000', undefined);
  ht.set('yeppers', null);

  expect(ht.get('hi')).toBe('howdy');
  expect(ht.get('wowza')).toBe(324);
  expect(ht.get('okay')).toBe(true);
  expect(ht.get('key 1000')).toBe(undefined);
  expect(ht.get('yeppers')).toBe(null);

  // can be accessed multiple times
  expect(ht.get('hi')).toBe('howdy');
});

it('can be accessed multiple times', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  expect(ht.get('hi')).toBe('howdy');
  expect(ht.get('hi')).toBe('howdy');
});

it('removes and returns the value', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  expect(ht.remove('hi')).toBe('howdy');
  expect(ht.get('hi')).toBe(undefined);
  expect(ht.remove('hi')).toBe(undefined);
});

test('overwriting returns the previous value.', () => {
  const ht = new HashTable();

  expect(ht.set('hi', 'initializing hi')).toBe(undefined);
  expect(ht.get('hi')).toBe('initializing hi');

  expect(ht.set('hi', 'overwriting hi')).toBe('initializing hi');
  expect(ht.get('hi')).toBe('overwriting hi');
});

it('returns all unique keys', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  ht.set('wowza', 324);
  ht.set('okay', true);
  ht.set('delete me', 'now');
  ht.set('key 1000', undefined);
  ht.remove('delete me');
  ht.set('yeppers', null);
  ht.set('key 1000', 23);
  ht.set('hi', undefined);

  const expected = ['hi', 'wowza', 'okay', 'key 1000', 'yeppers'];
  const received = ht.keys;
  for (let i = 0; i < expected.length; i++) {
    expect(received).toContain(expected[i]);
  }
  expect(received.length).toBe(expected.length);
});

it('returns all unique values', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  ht.set('wowza', 324);
  ht.set('okay', true);
  ht.set('delete me', 'now');
  ht.set('key 1000', undefined);
  ht.remove('delete me');
  ht.set('yeppers', null);
  ht.set('other null', null);
  ht.set('key 1000', 23);
  ht.set('hi', undefined);

  const expected = [undefined, 324, true, 23, null];
  const received = ht.values;
  for (let i = 0; i < expected.length; i++) {
    expect(received).toContain(expected[i]);
  }
  expect(received.length).toBe(expected.length);
});

it('returns all unique entries', () => {
  const ht = new HashTable();

  ht.set('hi', 'howdy');
  ht.set('wowza', 324);
  ht.set('okay', true);
  ht.set('delete me', 'now');
  ht.set('key 1000', undefined);
  ht.remove('delete me');
  ht.set('yeppers', null);
  ht.set('other null', null);
  ht.set('key 1000', 23);
  ht.set('hi', undefined);

  const expected = [
    ['hi', undefined],
    ['key 1000', 23],
    ['other null', null],
    ['yeppers', null],
    ['okay', true],
    ['wowza', 324],
  ];

  const received = ht.entries;
  for (let i = 0; i < expected.length; i++) {
    expect(received).toContainEqual(expected[i]);
  }
  expect(received.length).toBe(expected.length);
});

it('handles empty tables', () => {
  const ht = new HashTable();
  expect(ht.keys).toStrictEqual([]);
  expect(ht.values).toStrictEqual([]);
  expect(ht.entries).toStrictEqual([]);
});
