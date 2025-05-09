import { brainwaveSymbol, check } from "../assets";
import { collabApps, knowledgeContent } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import { useTranslation } from "react-i18next";

const Knowledge = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">{t("knowledge.heading")}</h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {knowledgeContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{t(item.title)}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{t(item.text)}</p>
                )}
              </li>
            ))}
          </ul>
          <Button>
            <a
              href="https://github.com/ChrisGuter"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("knowledge.checkCodeButton")}
            </a>
          </Button>
        </div>
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100 lg:translate-y-[20rem]">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>
            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  } transition-transform duration-300`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      src={app.icon}
                      alt={app.title}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Knowledge;
