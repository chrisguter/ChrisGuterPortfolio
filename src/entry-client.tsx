import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { LocaleProvider } from "./lib/i18n";
import { localeFromPath, routeFromPath } from "./content";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "./styles/index.css";

const { pathname } = window.location;
const root = document.getElementById("root");

if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <LocaleProvider locale={localeFromPath(pathname)}>
        <App route={routeFromPath(pathname)} />
      </LocaleProvider>
    </StrictMode>,
  );
}
