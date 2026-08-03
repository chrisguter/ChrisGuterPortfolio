import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Evidence from "./components/sections/Evidence";
import Work from "./components/sections/Work";
import Now from "./components/sections/Now";
import Skills from "./components/sections/Skills";
import Timeline from "./components/sections/Timeline";
import Principles from "./components/sections/Principles";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import LegalPage from "./components/LegalPage";
import NoCookiesNotice from "./components/NoCookiesNotice";
import { useLocale } from "./lib/i18n";
import type { Route } from "./content";

export default function App({ route }: { route: Route }) {
  const { t } = useLocale();

  return (
    <div className="grain">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-surface-raised focus:px-4 focus:py-2 focus:text-cream"
      >
        {t.ui.skipToContent}
      </a>

      <Header route={route} />

      <main id="main">
        {route === "home" ? (
          <>
            <Hero />
            <Marquee />
            <Evidence />
            <Work />
            <Skills />
            <Timeline />
            <Principles />
            <Now />
            <About />
            <Contact />
          </>
        ) : (
          <LegalPage page={route === "imprint" ? t.legal.imprint : t.legal.privacy} />
        )}
      </main>

      <Footer />
      <NoCookiesNotice />
    </div>
  );
}
