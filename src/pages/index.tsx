import Header from "@/components/header";
import LandingLayout from "@/layout/landingLayout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
  }, []);
  return (
    <>
      <LandingLayout title="home">
        <div className=" flex text-2xl md:text-4xl w-full h-auto md:w-2/3 xl:w-full text-center z-20  fixed top-1/2 left-1/2  justify-center items-center transform -translate-x-1/2 -translate-y-1/2 text-white launch animate-fadeIn3 font-montserrat">
          <h1 className={""}>
          DECENTRALIZED <b>COMMUNITY</b>
          </h1>
        </div>
        {(
          <Link
            href="/nft-buy"
            className="absolute mt-16 md:mt-20 border-2 text-sm md:text-xl border-purpleDark rounded-full px-8 py-2 hover:bg-white hover:text-purpleDark transition-colors z-20 text-purpleDark top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold animate-fadeIn3"
          >
            LAUNCH APP
          </Link>
        )}
      </LandingLayout>
    </>
  );
}
