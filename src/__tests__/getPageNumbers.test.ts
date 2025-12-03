import { describe, it, expect } from 'vitest';
import { getPageNumbers } from '../utils/getPageNumbers';

describe('getPageNumbers', () => {
  it('should return all pages if count <= 5', () => {
    expect(getPageNumbers(3, 1)).toEqual([1, 2, 3]);
    expect(getPageNumbers(5, 3)).toEqual([1, 2, 3, 4, 5]);
  });

  it(`should show first 3 pages, "..." and last page` + `if 'current' < 3 and 'count' <= 5`, () => {
    expect(getPageNumbers(10, 1)).toEqual([1, 2, 3, '...', 10]);
    expect(getPageNumbers(7, 2)).toEqual([1, 2, 3, '...', 7]);
  });

  it(`should show 4 if 'current' === 3`, () => {
    expect(getPageNumbers(7, 3)).toEqual([1, 2, 3, 4, '...', 7]);
  });

  it(`should show 'current - 3' if 'current' === last - 2`, () => {
    expect(getPageNumbers(10, 8)).toEqual([1, '...', 7, 8, 9, 10]);
  });

  it('should show 1, "..." and last 3 pages if current > last - 2', () => {
    expect(getPageNumbers(10, 9)).toEqual([1, '...', 8, 9, 10]);
    expect(getPageNumbers(10, 10)).toEqual([1, '...', 8, 9, 10]);
  });

  it('should show surrounding pages for middle current', () => {
    expect(getPageNumbers(10, 5)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    expect(getPageNumbers(10, 6)).toEqual([1, '...', 5, 6, 7, '...', 10]);
  });
});
