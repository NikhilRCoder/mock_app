import { useEffect, useRef, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import IssuedScreen from "./components/IssuedScreen";
import MenuScreen from "./components/MenuScreen";
import ProfileScreen from "./components/ProfileScreen";
import TabBar from "./components/TabBar";
import BottomSheet from "./components/BottomSheet";
import Toast from "./components/Toast";
import { loadProfile, saveProfile } from "./storage";
import { EditModeContext } from "./editMode";

export default function App() {
  const [screen, setScreen] = useState("splash"); // "splash" | "tabs" | "profile"
  const [tab, setTab] = useState("home"); // "home" | "search" | "issued" | "menu"
  const [sheet, setSheet] = useState(null); // null | "doc" | "vcard"
  const [sheetDoc, setSheetDoc] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState(loadProfile);
  const [editMode, setEditMode] = useState(false);

  const toastTimer = useRef(null);
  const refreshTimer = useRef(null);

  // Splash auto-advances to the tab flow once, on first mount.
  useEffect(() => {
    const t = setTimeout(() => setScreen("tabs"), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(toastTimer.current);
      clearTimeout(refreshTimer.current);
    };
  }, []);

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 1900);
  }

  function openDoc(doc) {
    setSheet("doc");
    setSheetDoc(doc);
  }

  function goTab(nextTab) {
    setScreen("tabs");
    setTab(nextTab);
    setSheet(null);
  }

  function openProfile() {
    setScreen("profile");
  }

  function backToTabs() {
    setScreen("tabs");
  }

  function refreshProfile() {
    setRefreshing(true);
    showToast("Profile refreshed");
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => setRefreshing(false), 900);
  }

  function signOut() {
    setScreen("splash");
    setTab("home");
  }

  function updateProfile(key, value) {
    setProfile((prev) => {
      const next = { ...prev, [key]: value };
      saveProfile(next);
      return next;
    });
    showToast("Saved");
  }

  const menuRows = [
    { label: "My Profile", color: "#1b1b22", onTap: openProfile },
    { label: "My Account", color: "#1b1b22", onTap: () => showToast("My Account") },
    { label: "Nominee", color: "#1b1b22", onTap: () => showToast("Nominee") },
    { label: "My Activity", color: "#1b1b22", onTap: () => showToast("My Activity") },
    { label: "Settings", color: "#1b1b22", onTap: () => showToast("Settings") },
    { label: "Sign out", color: "#c0392b", onTap: signOut },
  ];

  const isSplash = screen === "splash";
  const onTabs = screen === "tabs";
  const isProfile = screen === "profile";
  const indicatorColor = isSplash ? "#ffffff" : "#1b1b22";

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      <div className="dl-phone">
        {isSplash && <SplashScreen />}

        {onTabs && tab === "home" && (
          <HomeScreen
            userName={profile.name}
            onOpenProfile={openProfile}
            onGoIssued={() => goTab("issued")}
            onOpenDoc={openDoc}
            onUtilTap={(label) => showToast(`${label} — not in this prototype`)}
          />
        )}

        {onTabs && tab === "search" && (
          <SearchScreen query={query} onQueryChange={setQuery} onOpenDoc={openDoc} />
        )}

        {onTabs && tab === "issued" && <IssuedScreen onOpenDoc={openDoc} />}

        {onTabs && tab === "menu" && (
          <MenuScreen userName={profile.name} onOpenProfile={openProfile} menuRows={menuRows} />
        )}

        {isProfile && (
          <ProfileScreen
            profile={profile}
            refreshing={refreshing}
            onFieldChange={updateProfile}
            onBack={backToTabs}
            onRefresh={refreshProfile}
            onShare={() => showToast("Share sheet would open")}
            onOpenVcard={() => setSheet("vcard")}
            onQuickLink={(label) => showToast(label)}
          />
        )}

        {onTabs && <TabBar activeTab={tab} onTap={goTab} />}

        <BottomSheet sheet={sheet} sheetDoc={sheetDoc} onClose={() => setSheet(null)} />

        <Toast message={toast} />

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "calc(2px + env(safe-area-inset-bottom))",
            zIndex: 90,
            width: 140,
            height: 5,
            borderRadius: 3,
            background: indicatorColor,
            opacity: .85,
          }}
        />
      </div>
    </EditModeContext.Provider>
  );
}
