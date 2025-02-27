import React, { useState } from "react";
import Layout from "@/layout/layout";
import Ethers from "@/lib/ethers";
import { Wallet, ethers } from "ethers";
import Loading from "@/components/loading";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData, setLoading } from "@/redux/auth/auth";
import { useRouter } from "next/router";
import UsdtIcon from "@/components/icons/usdt";
import WalletIcon from "@/components/icons/wallet";

export default function NftBuy() {

  const { loading, address } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const router = useRouter();


  return (
    <>
      

      <Layout title="Launchpad">
        <div className="flex flex-col justify-between items-center xl:h-[85vh] text-white backdrop-blur-sm bg-white/10 border-2 border-white/30 rounded-xl shadow-md w-full gap-10 h-full p-6 ">
          
        </div>
      </Layout>
    </>
  );
}


