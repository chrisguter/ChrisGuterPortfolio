import { check } from "../assets";
import { expertiseList } from "../constants";
import { useTranslation } from "react-i18next";

const ExpertiseList = () => {
  const { t } = useTranslation();

  return (
    <div className="flex  gap-[1rem] max-lg:flex-wrap">
      {expertiseList.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{t(item.title)}</h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {t(item.description)}
          </p>
          <ul>
            {item.expertises.map((expertise, index) => (
              <li
                key={index}
                className="flex items-start py-4 border-t border-n-6"
              >
                {" "}
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{t(expertise)}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseList;
