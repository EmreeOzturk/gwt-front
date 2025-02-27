import Image from "next/image";
import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { Alert } from "../components/alert/alert";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import MatrixBackground from "@/components/matrix";
import FluidAnimation from "@/components/FluidAnimation";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const reduxData = useAppSelector(selectData);
  const { loading } = reduxData;
  useEffect(() => {
    document.title = "One 4 Global | " + title;
  }, [title]);
  return (
    <main
      className={`flex min-h-screen w-screen max-w-[100vw] relative overflow-x-hidden gap-6  items-center justify-between animate-fadeIn z-20`}
    >
      <MatrixBackground />
      <SideBar />
      <div className="w-full pl-[86px] xl:pl-[280px] h-full pb-6 flex flex-col gap-3 min-h-[100vh] max-w-[100vw]  text-white p-3 xl:p-6 relative">
        {loading && <Loader />}
        <h2 className="text-2xl xl:text-4xl font-bold mb-3 drop-shadow-md ">
          {title}
        </h2>
        {children}
      </div>
    </main>
  );
}
