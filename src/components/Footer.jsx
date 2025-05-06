import { footerLinks } from "../constants";
import Section from "./Section";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {footerLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center gap-3 w-auto h-10 bg-n-7 rounded-full px-4 transition-colors hover:bg-n-6"
            >
              <span className="text-white text-sm font-medium">
                {item.title}
              </span>
              <img
                src={item.iconUrl}
                width={32}
                height={32}
                alt={item.title}
                className="object-contain"
              />
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
