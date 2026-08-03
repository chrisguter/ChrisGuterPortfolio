import { useEffect, useRef, useState } from "react";
import { pathFor } from "@/content";
import { useLocale } from "@/lib/i18n";

/** The inverse of a consent banner: a brief note that there is nothing to
 *  consent to.
 *
 *  Deliberately stores no dismissal flag — the privacy page truthfully claims
 *  this site uses no cookies and no storage, and a "seen it" flag would make
 *  that claim false. So the notice appears on each visit, waits a beat, says
 *  its line, and leaves on its own if it is not dismissed first.
 *
 *  Server-rendered as nothing (visible starts false), so hydration matches;
 *  it enters only after mount and never steals focus. */
const ENTER_DELAY_MS = 1500;
const LINGER_MS = 9000;
/** Once someone has engaged with the notice, its exit is on their terms: a
 *  shorter timer restarts only after pointer and focus have both left. Without
 *  this, auto-dismiss could rip the notice away while a keyboard user is ON
 *  the Details link, dropping their focus to <body>. */
const LINGER_AFTER_INTERACTION_MS = 4000;

export default function NoCookiesNotice() {
  const { locale, t } = useLocale();
  const [visible, setVisible] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), ENTER_DELAY_MS);
    leaveTimer.current = setTimeout(
      () => setVisible(false),
      ENTER_DELAY_MS + LINGER_MS,
    );
    return () => {
      clearTimeout(enter);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  function holdOpen() {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = null;
  }

  /* Mouse-leave and blur both carry relatedTarget; the structural type admits
     either without a cast. */
  function releaseHold(event: {
    currentTarget: HTMLElement;
    relatedTarget: EventTarget | null;
  }) {
    /* Focus moving between children fires blur too — only restart the clock
       when focus (or the pointer) has genuinely left the notice. */
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(
      () => setVisible(false),
      LINGER_AFTER_INTERACTION_MS,
    );
  }

  if (!visible) return null;

  return (
    <aside
      role="status"
      onMouseEnter={holdOpen}
      onMouseLeave={releaseHold}
      onFocus={holdOpen}
      onBlur={releaseHold}
      className="notice-pop border-hairline-strong bg-surface/95 fixed bottom-4 left-4 z-[55] flex max-w-[calc(100vw-2rem)] items-center gap-4 border px-4 py-3 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:max-w-sm"
    >
      <span aria-hidden="true" className="bg-ember size-1.5 shrink-0 rounded-full" />
      <p className="meta !normal-case">
        {t.ui.notice}{" "}
        <a href={pathFor(locale, "privacy")} className="link-ember">
          {t.ui.noticeDetails}
        </a>
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="text-haze hover:text-cream -mr-1 shrink-0 p-1 font-mono text-sm transition-colors duration-200"
      >
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{t.ui.close}</span>
      </button>
    </aside>
  );
}
