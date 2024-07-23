import { formatItemName } from './formatItemName';

describe.each([
  { a: 'item', expected: 'Item' },
  { a: 'ITEM', expected: 'Item' },
  { a: 'a', expected: 'A' },
  { a: undefined, expected: '' },
])('formatItemName($a)', ({ a, expected }) => {
  it(`returns ${expected}`, () => {
    expect(formatItemName(a)).toBe(expected);
  });
});
