import Placeholder from "./Placeholder";
import UtilityIcon from "./UtilityIcon";
import AppMark from "./AppMark";
import LogoSlot from "./LogoSlot";
import { getInitials } from "../avatar";
import { DOCS, UTILITY_LABELS } from "../data";

export default function HomeScreen({ userName, onOpenProfile, onGoIssued, onOpenDoc, onUtilTap }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", animation: "dlTab .3s ease both" }}>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 104 }}>
        <div style={{ position: "relative", background: "#4c31ea", padding: "calc(20px + env(safe-area-inset-top)) 22px 0", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <LogoSlot
              slotKey="appMark"
              alt="App logo"
              editSize={14}
              style={{ width: 32, height: 32, borderRadius: 9 }}
              fallback={<AppMark size={32} rx="9" />}
            />
            <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-.3px" }}>DigiLocker</div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginTop: 26 }}>
            <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-.5px", maxWidth: 250, textWrap: "pretty" }}>
              Welcome,<br />{userName}
            </div>
            <LogoSlot
              slotKey="profilePhoto"
              alt="Profile photo"
              className="dl-tap dl-avatar"
              onClick={onOpenProfile}
              editSize={18}
              style={{
                width: 62,
                height: 62,
                borderRadius: "50%",
                background: "rgba(255,255,255,.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 21,
                fontWeight: 800,
                letterSpacing: "-.02em",
                color: "#fff",
              }}
              fallback={getInitials(userName)}
            />
          </div>

          <div style={{ marginTop: 20, fontSize: 15, lineHeight: 1.45, color: "rgba(255,255,255,.92)", textWrap: "pretty" }}>
            DigiLocker 'Issued Documents' are at par with original documents as per IT ACT, 2000
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 26 }}>
            <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.2px" }}>Issued Document</div>
            <div
              className="dl-tap dl-see-all"
              onClick={onGoIssued}
              style={{ padding: "9px 20px", borderRadius: 22, background: "#ddd6fb", color: "#4c31ea", fontSize: 15, fontWeight: 600 }}
            >
              See All
            </div>
          </div>
          <div style={{ height: 66 }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -1,
              height: 52,
              background: "#f4f4f7",
              clipPath: "polygon(0 34px,66% 34px,100% 0,100% 100%,0 100%)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: -54,
            position: "relative",
            zIndex: 2,
            display: "flex",
            gap: 14,
            overflowX: "auto",
            padding: "0 22px 4px",
            boxSizing: "border-box",
            scrollPaddingLeft: 22,
            scrollSnapType: "x proximity",
          }}
        >
          {DOCS.map((doc, i) => (
            <div
              key={doc.id}
              className="dl-tap dl-doc-card"
              onClick={() => onOpenDoc(doc)}
              style={{
                flex: "none",
                width: 278,
                boxSizing: "border-box",
                scrollSnapAlign: "start",
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 6px 18px rgba(27,27,45,.12)",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                animation: `dlRise .45s ease ${i * 0.05}s both`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <LogoSlot
                  slotKey={`issuerLogo:${doc.id}`}
                  alt={`${doc.title} issuer logo`}
                  editSize={16}
                  style={{ width: 64, height: 52, borderRadius: 8 }}
                  imgFit="contain"
                  fallback={<Placeholder label={"issuer\nlogo"} style={{ width: "100%", height: "100%", borderRadius: 8, color: "#8c8ba0" }} />}
                />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.2px" }}>{doc.title}</div>
                  <div style={{ marginTop: 6, fontSize: 15, color: "#6c6b80", letterSpacing: ".4px" }}>{doc.sub}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#6c6b80", lineHeight: 1.35, textWrap: "pretty" }}>{doc.issuer}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            margin: "22px 16px 0",
            background: "#fff",
            border: "1px solid #e7e5f4",
            borderRadius: 14,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "dlRise .5s ease .06s both",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1b4b9b", letterSpacing: "-.2px" }}>Access UMANG in DigiLocker</div>
            <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.4, color: "#4b4a5c", textWrap: "pretty" }}>
              Your one-stop destination for all Government services.
            </div>
            <div
              className="dl-tap dl-umang-btn"
              style={{ marginTop: 14, display: "inline-flex", padding: "11px 22px", borderRadius: 24, background: "#ef7521", color: "#fff", fontSize: 14, fontWeight: 800 }}
            >
              Access UMANG
            </div>
          </div>
          <LogoSlot
            slotKey="umangArtwork"
            alt="UMANG artwork"
            editSize={18}
            style={{ width: 96, height: 112, borderRadius: 10 }}
            imgFit="cover"
            fallback={
              <Placeholder
                label={"UMANG\nartwork"}
                style={{ width: "100%", height: "100%", borderRadius: 10, font: "9px/1.3 ui-monospace, Menlo, monospace" }}
              />
            }
          />
        </div>

        <div style={{ marginTop: 22, background: "#eceaf3", padding: "22px 16px 26px" }}>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-.2px", marginBottom: 16 }}>DigiLocker Utility</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {UTILITY_LABELS.map((label) => (
              <div
                key={label}
                className="dl-tap dl-util-tile"
                onClick={() => onUtilTap(label)}
                style={{ background: "#f5f4f9", borderRadius: 10, padding: "14px 12px 16px", minHeight: 104, display: "flex", flexDirection: "column", gap: 12 }}
              >
                <LogoSlot
                  slotKey={`utilityIcon:${label}`}
                  alt={label}
                  editSize={13}
                  imgFit="contain"
                  style={{ width: 34, height: 34, borderRadius: 7, background: "#e8e6f7", display: "flex", alignItems: "center", justifyContent: "center" }}
                  fallback={<UtilityIcon label={label} size={18} color="#4c31ea" />}
                />
                <div style={{ fontSize: 14, lineHeight: 1.25, color: "#3a3948" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
