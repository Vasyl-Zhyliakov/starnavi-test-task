import type { Node, Edge } from '@xyflow/react';
import style from '../Components/PersonGraph/PersonGraph.module.scss';
import type { PersonData } from '../types/PersonData';

export const getGraphData = (
  data: PersonData,
  coordinates: {
    person: { x: number; y: number };
    films: { x: number; y: number }[];
    starships: { x: number; y: number }[];
  },
  nodeWidth: number
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // adds nodes for films and creates edges between the character and films
  nodes.push({
    id: 'person',
    position: coordinates.person,
    data: { label: data.personName },
    className: `${style.graph__item} ${style['graph__item--person']}`,
    style: { '--w': `${nodeWidth}px` } as React.CSSProperties,
  });

  let shipsCounter = 0;

  data.films.forEach((film, filmIndex) => {
    const filmId = `film-${film.filmId}`;

    nodes.push({
      id: filmId,
      position: coordinates.films[filmIndex],
      data: { label: film.filmName },
      className: `${style.graph__item} ${style['graph__item--film']}`,
      style: { '--w': `${nodeWidth}px` } as React.CSSProperties,
    });

    edges.push({
      id: `edge-person-${filmId}`,
      source: 'person',
      target: filmId,
    });

    // adds nodes for starships and creates edges between films and starships
    film.starships.forEach((ship) => {
      const shipId = `${filmId}-ship-${ship.shipId}`;

      nodes.push({
        id: shipId,
        position: coordinates.starships[shipsCounter],
        data: { label: ship.shipName },
        className: `${style.graph__item} ${style['graph__item--ship']}`,
        style: { '--w': `${nodeWidth}px` } as React.CSSProperties,
      });

      edges.push({
        id: `edge-${filmId}-${shipId}`,
        source: filmId,
        target: shipId,
      });

      shipsCounter++;
    });
  });

  return { nodes, edges };
};
