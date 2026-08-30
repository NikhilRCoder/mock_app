const KEY = "digilocker.docFields.v1";

// Flat map of "<docId>:<fieldLabel>" -> the value the user typed, so a doc's
// original mock data stays the fallback until something is actually edited.
export function loadDocFields() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveDocFields(values) {
  try {
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    // localStorage unavailable — edits stay in memory only.
  }
}

export function getFieldValue(overrides, docId, label, fallback) {
  return overrides[`${docId}:${label}`] ?? fallback;
}
