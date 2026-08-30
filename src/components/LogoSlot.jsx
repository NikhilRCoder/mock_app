import { useRef } from "react";
import { useLogo } from "../useLogo";
import { useEditMode } from "../editMode";

// A placement that can show a locally-uploaded image (stored in IndexedDB,
// never leaves the browser) or fall back to the existing placeholder/mark.
// Tap the small pencil badge to upload or replace; long-press-free clear via
// the same badge when an image is already set (it becomes a × button).
export default function LogoSlot({
  slotKey,
  alt = "",
  style,
  fallback,
  editSize = 22,
  imgFit = "cover",
  imgRadius,
  className,
  onClick,
  editable = true,
  stripWhiteBg = false,
}) {
  const { url, upload, clear } = useLogo(slotKey);
  const { editMode } = useEditMode();
  const inputRef = useRef(null);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) upload(file, { stripWhiteBg });
    e.target.value = "";
  }

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ position: "relative", flex: "none", ...style }}
    >
      {url ? (
        <img
          src={url}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: imgFit, borderRadius: imgRadius ?? style?.borderRadius, display: "block" }}
        />
      ) : (
        fallback
      )}

      {editable && editMode && (
        <>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (url) clear();
              else inputRef.current?.click();
            }}
            title={url ? "Remove image" : "Upload image"}
            style={{
              position: "absolute",
              right: -4,
              bottom: -4,
              width: editSize,
              height: editSize,
              borderRadius: "50%",
              border: "2px solid #fff",
              background: url ? "#c0392b" : "#1b1b22",
              color: "#fff",
              fontSize: editSize * 0.5,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {url ? "×" : "✎"}
          </button>
        </>
      )}
    </div>
  );
}
