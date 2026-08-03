/** The order the bands appear in on the home page.
 *
 *  The section index used to be a hardcoded string in each component, which
 *  drifted: Skills and Timeline both rendered "03" while Evidence and Work
 *  rendered nothing. Deriving it from one ordered list means reordering or
 *  inserting a section renumbers everything automatically, and a typo becomes a
 *  compile error rather than a duplicate on the page. */
export const SECTION_ORDER = [
  "evidence",
  "work",
  "skills",
  "timeline",
  "principles",
  "now",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

export function sectionIndex(id: SectionId): string {
  return String(SECTION_ORDER.indexOf(id) + 1).padStart(2, "0");
}
