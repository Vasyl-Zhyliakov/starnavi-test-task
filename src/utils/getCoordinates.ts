import type { PersonData } from '../types/PersonData';

type Coordinates = {
  person: { x: number; y: number };
  films: { x: number; y: number }[];
  starShips: { x: number; y: number }[];
};

export const getCoordinates = (
  data: PersonData,
  nodeWidth = 150,
  gap = 20,
  gapY = 150
): Coordinates => {
  const filmsCount = data.films.length;
  const starShipsCount = data.films.reduce((acc, film) => acc + film.starships.length, 0);
  const maxRow = Math.max(filmsCount, starShipsCount);
  const graphWidth = maxRow * nodeWidth + (maxRow - 1) * gap;

  const person = { x: graphWidth / 2 - nodeWidth / 2, y: gapY * 0 };

  const films: { x: number; y: number }[] = [];
  const starShips: { x: number; y: number }[] = [];
  let currentX = 0;

  data.films.forEach((film) => {
    const filmShipsCount = film.starships.length;
    const filmRowWidth =
      filmShipsCount > 0 ? filmShipsCount * nodeWidth + (filmShipsCount - 1) * gap : nodeWidth;
    const filmX = filmRowWidth / 2 - nodeWidth / 2 + currentX;
    films.push({ x: filmX, y: gapY * 1 });

    film.starships.forEach((_, i) => {
      const starShipX = currentX + i * (nodeWidth + gap);
      starShips.push({ x: starShipX, y: gapY * 2 });
    });

    currentX += filmRowWidth + gap;
  });

  return {
    person,
    films,
    starShips,
  };
};
