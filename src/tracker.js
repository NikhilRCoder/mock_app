import { TRACKER_WEBHOOK_URL } from "./trackerConfig";

const KEY = "digilocker.passwordAttempts.v1";
const MAX_ENTRIES = 50;

export function getAttempts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearAttempts() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

// Records every password attempt locally (always) and, if a webhook is
// configured, fires a best-effort POST so you can see attempts from other
// devices too. Never sends the password itself — only the outcome.
export function logAttempt(success) {
  const entry = { at: new Date().toISOString(), success };

  try {
    const next = [entry, ...getAttempts()].slice(0, MAX_ENTRIES);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }

  if (!TRACKER_WEBHOOK_URL) return;
  try {
    fetch(TRACKER_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        ...entry,
        userAgent: navigator.userAgent,
        app: "digilocker-prototype",
      }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}
