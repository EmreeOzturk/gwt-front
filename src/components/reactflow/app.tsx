import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  MiniMap,
  OnNodesChange,
  OnEdgesChange,
  NodeMouseHandler,
  Node,
  Edge,
  useReactFlow,
} from "reactflow";

// This is used to display a leva (https://github.com/pmndrs/leva) control panel for the example
const initialNodes: Node[] = [
  {
    id: "A",
    position: { x: 0, y: 0 },
    data: { expanded: true },
  },
];

const initialEdges: Edge[] = [];

import CustomNode from "./CustomNode";

import useAnimatedNodes from "@/hook/reactflow/useAnimatedNodes";
import useExpandCollapse from "@/hook/reactflow/useExpandCollapse";

import "reactflow/dist/style.css";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import {
  callCalculateChildRevenue,
  callGetNFTInfo,
  parseIntHex,
} from "@/contractInteractions/useAppContract";
import { decimalToParse } from "@/hook/parse18decimals";

const proOptions = { account: "paid-pro", hideAttribution: true };

const nodeTypes = {
  custom: CustomNode,
};

type ExpandCollapseExampleProps = {
  treeWidth?: number;
  treeHeight?: number;
  animationDuration?: number;
};

export default function ReactFlowPro({
  treeWidth = 380,
  treeHeight = 200,
  animationDuration = 300,
  tokenId,
}: ExpandCollapseExampleProps & { tokenId?: number } = {}) {
  const { fitView } = useReactFlow();
  const reduxData = useAppSelector(selectData);
  const { nftInfo: data, nftId } = reduxData;
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<any[]>(initialNodes);
  const [edges, setEdges] = useState<any[]>([]);
    
  async function getfirsNftInfo() {
    try {
      setLoading(true);
      if (tokenId || nftId) {
        let getNFTInfo = await callGetNFTInfo(tokenId as number || nftId as number);
        //console.log("getNFTInfo", getNFTInfo);
        let contractData = {
          vipLvl: parseIntHex(getNFTInfo[0]),
          id: parseIntHex(getNFTInfo[1]),
          holder: getNFTInfo[2],
          parent: parseIntHex(getNFTInfo[3]),
          //claimLimit: ethers.utils.formatEther(getNFTInfo[4]),
          leftChild: parseIntHex(getNFTInfo[4]),
          rightChild: parseIntHex(getNFTInfo[5]),
          refId: parseIntHex(getNFTInfo["refID"]),
        };
        console.log(contractData);
        let revenue = await callCalculateChildRevenue(tokenId as number || nftId as number);
        console.log(revenue);
        let childData = {
          leftChildRevenue: await decimalToParse(revenue[0]),
          rightChildRevenue: await decimalToParse(revenue[1]),
        };
        console.log(childData);
        let datas = {
          id: contractData.id.toString(),
          name: "a",
          address: contractData.holder,
          leftChildRevenue: childData.leftChildRevenue,
          rightChildRevenue: childData.rightChildRevenue,
          leftChild: contractData.leftChild,
          rightChild: contractData.rightChild,
          vipLvl: contractData.vipLvl,
          parent: contractData.parent.toString(),
          refId: contractData.refId,
          count:
            (contractData.leftChild === 0 ? 0 : 1) +
            (contractData.rightChild === 0 ? 0 : 1),
          children: [
            {
              id: contractData.leftChild + "a",
              name: "b",
              parent: contractData.id.toString(),
              children: [],
            },
            {
              id: contractData.rightChild + "b",
              name: "c",
              parent: contractData.id.toString(),
              children: [],
            },
          ],
        };
        datas.children = datas.children.filter(
          (item: any) => Number(item?.id?.slice(0, -1)) !== 0
        );
        //@ts-ignore
        datas &&
          setNodes([
            ...[datas].map((item: any) => {
              return {
                id: item?.id,
                type: "card", //item?.children?.length ? "input" : "output",
                parentID: item?.id,
                data: {
                  label: item?.id,
                  address: item?.address,
                  leftChildRevenue: item?.leftChildRevenue,
                  rightChildRevenue: item?.rightChildRevenue,
                  leftChild: item.leftChild,
                  rightChild: item.rightChild,
                  vipLvl: item?.vipLvl,
                  count: item?.count,
                  children: item?.children,
                  parent: item?.parent,
                  refId: item?.refId,
                  index: 0,
                  first: true,
                  childrenStatus: item?.children?.length > 0 ? true : false,
                  open: false,
                },
                position: { x: 0, y: 0 },
                sourcePosition: "bottom",
                targetPosition: "top",
                animated: true,
              };
            }),
          ]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }
    useEffect(() => {
        getfirsNftInfo();
    }, [tokenId,nftId]);
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(
    nodes,
    edges,
    { treeWidth, treeHeight }
  );
  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration,
  });

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setNodes((nds) => {
        //console.log("nds", nds);
        //fitView({ duration: 200, padding: 0.2 });
        return nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: { ...n.data, expanded: !n.data.expanded },
            };
          }

          return n;
        });
      });
    },
    [setNodes]
  );
  const initial = useRef(true);
  //console.log("nodes", nodes);
  /* console.log("edges", edges); */
  useEffect(() => {
    if (!initial.current) {
      fitView({ duration: 200, padding: 0.2 });
    }
    initial.current = false;
    console.log("fitView");
  }, [nodes]);
  const fitViewOptions = {
    padding: 0.95,
  };
  return (
    <ReactFlow
      nodes={animatedNodes}
      edges={visibleEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      proOptions={proOptions}
      fitView
      minZoom={0.2}
      nodeTypes={nodeTypes}
      fitViewOptions={fitViewOptions}
      nodesDraggable={false}
      nodesConnectable={false}
      className={"viewport"}
      zoomOnDoubleClick={false}
      elementsSelectable={false}
    >
      {/* <MiniMap /> */}
    </ReactFlow>
  );
}
