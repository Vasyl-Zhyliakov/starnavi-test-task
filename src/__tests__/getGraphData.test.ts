import { getGraphData } from '../utils/getGraphData';
import type { PersonData } from '../types/PersonData';
import { describe, vi, it, expect } from 'vitest';

vi.mock('../Components/PersonGraph/PersonGraph.module.scss', () => ({
  default: {
    graph__item: 'graph__item',
    'graph__item--person': 'graph__item--person',
    'graph__item--film': 'graph__item--film',
    'graph__item--ship': 'graph__item--ship',
  },
}));

describe('getGraphData', () => {
  const mockData: PersonData = {
    personName: 'Luke Skywalker',
    films: [
      {
        filmId: 1,
        filmName: 'A New Hope',
        starships: [
          { shipId: 1, shipName: 'X-Wing' },
          { shipId: 2, shipName: 'Y-Wing' },
        ],
      },
      {
        filmId: 2,
        filmName: 'Empire Strikes Back',
        starships: [{ shipId: 3, shipName: 'Falcon' }],
      },
    ],
  };

  const mockCoordinates = {
    person: { x: 0, y: 0 },
    films: [
      { x: 100, y: 150 },
      { x: 300, y: 150 },
    ],
    starships: [
      { x: 100, y: 300 },
      { x: 200, y: 300 },
      { x: 300, y: 300 },
    ],
  };

  const nodeWidth = 200;

  it('creates person node', () => {
    const { nodes } = getGraphData(mockData, mockCoordinates, nodeWidth);

    const personNode = nodes[0];

    expect(personNode).toEqual({
      id: 'person',
      position: { x: 0, y: 0 },
      data: { label: 'Luke Skywalker' },
      className: 'graph__item graph__item--person',
      style: { '--w': '200px' },
    });
  });

  it('creates films nodes', () => {
    const { nodes } = getGraphData(mockData, mockCoordinates, nodeWidth);

    expect(nodes[1]).toMatchObject({
      id: 'film-1',
      position: { x: 100, y: 150 },
      data: { label: 'A New Hope' },
    });

    expect(nodes[4]).toMatchObject({
      id: 'film-2',
      position: { x: 300, y: 150 },
      data: { label: 'Empire Strikes Back' },
    });
  });

  it('creates starship nodes in correct order', () => {
    const { nodes } = getGraphData(mockData, mockCoordinates, nodeWidth);

    const xwing = nodes[2];
    const ywing = nodes[3];
    const falcon = nodes[5];

    expect(xwing).toMatchObject({
      id: 'film-1-ship-1',
      position: { x: 100, y: 300 },
      data: { label: 'X-Wing' },
    });

    expect(ywing).toMatchObject({
      id: 'film-1-ship-2',
      position: { x: 200, y: 300 },
      data: { label: 'Y-Wing' },
    });

    expect(falcon).toMatchObject({
      id: 'film-2-ship-3',
      position: { x: 300, y: 300 },
      data: { label: 'Falcon' },
    });
  });

  it('creates correct edges', () => {
    const { edges } = getGraphData(mockData, mockCoordinates, nodeWidth);

    expect(edges).toEqual([
      { id: 'edge-person-film-1', source: 'person', target: 'film-1' },

      { id: 'edge-film-1-film-1-ship-1', source: 'film-1', target: 'film-1-ship-1' },
      { id: 'edge-film-1-film-1-ship-2', source: 'film-1', target: 'film-1-ship-2' },

      { id: 'edge-person-film-2', source: 'person', target: 'film-2' },

      { id: 'edge-film-2-film-2-ship-3', source: 'film-2', target: 'film-2-ship-3' },
    ]);
  });

  it('total nodes count is correct', () => {
    const { nodes } = getGraphData(mockData, mockCoordinates, nodeWidth);
    expect(nodes).toHaveLength(1 + 2 + 3);
  });

  it('total edges count is correct', () => {
    const { edges } = getGraphData(mockData, mockCoordinates, nodeWidth);
    expect(edges).toHaveLength(5);
  });
});
