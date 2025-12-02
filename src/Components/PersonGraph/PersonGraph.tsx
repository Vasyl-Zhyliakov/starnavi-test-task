import { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import style from './PersonGraph.module.scss';
import type { PersonData } from '../../types/PersonData';
import { getCoordinates } from '../../utils/getCoordinates';

type Props = {
  data: PersonData;
};

// Character graph component: displays a character, their films, and starships as a graph using the ReactFlow library.
export default function PersonGraph({ data }: Props) {
  const nodeWidth = 150;
  // calculate coordinates for the character, films, and starships
  const coordinates = getCoordinates(data, nodeWidth);

  // memoizes initial nodes and edges to avoid regenerating them on every render
  const initial = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // adds a node for the character
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

      // adds nodes for films and creates edges between the character and films
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
  }, [data, coordinates]);

  // local state for graph nodes and edges
  const [nodes, setNodes] = useState(initial.nodes);
  const [edges, setEdges] = useState(initial.edges);

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string }>[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
