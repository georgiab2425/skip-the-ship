const screenTitles = {
  home:    "ShoreDay",
  ports:   "My Itinerary",
  portday: "Port Day",
  results: "Top Options",
  plan:    "My Plan",
};

export default function TopBar({ currentScreen, onMenuClick, navigate, appState }) {
  const title = screenTitles[currentScreen] || "ShoreDay";
  const showBack = currentScreen !== "home";

  return (
    <header className="screen-header" style={{ display: "flex" }}>

      {/* Left: hamburger (mobile) or back button */}
      <div style={{ width: 80 }}>
        {showBack ? (
          <button
            className="back-btn"
            onClick={() => navigate("home")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>
        ) : (
          /* Hamburger — only visible on mobile (hidden on desktop via CSS) */
          <button
            onClick={onMenuClick}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: "8px 4px",
              minHeight: 44,
              justifyContent: "center",
            }}
            aria-label="Open menu"
            className="mobile-only"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block",
                width: 22,
                height: 2,
                background: "var(--color-text-primary)",
                borderRadius: 2,
              }}/>
            ))}
          </button>
        )}
      </div>

      {/* Center: screen title */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <span className="screen-title">{title}</span>
      </div>

      {/* Right: placeholder for future actions */}
      <div style={{ width: 80 }} />

    </header>
  );
}
