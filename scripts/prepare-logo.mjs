// Derives web assets from the official CLANNOVA logo without redrawing it.
// Usage: node scripts/prepare-logo.mjs
import sharp from "sharp";

const SRC = "assets-src/clannova-logo-source.png";
const OUT = "public/assets";

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// The backdrop has a vignette, so estimate it locally: block-minimum (removes the
// artwork, whose strokes are narrower than the window) followed by a blur.
const B = 8, bw = Math.ceil(W / B), bh = Math.ceil(H / B);
const mins = new Float32Array(bw * bh * 3).fill(255);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4, j = (Math.floor(y / B) * bw + Math.floor(x / B)) * 3;
  const lum = data[i] + data[i + 1] + data[i + 2];
  if (lum < mins[j] + mins[j + 1] + mins[j + 2]) { mins[j] = data[i]; mins[j + 1] = data[i + 1]; mins[j + 2] = data[i + 2]; }
}
const R = 10; // ~170px window
const eroded = new Float32Array(mins.length);
for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
  let best = 1e9, k = 0;
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const yy = y + dy, xx = x + dx;
    if (yy < 0 || xx < 0 || yy >= bh || xx >= bw) continue;
    const j = (yy * bw + xx) * 3, l = mins[j] + mins[j + 1] + mins[j + 2];
    if (l < best) { best = l; k = j; }
  }
  const o = (y * bw + x) * 3;
  eroded[o] = mins[k]; eroded[o + 1] = mins[k + 1]; eroded[o + 2] = mins[k + 2];
}
const bgMap = await sharp(Buffer.from(Uint8Array.from(eroded, Math.round)), { raw: { width: bw, height: bh, channels: 3 } })
  .blur(6).resize(W, H, { kernel: "cubic" }).raw().toBuffer();

// Colour-to-alpha: smallest alpha that explains each pixel over its local backdrop.
const out = Buffer.alloc(data.length);
for (let p = 0; p < W * H; p++) {
  const i = p * 4, q = p * 3;
  let a = 0;
  for (let c = 0; c < 3; c++) {
    const v = data[i + c], b = Math.min(bgMap[q + c], 254);
    a = Math.max(a, v > b ? (v - b) / (255 - b) : 0);
  }
  // Fade out residual backdrop noise while keeping the artwork's glow.
  const t = Math.min(1, Math.max(0, (a - 0.04) / 0.1));
  const fa = a * t * t * (3 - 2 * t);
  for (let c = 0; c < 3; c++) {
    const b = Math.min(bgMap[q + c], 254);
    out[i + c] = a ? Math.max(0, Math.min(255, Math.round((data[i + c] - (1 - a) * b) / a))) : 0;
  }
  out[i + 3] = Math.round(fa * 255);
}
const transparent = sharp(out, { raw: { width: W, height: H, channels: 4 } });

const crop = (left, top, width, height) => transparent.clone().extract({ left, top, width, height });

// Full lockup (icon + wordmark + tagline), trimmed to content with breathing room.
await crop(280, 130, 976, 690).png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 }).toFile(`${OUT}/clannova-logo.png`);
// Icon only: hexagon, C and arrow.
await crop(522, 138, 490, 490).resize(512, 512).png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 }).toFile(`${OUT}/clannova-icon.png`);
// Wordmark only, for the horizontal nav lockup.
await crop(296, 630, 944, 116).png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 }).toFile(`${OUT}/clannova-wordmark.png`);

// App icons on the brand backdrop.
const iconBuf = await sharp(`${OUT}/clannova-icon.png`).resize(Math.round(512 * 0.86)).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#080D19" } })
  .composite([{ input: iconBuf, gravity: "center" }]).png().toFile("src/app/icon.png");
await sharp("src/app/icon.png").resize(180, 180).png().toFile("src/app/apple-icon.png");

// Open Graph card: original artwork contained on the brand backdrop.
const og = await sharp(SRC).resize({ height: 630 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: { r: 6, g: 9, b: 24 } } })
  .composite([{ input: og, gravity: "center" }]).jpeg({ quality: 88 }).toFile("src/app/opengraph-image.jpg");

console.log("done");
