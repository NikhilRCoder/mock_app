import { DEFAULT_USER_NAME, PROFILE_FIELDS } from "./data";

const KEY = "digilocker.profile.v2";

const DEFAULTS = {
  name: DEFAULT_USER_NAME,
  ...Object.fromEntries(PROFILE_FIELDS.map((f) => [f.key, f.defaultValue])),
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const saved = JSON.parse(raw);
    return { ...DEFAULTS, ...saved };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveProfile(values) {
  try {
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — edits stay in memory only.
  }
}
