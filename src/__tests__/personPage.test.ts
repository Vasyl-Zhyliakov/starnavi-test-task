import { describe, it, expect } from 'vitest';
import { getPreparedFilms } from '../utils/personPage';

const mockFilms = [
  {
    id: 1,
    title: 'A New Hope',
    starships: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Empire Strikes Back',
    starships: [2, 4],
  },
];

const mockStarships = [
  { id: 1, name: 'X-wing' },
  { id: 2, name: 'TIE Fighter' },
  { id: 3, name: 'Millennium Falcon' },
  { id: 4, name: 'Star Destroyer' },
];

const mockPerson = {
  id: 1,
  name: 'Luke Skywalker',
  films: [1, 2],
  starships: [1, 2],
};

describe('getPreparedFilms', () => {
  it('returns prepared films with filtered starships', () => {
    const result = getPreparedFilms(mockFilms, mockStarships, mockPerson);

    expect(result).toEqual([
      {
        filmId: 1,
        filmName: 'A New Hope',
        starships: [
          { shipId: 1, shipName: 'X-wing' },
          { shipId: 2, shipName: 'TIE Fighter' },
        ],
      },
      {
        filmId: 2,
        filmName: 'Empire Strikes Back',
        starships: [{ shipId: 2, shipName: 'TIE Fighter' }],
      },
    ]);
  });

  it('ignores starships not present in the starships dataset', () => {
    const films = [{ id: 1, title: 'Film', starships: [999, 1] }];

    const result = getPreparedFilms(films, mockStarships, mockPerson);

    expect(result).toEqual([
      {
        filmId: 1,
        filmName: 'Film',
        starships: [{ shipId: 1, shipName: 'X-wing' }],
      },
    ]);
  });

  it('returns empty starships array if no matching starships', () => {
    const film = [{ id: 1, title: 'Film', starships: [999] }];

    const result = getPreparedFilms(film, mockStarships, mockPerson);

    expect(result).toEqual([
      {
        filmId: 1,
        filmName: 'Film',
        starships: [],
      },
    ]);
  });

  it('returns empty list when films array is empty', () => {
    expect(getPreparedFilms([], mockStarships, mockPerson)).toEqual([]);
  });

  it('preserves film order', () => {
    const films = [
      { id: 9, title: 'First', starships: [] },
      { id: 5, title: 'Second', starships: [] },
    ];

    const result = getPreparedFilms(films, mockStarships, mockPerson);

    expect(result.map((f) => f.filmId)).toEqual([9, 5]);
  });
});
