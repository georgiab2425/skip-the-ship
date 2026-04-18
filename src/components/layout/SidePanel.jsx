export default function SidePanel({ appState, currentScreen, navigate, onPortSelect }) {
  const { cruise, itinerary, selectedPort } = appState;
  const hasItinerary = itinerary && itinerary.length > 0;

  const handlePortClick = (port) => {
    navigate("portday");
    if (onPortSelect) onPortSelect();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Panel header */}
      <div style={{
        padding: "1.25rem 1rem 1rem",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-primary)" }}>
          ⚓ ShoreDay
        </div>
        {cruise.line && (
          <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
            {cruise.line} · {cruise.ship}
          </div>
        )}
        {cruise.sail_date && (
          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {cruise.sail_date}
          </div>
        )}
      </div>

      {/* Port list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
        {!hasItinerary ? (
          <div style={{
            padding: "1.5rem 1rem",
            color: "var(--color-text-muted)",
            fontSize: 13,
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            Select a cruise on the home screen to load your itinerary
          </div>
        ) : (
          itinerary.map((port, i) => {
            const isSelected = selectedPort?.port === port.port;
            return (
              <button
                key={i}
                onClick={() => handlePortClick(port)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  background: isSelected ? "var(--color-primary-light)" : "transparent",
                  borderLeft: isSelected
                    ? "3px solid var(--color-primary)"
                    : "3px solid transparent",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "background 200ms",
                }}
              >
                {/* Day + Date */}
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 2 }}>
                  Day {i + 1} · {port.date}
                </div>

                {/* Port name + tender/docked */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isSelected ? "var(--color-primary-dark)" : "var(--color-text-primary)",
                  }}>
                    {port.port}
                  </span>
                  <span style={{ fontSize: 11 }}>
                    {port.tender ? "⚓" : "🚢"}
                  </span>
                </div>

                {/* Times */}
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                  {port.arrival} – {port.departure}
                </div>
              </button>
            );
          })
        )}
      </div>

    </div>
  );
}
