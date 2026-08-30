import { useCallback, useEffect, useState } from "react";
import { clearLogo, getLogo, readFileAsDataURL, setLogo } from "./logoStorage";
import { stripWhiteBackground } from "./imageProcessing";

// Most slots only ever have one LogoSlot mounted at a time (single-screen
// app), so each hook instance fetching independently was fine. AppIconManager
// broke that assumption — it's always mounted alongside whichever screen's
// LogoSlot might also be watching the same key — so instances now broadcast
// to each other on upload/clear instead of only updating their own state.
const subscribers = new Map();

function subscribe(key, cb) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(cb);
  return () => subscribers.get(key)?.delete(cb);
}

function broadcast(key, url) {
  subscribers.get(key)?.forEach((cb) => cb(url));
}

export function useLogo(key) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let alive = true;
    getLogo(key).then((v) => {
      if (alive) setUrl(v);
    });
    const unsubscribe = subscribe(key, (v) => {
      if (alive) setUrl(v);
    });
    return () => {
      alive = false;
      unsubscribe();
    };
  }, [key]);

  const upload = useCallback(
    async (file, { stripWhiteBg = false } = {}) => {
      let dataUrl = await readFileAsDataURL(file);
      if (stripWhiteBg) dataUrl = await stripWhiteBackground(dataUrl);
      await setLogo(key, dataUrl);
      setUrl(dataUrl);
      broadcast(key, dataUrl);
    },
    [key]
  );

  const clear = useCallback(async () => {
    await clearLogo(key);
    setUrl(null);
    broadcast(key, null);
  }, [key]);

  return { url, upload, clear };
}
