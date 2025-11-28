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

type Props = {
  data: PersonData;
};

export default function PersonGraph({ data }: Props) {
  const initial = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: 'person',
      position: { x: 0, y: 0 },
      data: { label: data.personName },
      className: `${style.graph__item} ${style['graph__item--person']}`,
    });

    data.films.forEach((film, filmIndex) => {
      const filmId = `film-${film.filmId}`;

      nodes.push({
        id: filmId,
        position: { x: 150 * filmIndex + 100, y: 150 },
        data: { label: film.filmName },
        className: `${style.graph__item} ${style['graph__item--film']}`,
      });

      edges.push({
        id: `edge-person-${filmId}`,
        source: 'person',
        target: filmId,
      });

      film.starships.forEach((ship, shipIndex) => {
        const shipId = `ship-${ship.shipId}`;

        nodes.push({
          id: shipId,
          position: {
            x: 150 * filmIndex + 100,
            y: 300 + shipIndex * 80,
          },
          data: { label: ship.shipName },
          className: `${style.graph__item} ${style['graph__item--ship']}`,
        });

        edges.push({
          id: `edge-${filmId}-${shipId}`,
          source: filmId,
          target: shipId,
        });
      });
    });

    return { nodes, edges };
  }, [data]);

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
