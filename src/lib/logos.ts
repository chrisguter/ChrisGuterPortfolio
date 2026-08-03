/// <reference types="vite/client" />
import cas from "@/assets/clients/cas.webp";
import bioland from "@/assets/clients/bioland.webp";
import daimler from "@/assets/clients/daimler.webp";
import dbe from "@/assets/clients/dbe.webp";
import datev from "@/assets/clients/datev.webp";
import kit from "@/assets/clients/kit.webp";
import tumbletree from "@/assets/work/tumbletree-logo.webp";

export interface LogoAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/** Third-party marks, keyed the way the content files reference them.
 *
 *  All of these are white-on-transparent and sit on the void ground unaltered,
 *  which is why they need no per-logo colour handling. Intrinsic dimensions
 *  live here rather than in the content: they belong to the file, and they are
 *  what stops the rows reflowing as the images decode.
 *
 *  These identify who work was done for and what he plays — nominative use, not
 *  decoration. Each is rendered with its owner's name as the accessible name so
 *  the association is stated rather than implied. */
export const LOGOS: Record<string, LogoAsset> = {
  cas: { src: cas, width: 206, height: 244 },
  bioland: { src: bioland, width: 320, height: 100 },
  daimler: { src: daimler, width: 320, height: 158 },
  dbe: { src: dbe, width: 268, height: 188 },
  datev: { src: datev, width: 204, height: 192 },
  kit: { src: kit, width: 480, height: 240 },
  tumbletree: { src: tumbletree, width: 480, height: 480 },
};

export function logo(key: string | undefined): LogoAsset | undefined {
  return key ? LOGOS[key] : undefined;
}
