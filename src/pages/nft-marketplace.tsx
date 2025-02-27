import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { ToastSuccess } from "@/components/alert/SweatAlert";
import FlowChartWithAutoLayout from "@/components/chart";
import Vip from "@/components/vip";
import {
  callApproveNFT2,
  callBuyNFT,
  callGetNFTInfo,
  callgetAllListedNFTs,
  checkAllowance,
  parseIntHex,
} from "@/contractInteractions/useAppContract";
import { decimalToParse } from "@/hook/parse18decimals";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import Layout from "@/layout/layout";
import { selectData, setLoading } from "@/redux/auth/auth";
import { ethers } from "ethers";
import { use, useEffect, useState } from "react";
export default function NftBuy() {
  const reduxData = useAppSelector(selectData);
  const { nftId, loading } = reduxData;
  const dispatch = useAppDispatch();
  const [listings, setListings] = useState<any[]>([]);
  async function listingMarketplace() {
    try {
      let res = await callgetAllListedNFTs();
      console.log("listingMarketplace", res);
      let resArray: any[] = [];
      res &&
       Promise.all(await res.map(async (item: any) => {
          console.log(await decimalToParse(item.price));
          let price = await decimalToParse(item.price);
          const newArray = {
            tokenID: parseIntHex(item.tokenId),
            seller: item.seller,
            price: price,
          };
          resArray.push(newArray);
        }));
      console.log("resArray", resArray);
      setListings(resArray);
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    dispatch(setLoading(true));
    listingMarketplace();
  }, []);
  return (
    <Layout title="NFT MarketPlace">
      <div className="grid grid-cols-1 xl:grid-cols-2 items-center justify-center w-full px-0 md:px-3 gap-6">
        {listings.map((item,index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </Layout>
  );
}

function Card({ data }: { data: any }) {
  const [show, setShow] = useState(false);
  const reduxData = useAppSelector(selectData);
  const { address, loading } = reduxData;
  const dispatch = useAppDispatch();
  const [nftInfo, setNftInfo] = useState<any>();
  useEffect(() => {
    //console.log("data", data);
    getNFTInfo();
  }, [data]);

  async function getNFTInfo() {
    try {
      let getNFTInfo = await callGetNFTInfo(data?.tokenID);
      //console.log("getNFTInfo", getNFTInfo);
      let Convertdata = {
        vipLvl: parseIntHex(getNFTInfo[0]),
        id: parseIntHex(getNFTInfo[1]),
        holder: getNFTInfo[2],
        parent: parseIntHex(getNFTInfo[3]),
        //claimLimit: ethers.utils.formatEther(getNFTInfo[4]),
        //usedClaimLimit: ethers.utils.formatEther(getNFTInfo["usedClaimLimit"]),
        leftChild: parseIntHex(getNFTInfo[4]),
        rightChild: parseIntHex(getNFTInfo[5]),
        leftPotentielChild: await decimalToParse(getNFTInfo[6]),
        rightPotentielChild: await decimalToParse(getNFTInfo[7]),
        //totalPotentielChild: parseIntHex(getNFTInfo[9]),
        referralIncome: await decimalToParse(getNFTInfo[8]),
        //affiliateReward: parseIntHex(getNFTInfo[12]),
        claimedPotential: parseIntHex(getNFTInfo[9]),
        counter: parseIntHex(getNFTInfo["counter"]),
      };
      //console.log("Convertdata", Convertdata);

      setNftInfo(Convertdata);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function buyNFT(tokenId: any, price: any) {
    try {
      dispatch(setLoading(true));
      //let approve = await checkAllowance(price);
      let approve3 = await callApproveNFT2(Number(price));
      console.log("approve3", approve3);

      if (approve3) {
        let res = await callBuyNFT(tokenId);
        console.log("buyNFT", res);
        res &&
          ToastSuccess({
            tHashLink: res.hash,
          }).fire("NFT Buy Successfully");
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
      dispatch(setLoading(false));
    }
  }
  //console.log("nftInfo", nftInfo);

  return (
    <>
    <div></div>
      {/* <div className="backdrop-blur-sm bg-white/10 text-white  cursor-pointer  rounded-lg shadow-2xl  p-3 md:p-4 xl:p-6">
        <div className="flex gap-3 justify-between  w-full">
          <div className="flex gap-3 justify-start items-center w-full ">
            <svg
              className="w-10 md:w-12 xl:w-16"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.0005 17.9999C29.3731 17.9999 24.0005 23.3725 24.0005 29.9999C24.0005 36.6274 29.3731 41.9999 36.0005 41.9999C42.6279 41.9999 48.0005 36.6274 48.0005 29.9999C48.0005 23.3725 42.6279 17.9999 36.0005 17.9999Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9993 5.99994C12.715 5.99994 5.99927 12.7157 5.99927 20.9999V50.9999C5.99927 59.2842 12.715 65.9999 20.9993 65.9999H50.9993C59.2835 65.9999 65.9993 59.2842 65.9993 50.9999V20.9999C65.9993 12.7157 59.2835 5.99994 50.9993 5.99994H20.9993ZM11.9993 20.9999C11.9993 16.0294 16.0287 11.9999 20.9993 11.9999H50.9993C55.9698 11.9999 59.9993 16.0294 59.9993 20.9999V50.9999C59.9993 53.6061 58.8915 55.9536 57.1212 57.5972C53.0649 50.0987 45.1301 44.9999 35.9986 44.9999C26.8674 44.9999 18.9329 50.0984 14.8765 57.5963C13.1067 55.9528 11.9993 53.6057 11.9993 50.9999V20.9999Z"
                fill="currentColor"
              />
            </svg>
            <div className="text-sm flex flex-col ">
              <h4 className="mb-3">Wallet Name</h4>
              <span className="text-gray-400 text-xs">Wallet Address</span>
              <h4>
                {data?.seller.slice(0, 6) + "..." + data?.seller.slice(-6, -1)}
              </h4>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-center gap-2">
            <h4 className="text-gray-400">Total Income</h4>
            <h3>$ {nftInfo?.claimedPotential || 0}</h3>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-between text-sm pt-3 items-end">
          <div className="flex flex-col gap-1 md:gap-3 w-full justify-between">
            <div className="flex gap-3 ">
              <span className="text-gray-400">Downlines</span>
              <button onClick={() => setShow(true)} className="text-blue-500">
                Show Downlines
              </button>
            </div>
            <h3>{nftInfo?.counter}</h3>
          </div>
          <div className="flex gap-3 w-full justify-between">
            <Vip
              text={
                nftInfo?.vipLvl === 3
                  ? "VIP 3"
                  : nftInfo?.vipLvl === 2
                  ? "VIP 2"
                  : "VIP 1"
              }
              key={data.tokenID}
            />

            <div>
              <span className="text-gray-400">Price</span>
              <h3>$ {data?.price}</h3>
            </div>
            <button
              onClick={() => data && buyNFT(data?.tokenID, data?.price)}
              className="bg-purple px-4 text-sm flex  h-10 xl:h-11 text-white rounded-lg justify-center items-center"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      {show && (
        <Modal modal={show} setModal={setShow} title="Dowlines">
          <div className="flex w-full  min-w-[90vw] md:min-w-[80vw] h-[80vh]">
            {data && <FlowChartWithAutoLayout tokenId={data.tokenID} />}
          </div>
        </Modal>
      )} */}
    </>
  );
}
