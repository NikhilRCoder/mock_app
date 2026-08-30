import { useEffect, useRef } from "react";
import { useLogo } from "../useLogo";

// Invisible — applies the uploaded "appIcon" image (if any) to the browser
// tab favicon, the iOS "Add to Home Screen" icon, and (best effort, mainly
// Chromium) the PWA install icon via a rewritten manifest. No visual output.
export default function AppIconManager() {
  const { url } = useLogo("appIcon");
  const manifestBlobUrl = useRef(null);

  useEffect(() => {
    if (!url) return;

    const iconLink = document.querySelector('link[rel="icon"]');
    if (iconLink) iconLink.href = url;

    const appleLink = document.querySelector('link[rel="apple-touch-icon"]');
    if (appleLink) appleLink.href = url;

    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}manifest.webmanifest`)
      .then((r) => r.json())
      .then((manifest) => {
        if (cancelled) return;
        const updated = { ...manifest, icons: manifest.icons.map((icon) => ({ ...icon, src: url })) };
        const blob = new Blob([JSON.stringify(updated)], { type: "application/manifest+json" });
        const nextUrl = URL.createObjectURL(blob);
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) manifestLink.href = nextUrl;
        if (manifestBlobUrl.current) URL.revokeObjectURL(manifestBlobUrl.current);
        manifestBlobUrl.current = nextUrl;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  return null;
}
