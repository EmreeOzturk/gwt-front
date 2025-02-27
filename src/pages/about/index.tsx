import OtherLayout from "@/layout/otherLayout";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <OtherLayout title="about">
      <div className=" max-w-7xl flex flex-col gap-10 divide-double py-6">
        <h1
          className="z-10 text-4xl font-light"
          style={{
            letterSpacing: "31.2px",
          }}
        >
          {t("what_is_one4global")?.toUpperCase()}
        </h1>
        <Row>
          <h3>{t("vizyon")}</h3>
          <p>"{t("vizyontext")}"</p>
        </Row>
        <Hr />
        <Row>
          <h3>{t("misyon")}</h3>
          <p>"{t("misyontext.part1")}"</p>
          <p>{t("misyontext.part2")}</p>
        </Row>
        <Hr />
        <Row>
          <h3>{t("community_values")}</h3>
          <ol className="list-decimal pl-6 flex flex-col gap-6 font-bold">
            {degerler.map((item) => (
              <>
                <li>
                  <h4 className="font-bold">{t(item?.title.toString())}</h4>
                </li>
                <p className="!font-light">{t(item?.description.toString())}</p>
              </>
            ))}
          </ol>
        </Row>
      </div>
    </OtherLayout>
  );
}

function Hr() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      viewBox="0 0 1230 2"
      fill="none"
    >
      <path d="M0 1H1230" stroke="#4D4D4D" stroke-dasharray="8 8" />
    </svg>
  );
}

function Row({ children }: any) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

const degerler = [
  {
    title: "decentralization_and_inclusivity.title",
    description: "decentralization_and_inclusivity.content",
  },
  {
    title: "financial_freedom_as_a_right.title",
    description: "financial_freedom_as_a_right.content",
  },
  {
    title: "continuous_learning_and_skilldevelopment.title",
    description: "continuous_learning_and_skilldevelopment.content",
  },
  {
    title: "innovation_and_technological_progress.title",
    description: "innovation_and_technological_progress.content",
  },
  {
    title: "collaboration_and_mutual_support.title",
    description: "collaboration_and_mutual_support.content",
  },
  {
    title: "sustainable_growth.title",
    description: "sustainable_growth.content",
  },
  {
    title: "environmental_and_social_responsibility.title",
    description: "environmental_and_social_responsibility.content",
  },
  {
    title: "empowerment_through_ownership.title",
    description: "empowerment_through_ownership.content",
  },
  {
    title: "resilience_and_adaptability.title",
    description: "resilience_and_adaptability.content",
  },
];
