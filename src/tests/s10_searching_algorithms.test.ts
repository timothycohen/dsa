import { indexOf, binaryIndexOf, naiveStringSearch } from '../s10_searching_algorithms';

const states = [
  'Alaska',
  'Alabama',
  'Arkansas',
  'American Samoa',
  'Arizona',
  'California',
  'Colorado',
  'Connecticut',
  'District of Columbia',
  'Delaware',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Iowa',
  'Idaho',
  'Illinois',
  'Indiana',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Massachusetts',
  'Maryland',
  'Maine',
  'Michigan',
  'Minnesota',
  'Missouri',
  'Mississippi',
  'Montana',
  'North Carolina',
  'North Dakota',
  'Nebraska',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'Nevada',
  'New York',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Virginia',
  'Virgin Islands',
  'Vermont',
  'Washington',
  'Wisconsin',
  'West Virginia',
  'Wyoming',
];

const arr = ['0', '1', '2', '3', '77'];

test('searches', () => {
  expect(indexOf(arr, '3')).toBe(3);
  expect(indexOf(arr, '77')).toBe(4);
  expect(indexOf(arr, '11')).toBe(-1);
  expect(indexOf(states, 'Florida')).toBe(10);
  expect(indexOf(states, 'Floridda')).toBe(-1);

  expect(binaryIndexOf(arr, '3')).toBe(3);
  expect(binaryIndexOf(arr, '77')).toBe(4);
  expect(binaryIndexOf(arr, '11')).toBe(-1);
  expect(binaryIndexOf(states, 'Florida')).toBe(10);
  expect(binaryIndexOf(states, 'Floridda')).toBe(-1);

  expect(naiveStringSearch('hel lo hello helphello', 'hell')).toBe(2);
});
