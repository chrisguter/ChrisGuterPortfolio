import type { ReactNode } from "react";

/** Every section runs through here so vertical rhythm, the section index and
 *  the eyebrow label are defined once. Unlike the previous design there is no
 *  left metadata column — the label sits above the heading so headings can run
 *  full width and go large. */
export default function Band({
  id,
  index,
  label,
  heading,
  intro,
  children,
  ruled = true,
  className = "",
}: {
  id?: string;
  index?: string;
  label?: string;
  heading?: string;
  intro?: string;
  children: ReactNode;
  ruled?: boolean;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      className={`relative py-band ${ruled ? "hairline-t" : ""} ${className}`}
      aria-labelledby={heading ? headingId : undefined}
    >
      <div className="shell">
        {label ? (
          <div className="mb-8 flex items-baseline gap-4" data-rise>
            {index ? <span className="meta text-ember">{index}</span> : null}
            <span className="meta">{label}</span>
            <span
              className="hidden h-px flex-1 bg-hairline sm:block"
              data-rule
              aria-hidden="true"
            />
          </div>
        ) : null}

        {heading ? (
          <h2
            id={headingId}
            className="text-title measure-tight mb-6 text-cream"
            data-rise
          >
            {heading}
          </h2>
        ) : null}

        {intro ? (
          <p className="text-lead text-haze measure mb-14" data-rise>
            {intro}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
