import Heading from "./Heading";
import Section from "./Section";
import { socials } from "../constants";

const Contact = () => {
  return (
    <Section className="overflow-hidden" id="contact" crosses>
      <Heading tag="Contact" title="Let's connect"></Heading>

      <div className="flex flex-col items-center mb-10">
        <ul className="flex flex-col items-center gap-6">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center gap-4 w-auto h-14 bg-n-7 rounded-full px-6 transition-colors hover:bg-n-6"
            >
              <img
                src={item.iconUrl}
                width={48}
                height={48}
                alt={item.title}
                className="object-contain"
              />
              <span className="text-white text-lg font-semibold">
                {item.title}
              </span>
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Contact;
