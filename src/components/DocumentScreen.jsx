import Placeholder from "./Placeholder";
import AppMark from "./AppMark";
import LogoSlot from "./LogoSlot";
import { getInitials } from "../avatar";

function GenericDocContent({ doc }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <LogoSlot
          slotKey={`issuerLogo:${doc.id}`}
          alt={`${doc.title} issuer logo`}
          editSize={15}
          imgFit="contain"
          style={{ width: 40, height: 40, borderRadius: 10 }}
          fallback={<AppMark size={40} rx={10} />}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.2px" }}>{doc.title}</div>
          <div style={{ marginTop: 2, fontSize: 13, color: "#6c6b80" }}>{doc.issuer}</div>
        </div>
      </div>
      <div style={{ height: 1, background: "#eeedf3", margin: "16px 0" }} />
      <div>
        {doc.fields.map((f) => (
          <div key={f.label} style={{ display: "flex", gap: 10, padding: "9px 0", borderTop: "1px solid #f3f2f7" }}>
            <div style={{ width: 132, flex: "none", fontSize: 14, fontWeight: 700, color: "#3a3948" }}>{f.label}</div>
            <div style={{ flex: 1, minWidth: 0, fontSize: 14, color: "#5c5b6e" }}>: {f.value}</div>
          </div>
        ))}
      </div>
      {(doc.hasPhoto || doc.hasSignature) && (
        <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
          {doc.hasPhoto && (
            <div style={{ flex: 1 }}>
              <LogoSlot
                slotKey="profilePhoto"
                alt="Photo"
                editSize={18}
                imgFit="cover"
                style={{ width: "100%", height: 110, borderRadius: 10 }}
                fallback={<Placeholder label="photo" style={{ width: "100%", height: "100%", borderRadius: 10 }} />}
              />
              <div style={{ marginTop: 6, textAlign: "center", fontSize: 12, color: "#8c8ba0" }}>Tap to Zoom</div>
            </div>
          )}
          {doc.hasSignature && (
            <div style={{ flex: 1 }}>
              <LogoSlot
                slotKey="signature"
                alt="Signature"
                editSize={18}
                imgFit="contain"
                style={{ width: "100%", height: 110, borderRadius: 10 }}
                fallback={<Placeholder label="signature" style={{ width: "100%", height: "100%", borderRadius: 10 }} />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Layout matching an official ID card: emblem/authority header row, photo
// beside stacked (unlabeled) fields, an address block, then a footer badge
// + QR code. Every branded image here (emblem, authority banner, issuer
// logo, "powered by" badge, QR) is a LogoSlot with a neutral fallback —
// nothing here reproduces a real government or service mark.
function GovtCardContent({ doc }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, borderBottom: "1px solid #eeedf3" }}>
        <LogoSlot
          slotKey="govtEmblem"
          alt="Issuing authority emblem"
          editSize={13}
          imgFit="contain"
          style={{ width: 40, height: 48 }}
          fallback={<Placeholder label={"emblem"} style={{ width: "100%", height: "100%", borderRadius: 6 }} />}
        />
        <LogoSlot
          slotKey="govtBanner"
          alt={doc.issuer}
          editSize={13}
          imgFit="contain"
          style={{ flex: 1, height: 32 }}
          fallback={<div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#3a3948", letterSpacing: ".2px" }}>{doc.issuer}</div>}
        />
        <LogoSlot
          slotKey={`issuerLogo:${doc.id}`}
          alt={`${doc.title} logo`}
          editSize={13}
          imgFit="contain"
          style={{ width: 64, height: 44 }}
          fallback={<Placeholder label={"issuer\nlogo"} style={{ width: "100%", height: "100%", borderRadius: 6 }} />}
        />
      </div>

      <div style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #eeedf3" }}>
        <LogoSlot
          slotKey="profilePhoto"
          alt="Photo"
          editSize={18}
          imgFit="cover"
          style={{ width: 96, height: 118, borderRadius: 6 }}
          fallback={<Placeholder label="photo" style={{ width: "100%", height: "100%", borderRadius: 6 }} />}
        />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
          {doc.fields.map((f) => (
            <div key={f.label} style={{ fontSize: 15, color: "#1b1b22" }}>{f.value}</div>
          ))}
        </div>
      </div>

      {doc.address && (
        <div style={{ padding: "16px 0", borderBottom: "1px solid #eeedf3" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Address:</div>
          <div style={{ fontSize: 14, color: "#5c5b6e", lineHeight: 1.55, whiteSpace: "pre-line" }}>{doc.address}</div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, paddingTop: 16 }}>
        <LogoSlot
          slotKey="digilockerBadge"
          alt="Powered by DigiLocker"
          editSize={16}
          imgFit="contain"
          style={{ width: 150, height: 42, borderRadius: 8 }}
          fallback={<Placeholder label={"powered by\ndigilocker"} style={{ width: "100%", height: "100%", borderRadius: 8 }} />}
        />
        <div style={{ textAlign: "center" }}>
          <LogoSlot
            slotKey={`docQr:${doc.id}`}
            alt="QR code"
            editSize={16}
            imgFit="cover"
            style={{ width: 92, height: 92, borderRadius: 8 }}
            fallback={
              <Placeholder
                label={"QR code\n(generated)"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  font: "10px/1.4 ui-monospace, Menlo, monospace",
                  background: "linear-gradient(100deg,#f7f6fa 30%,#eeedf5 50%,#f7f6fa 70%)",
                  backgroundSize: "400px 100%",
                  animation: "dlShine 1.6s linear infinite",
                }}
              />
            }
          />
          <div style={{ marginTop: 6, fontSize: 11, color: "#8c8ba0" }}>Tap to Zoom</div>
        </div>
      </div>

      {doc.tagline && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #eeedf3", textAlign: "center", fontSize: 16, fontWeight: 600, color: "#1b1b22" }}>
          {doc.tagline}
        </div>
      )}
    </div>
  );
}

export default function DocumentScreen({ doc, userName, onBack, onGoHome, onShare, onGoIssued }) {
  if (!doc) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", background: "#fff", animation: "dlPush .34s cubic-bezier(.22,1,.36,1) both" }}>
      <div
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "calc(14px + env(safe-area-inset-top)) 18px 10px",
        }}
      >
        <div className="dl-tap dl-back-btn" onClick={onBack} style={{ fontSize: 24, lineHeight: 1, color: "#1b1b22" }}>←</div>
        <LogoSlot
          slotKey="profilePhoto"
          alt="Profile photo"
          editSize={14}
          imgFit="cover"
          style={{ width: 40, height: 40, borderRadius: "50%", background: "#ede9fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#4c31ea" }}
          fallback={getInitials(userName)}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 20px 24px" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(27,27,45,.1)", border: "1px solid #f0eff5", padding: 20 }}>
          {doc.layout === "govtCard" ? <GovtCardContent doc={doc} /> : <GenericDocContent doc={doc} />}
        </div>
      </div>

      <div
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "14px 0 calc(14px + env(safe-area-inset-bottom))",
          borderTop: "1px solid #eeedf3",
        }}
      >
        <div className="dl-tap" onClick={onGoHome} style={{ fontSize: 20, color: "#3a3948" }}>⌂</div>
        <div className="dl-tap" onClick={onShare} style={{ fontSize: 19, color: "#3a3948" }}>⤴</div>
        <div className="dl-tap" onClick={onGoIssued} style={{ fontSize: 19, color: "#3a3948" }}>▤</div>
      </div>
    </div>
  );
}
