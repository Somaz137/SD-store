import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = path.resolve(import.meta.dirname, "../src/assets");
const OUT = path.join(ASSETS, "generated");
const PUBLIC = path.resolve(import.meta.dirname, "../public");

await mkdir(OUT, { recursive: true });

// Hero: the LCP image. Downsized variants are compressed gently (still very
// high quality); the "original" entry is a byte-for-byte copy of the source
// so the largest/highest-DPI viewers never see any quality loss at all.
const HERO_SRC = path.join(ASSETS, "hero-image.jpeg");
const HERO_WIDTHS = [800, 1200, 1600, 2200];

// Product / gifting photos are shown much smaller (product cards, half-width
// panel), so they can take noticeably more compression without a visible hit.
const PHOTO_WIDTHS = [480, 720, 960, 1280, 1920];
const PHOTOS = [
  { name: "cubical", src: path.join(ASSETS, "cubical.jpeg") },
  { name: "curved", src: path.join(ASSETS, "curved.jpeg") },
  { name: "tear-drop", src: path.join(ASSETS, "tear-drop.jpeg") },
];

async function buildHero() {
  const meta = await sharp(HERO_SRC).metadata();
  const manifest = { original: { width: meta.width } };

  await copyFile(HERO_SRC, path.join(OUT, `hero-${meta.width}.jpg`));

  for (const w of HERO_WIDTHS) {
    if (w >= meta.width) continue;
    await sharp(HERO_SRC)
      .resize({ width: w })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(OUT, `hero-${w}.jpg`));
    await sharp(HERO_SRC)
      .resize({ width: w })
      .webp({ quality: 90 })
      .toFile(path.join(OUT, `hero-${w}.webp`));
  }
  // High-quality webp at full resolution too, for browsers that prefer it.
  await sharp(HERO_SRC)
    .resize({ width: meta.width })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, `hero-${meta.width}.webp`));

  manifest.widths = [...HERO_WIDTHS.filter((w) => w < meta.width), meta.width];
  return manifest;
}

async function buildPhoto({ name, src }) {
  const meta = await sharp(src).metadata();
  const widths = PHOTO_WIDTHS.filter((w) => w < meta.width);
  widths.push(meta.width);

  for (const w of widths) {
    await sharp(src)
      .resize({ width: w })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, `${name}-${w}.jpg`));
    await sharp(src)
      .resize({ width: w })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }

  return { widths };
}

// Ink background behind the logo. Browser tabs, phone home screens, and
// link-preview cards all composite icons/thumbnails onto their own
// background (usually white), so a logo with a transparent PNG background
// loses its dark mark and shows mostly as its light bag outline. Flattening
// onto the site's ink color keeps the mark visible everywhere it's reused.
const INK_BG = "#0A0908";

async function buildLogo() {
  const src = path.join(ASSETS, "sd-logo.png");
  const height = 400;
  await sharp(src)
    .resize({ height })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT, `sd-logo-${height}.png`));
  await sharp(src)
    .resize({ height: 128 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "favicon.png"));
  await copyFile(path.join(OUT, "favicon.png"), path.join(PUBLIC, "favicon.png"));
}

async function buildSocialIcons() {
  const src = path.join(ASSETS, "sd-logo.png");

  // Flattened favicon: browser tabs render on light chrome, so the
  // transparent-background favicon can disappear into it.
  await sharp(src)
    .resize({ height: 128 })
    .flatten({ background: INK_BG })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "favicon-solid.png"));
  await copyFile(
    path.join(OUT, "favicon-solid.png"),
    path.join(PUBLIC, "favicon-solid.png"),
  );

  // Apple touch icon: iOS ignores alpha entirely and fills transparent
  // pixels with white, so this must be flattened too.
  await sharp(src)
    .resize({ height: 160 })
    .flatten({ background: INK_BG })
    .extend({
      top: 20,
      bottom: 20,
      left: 130,
      right: 130,
      background: INK_BG,
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "apple-touch-icon.png"));
  await copyFile(
    path.join(OUT, "apple-touch-icon.png"),
    path.join(PUBLIC, "apple-touch-icon.png"),
  );

  // Social share preview (og:image / twitter:image): link-preview cards on
  // WhatsApp, iMessage, Slack, etc. don't render transparency either, and
  // without an explicit og:image they fall back to the tiny favicon anyway.
  const logo = await sharp(src).resize({ height: 460 }).toBuffer();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: INK_BG,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(OUT, "og-image.jpg"));
  await copyFile(
    path.join(OUT, "og-image.jpg"),
    path.join(PUBLIC, "og-image.jpg"),
  );
}

const manifest = { hero: await buildHero() };
for (const photo of PHOTOS) {
  manifest[photo.name] = await buildPhoto(photo);
}
await buildLogo();
await buildSocialIcons();

console.log(JSON.stringify(manifest, null, 2));
