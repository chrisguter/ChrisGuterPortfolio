import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

// pathToFileURL, not a bare path: Node's ESM loader rejects Windows drive
// letters ("Received protocol 'e:'") and requires a file:// URL.
const { render, LOCALES, ROUTES } = await import(
  pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href
);

const template = await readFile(resolve(dist, "index.html"), "utf8");

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const { html, head, path } = render(locale, route);

    const page = template
      .replace('<html lang="en">', `<html lang="${locale}">`)
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html);

    // "/de/imprint/" -> dist/de/imprint/index.html
    const outFile = resolve(dist, `.${path}`, "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, page, "utf8");
    console.log(
      `prerendered  ${path.padEnd(16)} ${(page.length / 1024).toFixed(1)} kB`,
    );
  }
}

// GitHub Pages serves 404.html for unknown paths. Pointing it at the English
// home document means a mistyped URL lands on the site rather than on Pages'
// default 404, without needing a client-side router.
await writeFile(
  resolve(dist, "404.html"),
  await readFile(resolve(dist, "index.html"), "utf8"),
  "utf8",
);
console.log("prerendered  404              -> english home");
