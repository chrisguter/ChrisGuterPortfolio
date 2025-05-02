import Section from "./Section";
import Heading from "./Heading";
import {
  service1,
  service2,
  service3,
  check,
  mali,
  storch,
  gaming,
} from "../assets";
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import {
  MaliMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

import Generating from "./Generating";

const About = () => {
  return (
    <Section id="about" crosses>
      <div className="container">
        <Heading title="A glimpse into my private life" tag="About" />

        <div className="relative">
          <div className="relative z-1 flex flex-col md:flex-row items-center h-auto mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden md:p-20 xl:h-[46rem]">
            <div className="relative z-1 max-w-[17rem]">
              <h4 className="h4 mb-4">Dog training</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Regular training and hiking sessions with my dog Mali.
              </p>

              {/* Image for small screens */}
              <div className="block md:hidden mb-4">
                <img
                  className="w-full h-auto object-cover"
                  width={1024}
                  alt="Mali"
                  height={1536}
                  src={mali}
                />
              </div>

              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image for medium and larger screens */}
            <div className="hidden md:block w-full md:w-3/5">
              <img
                className="w-full h-auto object-cover md:object-right"
                width={1024}
                alt="Mali"
                height={1536}
                src={mali}
              />
            </div>
            <MaliMessage />
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2 ">
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={storch}
                  className="h-full w-full object-cover"
                  width={1024}
                  height={1536}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">Family Time</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  In April our first child was born. So spending a lot of time
                  with my doughter is a top priority.
                </p>
              </div>
            </div>

            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Gaming is my passion</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Competitve gaming is my biggest hobby. I love to challenge
                  myself and constently improving my skills.
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img src={item} width={24} height={24} alt={item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-14 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={gaming}
                  className="w-full h-full object-contain"
                  width={520}
                  height={400}
                  alt="gaming"
                />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default About;
