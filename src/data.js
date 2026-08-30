export const DEFAULT_USER_NAME = "Ashish Mahale";

// All document definitions the app knows about. Which ones actually show
// up is controlled by ENABLED_DOC_IDS below — data stays intact either way,
// so re-enabling a document is just adding its id back to that list.
const ALL_DOCS = [
  {
    id: "aadhaar",
    title: "Aadhaar Card",
    sub: "XXXX-XXXX-XXXX",
    issuer: "Unique Identification Authority of India (UIDAI)",
    hasPhoto: true,
    layout: "govtCard",
    fields: [
      { label: "Name", value: "XXXXX XXXXX" },
      { label: "DOB", value: "XX-XX-XXXX" },
      { label: "Gender", value: "XXXXXX" },
      { label: "Aadhaar Number", value: "XXXX XXXX XXXX" },
    ],
    address: "XXXX, XXXX,\nXXXX, XXXX - XXXXXX",
    tagline: "मेरा आधार, मेरी पहचान",
  },
  {
    id: "x",
    title: "Class X Marksheet",
    sub: "Roll No. XXXXXXX",
    issuer: "Ministry of Education",
    fields: [
      { label: "Name", value: "XXXXX XXXXX" },
      { label: "Roll No.", value: "XXXXXXX" },
      { label: "Board", value: "XXXXX" },
      { label: "Year of Passing", value: "XXXX" },
      { label: "Result", value: "XXXXX" },
    ],
  },
  {
    id: "dl",
    title: "Driving Licence",
    sub: "MH-XX-XXXXXXXXXX",
    issuer: "Ministry of Road Transport & Highways",
    hasPhoto: true,
    hasSignature: true,
    fields: [
      { label: "Name", value: "XXXXX XXXXX" },
      { label: "License No.", value: "XX-XXXXXXXXXXXXX" },
      { label: "Authorization to Drive", value: "XXXXX" },
      { label: "Date of Issue", value: "XX-XX-XXXX" },
      { label: "DOB", value: "XX-XX-XXXX" },
      { label: "S/W/D", value: "XXXXX XXXXX" },
      { label: "Blood Group", value: "XX" },
      { label: "Date of Expiry", value: "XX-XX-XXXX" },
      { label: "Permanent Address", value: "XXXX, XXXX - XXXXXX" },
      { label: "Present Address", value: "XXXX, XXXX - XXXXXX" },
    ],
  },
  {
    id: "pan",
    title: "PAN Verification Record",
    sub: "XXXXX1234X",
    issuer: "Income Tax Department",
    hasPhoto: true,
    fields: [
      { label: "Name", value: "XXXXX XXXXX" },
      { label: "PAN", value: "XXXXX1234X" },
      { label: "Father's Name", value: "XXXXX XXXXX" },
      { label: "DOB", value: "XX-XX-XXXX" },
    ],
  },
];

const ALL_CATALOG_EXTRAS = [
  {
    id: "cbse12",
    title: "Class XII Marksheet",
    sub: "Roll No. XXXXXXX",
    issuer: "CBSE",
    fields: [
      { label: "Name", value: "XXXXX XXXXX" },
      { label: "Roll No.", value: "XXXXXXX" },
      { label: "Stream", value: "XXXXX" },
      { label: "Year of Passing", value: "XXXX" },
      { label: "Result", value: "XXXXX" },
    ],
  },
  {
    id: "rc",
    title: "Vehicle Registration (RC)",
    sub: "MH XX XX XXXX",
    issuer: "Ministry of Road Transport & Highways",
    fields: [
      { label: "Owner Name", value: "XXXXX XXXXX" },
      { label: "Registration No.", value: "MH XX XX XXXX" },
      { label: "Vehicle Class", value: "XXXXX" },
      { label: "Date of Registration", value: "XX-XX-XXXX" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance Policy",
    sub: "Policy XXXXXXX",
    issuer: "Insurance Regulatory Authority",
    fields: [
      { label: "Policy Holder", value: "XXXXX XXXXX" },
      { label: "Policy No.", value: "XXXXXXX" },
      { label: "Insurer", value: "XXXXX" },
      { label: "Valid Till", value: "XX-XX-XXXX" },
    ],
  },
  {
    id: "ration",
    title: "Ration Card",
    sub: "XXXXXXXXXXX",
    issuer: "Department of Food & Public Distribution",
    fields: [
      { label: "Head of Family", value: "XXXXX XXXXX" },
      { label: "Card No.", value: "XXXXXXXXXXX" },
      { label: "Family Members", value: "X" },
      { label: "Address", value: "XXXX, XXXX - XXXXXX" },
    ],
  },
];

// Only these are turned on right now — add ids back here to bring a
// document back into Home / Issued / Search.
const ENABLED_DOC_IDS = ["aadhaar", "dl"];

export const DOCS = ALL_DOCS.filter((d) => ENABLED_DOC_IDS.includes(d.id));
export const CATALOG = ALL_DOCS.concat(ALL_CATALOG_EXTRAS).filter((d) => ENABLED_DOC_IDS.includes(d.id));

export const UTILITY_LABELS = [
  "Authenticator",
  "Drive",
  "Verifiable Credential",
  "Govt. Services",
  "Family Locker",
  "Verify Document",
];

export const QUICK_LINK_LABELS = ["My Account", "Nominee", "My Activity"];

// Field metadata + the default value shown until the user edits and saves
// their own (see storage.js — edits are persisted to localStorage).
export const PROFILE_FIELDS = [
  { key: "dob", label: "DOB", defaultValue: "04-10-2003", warn: "", inputMode: "text" },
  { key: "gender", label: "Gender", defaultValue: "Male", warn: "", inputMode: "text" },
  { key: "mobile", label: "Mobile", defaultValue: "9•••••••••6", warn: "", inputMode: "tel" },
  { key: "email", label: "Email", defaultValue: "a•••••••••@gmail.com", warn: "⚠", inputMode: "email" },
];
