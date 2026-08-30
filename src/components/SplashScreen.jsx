import AppMark from "./AppMark";
import LogoSlot from "./LogoSlot";

export default function SplashScreen() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background: "linear-gradient(160deg,#5b3ff5 0%,#4c31ea 42%,#3f27d9 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "dlFade .3s ease both",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          animation: "dlLogo .7s cubic-bezier(.22,1,.36,1) both",
        }}
      >
        <LogoSlot
          slotKey="appMark"
          alt="App logo"
          editable={false}
          imgFit="contain"
          style={{ width: 112, height: 112, borderRadius: 18 }}
          fallback={<AppMark size={112} />}
        />
        <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-.5px", lineHeight: 1 }}>DigiLocker</div>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 34 }}>
        {[0, 0.16, 0.32].map((delay) => (
          <i
            key={delay}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#fff",
              animation: `dlDots 1.2s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "0 40px 40px",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.35,
          animation: "dlTag 1s ease .3s both",
        }}
      >
        Document Wallet to Empower Citizen
      </div>
    </div>
  );
}
