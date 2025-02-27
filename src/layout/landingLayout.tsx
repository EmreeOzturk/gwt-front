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
// import { useTranslation } from "react-i18next";

export default function LandingLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const reduxData = useAppSelector(selectData);
  const { loading } = reduxData;
  // const { t } = useTranslation();
  //html title change
  // useEffect(() => {
  //   document.title = "One 4 Global | " + t(title);
  // }, [title, t]);
  return (
    <>
      <Header />
      {loading && <Loader />}
      
      {children}
      <Footer />
    </>
  );
}
