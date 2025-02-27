import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import DropDownSelect from "./tailwind/dropDownSelect";
import Dropdown from "./tailwind/Dropdown";
import { useTranslation } from "react-i18next";
import { toggleLocale } from "@/redux/auth/auth";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { selectData } from "@/redux/auth/auth";

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const reduxData = useAppSelector(selectData);
  const { locale } = reduxData;
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(locale);
  const { pathname } = router;
  const [showMobile, setShowMobile] = useState(false);
  const [path, setPath] = useState(pathname);
  const duration: number = 600;
  //scroll 50px down add header bg
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 30) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
  const [flag, setFlag] = useState("en");

  useEffect(() => {
    setFlag(locale);
    setSelectedLang(locale);
  }, [locale]);

  return (
    <>
      <header
        className={`w-full  text-white backdrop-blur bg-black/20 fixed left-0 top-0 flex items-center h-16 xl:h-20 py-2 xl:py-3 gap-6 justify-center   z-50 transition-colors animate-fadeIn`}
      >
        <div className="flex justify-end px-3 xl:px-6 2xl:px-12 w-full h-full  items-center">
          {/* <Link
            href={"/"}
            className=" shrink-0 w-fit font-brando h-full z-50 flex gap-3 font-semibold items-center text-sm md:text-base 2xl:text-2xl"
          >
            <Image
              src={"/logo.svg"}
              width={200}
              height={200}
              className="h-1/2 w-fit"
              alt=""
            />
          </Link> */}
          <ul className="flex-col w-fit   hidden xl:flex xl:relative pt-12 xl:pt-0 bottom-0 left-0 items-center justify-center h-full  xl:h-auto xl:flex-row xl:mt-0 text-sm xl:text-sm font-normal  gap-6 2xl:gap-10 transition-all">
            {menu.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className="flex flex-col justify-center group items-center  shrink-0 w-fit relative"
                >
                  {item?.dropdown ? (
                    <>
                      <DropDownSelect textBtn={t(item.title)}>
                        <div className="bg-black/90 backdrop-blur-md text-white rounded-md font-medium border-2 border-white/50 flex flex-col w-32 divide-y-2 divide-white/50  ">
                          {item.children.length &&
                            item.children.map((child: any, index) => {
                              return (
                                <>
                                  <Link
                                    href={child?.link}
                                    target={child?.target}
                                    key={child.id}
                                    onClick={() => setShowMobile(!showMobile)}
                                    className={` justify-center items-center px-3 py-2 xl:border-0 xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full text-xs ${child?.addClass} `}
                                  >
                                    {t(child?.title)}
                                    {child?.comingSoon && (
                                      <div className="text-xs flex w-full justify-center text-orange-400 font-semibold">
                                        Coming soon
                                      </div>
                                    )}
                                  </Link>
                                </>
                              );
                            })}
                        </div>
                      </DropDownSelect>
                    </>
                  ) : (
                    <Link
                      href={item.link}
                      target={item.target}
                      className={`flex justify-center items-center py-3 xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full font-bold ${item?.addClass} `}
                    >
                      {t(item.title)}
                    </Link>
                  )}
                  {item.comingSoon && (
                    <span className="text-xs group-hover:flex absolute -bottom-2 hidden text-orange-400 font-bold">
                      Coming soon
                    </span>
                  )}
                </li>
              );
            })}
            <li>
              <svg
                width="3"
                height="20"
                viewBox="0 0 2 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5V16.5"
                  stroke="#B213CB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className="shrink-0 relative -ml-12 w-16 flex justify-end">
              <Dropdown
                offset={[0, 6]}
                placement={`bottom-end`}
                btnClassName="block p-1 rounded-full    hover:bg-white/90  transition-colors"
                button={
                  flag && (
                    <picture>
                      <img
                        className="h-5 w-5 rounded-full object-cover"
                        src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                        width={20}
                        height={20}
                        alt="flag"
                      />
                    </picture>
                  )
                }
              >
                <ul className="grid grid-cols-1 gap-2 w-20 font-semibold  xl:-mr-6 text-dark bg-black/80 rounded-md  ">
                  {languageList.map((item: any) => {
                    return (
                      <li
                        key={item.code}
                        className={`last:rounded-b-md first:rounded-t-md hover:bg-white/20 ${
                          locale === item.code
                            ? "bg-white/20 text-white"
                            : ""
                        }`}
                      >
                        <button
                          type="button"
                          disabled={locale !== item.code}
                          className={`flex items-center gap-2 w-full h-full p-2 hover:text-white `}
                          onClick={() => {
                            dispatch(toggleLocale(item.code));
                            setFlag(item.code);
                          }}
                        >
                          <picture>
                            <img
                              width={20}
                              height={20}
                              src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                              alt="flag"
                              className="h-5 w-5 rounded-full object-cover"
                            />
                          </picture>
                          <span className="ltr:ml-3 rtl:mr-3">
                            {item.code.toUpperCase()}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </li>
          </ul>

          {showMobile ? (
            <button
              className="block xl:hidden shrink-0"
              onClick={() => setShowMobile(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setShowMobile(true)}
              className="block xl:hidden space-y-[6px] shrink-0"
            >
              <span className="block w-6 h-[3px] md:h-1 bg-gray-100"></span>
              <span className="block w-6 h-[3px] md:h-1 bg-gray-100"></span>
              <span className="block w-6 h-[3px] md:h-1 bg-gray-100"></span>
            </button>
          )}
        </div>
      </header>
      <ul
        className="flex xl:hidden z-40 flex-col fixed  bg-black xl:bg-transparent xl:relative  top-0 left-0 items-center justify-center xl:justify-end  xl:h-auto xl:flex-row xl:mt-0 text-xl font-normal w-full xl:w-1/2 gap-6 text-white transition-all h-screen overflow-y-auto"
        style={{
          transform: showMobile ? "translateX(0)" : "translateX(100%)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {menu.map((item, index) => {
          return (
            <li
              key={item.id}
              className="flex justify-center group items-center text-white relative shrink-0 w-fit "
            >
              {item?.dropdown ? (
                <>
                  <DropDownSelect textBtn={t(item.title)}>
                    <div className="bg-white/10 backdrop-blur-md text-white rounded-md font-medium border-2 border-white/50 flex flex-col w-32 divide-y-2  ">
                      {item.children.length &&
                        item.children.map((child: any, index) => {
                          return (
                            <>
                              <Link
                                href={child?.link}
                                target={child?.target}
                                key={child.id}
                                onClick={() => setShowMobile(!showMobile)}
                                className={` justify-center items-center px-3 py-2 xl:border-0 xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full text-xs ${child?.addClass} `}
                              >
                                {t(child?.title)}
                                {child?.comingSoon && (
                                  <div className="text-xs flex w-full justify-center text-orange-400 font-semibold">
                                    Coming soon
                                  </div>
                                )}
                              </Link>
                            </>
                          );
                        })}
                    </div>
                  </DropDownSelect>
                </>
              ) : (
                <Link
                  href={item.link}
                  target={item.target}
                  onClick={() => setShowMobile(!showMobile)}
                  className={` justify-center items-center py-0 !text-white xl:border-0 xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full ${item?.addClass} `}
                >
                  {t(item.title)}
                </Link>
              )}
              {item.comingSoon && (
                <span className="text-xs group-hover:flex absolute -bottom-3 md:-bottom-2  md:hidden text-orange-400 font-bold">
                  Coming soon
                </span>
              )}
            </li>
          );
        })}
        <li className="flex flex-col md:hidden group text-white justify-center items-center py-0 -mt-2  xl:border-0 xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full relative">
          <button className=" justify-center items-center peer  xl:border-0 xl:hover:text-orange-400  cursor-pointer text-center w-fullborder-2 border-white rounded-full px-6 py-2 bg-white text-black md:text-white md:bg-transparent hover:bg-white hover:text-black transition-colors font-semi-bold flex">
            Launch App
          </button>
          <span className="hidden peer-hover:block text-xs group-hover:flex absolute -bottom-5 md:-bottom-2  md:hidden text-orange-400 font-bold">
            Mobile is not supported.
          </span>
        </li>
        <li className="shrink-0 relative -ml-12 w-16 flex justify-end">
          <Dropdown
            offset={[0, 6]}
            placement={`bottom-end`}
            btnClassName="block p-1 rounded-full    hover:bg-white/90  transition-colors"
            button={
              flag && (
                <picture>
                  <img
                    className="h-5 w-5 rounded-full object-cover"
                    src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                    width={20}
                    height={20}
                    alt="flag"
                  />
                </picture>
              )
            }
          >
            <ul className="grid grid-cols-1 gap-2 w-20 font-semibold  xl:-mr-6 text-dark bg-black/80 rounded-md  ">
              {languageList.map((item: any) => {
                return (
                  <li
                    key={item.code}
                    className={`last:rounded-b-md first:rounded-t-md hover:bg-white/20 ${
                      locale === item.code
                        ? "bg-white/20 text-white"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      disabled={locale !== item.code}
                      className={`flex items-center gap-2 w-full h-full p-2 hover:text-white `}
                      onClick={() => {
                        dispatch(toggleLocale(item.code));
                        setFlag(item.code);
                      }}
                    >
                      <picture>
                        <img
                          width={20}
                          height={20}
                          src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                          alt="flag"
                          className="h-4 w-4 rounded-full object-cover"
                        />
                      </picture>
                      <span className="ltr:ml-3 rtl:mr-3 text-xs">
                        {item.code.toUpperCase()}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Dropdown>
        </li>
      </ul>
    </>
  );
}

const languageList = [
  { code: "en", name: "English" },
  { code: "tr", name: "Turkish" },
  { code: "de", name: "German" },
  { code: "ru", name: "Russian" },
];

const menu = [
  {
    id: 0,
    title: "home",
    link: "/",
    target: "_self",
    addClass: "",
  },

  {
    id: 1,
    title: "about",
    link: "/#",
    target: "_self",
    dropdown: true,
    children: [
      // {
      //   id: 1,
      //   title: "what_is_one4global",
      //   link: "/about",
      //   target: "_self",
      //   addClass: "",
      // },
      {
        id: 2,
        title: "policies",
        link: "/#",
        target: "_self",
        addClass: "",
      },
    ],
  },
  {
    id: 2,
    title: "how_it_works",
    link: "#", //"/how-it-works",
    target: "_self",
  },
  {
    id: 3,
    title: "blog",
    link: "/#",
    target: "_self",
    comingSoon: false,
  },
  {
    id: 4,
    title: "application",
    link: "#",
    target: "_self",
    comingSoon: false,
  },
];
