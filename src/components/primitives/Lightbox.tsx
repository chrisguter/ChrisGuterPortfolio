import { useCallback, useEffect, useRef } from "react";

export interface LightboxImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
}

/** Fullscreen image viewer on the native <dialog> element.
 *
 *  showModal() buys the hard parts outright: top-layer rendering above every
 *  stacking context, focus trapped inside, Escape closing, and a ::backdrop
 *  pseudo-element the stylesheet blurs. What it does not guarantee everywhere
 *  is focus RETURN — so the opener is restored explicitly on close, matching
 *  the gallery pattern in the owner's own dm-assessment code. */
export default function Lightbox({
  image,
  opener,
  closeLabel,
  onClose,
}: {
  image: LightboxImage | null;
  /** The element that opened the viewer, passed explicitly by the caller.
   *  Sniffing document.activeElement here fails in Safari, which does not
   *  focus a button on mouse click — the active element would be <body> and
   *  focus return would silently go nowhere. */
  opener?: HTMLElement | null;
  closeLabel: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) {
      openerRef.current =
        opener ??
        (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      dialog.showModal();
    } else if (!image && dialog.open) {
      dialog.close();
    }
  }, [image, opener]);

  /* `close` fires for every path out — Escape, backdrop, the button — so the
     focus restore and the state reset live in one place. */
  const handleClose = useCallback(() => {
    openerRef.current?.focus();
    openerRef.current = null;
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(event) => {
        /* A click on the dialog element itself is a click on the backdrop:
           the content area is entirely covered by the figure. */
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      /* overflow-visible overrides the UA's `dialog { overflow: auto }`, which
         turns even sub-pixel rounding at fractional display scaling into a
         visible scrollbar. Nothing here can genuinely overflow — the image is
         viewport-capped and the close button sits inside the dialog box. */
      className="lightbox m-auto max-h-[92svh] max-w-[92vw] overflow-visible bg-transparent p-0 backdrop:bg-void/60 backdrop:backdrop-blur-md"
      aria-label={image?.alt}
    >
      {image ? (
        /* pt-12 reserves a row for the close button above the image: inside
           the dialog box (so it can never clip offscreen or grow scrollbars),
           outside the picture (so it never covers what was clicked to see). */
        <figure className="relative pt-12">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="border-hairline-strong max-h-[85svh] w-auto max-w-full border bg-surface-raised object-contain"
          />
          {image.caption ? (
            <figcaption className="meta mt-3 text-center">{image.caption}</figcaption>
          ) : null}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="border-hairline-strong bg-void/80 text-cream hover:border-ember hover:text-ember absolute top-0 right-0 flex size-10 items-center justify-center border font-mono text-lg transition-colors duration-200"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">{closeLabel}</span>
          </button>
        </figure>
      ) : null}
    </dialog>
  );
}
