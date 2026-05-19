import { copyFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const assetsDir = path.join(clientDir, "assets");
const base = normalizeBase(process.env.VITE_BASE_PATH || "/Lucerna/");

const files = await readdir(assetsDir);
const jsFiles = files.filter((file) => file.endsWith(".js"));
const cssFile = files.find((file) => file.startsWith("styles-") && file.endsWith(".css"));

let entryFile;
for (const file of jsFiles) {
  const contents = await import("node:fs/promises").then((fs) =>
    fs.readFile(path.join(assetsDir, file), "utf8"),
  );
  if (contents.includes("hydrateRoot(document")) {
    entryFile = file;
    break;
  }
}

if (!entryFile) {
  throw new Error("Could not find the client entry bundle in dist/client/assets.");
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0d0d0d" />
    <meta name="description" content="Daily Mass readings, Catholic prayers, and the liturgical year." />
    <title>Lucerna — Catholic Prayer & Daily Readings</title>
    <link rel="icon" href="${base}icon.svg" />
    <link rel="manifest" href="${base}manifest.json" />
    ${cssFile ? `<link rel="stylesheet" href="${base}assets/${cssFile}" />` : ""}
    <script type="module" src="${base}assets/${entryFile}"></script>
  </head>
  <body></body>
</html>
`;

await writeFile(path.join(clientDir, "index.html"), html);
await copyFile(path.join(clientDir, "index.html"), path.join(clientDir, "404.html"));
await writeFile(path.join(clientDir, ".nojekyll"), "");

function normalizeBase(value) {
  const withLeading = value.startsWith("/") ? value : `/${value}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}
