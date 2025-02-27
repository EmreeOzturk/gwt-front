import Image from "next/image";
import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { Alert } from "../components/alert/alert";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";
import MatrixBackground from "@/components/matrix";
import FluidAnimation from "@/components/FluidAnimation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";

export default function OtherLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const reduxData = useAppSelector(selectData);
  const { loading } = reduxData;
  const { t } = useTranslation();
  //html title change
  useEffect(() => {
    document.title = "One 4 Global | " + t(title);
  }, [title, t]);
  return (
    <div className="flex flex-col min-h-screen w-full max-w-[100vw] relative overflow-x-hidden   items-center justify-start animate-fadeIn z-20 gap-6 xl:gap-10 text-white py-28 px-3">
      <Header />
      {loading && <Loader />}
      
      {children}
      <Footer />
    </div>
  );
}
