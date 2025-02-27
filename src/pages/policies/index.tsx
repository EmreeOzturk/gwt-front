import { ToastError } from "@/components/alert/SweatAlert";
import { useAppDispatch } from "@/hook/redux/hooks";
import OtherLayout from "@/layout/otherLayout";
import pb from "@/lib/pocketbase";
import { setLoading } from "@/redux/auth/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Policies() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [langCode, setLangCode] = useState("en"); // ["en", "tr", "ru"
  const getLangCode = () => {
    const langCode = localStorage.getItem("i18nextLng") || "en";
    return langCode;
  };
  useEffect(() => {
    setLangCode(getLangCode());
  }, [t]);
  async function getPolicies() {
    dispatch(setLoading(true));
    try {
      let res: any = await pb.collection("policies").getFullList();
      setData(res);
      setSelected(res[0].id);
    } catch (error) {
      console.log("error", error);
      ToastError.fire({
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    getPolicies();
  }, []);
  const description =
    data.length > 0 && data.find((item) => item.id === selected);
  console.log("description", description);

  return (
    <OtherLayout title="policies">
      <div className=" container max-w-7xl flex flex-col gap-20 divide-double py-6 w-full">
        <h1
          className="z-10 text-4xl font-light"
          style={{
            letterSpacing: "31.2px",
          }}
        >
          {t("policies")}
        </h1>
        <div className="flex gap-6 2xl:gap-10">
          <ul className="flex flex-col gap-4 items-start w-fit shrink-0">
            {data.length > 0 &&
              data.map((item) => (
                <li
                  key={item.id}
                  className={`cursor-pointer shrink-0 ${
                    selected === item.id ? "text-purpleDark font-bold pl-6" : ""
                  }`}
                  onClick={() => setSelected(item.id)}
                >
                  {langCode === "en"
                    ? item.title_en
                    : langCode === "tr"
                    ? item.title_tr
                    : langCode === "ru" ? item.title_ru
                    : item.title_de
                  }
                </li>
              ))}
          </ul>
          <div className="col-span-2 w-full">
            <p
              key={description?.id}
              className="font-light animate-fadeIn"
              dangerouslySetInnerHTML={{
                __html:
                  langCode === "en"
                    ? description?.description_en
                    : langCode === "tr"
                    ? description?.description_tr
                    : langCode === "ru" ? description?.description_ru : description?.description_de
              }}
            ></p>
          </div>
        </div>
      </div>
    </OtherLayout>
  );
}
