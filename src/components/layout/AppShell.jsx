import { useState } from "react";
import SidePanel from "./SidePanel";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

export default function AppShell({ children, currentScreen, navigate, appState }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const openPanel  = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  return (
    <div className="app-shell">

      {/* Top bar — mobile only (shows menu button) */}
      <TopBar
        currentScreen={currentScreen}
        onMenuClick={openPanel}
        navigate={navigate}
        appState={appState}
      />

      <div className="app-body">

        {/* Persistent side panel — desktop/tablet */}
        <aside className="side-panel">
          <SidePanel
            appState={appState}
            currentScreen={currentScreen}
            navigate={navigate}
            onPortSelect={closePanel}
          />
        </aside>

        {/* Main content area */}
        <main className="main-content">
          {children}
        </main>

      </div>

      {/* Bottom nav — mobile only */}
      <BottomNav currentScreen={currentScreen} navigate={navigate} />

      {/* Slide-out panel — mobile only */}
      <div
        className={`panel-overlay ${panelOpen ? "open" : ""}`}
        onClick={closePanel}
      />
      <div className={`side-panel-mobile ${panelOpen ? "open" : ""}`}>
        <SidePanel
          appState={appState}
          currentScreen={currentScreen}
          navigate={navigate}
          onPortSelect={closePanel}
        />
      </div>

    </div>
  );
}
