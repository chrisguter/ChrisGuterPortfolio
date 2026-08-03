import { flushSync } from "react-dom";

/** Runs the state change inside a view transition where the browser has one,
 *  so expanding panels animate to their new positions rather than jumping.
 *  `flushSync` is what makes React commit before the browser takes its "after"
 *  snapshot, and `.call` is needed because the method is bound to the document.
 *
 *  Extracted because Work and Now both need it, and a duplicated copy is how a
 *  reduced-motion or flushSync fix ends up applied to only one of them. */
export function withViewTransition(update: () => void): void {
  const doc: Partial<Pick<Document, "startViewTransition">> | undefined =
    typeof document === "undefined" ? undefined : document;
  const start = doc?.startViewTransition;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!start || reduced) {
    update();
    return;
  }

  start.call(document, () => flushSync(update));
}
