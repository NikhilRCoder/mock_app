// Client-side password gate for a static site — this can never be real
// security (anyone can read the source, inspect localStorage, or just
// disable JS), only a casual deterrent to keep random visitors out. The
// password is hashed (SHA-256) rather than stored in plaintext purely so
// it isn't trivially readable at a glance in the repo or devtools.
const KEY = "digilocker.passwordHash.v1";
const UNLOCKED_KEY = "digilocker.unlocked.v1";

// Default password: "digilocker123" — change it from Menu once unlocked,
// or replace this with sha256Hex("your password") to pick a different
// out-of-the-box default.
const DEFAULT_HASH = "d8832bdcbe2c8f5a00ba4cf3f0ca75329fd6a17d3b67d5b905ea92642179cb8f";

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getStoredHash() {
  try {
    return localStorage.getItem(KEY) || DEFAULT_HASH;
  } catch {
    return DEFAULT_HASH;
  }
}

export async function verifyPassword(attempt) {
  const hash = await sha256Hex(attempt);
  const stored = await getStoredHash();
  return hash === stored;
}

export async function setPassword(newPassword) {
  const hash = await sha256Hex(newPassword);
  try {
    localStorage.setItem(KEY, hash);
  } catch {
    // localStorage unavailable — new password only holds for this session.
  }
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
