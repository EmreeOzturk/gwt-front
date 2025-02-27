import React, { use, useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from "reactflow";
import dagre from "dagre";
import CardPlus from "@/components/cards/userPlus";
import {
  callCalculateChildRevenue,
  callGetNFTInfo,
  parseIntHex,
} from "@/contractInteractions/useAppContract";
import { ethers } from "ethers";
import { selectData, setLoading } from "@/redux/auth/auth";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { decimalToParse } from "@/hook/parse18decimals";
const nodeWidth = 300;
const nodeHeight = 150;

const nodeTypes: any = {
  card: CardPlus,
};

const FlowChartWithAutoLayout = ({
  tokenId,
}: {
  tokenId: number | boolean;
}) => {
  const layoutedElements = useCallback(
    async (nodes: any, edges: any, direction = "TB") => {
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));
      dagreGraph.setGraph({ rankdir: direction });

      await nodes.forEach((node: any) => {
        //console.log("node", node);

        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });

      await edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      await nodes.forEach((node: any) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = "top";
        node.sourcePosition = "bottom";

        // We are shifting the dagre node position (top left corner) to the center of the node for React Flow
        /* console.log("nodeWithPosition", nodeWithPosition);
        console.log("nodeWithPositionX", nodeWithPosition.x);
        console.log("nodeWidth", nodeWidth); */
        node.position = {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
        //left child
        /* if (node?.data?.index === 0) {
          node.position = {
            x: nodeWithPosition.x - nodeWidth / 2 -200,
            y: nodeWithPosition.y - nodeHeight / 2,
          };
        } else {
          node.position = {
            x: nodeWithPosition.x - nodeWidth / 2 +200,
            y: nodeWithPosition.y - nodeHeight / 2,
          };
        } */

        return node;
      });

      return { nodes, edges };
    },
    []
  );
  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);

  const [reactFlowInstance, setReactFlowInstance]: any = useState(null);
  const reactFlowWrapper = useRef(null);
  const [change, setChange] = useState(false);
  
  async function forceAutoLayout() {
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      await layoutedElements(nodes, edges);
    /* console.log("layoutedNodes", layoutedNodes);
    console.log("layoutedEdges", layoutedEdges); */

    //@ts-ignore
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    //@ts-ignore
    reactFlowInstance?.fitView();
  }
  const onInit = (rfi: any) => {
    if (!rfi) return;
    setReactFlowInstance(rfi);
  };

  useEffect(() => {
    forceAutoLayout();
    //console.log("nodes", nodes);
  }, [reactFlowInstance, nodes.length]);
  useEffect(() => {
    //@ts-ignore
    reactFlowInstance?.fitView();
  });

  const reduxData = useSelector(selectData);
  const { nftInfo: data } = reduxData;
  const [loading, setLoading] = useState(true);
  async function getfirsNftInfo() {
    try {
      setLoading(true);
      if (tokenId) {
        let getNFTInfo = await callGetNFTInfo(tokenId as number);
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
        let revenue = await callCalculateChildRevenue(tokenId as number);
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
              id: contractData.leftChild+"a",
              name: "b",
              parent: contractData.id.toString(),
              children: [],
            },
            {
              id: contractData.rightChild +"b",
              name: "c",
              parent: contractData.id.toString(),
              children: [],
            },
          ],
        };
        datas.children = datas.children.filter((item: any) => Number(item?.id?.slice(0,-1)) !== 0);
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
    //forceLayout();
    //console.log("data", data);
    if (tokenId) {
      getfirsNftInfo();
    } else if (data) {
      setNodes([
        ...data.map((item: any) => {
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
            /* animated: true, */
          };
        }),
      ]);
      setLoading(false);
    }
  }, [data]);

  const handleNodeClick = async (e: any, data: any) => {
    try {
      setLoading(true);
      console.log("data", data.id);
      
      const findChildren = nodes.filter(
        (item: any) => item?.data?.parent === data.id
      );

      let newNodes: any = [...nodes];
      //console.log("data", data);
      
      if (!findChildren.length) {
        const itemChildren = await Promise.all([
          ...data.data.children.map(async (item: any, i: number) => {
            //console.log("item", item);
            console.log("children sayısı:", data.data.children.length);
            console.log("item", item.id);
            console.log("item",item.id, item.id.slice(0,-1));
            
            let getNFTInfo = await callGetNFTInfo(Number(item?.id?.slice(0,-1)));
            //console.log("getNFTInfo", getNFTInfo);
            const datas:any = await Datas({ item, data, getNFTInfo });
            console.log(
              "data.data.leftChild",
              data.data.leftChild,
              data.data.leftChild === 0
            );
              //console.log("item", item);
              
            return {
              id: datas.id + (i === 0 ? "a" : "b"),
              parentID: datas.parentID,
              type: "card", //item?.children?.length ? "default" : "output",
              data: {
                label: datas?.id,
                type: Number(data.data.leftChild) === 0 ? true : false,
                address: datas?.address,
                leftChildRevenue: datas?.leftChildRevenue,
                rightChildRevenue: datas?.rightChildRevenue,
                leftChild: datas?.leftChild,
                rightChild: datas?.rightChild,
                vipLvl: datas?.vipLvl,
                count: datas?.count,
                children: datas?.children,
                parent: item?.parent,
                refId: datas?.refId,
                index: i,
                first: false,
                childrenStatus: datas?.children?.length > 0 ? true : false,
                open: false,
              },
              position: {
                x: 0,
                y: 0,
              },
              sourcePosition: "bottom",
              targetPosition: "top", //i === 0 ? "right" : "left",
            };
          }),
        ]);
        setEdges([
          ...edges,
          ...(await Promise.all(
            itemChildren.map(async (item: any, i: number) => {
              return {
                id: item?.id,
                source: data.id,
                target: item?.id,
                type: "smoothstep",
              };
            })
          )),
        ]);
        newNodes.push(...itemChildren);
        newNodes.map((item: any) => {
          if (item?.id === data.id) {
            item.data.open = true;
          }
        });
        console.log("newNodes", newNodes);
        setNodes(newNodes);
        setLoading(false);
      } else {
        newNodes = [...nodes];
        newNodes.map((item: any) => {
          if (item?.id === data.id) {
            item.data.open = false;
          }
        });
        //@ts-ignore
        setNodes([
          ...newNodes.filter(
            (item: any) =>
              data.id === item.id ||
              !item?.parentID
                .substring(0, data.parentID.length)
                .includes(data.parentID)
          ),
        ]);
        setEdges([...edges.filter((item: any) => data.id !== item.source)]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("edges", edges);
  }, [edges]);

  useEffect(() => {
    forceAutoLayout();
  }, [loading, nodes.length]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );
  return (
    <div className="relative flex w-full h-full">
      {loading && <Loader />}
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onInit={onInit}
        nodesDraggable={false}
        autoPanOnConnect={true}
      >
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default FlowChartWithAutoLayout;

async function Datas({
  item,
  data,
  getNFTInfo,
}: {
  item: any;
  data: any;
  getNFTInfo: any;
}) {
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
  //console.log(contractData);
  let revenue = await callCalculateChildRevenue(Number(item.id.slice(0,-1)));
  //console.log(revenue);
  let childData = {
    leftChildRevenue: await decimalToParse(revenue[0]),
    rightChildRevenue: await decimalToParse(revenue[1]),
  };
  //console.log(childData);
  let datas = {
    id: contractData.id.toString(),
    name: "a",
    parentID: data.parentID + "." + contractData.id.toString(),
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
        id: contractData.leftChild+"a",
        name: "b",
        parent: item.id.toString(),
        children: [],
      },
      {
        id: contractData.rightChild+"b",
        name: "c",
        parent: item.id.toString(),
        children: [],
      },
    ],
  };
  datas.children = datas.children.filter((item: any) => Number(item?.id?.slice(0,-1)) !== 0);
  console.log("datas", datas);
  
  return datas;
}
