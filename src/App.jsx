import { useState } from "react";
import "./styles/global.css";
import AppShell from "./components/layout/AppShell";
import HomeScreen from "./components/screens/HomeScreen";
import PortListScreen from "./components/screens/PortListScreen";
import PortDayScreen from "./components/screens/PortDayScreen";
import ResultsScreen from "./components/screens/ResultsScreen";
import PlanScreen from "./components/screens/PlanScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [appState, setAppState] = useState({
    cruise: { line: "", ship: "", sail_date: "" },
    itinerary: [],
    selectedPort: null,
    userPreferences: {
      activity_types: [],
      family_friendly: false,
      accessibility: false,
      stroller_friendly: false,
      shade_required: false,
      bathroom_access: false,
      fitness_level: "",
      price_range: 2,
      duration_hours: [1, 8],
      group_size: "",
      transportation: [],
    },
    results: { excursions: [], dining: [], activities: [], resorts: [] },
    plan: [],
  });

  const navigate = (screen) => setCurrentScreen(screen);
  const updateAppState = (updates) =>
    setAppState((prev) => ({ ...prev, ...updates }));

  const screens = {
    home:    <HomeScreen     appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    ports:   <PortListScreen appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    portday: <PortDayScreen  appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    results: <ResultsScreen  appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    plan:    <PlanScreen     appState={appState} updateAppState={updateAppState} navigate={navigate} />,
  };

  return (
    <AppShell currentScreen={currentScreen} navigate={navigate} appState={appState}>
      {screens[currentScreen]}
    </AppShell>
  );
}
