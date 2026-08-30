// Best-effort background removal for logo uploads: fades near-white pixels
// to transparent so a flattened/non-alpha image (a JPG, or a PNG exported
// without keeping its alpha channel) still sits cleanly on a colored
// background instead of showing a white box.
//
// This is a flat per-pixel threshold, not a flood-fill from the edges — it
// can't tell "background" from "a genuinely white detail inside the image"
// (white text, a white highlight), so it will fade those too. Good enough
// for marks/logos/badges; never applied to real photos (see the
// `stripWhiteBg` prop on LogoSlot, off by default).
const LOWER = 222;
const UPPER = 250;

export function stripWhiteBackground(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const whiteness = (d[i] + d[i + 1] + d[i + 2]) / 3;
          if (whiteness >= UPPER) {
            d[i + 3] = 0;
          } else if (whiteness > LOWER) {
            const t = (whiteness - LOWER) / (UPPER - LOWER);
            d[i + 3] = Math.round(d[i + 3] * (1 - t));
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
