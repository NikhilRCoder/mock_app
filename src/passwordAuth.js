// Client-side password gate for a static site — this can never be real
// security (anyone can read the source, inspect localStorage, or just
// disable JS), only a casual deterrent to keep random visitors out. The
// password is hashed (SHA-256) rather than stored in plaintext purely so
// it isn't trivially readable at a glance in the repo or devtools.
//
// Fixed — there is no in-app way to change it. To set a different one,
// replace DEFAULT_HASH with sha256Hex("your password") here in source.
const UNLOCKED_KEY = "digilocker.unlocked.v1";
const DEFAULT_HASH = "25a674d5ccfbec4752f3c9bb5b5af2847d38a829dc3eb1ccc808377e5abbd726"; // "connect557"

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(attempt) {
  const hash = await sha256Hex(attempt);
  return hash === DEFAULT_HASH;
}

export function isUnlocked() {
  try {
    return localStorage.getItem(UNLOCKED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setUnlocked(value) {
  try {
    if (value) localStorage.setItem(UNLOCKED_KEY, "1");
    else localStorage.removeItem(UNLOCKED_KEY);
  } catch {
    // ignore
  }
}
