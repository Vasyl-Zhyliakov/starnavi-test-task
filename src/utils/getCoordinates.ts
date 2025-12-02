import type { PersonData } from '../types/PersonData';

type Coordinates = {
  person: { x: number; y: number };
  films: { x: number; y: number }[];
  starships: { x: number; y: number }[];
};

// function calculates the coordinates for the person node, film nodes, and starship nodes.
// the layout is based on node width, horizontal spacing, and vertical spacing.
// the graph is structured into three rows: person → films → starships.

export const getCoordinates = (
  data: PersonData,
  nodeWidth = 150,
  gap = 20,
  gapY = 150
): Coordinates => {
  // Determines the maximum number of items in a row to calculate the total graph width
  const filmsCount = data.films.length;
  const starShipsCount = data.films.reduce((acc, film) => acc + film.starships.length, 0);
  const maxRow = Math.max(filmsCount, starShipsCount);
  const graphWidth = maxRow * nodeWidth + (maxRow - 1) * gap;

  // Coordinates of the person node — centered at the top row
  const person = { x: graphWidth / 2 - nodeWidth / 2, y: gapY * 0 };

  // Arrays for storing the positions of film nodes and starship nodes
  const films: { x: number; y: number }[] = [];
  const starships: { x: number; y: number }[] = [];

  // currentX tracks the horizontal position as rows are built
  let currentX = 0;

  data.films.forEach((film) => {
    // Calculates the width of the starship row for the current film
    const filmShipsCount = film.starships.length;
    const filmRowWidth =
      filmShipsCount > 0 ? filmShipsCount * nodeWidth + (filmShipsCount - 1) * gap : nodeWidth;

    // Adds the film node coordinates to the second row
    const filmX = filmRowWidth / 2 - nodeWidth / 2 + currentX;
    films.push({ x: filmX, y: gapY * 1 });

    // Adds starship node coordinates to the third row
    film.starships.forEach((_, i) => {
      const starShipX = currentX + i * (nodeWidth + gap);
      starships.push({ x: starShipX, y: gapY * 2 });
    });

    currentX += filmRowWidth + gap;
  });

  // Returns an object containing all calculated node coordinates
  return {
    person,
    films,
    starships,
  };
};
