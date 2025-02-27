import { ToastError } from "@/components/alert/SweatAlert";
import PbImage from "@/components/pbImage";
import OtherLayout from "@/layout/otherLayout";
import pb from "@/lib/pocketbase";
import { setLoading } from "@/redux/auth/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
interface IBlog {
  id: string;
  title_tr: string;
  title_en: string;
  title_ru: string;
  title_de: string;
  description_tr: string;
  description_en: string;
  description_ru: string;
  description_de: string;
  tags: string;
  banner: string;
  cardImage: string;
  category: string[];
  isActive: boolean;
  pathName: string;
  created: string;
}

export default function Blog() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(1);
  const [blogList, setBlogList] = useState<IBlog[]>([]);
  const [langCode, setLangCode] = useState("en"); // ["en", "tr", "ru"
  const getLangCode = () => {
    const langCode = localStorage.getItem("i18nextLng") || "en";
    return langCode;
  };
  const dispatch = useDispatch();
  async function getBlogs() {
    dispatch(setLoading(true));
    try {
      const records: any = await pb.collection("blogs").getFullList({
        filter: 'isActive=true',
        sort: "-created",
      });
      console.log("records", records);
      setBlogList(records || []);
      if (records) {
        records.forEach(async (item: any) => {
          let checkViews = await pb.collection("blogs_views").getFullList({
            filter: 'blog="' + item.id + '"',
          });
          console.log("checkViews", checkViews);
          if (checkViews && checkViews.length > 0) {
            let view = checkViews[0].view;
            view = view + 1;
            let res = await pb.collection("blogs_views").update(checkViews[0].id, {
              view: view,
            });
            console.log("res", res);
          } else {
            let res = await pb.collection("blogs_views").create({
              blog: item.id,
              view: 1,
            });
            console.log("res", res);
          }
        });
      }
    } catch (error) {
      console.log("error", error);
      ToastError.fire("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);
  useEffect(() => {
    setLangCode(getLangCode());
  }, [t]);

  console.log("blogList", blogList);
  return (
    <OtherLayout title="Blogs">
      <div className=" container max-w-7xl flex flex-col gap-12 divide-double py-6 w-full">
        <h1
          className="z-10 text-4xl font-light"
          style={{
            letterSpacing: "31.2px",
          }}
        >
          {t("blog")}
        </h1>

        <div className="flex flex-col gap-12 ">
          {blogList.length > 0 &&
            blogList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-3  text-white animate-fadeIn"
                >
                  <PbImage
                    addClass={"object-cover rounded-md mb-2" + " w-full h-fit "}
                    alt="blog image"
                    collectionName="blogs"
                    id={item?.id}
                    height={200}
                    width={1000}
                    src={item?.cardImage || item?.banner}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {langCode === "en"
                        ? item.title_en
                        : langCode === "tr"
                        ? item.title_tr
                        : item.title_ru === "ru"
                        ? item.title_ru
                        : item.title_de}
                    </h3>
                    <p className="text-sm font-normal text-white">
                      {new Date(item.created).toLocaleString("tr-TR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                        timeZone: "Europe/Istanbul",
                      })}
                    </p>
                  </div>
                  <p className="text-sm font-light text-white">
                    {langCode === "en"
                      ? item.description_en
                      : langCode === "tr"
                      ? item.description_tr
                      : item.description_ru === "ru"
                      ? item.description_ru
                      : item.description_de}
                  </p>
                  <Link
                    href={"/blog/" + item.pathName}
                    className="font-black text-base w-fit text-left hover:text-purpleDark transition-colors"
                    style={{
                      letterSpacing: "6.4px",
                    }}
                  >
                    READ MORE
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </OtherLayout>
  );
}
