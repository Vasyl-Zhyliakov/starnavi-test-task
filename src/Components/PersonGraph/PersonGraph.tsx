import { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { PersonData } from '../../types/PersonData';
import { getCoordinates } from '../../utils/getCoordinates';
import { gapX, gapY, nodeWidth } from '../../Constants/constans';
import { getGraphData } from '../../utils/getGraphData';

type Props = {
  data: PersonData;
};

// Character graph component: displays a character, their films, and starships as a graph using the ReactFlow library.
export default function PersonGraph({ data }: Props) {
  // calculate coordinates for the character, films, and starships
  const coordinates = getCoordinates(data, nodeWidth, gapX, gapY);

  // memoizes initial nodes and edges to avoid regenerating them on every render
  const initial = useMemo(() => {
    return getGraphData(data, coordinates, nodeWidth);
  }, [data, coordinates]);

  // local state for graph nodes and edges
  const [nodes, setNodes] = useState(initial.nodes);
  const [edges, setEdges] = useState(initial.edges);
  console.log(nodes);

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
