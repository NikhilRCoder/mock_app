import { PROFILE_FIELDS } from "./data";

const KEY = "digilocker.profileFields.v1";

const DEFAULTS = Object.fromEntries(PROFILE_FIELDS.map((f) => [f.key, f.defaultValue]));

export function loadProfileFields() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const saved = JSON.parse(raw);
    return { ...DEFAULTS, ...saved };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveProfileFields(values) {
  try {
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — edits stay in memory only.
  }
}
