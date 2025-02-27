import { ToastError } from "@/components/alert/SweatAlert";
import PbFile from "@/components/pbImage";
import OtherLayout from "@/layout/otherLayout";
import pb from "@/lib/pocketbase";
import { setLoading } from "@/redux/auth/auth";
import { useRouter } from "next/router";
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
  banner_img: string;
  banner_video: string;
  cardImage: string;
  category: string[];
  isActive: boolean;
  pathName: string;
  created: string;
}

export default function BlogDetails() {
  const router = useRouter();
  const { path } = router.query;
  const [blog, setBlog] = useState<IBlog | any>(null);
  const [view, setView] = useState(0);
  const [langCode, setLangCode] = useState("en"); // ["en", "tr", "ru"
  const getLangCode = () => {
    const langCode = localStorage.getItem("i18nextLng") || "en";
    return langCode;
  };
  const { t } = useTranslation();

  const dispatch = useDispatch();
  async function getBlog() {
    if (!path) return;
    dispatch(setLoading(true));
    try {
      const record: any = await pb
        .collection("blogs")
        .getFirstListItem(`pathName="${path}"`);
      console.log("record", record);
      setBlog(record || {});
      if (record) {
        let checkViews = await pb
          .collection("blogs_views")
          .getFirstListItem(`blog="${record.id}"`);
        console.log("checkViews", checkViews);
        if (checkViews) {
          let view = checkViews.view;
          view = view + 1;
          let res = await pb.collection("blogs_views").update(checkViews.id, {
            view: view,
          });
          setView(view);
          console.log("res", res);
        } else {
          let res = await pb.collection("blogs_views").create({
            blog: record.id,
            view: 1,
          });
          setView(1);
          console.log("res", res);
        }
      }
    } catch (error) {
      console.log("error", error);
      ToastError.fire("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getBlog();
  }, [path]);

  useEffect(() => {
    setLangCode(getLangCode());
  }, [t]);

  return (
    <OtherLayout title="Blog Details">
      <div className=" container max-w-7xl flex flex-col gap-8 divide-double py-6 w-full">
        {blog && (
          <>
            <div className="w-full flex justify-center animate-fadeIn ">
              <PbFile
                addClass={
                  "object-cover rounded-md mb-2" + " w-full max-w-5xl h-fit "
                }
                alt="blog image"
                collectionName="blogs"
                id={blog?.id}
                height={200}
                width={1000}
                src={blog?.banner_video}
              />
            </div>
            <div className="flex justify-between w-full items-center animate-fadeIn">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">
                  {blog?.[`title_${langCode}`]}
                </h3>
                <p className="text-sm font-normal text-white">
                  {new Date(blog?.created).toLocaleString("tr-TR", {
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
              <div className="text-sm font-semibold text-white animate-fadeIn">
                {view} {t("views")}
              </div>
            </div>
            <div className="animate-fadeIn"
              dangerouslySetInnerHTML={{
                //@ts-ignore
                __html: blog?.[`description_${langCode}`] || "",
              }}
            ></div>
          </>
        )}
      </div>
    </OtherLayout>
  );
}
