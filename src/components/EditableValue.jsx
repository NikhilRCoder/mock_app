import { useState } from "react";
import { useEditMode } from "../editMode";

// A single value that becomes an inline input/textarea when Edit Mode is on
// and tapped. Give it `key={... + editMode}` from the parent when rendering
// in a list so an in-progress edit can't survive a mode toggle.
export default function EditableValue({ value, onCommit, multiline = false, displayStyle, inputStyle, containerStyle }) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    const next = draft.trim();
    if (next && next !== value) onCommit(next);
    else setDraft(value);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    const Field = multiline ? "textarea" : "input";
    return (
      <Field
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !multiline) commit();
          if (e.key === "Escape") cancel();
        }}
        rows={multiline ? 3 : undefined}
        style={{
          display: "block",
          width: "100%",
          border: 0,
          borderBottom: "1.5px solid #4c31ea",
          outline: "none",
          background: "transparent",
          fontFamily: "inherit",
          resize: "none",
          ...inputStyle,
        }}
      />
    );
  }

  return (
    <span
      className={editMode ? "dl-tap" : undefined}
      onClick={
        editMode
          ? () => {
              setDraft(value);
              setEditing(true);
            }
          : undefined
      }
      style={{ display: "inline-flex", alignItems: "flex-start", gap: 6, ...containerStyle }}
    >
      <span style={{ whiteSpace: multiline ? "pre-line" : undefined, ...displayStyle }}>{value}</span>
      {editMode && <span style={{ fontSize: 13, color: "#5c5b6e", flex: "none" }}>✎</span>}
    </span>
  );
}
