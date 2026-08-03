import { useCallback, useEffect, useRef, useState } from "react";
import { LOCALES, pathFor, type Route } from "@/content";
import { useLocale } from "@/lib/i18n";

const FOCUSABLE = "a[href], button:not([disabled])";
const DESKTOP_QUERY = "(width >= 64rem)";

export default function Header({ route }: { route: Route }) {
  const { locale, t } = useLocale();
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  /* Narrow screens carry the mark rather than the full name. Derived instead of
     hardcoded so the German document cannot drift from the English one. */
  const initials = t.hero.name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("");

  /* Every path is derived from the `route` prop, never from `window.location`:
     the documents are prerendered, so a location read would either crash the
     server render or disagree with it on hydration. */
  const homePath = pathFor(locale);
  const isHome = route === "home";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `${homePath}#${id}`);

  /* Active section. The callback only ever receives entries whose intersection
     CHANGED, so the last ratio of every section is kept in a map — reading only
     `entries` loses track of sections that stopped reporting, which is how a fast
     scroll ends up highlighting the wrong item. */
  useEffect(() => {
    // A legal page has none of these sections; the observer stays unbuilt.
    if (!isHome) return;

    const sections = t.nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const offset = headerRef.current?.getBoundingClientRect().height ?? 0;
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // Between two sections nothing is intersecting; keep the last answer
        // rather than blanking the nav.
        if (bestId !== "") setActiveId(bestId);
      },
      {
        rootMargin: `-${offset}px 0px 0px 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [t.nav, isHome]);

  /* While the disclosure is open the header IS the modal surface: it covers the
     viewport, so the trap spans the whole element and every visible control —
     wordmark, nav, language, trigger — stays reachable. */
  useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "clip";

    const focusable = () =>
      Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );

    panelRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      if (!header.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Crossing into the desktop layout hides the panel; leaving the scroll lock
    // on would silently freeze the page.
    const desktop = matchMedia(DESKTOP_QUERY);
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      root.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  return (
    /* No scroll-padding compensation is needed for the hash links: the base
       stylesheet gives every `section[id]` a 5rem scroll margin, which already
       clears this 3.5rem bar. */
    <header
      ref={headerRef}
      className={
        menuOpen
          ? "fixed inset-0 z-40 flex flex-col bg-void"
          : "fixed inset-x-0 top-0 z-40 bg-void/80 backdrop-blur-xl"
      }
    >
      <div className="hairline-b shrink-0">
        <div className="shell flex h-14 items-center gap-6">
          <a
            href={homePath}
            aria-label={t.hero.name}
            className="group flex shrink-0 items-center gap-2.5 font-mono text-meta uppercase transition-colors"
          >
            <span
              aria-hidden="true"
              className="pulse size-1.5 shrink-0 rounded-full bg-ember shadow-[0_0_10px_var(--ember)]"
            />
            <span
              aria-hidden="true"
              className="text-cream transition-colors group-hover:text-ember sm:hidden"
            >
              {initials}
            </span>
            <span
              aria-hidden="true"
              className="hidden text-cream transition-colors group-hover:text-ember sm:inline"
            >
              {t.hero.name}
            </span>
          </a>

          <nav aria-label={t.ui.menu} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8">
              {t.nav.map((item) => {
                const current = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={sectionHref(item.id)}
                      aria-current={current ? "true" : undefined}
                      className={`group relative block py-1 font-mono text-meta uppercase transition-colors ${
                        current ? "glow-ember text-ember" : "text-haze hover:text-cream"
                      }`}
                    >
                      {item.label}
                      {/* Shape, not just hue: the rule is the state cue and the
                          colour is only reinforcement. */}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-200 ease-[var(--ease-out)] ${
                          current
                            ? "scale-x-100 bg-ember"
                            : "scale-x-0 bg-hairline-strong group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            role="group"
            aria-label={t.ui.languageLabel}
            className="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0 lg:border-l lg:border-hairline lg:pl-6"
          >
            {LOCALES.map((code, index) => (
              <span key={code} className="flex items-center gap-2.5">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
                ) : null}
                <a
                  href={pathFor(code, route)}
                  hrefLang={code}
                  aria-current={code === locale ? "true" : undefined}
                  className={`font-mono text-meta uppercase transition-colors ${
                    code === locale
                      ? "border-b border-ember pb-px text-ember"
                      : "text-haze hover:text-cream"
                  }`}
                >
                  {code}
                </a>
              </span>
            ))}
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="-m-2 flex shrink-0 items-center gap-2.5 p-2 font-mono text-meta text-cream uppercase transition-colors hover:text-ember lg:hidden"
          >
            <MenuGlyph open={menuOpen} />
            {menuOpen ? t.ui.close : t.ui.menu}
          </button>
        </div>
      </div>

      {/* Below lg the menu is the whole screen: full-bleed void, an aurora field
          behind it, and the sections set at display scale. */}
      <div
        id="site-menu"
        ref={panelRef}
        className={
          menuOpen
            ? "relative flex flex-1 flex-col overflow-y-auto overscroll-contain lg:hidden"
            : "hidden"
        }
      >
        <span
          aria-hidden="true"
          className="aurora pointer-events-none absolute inset-0 isolate overflow-hidden opacity-40"
        />

        <nav
          aria-label={t.ui.menu}
          className="shell relative flex flex-1 flex-col py-10"
        >
          {/* `my-auto` rather than `justify-center`: auto margins collapse to
              zero when the list outgrows a short viewport, so the first item can
              never end up scrolled off the top. */}
          <ul className="my-auto w-full">
            {t.nav.map((item, index) => {
              const current = item.id === activeId;
              return (
                <li
                  key={item.id}
                  className="hairline-b relative animate-[halo-rise_var(--dur-enter)_var(--ease-out)_both]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {current ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-3 -left-3 w-0.5 bg-ember"
                    />
                  ) : null}
                  <a
                    href={sectionHref(item.id)}
                    onClick={closeMenu}
                    aria-current={current ? "true" : undefined}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span
                      className={`w-6 shrink-0 font-mono text-meta uppercase tabular-nums ${
                        current ? "text-ember" : "text-haze"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-title sm:text-display ${
                        current ? "glow-ember text-ember" : "text-cream"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shell hairline-t relative flex flex-wrap items-center gap-x-6 gap-y-2 py-6">
          <p className="meta">{t.hero.location}</p>
          <p className="meta">{t.hero.tagline}</p>
        </div>
      </div>
    </header>
  );
}

/** Two rules that cross. Both bars sit on the centre line and are offset from it
 *  when closed, so open and closed differ by transform alone and the state can
 *  animate without a layout pass. */
function MenuGlyph({ open }: { open: boolean }) {
  const bar =
    "absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-200 ease-[var(--ease-out)]";

  return (
    <span aria-hidden="true" className="relative block size-3.5">
      <span
        className={`${bar} ${
          open ? "translate-y-[-50%] rotate-45" : "translate-y-[calc(-50%_-_3px)]"
        }`}
      />
      <span
        className={`${bar} ${
          open ? "translate-y-[-50%] -rotate-45" : "translate-y-[calc(-50%_+_3px)]"
        }`}
      />
    </span>
  );
}
