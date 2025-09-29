import { usePagination } from './usePagination';

describe('normalizePagination', () => {
  test('normal case', () => {
    expect(usePagination(3, 10)).toEqual({
      totalSafe: 10,
      currentPageSafe: 3,
    });
  });

  test('currentPage less than 1 -> clamp to 1 (if total>0)', () => {
    expect(usePagination(0, 5)).toEqual({
      totalSafe: 5,
      currentPageSafe: 1,
    });
    expect(usePagination(-3, 5)).toEqual({
      totalSafe: 5,
      currentPageSafe: 1,
    });
  });

  test('currentPage greater than total -> clamp to total', () => {
    expect(usePagination(10, 5)).toEqual({
      totalSafe: 5,
      currentPageSafe: 5,
    });
  });

  test('total <= 0 -> zero everything', () => {
    expect(usePagination(1, 0)).toEqual({ totalSafe: 0, currentPageSafe: 0 });
    expect(usePagination(5, -2)).toEqual({ totalSafe: 0, currentPageSafe: 0 });
  });
});
