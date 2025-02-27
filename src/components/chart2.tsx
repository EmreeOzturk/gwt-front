import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CardPlus from "@/components/cards/userPlus";

const nodeWidth = 172;
const nodeHeight = 36;
const verticalGap = 100;
const horizontalGap = 200;

const nodeTypes = {
  card: CardPlus, // Your custom card component
};

// Helper function to calculate node level (depth)
function calculateLevel(node:any, nodes:any) {
  let level = 0;
  let current = node;
  while (current.data.parent) {
    current = nodes.find((n:any) => n.id === current.data.parent);
    level++;
  }
  return level;
}

// Function to layout nodes in a binary tree structure
function layoutBinaryTree(nodes:any) {
  let maxLevel = 0;
  const nodesByLevel:any = {};

  // Calculate levels for nodes and group them
  nodes.forEach((node:any) => {
    const level = calculateLevel(node, nodes);
    maxLevel = Math.max(maxLevel, level);
    if (!nodesByLevel[level]) {
      nodesByLevel[level] = [];
    }
    nodesByLevel[level].push(node);
  });

  // Set the position for each node
  Object.keys(nodesByLevel).forEach((level:any) => {
    const numNodes = nodesByLevel[level].length;
    const totalWidth = (numNodes - 1) * horizontalGap;
    let startX = -totalWidth / 2;

    nodesByLevel[level].forEach((node:any, index:any) => {
      const parentNode = nodes.find((n:any) => n.id === node.data.parent);
      if (parentNode) {
        // Offset X position from parent based on whether it's left or right child
        const offset = parentNode.data.leftChild === node.id ? -horizontalGap / 2 : horizontalGap / 2;
        node.position.x = parentNode.position.x + offset;
      } else {
        // Root node position
        node.position.x = startX + index * horizontalGap;
      }
      node.position.y = level * verticalGap;
    });
  });

  return nodes;
}

const FlowChartWithFixedBinaryTreeLayout = ({ tokenId }:any) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // This effect would be where you load your initial tree data
  /* useEffect(() => {
    // Fetch your initial nodes and edges here and update state
    // For example:
    const initialNodes = [
      // Add your nodes here
    ];
    const initialEdges = [
      // Add your edges here
    ];

    const layoutedNodes = layoutBinaryTree(initialNodes);
    setNodes(layoutedNodes);
    setEdges(initialEdges);
  }, [tokenId]); // tokenId is a dependency here, adjust as needed */

  const onInit = (rfi:any) => {
    setReactFlowInstance(rfi);
  };

  useEffect(() => {
    if (reactFlowInstance && nodes.length) {
      //@ts-ignore
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance, nodes]);

  return (
    <div className="reactflow-wrapper" style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        nodesDraggable={false}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowChartWithFixedBinaryTreeLayout;