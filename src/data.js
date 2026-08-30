export const DOCS = [
  { id: "aadhaar", title: "Aadhaar Card", sub: "XXXX-XXXX-XXXX", issuer: "Unique Identification Authority of India (UIDAI)" },
  { id: "x", title: "Class X Marksheet", sub: "Roll No. XXXXXXX", issuer: "Ministry of Education" },
  { id: "dl", title: "Driving Licence", sub: "MH-XX-XXXXXXXXXX", issuer: "Ministry of Road Transport & Highways" },
  { id: "pan", title: "PAN Verification Record", sub: "XXXXX1234X", issuer: "Income Tax Department" },
];

export const CATALOG = DOCS.concat([
  { id: "cbse12", title: "Class XII Marksheet", sub: "Roll No. XXXXXXX", issuer: "CBSE" },
  { id: "rc", title: "Vehicle Registration (RC)", sub: "MH XX XX XXXX", issuer: "Ministry of Road Transport & Highways" },
  { id: "insurance", title: "Insurance Policy", sub: "Policy XXXXXXX", issuer: "Insurance Regulatory Authority" },
  { id: "ration", title: "Ration Card", sub: "XXXXXXXXXXX", issuer: "Department of Food & Public Distribution" },
]);

export const UTILITY_LABELS = [
  "Authenticator",
  "Drive",
  "Verifiable Credential",
  "Govt. Services",
  "Family Locker",
  "Verify Document",
];

export const QUICK_LINK_LABELS = ["My Account", "Nominee", "My Activity"];

export const PROFILE_FIELDS = [
  { key: "dob", label: "DOB", value: "04-10-2003", warn: "", editable: false },
  { key: "gender", label: "Gender", value: "Male", warn: "", editable: false },
  { key: "mobile", label: "Mobile", value: "9•••••••••6", warn: "", editable: true, toast: "Edit mobile number" },
  { key: "email", label: "Email", value: "a•••••••••@gmail.com", warn: "⚠", editable: true, toast: "Email not verified — tap to verify" },
];
