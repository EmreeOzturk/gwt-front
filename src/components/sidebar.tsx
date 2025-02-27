import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Ethers from "@/lib/ethers";
import CopyBtn from "./button/copyBtn";
import {
  callCalculateChildRevenue,
  callGetNFT,
  callGetNFTInfo,
  parseIntHex,
} from "@/contractInteractions/useAppContract";
import { Alert } from "./alert/alert";
import { ToastError, ToastSuccess } from "./alert/SweatAlert";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import {
  setNftInfo,
  setTotalRevenue,
  setVipLvl,
  setWithdrawableBalance,
  setEmty,
  setClear,
  selectData,
  setAddress,
  setLoading,
  setnftId,
  setDownlines,
  setReferralIncome,
  setLvl,
  setLowPotentiel,
  setListing,
} from "@/redux/auth/auth";
import { decimalToParse } from "@/hook/parse18decimals";
import useMetamask from "@/hook/useMetamask";

export default function SideBar() {
  const [selected, setSelected]: any = useState(1);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const reduxData = useAppSelector(selectData);
  const { address, isEmty } = reduxData;
  const dispatch = useAppDispatch();
  function Close() {
    setIsOpen(false);
  }

  useEffect(() => {
    const local = localStorage.getItem("address");
    if (local && local !== address) {
      dispatch(setAddress(local));
    }
    const LocalIsEmty = localStorage.getItem("isEmty");
    if (LocalIsEmty) {
      const parsed = LocalIsEmty && JSON.parse(LocalIsEmty);
      dispatch(setEmty(parsed.isEmty));
    }
  }, [address]);

  useEffect(() => {
    dispatch(setLoading(false));
    getID(address);
  }, [address]);

  /* useEffect(() => {
    if (window.ethereum && typeof window !== "undefined") {
      try {
        //@ts-ignore
        window.ethereum?.on("accountsChanged", (accounts) => {
          localStorage.removeItem("address");
          localStorage.removeItem("isEmty");
          localStorage.clear();
          dispatch(setClear());
          router.push("/nft-buy");
          router.reload();
        });
        //@ts-ignore
        window.ethereum?.on("chainChanged", (chainId) => {
          localStorage.removeItem("address");
          localStorage.removeItem("isEmty");
          localStorage.clear();
          dispatch(setClear());
          router.push("/nft-buy");
          router.reload();
        });
      } catch (err) {
        console.error(err);
      }
    }
  }); */

  async function getID(address: string) {
    try {
      //let address = localStorage.getItem("address") || "";
      console.log("address", address);

      let id = await callGetNFT(address);

      console.log("id", id);
      //console.log("id", id);
      let emty = Number(id) === 0;
      console.log("emty", emty);

      localStorage.setItem("isEmty", JSON.stringify({ isEmty: emty }));
      dispatch(setEmty(emty));
      let authPath = ["/dashboard", "/personal-information"];
      /* if (authPath.includes(router.pathname)) {
        emty && router.push("/nft-buy");
      } else if (router.pathname === "/nft-buy") {
        !emty && router.push("/dashboard");
      } */
      console.log("id", id, address);

      if (!emty) {
        //claimlimit-usedclaimlimit = withdrawable balance
        //console.log(parseIntHex(id[0]));
        let ID = Number(id);
        let getNFTInfo = await callGetNFTInfo(ID);
        console.log("ID", ID);
        dispatch(setnftId(ID));
        console.log("getNFTInfo", getNFTInfo);
        localStorage.setItem(
          "vipLvl",
          JSON.stringify(parseIntHex(getNFTInfo[0]))
        );
        dispatch(setVipLvl(parseIntHex(getNFTInfo[0])));
        let data = {
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
          listed: getNFTInfo["listed"],
          counter: parseIntHex(getNFTInfo["counter"]),
          totalPotential: await decimalToParse(getNFTInfo["totalPotential"]),
          refId: parseIntHex(getNFTInfo["refID"]),
        };
        dispatch(setListing(data.listed));
        let lowPotentiel = Number(data.totalPotential);
        console.log("lowPotentiel", lowPotentiel, Number(data.totalPotential));
        dispatch(setLowPotentiel(lowPotentiel));

        const calculateLevel = (lowPotentiel: number) => {
          for (let i = 0; i < 8; i++) {
            if (lowPotentiel < 40000 * Math.pow(2, i)) {
              return i + 1;
            }
          }
          return 1;
        };
        let lvl = calculateLevel(lowPotentiel);

        dispatch(setDownlines(data.counter));
        dispatch(setLvl(lvl));
        dispatch(setReferralIncome(Number(data.referralIncome)));
        console.log(data);
        let revenue = await callCalculateChildRevenue(ID);
        //console.log(revenue);
        let childData: any = {
          leftChildRevenue: 0,
          rightChildRevenue: 0,
        };
        if (revenue) {
          childData = {
            leftChildRevenue: await decimalToParse(revenue[0]),
            rightChildRevenue: await decimalToParse(revenue[1]),
          };
          //console.log("childData", childData);

          const totalRevenue =
            Number(childData.leftChildRevenue) +
            Number(childData.rightChildRevenue);
          localStorage.setItem("totalRevenue", JSON.stringify(totalRevenue));
          dispatch(setTotalRevenue(totalRevenue));
          let lowRevenue =
            Number(childData.leftChildRevenue) / totalRevenue > 0.5
              ? Number(childData.rightChildRevenue) * 0.1
              : Number(childData.leftChildRevenue) * 0.1;

          //console.log("lowRevenue", lowRevenue);

          const withdrawableBalance = lowRevenue;
          //console.log("withdrawableBalance", withdrawableBalance);

          localStorage.setItem(
            "withdrawableBalance",
            JSON.stringify(withdrawableBalance)
          );
          dispatch(setWithdrawableBalance(withdrawableBalance));
        }
        //console.log(childData);
        const datas: any = {
          id: data.id.toString(),
          name: "a",
          address: data.holder,
          leftChildRevenue: childData?.leftChildRevenue,
          rightChildRevenue: childData?.rightChildRevenue,
          vipLvl: data.vipLvl,
          parent: data.parent.toString(),
          refId: data.refId,
          leftChild: data.leftChild,
          rightChild: data.rightChild,
          count:
            (data.leftChild === 0 ? 0 : 1) + (data.rightChild === 0 ? 0 : 1),
          children: [
            {
              id: data.leftChild + "a",
              name: "b",
              parent: data.id.toString(),
              children: [],
            },
            {
              id: data.rightChild + "b",
              name: "c",
              parent: data.id.toString(),
              children: [],
            },
          ],
        };

        console.log(datas);
        datas.children = datas.children.filter(
          (item: any) => Number(item.id.slice(0, -1)) !== 0
        );
        localStorage.setItem("nftInfo", JSON.stringify([datas]));
        dispatch(setNftInfo([datas]));
      }
    } catch (error) {
      console.log(error);
      /* ToastError.fire({
        title: "Something went wrong.",
      }); */
    }
  }
  const { CheckChain, connecWallet } = useMetamask({
    Close: () => setIsOpen(false),
    chainId: "0x89",
    address: address,
  });
  const menu = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 0C1.79086 0 0 1.79086 0 4V5C0 7.20914 1.79086 9 4 9H5C7.20914 9 9 7.20914 9 5V4C9 1.79086 7.20914 0 5 0H4ZM15 0C12.7909 0 11 1.79086 11 4V5C11 7.20914 12.7909 9 15 9H16C18.2091 9 20 7.20914 20 5V4C20 1.79086 18.2091 0 16 0H15ZM4 11C1.79086 11 0 12.7909 0 15V16C0 18.2091 1.79086 20 4 20H5C7.20914 20 9 18.2091 9 16V15C9 12.7909 7.20914 11 5 11H4ZM15 11C12.7909 11 11 12.7909 11 15V16C11 18.2091 12.7909 20 15 20H16C18.2091 20 20 18.2091 20 16V15C20 12.7909 18.2091 11 16 11H15Z"
            fill="currentColor"
          />
        </svg>
      ),
      status: true,
    },
    {
      id: 2,
      name: "Personal Information",
      path: "/personal-information",
      icon: (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 12C2.23858 12 0 14.2386 0 17C0 18.6569 1.34315 20 3 20H13C14.6569 20 16 18.6569 16 17C16 14.2386 13.7614 12 11 12H5Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C5.23858 0 3 2.23858 3 5C3 7.76142 5.23858 10 8 10C10.7614 10 13 7.76142 13 5C13 2.23858 10.7614 0 8 0Z"
            fill="currentColor"
          />
        </svg>
      ),
      status: !isEmty,
    },
    {
      id: 3,
      name: "NFT Buy",
      path: "/nft-buy",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.45925 6C4.02505 6 2.1552 8.15595 2.49945 10.5657L3.51965 17.7071C3.87155 20.1704 5.98115 22 8.4694 22H15.531C18.0193 22 20.1289 20.1704 20.4808 17.7071L21.501 10.5657C21.8452 8.15595 19.9754 6 17.5412 6H6.45925Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.00013 4.76363C7.84713 3.06962 9.57835 2 11.4721 2H12.5279C14.4217 2 16.1531 3.07003 17 4.76396L17.8944 6.55279C18.1414 7.04677 17.9412 7.64744 17.4472 7.89443C16.9532 8.14142 16.3525 7.94119 16.1055 7.44721L15.2111 5.65838C14.703 4.64202 13.6642 4 12.5279 4H11.4721C10.3357 4 9.29711 4.64179 8.78898 5.65805L7.8944 7.44721C7.64741 7.94119 7.04674 8.14142 6.55276 7.89443C6.05878 7.64744 5.85856 7.04676 6.10555 6.55279L7.00013 4.76363Z"
            fill="currentColor"
          />
        </svg>
      ),
      status: isEmty,
    },
    {
      id: 4,
      name: "NFT Marketplace",
      path: "/nft-marketplace",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2499 17V19.75H7.7499V17C7.7499 16.311 8.3109 15.75 8.9999 15.75H10.9999C11.6889 15.75 12.2499 16.311 12.2499 17ZM15.9999 12.25C14.8999 12.25 13.8599 11.97 12.9999 11.46C12.1299 11.97 11.0899 12.25 9.9999 12.25C8.9099 12.25 7.8699 11.97 6.9999 11.46C6.1399 11.97 5.0999 12.25 3.9999 12.25C3.0099 12.25 2.0699 12.02 1.2499 11.6V17C1.2499 18.52 2.4799 19.75 3.9999 19.75H6.2499V17C6.2499 15.483 7.4829 14.25 8.9999 14.25H10.9999C12.5169 14.25 13.7499 15.483 13.7499 17V19.75H15.9999C17.5199 19.75 18.7499 18.52 18.7499 17V11.6C17.9299 12.02 16.9899 12.25 15.9999 12.25ZM7.3389 0.249993H4.4929C3.2839 0.249993 2.1999 1.05999 1.8559 2.21899L0.445902 6.97699C0.159902 7.94199 0.395902 8.95599 1.0619 9.62599C1.7729 10.34 2.8439 10.75 3.9999 10.75C4.6959 10.75 5.3299 10.592 5.8799 10.336L7.3389 0.249993ZM11.1459 0.249993H8.8539L7.4529 9.93899C8.1169 10.436 8.9969 10.75 9.9999 10.75C11.0029 10.75 11.8829 10.437 12.5469 9.93899L11.1459 0.249993ZM19.5539 6.97999L18.1429 2.21699C17.7999 1.05899 16.7159 0.248993 15.5069 0.248993H12.6609L14.1189 10.335C14.6699 10.591 15.3029 10.749 15.9989 10.749C17.1539 10.749 18.2249 10.339 18.9369 9.62499C19.6029 8.95599 19.8389 7.94299 19.5539 6.97999Z"
            fill="currentColor"
          />
        </svg>
      ),
      status: true,
    },
    {
      id: 5,
      name: "Launchpad",
      path: "/launchpad",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="24"
          height="24"
          viewBox="0 0 512 512"
        >
          <path d="M505.1 19.1c-1.2-5.5-6.7-11-12.2-12.2C460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.8c-16.3 0-35.6 11.9-42.9 26.5L2.5 253.3A28.4 28.4 0 0 0 0 264a24 24 0 0 0 24 24H127.8l-22.5 22.5c-11.4 11.4-13 32.3 0 45.3L156.2 406.6c11.2 11.2 32.2 13.2 45.3 0l22.5-22.5V488a24 24 0 0 0 24 24 28.6 28.6 0 0 0 10.7-2.5l98.7-49.4c14.6-7.3 26.5-26.5 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1C512.1 76.5 512.1 51.3 505.1 19.1zM384 168A40 40 0 1 1 424.1 128 40 40 0 0 1 384 168z" />
        </svg>
      ),
      status: true,
    },
  ];

  return (
    <>
      <nav className=" flex flex-col w-fit xl:w-64 shrink-0 border-solid h-screen top-0 backdrop-blur-sm bg-white/10 justify-between items-center text-white px-3 md:px-4 pb-12 pt-24 transition-  text-sm fixed z-50">
        <ul className="w-full">
          {menu.map(
            (item) =>
              item.status && (
                <li
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`mb-4 flex gap-3 cursor-pointer w-full rounded-md transition-colors hover:bg-gray-200 hover:text-gray-700  ${
                    router.pathname === item.path &&
                    "!bg-btnActive text-white hover:text-white "
                  }`}
                >
                  <Link
                    className="flex justify-center items-center xl:justify-start gap-3 h-full w-full p-3"
                    href={item.path}
                  >
                    {item.icon}
                    <span className=" hidden xl:block"> {item.name}</span>
                  </Link>
                </li>
              )
          )}
        </ul>
        {isOpen && (
          <div className="bg-white text-black rounded-lg  pb-6 pt-3 w-52 absolute bottom-28 left-6 border flex flex-col font-bold text-base ">
            <div className="flex w-full justify-between px-3">
              <span>Connect Wallet</span>
              <button type="button" onClick={Close}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#1A1B2F"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289Z"
                    fill="#1A1B2F"
                  />
                </svg>
              </button>
            </div>
            <div className="flex gap-3 mt-3 px-6">
              <button
                onClick={connecWallet}
                className="w-full h-12 p-3 border-2 flex justify-center items-center transition-colors text-white rounded-md"
              >
                <img src="/metamask.svg" alt="" className="w-2/3" />
              </button>
            </div>
          </div>
        )}
        {address ? (
          <div className="text-center border-4 border-purple w-full shrink-0  rounded-lg py-2 px-2 xl:px-4 text-xs flex gap-2 items-center ">
            <img src="/metamask2.svg" className="h-6" alt="" />
            <span className="hidden xl:block">
              {address &&
                address.slice(0, 7) +
                  "....." +
                  address.slice(address.length - 7, address.length)}
            </span>
            <span className="hidden xl:block">
              <CopyBtn text={address} />
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-fit xl:w-full p-3 h-12 bg-purple hover:bg-purple/90 transition-colors text-white rounded-md xl:mx-6"
          >
            <span className="hidden xl:block">Connect Wallet</span>
            <span className="block xl:hidden h-6 w-6">
              <svg
                className="w-full "
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.5781 3.79688C27.5156 3.8125 25.1563 4.21094 22.3438 4.6875C9.92969 6.79688 6.33594 7.42188 5.97656 7.53906C5.23438 7.78906 4.65625 8.15625 4.05469 8.75C3.57031 9.22656 3.39063 9.46875 3.10156 10.0781C2.4375 11.4531 2.46875 10.8984 2.46094 21.4062C2.46094 30.0078 2.46875 30.7031 2.60156 31.1719C2.82031 32.0078 3.24219 32.7734 3.80469 33.3594C4.44531 34.0469 5.01563 34.4219 5.85938 34.7188L6.52344 34.9609H19.9609H33.3984L34.0625 34.7188C34.9141 34.4141 35.4922 34.0312 36.1328 33.3438C36.6875 32.7422 37.1016 31.9922 37.3203 31.1719C37.4531 30.7031 37.4609 30.0469 37.4609 22.5C37.4609 14.9531 37.4531 14.2969 37.3203 13.8281C36.8672 12.1484 35.625 10.7969 34.0234 10.25L33.3984 10.0391L22.7344 10C14.8672 9.96875 12.0313 9.9375 11.9141 9.86719C11.4609 9.60938 11.2891 9.05469 11.5156 8.60938C11.7813 8.08594 11.0156 8.125 22.6953 8.14062L33.2813 8.16406V7.96094C33.2813 7.85156 33.2109 7.5625 33.125 7.3125C32.8438 6.49219 32.4844 5.92188 31.8359 5.27344C31.1016 4.53125 30.2578 4.07031 29.2813 3.875C28.7422 3.76562 27.8906 3.72656 27.5781 3.79688ZM29.8125 20.2422C30.2969 20.4766 30.7734 20.9453 31.0156 21.4453C31.1641 21.7656 31.2031 21.9609 31.2031 22.5C31.2109 23.1094 31.1875 23.2031 30.9453 23.6562C30.6563 24.1953 30.3203 24.5078 29.7656 24.7812C29.25 25.0312 28.2344 25.0234 27.6953 24.7656C25.6641 23.7812 25.8359 20.9062 27.9688 20.125C28.4531 19.9531 29.2969 20.0078 29.8125 20.2422Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        )}
      </nav>
    </>
  );
}
