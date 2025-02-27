import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import CopyBtn from "@/components/button/copyBtn";
import {
  claimReferralReward,
  callGetReferralCodeForLeft,
} from "@/contractInteractions/useAppContract";
import Vip from "@/components/vip";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData, setAddress, setLoading } from "@/redux/auth/auth";
import { ToastError, ToastSuccess } from "@/components/alert/SweatAlert";
import Loading from "@/components/loading";
import Modal from "@/components/Modal";
import { parseToDecimals } from "@/hook/parse18decimals";

export default function Personel() {
  const [withdrawNum, setwithdrawNum] = useState("");

  const [refCode, setrefCode] = useState({
    left: "",
    right: "",
  });
  const [show, setShow] = useState(false);
  const reduxData = useAppSelector(selectData);
  const {
    withdrawableBalance,
    totalRevenue,
    vipLvl,
    address,
    loading,
    nftId,
    downlines,
    referralIncome,
    lvl,
    lowPotentiel,
  } = reduxData;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const addres = localStorage.getItem("address");
    addres && dispatch(setAddress(addres));
  }, []);

  async function getReferralCode(address?: string) {
    try {
      dispatch(setLoading(true));
      const addres = localStorage.getItem("address") || "";
      if (addres) {
        let reffCode = await callGetReferralCodeForLeft(addres);
        let reff = reffCode.toString();
        console.log(reff);
        setrefCode({
          left: reff,
          right: refCode.right,
        });
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const tempWithdraw = withdrawNum as unknown;
      const numberWithdraw = tempWithdraw as number;
      console.log(numberWithdraw);
      const withdraw18: any = parseToDecimals(numberWithdraw);
      /* const res: any = await callWithdraw();
      console.log(res);
      if (res) {
        ToastSuccess({ tHashLink: res.hash }).fire({
          title: "Transaction Successful",
        });
      } */
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      ToastError.fire({
        title: "Something went wrong",
      });
      dispatch(setLoading(false));
    }
  }

  const withdrawNumber = (event: any) => {
    setwithdrawNum(event.target.value);
  };

  async function upVipLvl(e: any) {
    e.preventDefault();
    try {
      /* dispatch(setLoading(true));
      const tempLvl = vipLvl as unknown;
      const upLvl = Number(e.target.upLvl.value) as number;
      console.log(upLvl);
      let allowance = await checkAllowance(2 === upLvl ? 500 : 1000);
      console.log(allowance);

      if (allowance) {
        let res = await callUpgrade(upLvl);
        res &&
          ToastSuccess({
            tHashLink: res.hash,
          }).fire("Wallet Upgrade Successfully");
      } */
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }

  async function ClaimReferralReward() {
    try {
      dispatch(setLoading(true));
      let res = await claimReferralReward();
      console.log(res);
      if (res) {
        ToastSuccess({ tHashLink: res.hash }).fire({
          title: "Transaction Successful",
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error", error);
      dispatch(setLoading(false));
    }
  }
  const [islisting, setislisting] = useState(false);

  return (
    <Layout title="My Account">
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 md:gap-5 text-white">
        <div className="col-span-2 xl:col-span-full p-3 md:p-4 2xl:p-6 justify-between items-center backdrop-blur-sm bg-white/10 rounded-xl shadow-md w-ful flex flex-col gap-3">
          <div className="flex justify-between w-full">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex gap-3 justify-start w-fit">
                <svg
                  className="w-12"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M36.0005 17.9999C29.3731 17.9999 24.0005 23.3725 24.0005 29.9999C24.0005 36.6274 29.3731 41.9999 36.0005 41.9999C42.6279 41.9999 48.0005 36.6274 48.0005 29.9999C48.0005 23.3725 42.6279 17.9999 36.0005 17.9999Z"
                    fill="currentCOlor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.9993 5.99994C12.715 5.99994 5.99927 12.7157 5.99927 20.9999V50.9999C5.99927 59.2842 12.715 65.9999 20.9993 65.9999H50.9993C59.2835 65.9999 65.9993 59.2842 65.9993 50.9999V20.9999C65.9993 12.7157 59.2835 5.99994 50.9993 5.99994H20.9993ZM11.9993 20.9999C11.9993 16.0294 16.0287 11.9999 20.9993 11.9999H50.9993C55.9698 11.9999 59.9993 16.0294 59.9993 20.9999V50.9999C59.9993 53.6061 58.8915 55.9536 57.1212 57.5972C53.0649 50.0987 45.1301 44.9999 35.9986 44.9999C26.8674 44.9999 18.9329 50.0984 14.8765 57.5963C13.1067 55.9528 11.9993 53.6057 11.9993 50.9999V20.9999Z"
                    fill="currentCOlor"
                  />
                </svg>
                <h3 className="hidden">Wallet Name</h3>
              </div>
            </div>
            
          </div>
          <div className="flex flex-col md:flex-row gap-3 xl:gap-6 justify-between w-full">
            <div>
              <h4 className="text-gray-400">Wallet Address</h4>
              <div className="flex gap-3">
                <h3>
                  {address &&
                    address.slice(0, 6) +
                    "....." +
                    address.slice(address.length - 6, address.length)}
                </h3>

                <CopyBtn text={address} />
              </div>
            </div>
            <div className="flex gap-3 md:gap-6 w-full">
              <div className="">
                <h4 className="text-gray-400">Branching Reward</h4>
                <div className="flex gap-2 items-center h-8">
                  <h2>{referralIncome}</h2>
                </div>
              </div>
            </div>
            <div className="h-full w-full md:w-fit flex justify-end gap-3 shrink-0  items-end">
              <button
                onClick={() => setShow(true)}
                className="border-2 border-purple disabled:backdrop-blur-sm bg-white/10 disabled:text-black disabled:cursor-not-allowed hover:bg-purple w-full md:w-fit hover:text-white transition-colors rounded-md py-2 px-3 md:px-4 2xl:px-6 shrink-0"
              >
                Upgrade your badge
              </button>
              <button
                className="bg-purple rounded-lg  px-4 p w-fit h-11 text-white"
                onClick={() => { }}
              >
                Claim Airdrop
              </button>
            </div>
          </div>
        </div>

        <div
          className={` col-span-2 xl:col-span-3 p-3 md:p-4 2xl:p-6 justify-start items-start backdrop-blur-sm bg-white/10 rounded-xl shadow-md w-full flex flex-col gap-3 relative`}
        >
          {islisting && (
            <div className="absolute left-0 top-0 rounded-xl w-full h-full bg-black/60 backdrop-blur-sm cursor-not-allowed z-10 flex  " />
          )}
          <h2 className="mb-3">My IDOs</h2>


        </div>
        <div className="flex flex-col col-span-2 p-3 md:p-4 2xl:p-6 gap-3 backdrop-blur-sm bg-white/10 rounded-xl shadow-md w-ful">
          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <h2 className="mb-3">Referral Code</h2>
            </div>
            <div className="flex gap-3 items-center">
              My Referrals : <span className="font-semibold">{downlines}</span>
            </div>
          </div>
          <div className="flex-col md:flex-row flex justify-between items-center gap-3">
            <div className="border-gray-200 w-full border-2 flex justify-between p-3 rounded-lg ">
              <span>
                {refCode.left &&
                  refCode.left.slice(0, 8) +
                  "....." +
                  refCode.left.slice(
                    refCode.left.length - 8,
                    refCode.left.length
                  )}
              </span>
              <CopyBtn text={refCode.left} />
            </div>
            <button
              type="submit"
              onClick={() => getReferralCode(address)}
              className="bg-purple py-3 px-6 w-full md:w-fit shrink-0 text-white rounded-md"
            >
              Generate
            </button>
          </div>
          <div className="flex flex-col w-full items-center gap-3">
            {referralIncome > 0 && (
              <button
                type="submit"
                onClick={() => ClaimReferralReward()}
                className="bg-purple py-3 px-6 w-2/3 text-white rounded-md"
              >
                Claim Referral Reward
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal modal={show} setModal={setShow} title="Upgrade Your Wallet">
        <form
          onSubmit={upVipLvl}
          className="w-full min-w-[60vw] xl:min-w-[40vw] p-6  relative"
        >
          <div className="w-full  flex flex-col gap-3">
            <select
              name="upLvl"
              className="outline-none border-2 rounded-lg border-gray-200 p-3"
            >
              <option className="p-3" value="2">
                <span className="w-full h-10 flex justify-center items-center p-2">
                  Epic
                </span>
              </option>
              <option className="p-3" value="3">
                Legendary
              </option>
            </select>
            <button
              type="submit"
              className="bg-purple hover:opacity-95 text-white rounded-lg py-3 w-full flex justify-center items-center gap-3 disabled:opacity-90"
            >
              Upgrade {loading && <Loading />}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
