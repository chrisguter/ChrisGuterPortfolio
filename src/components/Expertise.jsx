import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import ExpertiseList from "./ExpertiseList";
import Section from "./Section";
import { LeftLine, RightLine } from "./design/Pricing";
import { useTranslation } from "react-i18next";

const Expertise = () => {
  const { t } = useTranslation();

  return (
    <Section className="overflow-hidden" id="expertise" crosses>
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>
        <Heading
          tag={t("expertise.tag")}
          title={t("expertise.heading")}
        ></Heading>
        <div className="relative">
          <ExpertiseList></ExpertiseList>
          <LeftLine></LeftLine>
          <RightLine></RightLine>
        </div>
      </div>
    </Section>
  );
};

export default Expertise;
