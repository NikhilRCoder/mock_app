import { useCallback, useEffect, useState } from "react";
import { clearLogo, getLogo, readFileAsDataURL, setLogo } from "./logoStorage";

export function useLogo(key) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let alive = true;
    getLogo(key).then((v) => {
      if (alive) setUrl(v);
    });
    return () => {
      alive = false;
    };
  }, [key]);

  const upload = useCallback(
    async (file) => {
      const dataUrl = await readFileAsDataURL(file);
      await setLogo(key, dataUrl);
      setUrl(dataUrl);
    },
    [key]
  );

  const clear = useCallback(async () => {
    await clearLogo(key);
    setUrl(null);
  }, [key]);

  return { url, upload, clear };
}
