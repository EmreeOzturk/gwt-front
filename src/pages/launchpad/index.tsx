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
import { QuestionIcon, TetherTokenIcon, UsdcIcon } from "@/components/icons/tokens";
import Dropdown from "@/components/tailwind/Dropdown";
import { DownIcon } from "@/components/icons";
import InputText from "@/components/tailwind/input";
import LaunchModal from "@/components/modals/launch";
import Modal from "@/components/Modal";
const tokens = [
  {
    id: 1,
    symbol: '',
    name: 'Suprise Launch',
    icon: <QuestionIcon className='w-14 h-14' />,
    contract: '0xfD913Ba80e578cB414e9cbB9FA4a79644abBaB96',
  },
  /* {
    id: 2,
    symbol: "TT",
    name: "Test Coin",
    icon: <UsdcIcon className="w-16 h-16" />,
    contract: "0x08A521149cb229Ce448cc28A7Bcc1b3D95a6341A",
  }, */
];
export default function NftBuy() {
  const { loading, address } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [token, setToken] = useState(tokens[0]);
  const [amount, setAmount] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  return (
    <>
    <div></div>
      <Layout title="Launchpad">
        <div className="grid grid-cols-5 w-full gap-6">
          {tokens.map((token, index) => (
            <div className="border border-white/50 p-6 flex flex-col justify-between rounded-xl bg-white/10 backdrop-blur-sm gap-6 items-center w-full">
              <h3 className="h-16">
                {token.name} {token.symbol}
              </h3>
              {token.icon}
              <button
                onClick={() => {
                  setModal(true);
                  setToken(token);
                }}
                className="bg-purple hover:opacity-95 text-white rounded-lg py-3 disabled:opacity-70 disabled:cursor-not-allowed gap-3 w-full flex justify-center items-center"
              >
                Launch {loading && <Loading />}
              </button>
            </div>
          ))}
        </div>
      </Layout>
      <Modal title={token.name + " Details"} modal={modal} setModal={setModal}>
        <LaunchModal token={token} />
      </Modal>
    </>
  );
}
