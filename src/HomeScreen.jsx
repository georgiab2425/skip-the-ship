import { useState, useEffect } from "react";
import {
  CRUISE_LINES,
  getShipsForLine,
  getSailDates,
  getItinerary,
} from "../../data/cruiseData";

function IconShip() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a20.6 20.6 0 0020 0"/>
      <path d="M5 20V11l7-7 7 7v9"/>
      <path d="M12 7v5"/>
      <rect x="9" y="12" width="6" height="5" rx="1"/>
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SelectField({ label, icon, value, onChange, options, placeholder, disabled }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute", left: 12, top: "50%",
            transform: "translateY(-50%)",
            color: value ? "var(--color-primary)" : "var(--color-text-muted)",
            pointerEvents: "none",
            display: "flex", alignItems: "center",
          }}>
            {icon}
          </span>
        )}
        <select
          className="form-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            paddingLeft: icon ? 44 : "1rem",
            paddingRight: 40,
            opacity: disabled ? 0.5 : 1,
            color: value ? "var(--color-text-primary)" : "var(--color-text-muted)",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id || opt} value={opt.id || opt}>
              {opt.name || opt}
            </option>
          ))}
        </select>
        <span style={{
          position: "absolute", right: 12, top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "var(--color-text-muted)",
          display: "flex", alignItems: "center",
        }}>
          <IconChevron />
        </span>
      </div>
    </div>
  );
}

function StepDot({ number, active, complete }) {
  return (
    <div style={{
      width: 28, height: 28,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: complete
        ? "var(--color-primary)"
        : active ? "var(--color-primary-light)" : "var(--color-surface-2)",
      border: active && !complete
        ? "2px solid var(--color-primary)" : "2px solid transparent",
      color: complete ? "#fff" : active ? "var(--color-primary)" : "var(--color-text-muted)",
      fontSize: 13, fontWeight: 700, flexShrink: 0,
      transition: "all 200ms",
    }}>
      {complete ? <IconCheck /> : number}
    </div>
  );
}

export default function HomeScreen({ appState, updateAppState, navigate }) {
  const [line, setLine]     = useState(appState.cruise.line || "");
  const [ship, setShip]     = useState(appState.cruise.ship || "");
  const [date, setDate]     = useState(appState.cruise.sail_date || "");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading]
  const [preference = [];
 
  const ships     = line ? getShipsForLine(line) : [];
  const sailDates = line && ship ? getSailDates(line, ship) : [];

  const step1Complete = !!line;
  const step2Complete = !!ship;
  const step3Complete = !!date;
  const canLoad = step1Complete && step2Complete && step3Complete;

  useEffect(() => { setShip(""); setDate(""); setError(""); }, [line]);
  useEffect(() => { setDate(""); setError(""); }, [ship]);

  const handleLoad = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const itinerary = getItinerary(line, ship);
      if (!itinerary) {
        setError("No itinerary found for this selection. More routes coming soon.");
        setLoading(false);
        return;
      }
      const lineName = CRUISE_LINES.find((l) => l.id === line)?.name || line;
      const shipName = getShipsForLine(line).find((s) => s.id === ship)?.name || ship;
      updateAppState({
        cruise: { line: lineName, ship: shipName, sail_date: date },
        itinerary,
      });
      setLoading(false);
      navigate("ports");
    }, 700);
  };

  const divider = (
    <div style={{ height: 1, background: "var(--color-border)", margin: "0 -1.25rem" }} />
  );

  return (
    <div className="screen-body" style={{ maxWidth: 520, margin: "0 auto" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "1rem 0 0.5rem" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "var(--color-primary-light)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1rem", fontSize: 28,
        }}>
          ⚓
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Plan Your Port Day</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: 15, lineHeight: 1.6 }}>
          Top-rated excursions, dining &amp; activities —
          independent of the cruise line.
        </p>
      </div>

      {/* Setup card */}
      <div className="card">
        <div className="card-body stack stack-lg">

          {/* Step 1 */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ paddingTop: 26 }}>
              <StepDot number={1} active={!step1Complete} complete={step1Complete} />
            </div>
            <div style={{ flex: 1 }}>
              <SelectField
                label="Cruise Line"
                icon={<IconShip />}
                value={line}
                onChange={setLine}
                options={CRUISE_LINES}
                placeholder="Select your cruise line"
              />
            </div>
          </div>

          {divider}

          {/* Step 2 */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ paddingTop: 26 }}>
              <StepDot number={2} active={step1Complete && !step2Complete} complete={step2Complete} />
            </div>
            <div style={{ flex: 1 }}>
              <SelectField
                label="Ship"
                icon={<IconShip />}
                value={ship}
                onChange={setShip}
                options={ships}
                placeholder={line ? "Select your ship" : "Select a cruise line first"}
                disabled={!line}
              />
            </div>
          </div>

          {divider}

          {/* Step 3 */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ paddingTop: 26 }}>
              <StepDot number={3} active={step2Complete && !step3Complete} complete={step3Complete} />
            </div>
            <div style={{ flex: 1 }}>
              <SelectField
                label="Sail Date"
                icon={<IconCalendar />}
                value={date}
                onChange={setDate}
                options={sailDates.map((d) => ({ id: d, name: d }))}
                placeholder={ship ? "Select your sail date" : "Select a ship first"}
                disabled={!ship}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "var(--radius-md)", padding: "0.75rem 1rem",
          color: "var(--color-danger)", fontSize: 14,
        }}>
          {error}
        </div>
      )}

      {/* CTA button */}
      <button
        className="btn btn-primary"
        onClick={handleLoad}
        disabled={!canLoad || loading}
        style={{
          background: canLoad ? "var(--color-primary)" : "var(--color-border-strong)",
          color: canLoad ? "#fff" : "var(--color-text-muted)",
          cursor: canLoad && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "Loading Itinerary…" : "Load My Itinerary →"}
      </button>

      {/* Feature chips */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}>
        {[
          { icon: "🗺️", label: "Auto-loaded port times" },
          { icon: "⭐", label: "Top-rated only" },
          { icon: "🎯", label: "Matches your preferences" },
        ].map((f) => (
          <div key={f.label} style={{
            background: "var(--color-surface-2)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem 0.5rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
