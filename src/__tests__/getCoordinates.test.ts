import { getCoordinates } from '../utils/getCoordinates';
import { describe, expect, it } from 'vitest';

describe('getCoordinates', () => {
  const mockData = {
    personName: 'Luke Skywalker',
    films: [
      {
        filmId: 1,
        filmName: 'A New Hope',
        starships: [],
      },
      {
        filmId: 2,
        filmName: 'The Empire Strikes Back',
        starships: [
          { shipId: 1, shipName: 'X-Wing' },
          { shipId: 2, shipName: 'TIE Fighter' },
        ],
      },
    ],
  };

  it('Calculate person coordinates', () => {
    const { person } = getCoordinates(mockData, 100, 20, 150);
    expect(person).toEqual({ x: 120, y: 0 });
  });

  it('Calculate film coordinates', () => {
    const { films } = getCoordinates(mockData, 100, 20, 150);
    expect(films).toEqual([
      { x: 0, y: 150 },
      { x: 180, y: 150 },
    ]);
  });

  it('Calculate starships coordinates', () => {
    const { starships } = getCoordinates(mockData, 100, 20, 150);
    expect(starships).toEqual([
      { x: 120, y: 300 },
      { x: 240, y: 300 },
    ]);
  });

  it(`'nodeWidth' or 'gapX' or 'gapY' ommited`, () => {
    const { person, films, starships } = getCoordinates(mockData);
    expect(person).toEqual({ x: 170, y: 0 });
    expect(films).toEqual([
      { x: 0, y: 150 },
      { x: 255, y: 150 },
    ]);
    expect(starships).toEqual([
      { x: 170, y: 300 },
      { x: 340, y: 300 },
    ]);
  });
});
