import { useState } from "react";
import { getInitials } from "../avatar";
import LogoSlot from "./LogoSlot";
import { useEditMode } from "../editMode";
import { PROFILE_FIELDS, QUICK_LINK_LABELS } from "../data";

// Remounted (via `key`) whenever edit mode toggles, so an in-progress edit
// can't be left stranded once the pencils disappear.
function EditableName({ value, onChange }) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    const next = draft.trim();
    if (next && next !== value) onChange("name", next);
    else setDraft(value);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
        style={{ marginTop: 14, fontSize: 25, fontWeight: 700, letterSpacing: "-.3px", textAlign: "center", border: 0, borderBottom: "1.5px solid #4c31ea", outline: "none", background: "transparent", fontFamily: "inherit", color: "#1b1b22", width: "100%" }}
      />
    );
  }

  return (
    <div
      className={editMode ? "dl-tap" : undefined}
      onClick={
        editMode
          ? () => {
              setDraft(value);
              setEditing(true);
            }
          : undefined
      }
      style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 25, fontWeight: 700, letterSpacing: "-.3px", animation: "dlRise .4s ease .1s both" }}
    >
      {value}
      {editMode && <span style={{ fontSize: 15, color: "#5c5b6e" }}>✎</span>}
    </div>
  );
}

// Also remounted via `key` on edit-mode toggle — see EditableName above.
function ProfileField({ field, value, onChange }) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    const next = draft.trim();
    if (next !== value) onChange(field.key, next);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderTop: "1px solid #eeedf3" }}>
      <div style={{ width: 88, flex: "none", fontSize: 16, fontWeight: 800 }}>{field.label}</div>
      {editing ? (
        <input
          autoFocus
          value={draft}
          inputMode={field.inputMode}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") cancel();
          }}
          style={{ flex: 1, minWidth: 0, fontSize: 16, color: "#33323f", border: 0, borderBottom: "1.5px solid #4c31ea", outline: "none", background: "transparent", padding: "0 0 2px", fontFamily: "inherit" }}
        />
      ) : (
        <div style={{ flex: 1, minWidth: 0, fontSize: 16, color: "#33323f", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      )}
      <div style={{ fontSize: 15, color: "#e8a53a", width: 14, textAlign: "center" }}>{field.warn}</div>
      {editMode && (
        <div
          className="dl-tap"
          onClick={() => {
            setDraft(value);
            setEditing(true);
          }}
          style={{ fontSize: 15, color: "#5c5b6e", width: 18, textAlign: "center" }}
        >
          ✎
        </div>
      )}
    </div>
  );
}

export default function ProfileScreen({ profile, refreshing, onFieldChange, onBack, onRefresh, onShare, onOpenVcard, onQuickLink }) {
  const { editMode } = useEditMode();
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", background: "#f4f4f7", animation: "dlPush .34s cubic-bezier(.22,1,.36,1) both" }}>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 40 }}>
        <div style={{ position: "relative", background: "#4c31ea", padding: "calc(20px + env(safe-area-inset-top)) 20px 0", color: "#fff", height: 250, boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="dl-tap dl-back-btn" onClick={onBack} style={{ fontSize: 24, lineHeight: 1, width: 28 }}>←</div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 21, fontWeight: 700, letterSpacing: "-.2px" }}>My Profile</div>
            <div
              className="dl-tap"
              onClick={onRefresh}
              style={{ fontSize: 19, animation: refreshing ? "dlSpin .9s linear" : "none" }}
            >
              ⟳
            </div>
            <div className="dl-tap" onClick={onShare} style={{ fontSize: 19 }}>⤴</div>
          </div>
          <div style={{ position: "absolute", left: "-6%", right: "-6%", bottom: -46, height: 96, background: "#f4f4f7", borderRadius: "50% 50% 0 0" }} />
        </div>

        <div style={{ marginTop: -118, position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px" }}>
          <div style={{ width: 124, height: 124, borderRadius: "50%", background: "#fff", padding: 6, boxSizing: "border-box", animation: "dlPop .5s cubic-bezier(.22,1,.36,1) both" }}>
            <LogoSlot
              slotKey="profilePhoto"
              alt="Profile photo"
              editSize={26}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "linear-gradient(160deg,#5b3ff5 0%,#4c31ea 42%,#3f27d9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-.02em",
              }}
              fallback={getInitials(profile.name)}
            />
          </div>
          <EditableName key={editMode} value={profile.name} onChange={onFieldChange} />
          <div
            style={{
              marginTop: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 20,
              background: "#22a25a",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              animation: "dlPop .45s cubic-bezier(.22,1,.36,1) .22s both",
            }}
          >
            ✓ Verified
          </div>
          <div
            className="dl-tap dl-vcard-btn"
            onClick={onOpenVcard}
            style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 22px", borderRadius: 24, background: "#cfeafb", color: "#173a52", fontSize: 17, fontWeight: 600 }}
          >
            Generate vCard <span style={{ fontSize: 15 }}>▤</span>
          </div>
        </div>

        <div style={{ margin: "22px 16px 0", background: "#fff", borderRadius: 14, boxShadow: "0 4px 14px rgba(27,27,45,.07)", overflow: "hidden", animation: "dlRise .45s ease .16s both" }}>
          {PROFILE_FIELDS.map((f) => (
            <ProfileField key={`${f.key}-${editMode}`} field={f} value={profile[f.key]} onChange={onFieldChange} />
          ))}
        </div>

        <div style={{ margin: "26px 16px 0" }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.2px" }}>Quick Links</div>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            {QUICK_LINK_LABELS.map((label) => (
              <div
                key={label}
                className="dl-tap dl-quicklink"
                onClick={() => onQuickLink(label)}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "13px 8px", border: "1px solid #cfced9", borderRadius: 24, background: "#fdfdff", fontSize: 13, fontWeight: 700, color: "#7b7a8c" }}
              >
                <span style={{ width: 15, height: 15, border: "1.2px dashed #b6b5c4", borderRadius: 4, flex: "none" }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
