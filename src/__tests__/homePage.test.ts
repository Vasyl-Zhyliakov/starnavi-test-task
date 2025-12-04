import { describe, it, expect } from 'vitest';
import { getFilteredPeople, getPageCount, getVisiblePeople } from '../utils/homePage';
import type { Person } from '../types/Person';

const mockPeople: Person[] = [
  { id: 1, name: 'Luke Skywalker', films: [], starships: [] },
  { id: 2, name: 'Leia Organa', films: [], starships: [] },
  { id: 3, name: 'Han Solo', films: [], starships: [] },
  { id: 4, name: 'Luke Starkiller', films: [], starships: [] },
];

describe('getFilteredPeople', () => {
  it('filters people by query (case insensitive)', () => {
    const result = getFilteredPeople(mockPeople, 'luke');
    expect(result).toEqual([mockPeople[0], mockPeople[3]]);
  });

  it('returns all people when query is empty', () => {
    const result = getFilteredPeople(mockPeople, '');
    expect(result).toEqual(mockPeople);
  });

  it('trims query before filtering', () => {
    const result = getFilteredPeople(mockPeople, '  han  ');
    expect(result).toEqual([mockPeople[2]]);
  });

  it('returns empty array if no matches', () => {
    const result = getFilteredPeople(mockPeople, 'xyz');
    expect(result).toEqual([]);
  });
});

describe('getPageCount', () => {
  it('returns correct number of pages', () => {
    const result = getPageCount(mockPeople, 2);
    expect(result).toBe(2);
  });

  it('handles non-even division', () => {
    const result = getPageCount(mockPeople, 3);
    expect(result).toBe(2);
  });

  it('returns 0 for empty list', () => {
    const result = getPageCount([], 5);
    expect(result).toBe(0);
  });
});

describe('getVisiblePeople', () => {
  it('returns first page', () => {
    const result = getVisiblePeople(mockPeople, 1, 2);
    expect(result).toEqual([mockPeople[0], mockPeople[1]]);
  });

  it('returns second page', () => {
    const result = getVisiblePeople(mockPeople, 2, 2);
    expect(result).toEqual([mockPeople[2], mockPeople[3]]);
  });

  it('returns empty array for out-of-range page', () => {
    const result = getVisiblePeople(mockPeople, 3, 2);
    expect(result).toEqual([]);
  });

  it('returns people based on slice math', () => {
    const result = getVisiblePeople(mockPeople, 1, 3);
    expect(result).toEqual([mockPeople[0], mockPeople[1], mockPeople[2]]);
  });
});
