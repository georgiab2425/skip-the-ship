// ─── Cruise Lines & Ships ────────────────────────────────────
export const CRUISE_LINES = [
  { id: "royal", name: "Royal Caribbean" },
  { id: "carnival", name: "Carnival Cruise Line" },
  { id: "ncl", name: "Norwegian Cruise Line" },
  { id: "celebrity", name: "Celebrity Cruises" },
  { id: "princess", name: "Princess Cruises" },
  { id: "disney", name: "Disney Cruise Line" },
  { id: "msc", name: "MSC Cruises" },
  { id: "holland", name: "Holland America Line" },
];

export const SHIPS = {
  royal: [
    { id: "wonder", name: "Wonder of the Seas" },
    { id: "icon", name: "Icon of the Seas" },
    { id: "symphony", name: "Symphony of the Seas" },
    { id: "oasis", name: "Oasis of the Seas" },
    { id: "allure", name: "Allure of the Seas" },
    { id: "harmony", name: "Harmony of the Seas" },
  ],
  carnival: [
    { id: "celebration", name: "Carnival Celebration" },
    { id: "jubilee", name: "Carnival Jubilee" },
    { id: "mardi_gras", name: "Mardi Gras" },
    { id: "venezia", name: "Carnival Venezia" },
    { id: "horizon", name: "Carnival Horizon" },
  ],
  ncl: [
    { id: "prima", name: "Norwegian Prima" },
    { id: "viva", name: "Norwegian Viva" },
    { id: "bliss", name: "Norwegian Bliss" },
    { id: "encore", name: "Norwegian Encore" },
    { id: "joy", name: "Norwegian Joy" },
  ],
  celebrity: [
    { id: "beyond", name: "Celebrity Beyond" },
    { id: "ascent", name: "Celebrity Ascent" },
    { id: "edge", name: "Celebrity Edge" },
    { id: "apex", name: "Celebrity Apex" },
    { id: "equinox", name: "Celebrity Equinox" },
  ],
  princess: [
    { id: "sun", name: "Sun Princess" },
    { id: "sphere", name: "Sphere Princess" },
    { id: "enchanted", name: "Enchanted Princess" },
    { id: "discovery", name: "Discovery Princess" },
    { id: "royal", name: "Royal Princess" },
  ],
  disney: [
    { id: "wish", name: "Disney Wish" },
    { id: "treasure", name: "Disney Treasure" },
    { id: "fantasy", name: "Disney Fantasy" },
    { id: "dream", name: "Disney Dream" },
    { id: "magic", name: "Disney Magic" },
  ],
  msc: [
    { id: "world", name: "MSC World Europa" },
    { id: "seascape", name: "MSC Seascape" },
    { id: "seashore", name: "MSC Seashore" },
    { id: "virtuosa", name: "MSC Virtuosa" },
  ],
  holland: [
    { id: "rotterdam", name: "Rotterdam" },
    { id: "nieuw_statendam", name: "Nieuw Statendam" },
    { id: "koningsdam", name: "Koningsdam" },
    { id: "eurodam", name: "Eurodam" },
  ],
};

// ─── Sample Itineraries ──────────────────────────────────────
// In production these would come from an API.
// Keyed by: `${lineId}_${shipId}_${sailDate}`
// Fallback: keyed by `${lineId}_${shipId}` for any sail date on that ship.

export const ITINERARIES = {
  royal_wonder: [
    {
      day: 1,
      date: "Day 1",
      port: "Miami, FL",
      arrival: "Embarkation",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 2,
      date: "Day 2",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 3,
      date: "Day 3",
      port: "Cozumel, Mexico",
      arrival: "8:00 AM",
      departure: "5:00 PM",
      timezone: "CT",
      tender: false,
      sea_day: false,
    },
    {
      day: 4,
      date: "Day 4",
      port: "Roatán, Honduras",
      arrival: "7:00 AM",
      departure: "4:00 PM",
      timezone: "CT",
      tender: false,
      sea_day: false,
    },
    {
      day: 5,
      date: "Day 5",
      port: "Belize City, Belize",
      arrival: "8:00 AM",
      departure: "5:00 PM",
      timezone: "CT",
      tender: true,
      sea_day: false,
    },
    {
      day: 6,
      date: "Day 6",
      port: "Costa Maya, Mexico",
      arrival: "7:00 AM",
      departure: "3:00 PM",
      timezone: "CT",
      tender: false,
      sea_day: false,
    },
    {
      day: 7,
      date: "Day 7",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 8,
      date: "Day 8",
      port: "Miami, FL",
      arrival: "7:00 AM",
      departure: "Disembarkation",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
  ],

  royal_icon: [
    {
      day: 1,
      date: "Day 1",
      port: "Miami, FL",
      arrival: "Embarkation",
      departure: "4:30 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 2,
      date: "Day 2",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 3,
      date: "Day 3",
      port: "Nassau, Bahamas",
      arrival: "7:00 AM",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 4,
      date: "Day 4",
      port: "Perfect Day at CocoCay",
      arrival: "7:00 AM",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 5,
      date: "Day 5",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 6,
      date: "Day 6",
      port: "Miami, FL",
      arrival: "7:00 AM",
      departure: "Disembarkation",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
  ],

  carnival_mardi_gras: [
    {
      day: 1,
      date: "Day 1",
      port: "Port Canaveral, FL",
      arrival: "Embarkation",
      departure: "4:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 2,
      date: "Day 2",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 3,
      date: "Day 3",
      port: "Nassau, Bahamas",
      arrival: "8:00 AM",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 4,
      date: "Day 4",
      port: "Amber Cove, Dominican Republic",
      arrival: "8:00 AM",
      departure: "5:00 PM",
      timezone: "AT",
      tender: false,
      sea_day: false,
    },
    {
      day: 5,
      date: "Day 5",
      port: "Grand Turk, Turks & Caicos",
      arrival: "9:00 AM",
      departure: "6:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 6,
      date: "Day 6",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "ET",
      tender: false,
      sea_day: true,
    },
    {
      day: 7,
      date: "Day 7",
      port: "Port Canaveral, FL",
      arrival: "7:00 AM",
      departure: "Disembarkation",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
  ],

  ncl_bliss: [
    {
      day: 1,
      date: "Day 1",
      port: "Seattle, WA",
      arrival: "Embarkation",
      departure: "4:00 PM",
      timezone: "PT",
      tender: false,
      sea_day: false,
    },
    {
      day: 2,
      date: "Day 2",
      port: "At Sea",
      arrival: null,
      departure: null,
      timezone: "PT",
      tender: false,
      sea_day: true,
    },
    {
      day: 3,
      date: "Day 3",
      port: "Juneau, AK",
      arrival: "7:00 AM",
      departure: "9:00 PM",
      timezone: "AKT",
      tender: false,
      sea_day: false,
    },
    {
      day: 4,
      date: "Day 4",
      port: "Skagway, AK",
      arrival: "7:00 AM",
      departure: "8:30 PM",
      timezone: "AKT",
      tender: false,
      sea_day: false,
    },
    {
      day: 5,
      date: "Day 5",
      port: "Glacier Bay, AK",
      arrival: "7:00 AM",
      departure: "3:00 PM",
      timezone: "AKT",
      tender: false,
      sea_day: false,
    },
    {
      day: 6,
      date: "Day 6",
      port: "Ketchikan, AK",
      arrival: "7:30 AM",
      departure: "4:30 PM",
      timezone: "AKT",
      tender: false,
      sea_day: false,
    },
    {
      day: 7,
      date: "Day 7",
      port: "At Sea (Inside Passage)",
      arrival: null,
      departure: null,
      timezone: "PT",
      tender: false,
      sea_day: true,
    },
    {
      day: 8,
      date: "Day 8",
      port: "Vancouver, BC",
      arrival: "7:00 AM",
      departure: "Disembarkation",
      timezone: "PT",
      tender: false,
      sea_day: false,
    },
  ],

  disney_wish: [
    {
      day: 1,
      date: "Day 1",
      port: "Port Canaveral, FL",
      arrival: "Embarkation",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 2,
      date: "Day 2",
      port: "Nassau, Bahamas",
      arrival: "9:00 AM",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 3,
      date: "Day 3",
      port: "Lookout Cay (Disney's)",
      arrival: "8:00 AM",
      departure: "5:00 PM",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
    {
      day: 4,
      date: "Day 4",
      port: "Port Canaveral, FL",
      arrival: "7:30 AM",
      departure: "Disembarkation",
      timezone: "ET",
      tender: false,
      sea_day: false,
    },
  ],
};

// ─── Helper: get itinerary for a cruise selection ────────────
export function getItinerary(lineId, shipId) {
  const key = `${lineId}_${shipId}`;
  return ITINERARIES[key] || null;
}

// ─── Helper: get ships for a cruise line ────────────────────
export function getShipsForLine(lineId) {
  return SHIPS[lineId] || [];
}

// ─── Helper: get available sail dates (next 12 months) ──────
export function getSailDates(lineId, shipId) {
  // Generate Saturdays and Sundays for the next 12 months
  // In production this would come from an API
  const dates = [];
  const today = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 12);

  const d = new Date(today);
  d.setDate(d.getDate() + 3); // start at least 3 days from now

  while (d <= end) {
    const day = d.getDay();
    if (day === 0 || day === 6) { // Sunday or Saturday
      dates.push(d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }));
    }
    d.setDate(d.getDate() + 1);
  }

  return dates;
}
