import { formatDate } from './formatDate';

describe.each([
  { date: '01-01-2021', expected: '01/01/2021' },
  { date: 'invalid date', expected: '' },
  { date: '10-10-2021', expected: '10/10/2021' },
])('formatDate($date)', ({ date, expected }) => {
  it(`returns ${expected} when date is ${date}`, () => {
    expect(formatDate(date)).toBe(expected);
  });
});
