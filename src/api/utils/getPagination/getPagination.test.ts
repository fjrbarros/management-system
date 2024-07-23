import { getPagination } from './getPagination';

describe.each([
  { page: 0, size: 10, expected: { from: 0, to: 9 } },
  { page: 1, size: 10, expected: { from: 10, to: 19 } },
  { page: 2, size: 10, expected: { from: 20, to: 29 } },
  { page: 1, size: 5, expected: { from: 5, to: 9 } },
  { page: 2, size: 5, expected: { from: 10, to: 14 } },
  { page: 0, size: 0, expected: { from: 0, to: -1 } },
  { page: 0, size: undefined, expected: { from: 0, to: 9 } },
  { page: undefined, size: 0, expected: { from: 0, to: -1 } },
  { page: undefined, size: undefined, expected: { from: 0, to: 9 } },
  { page: 1, size: undefined, expected: { from: 10, to: 19 } },
  { page: undefined, size: 1, expected: { from: 0, to: 0 } },
  { page: 1, size: 1, expected: { from: 1, to: 1 } },
])('getPagination($page, $size)', ({ page, size, expected }) => {
  it(`returns { from: ${expected.from} to: ${expected.to} }`, () => {
    expect(getPagination(page, size)).toStrictEqual(expected);
  });
});
