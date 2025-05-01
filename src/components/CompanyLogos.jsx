import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping to create beautiful software for companies like
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img
              src={logo.img}
              width={logo.width}
              height={logo.height}
              alt={logo.img}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
