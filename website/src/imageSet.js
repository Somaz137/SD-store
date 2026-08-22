// Auto-discovers the width-variant files produced by scripts/generate-images.mjs
// (e.g. "hero-800.jpg", "cubical-1920.webp") and turns them into srcset strings.
const files = import.meta.glob("./assets/generated/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const byName = {};
for (const [filePath, url] of Object.entries(files)) {
  byName[filePath.split("/").pop()] = url;
}

function variants(prefix, ext) {
  const re = new RegExp(`^${prefix}-(\\d+)\\.${ext}$`);
  return Object.entries(byName)
    .map(([name, url]) => {
      const m = name.match(re);
      return m ? { width: Number(m[1]), url } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.width - b.width);
}

export function imageSet(prefix) {
  const jpg = variants(prefix, "jpg");
  const webp = variants(prefix, "webp");
  const toSrcset = (list) => list.map((v) => `${v.url} ${v.width}w`).join(", ");
  return {
    jpgSrcSet: toSrcset(jpg),
    webpSrcSet: toSrcset(webp),
    fallback: jpg[jpg.length - 1]?.url,
  };
}
