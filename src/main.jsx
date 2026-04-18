import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

const css = `
  /* ── Reset & Base ─────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-tap-highlight-color: transparent; }
  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: #F4F6F9;
    color: #0D1B2A;
    min-height: 100dvh;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  button { cursor: pointer; border: none; background: none; font: inherit; -webkit-tap-highlight-color: transparent; }
  select, input { font: inherit; }

  /* ── App Shell ────────────────────────────────────────────── */
  .app { display: flex; flex-direction: column; min-height: 100dvh; }

  /* ── Top Bar ──────────────────────────────────────────────── */
  .topbar {
    height: 56px;
    background: #0D1B2A;
    border-bottom: 1px solid #1a2e42;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    font-size: 17px;
    font-weight: 800;
    color: #C9A84C;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 50;
    letter-spacing: -0.3px;
  }
  .topbar-title { letter-spacing: -0.3px; color: #C9A84C; }
  .topbar-back {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #C9A84C;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 0;
    min-height: 44px;
    min-width: 44px;
  }

  /* ── Main Content ─────────────────────────────────────────── */
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    padding-bottom: 88px;
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── Bottom Nav ───────────────────────────────────────────── */
  .bottomnav {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 68px;
    background: #0D1B2A;
    border-top: 1px solid #1a2e42;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .navbtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 500;
    color: #5a7a9a;
    padding: 6px 10px;
    min-width: 52px;
    border-radius: 12px;
    transition: color 0.15s;
    position: relative;
  }
  .navbtn.active { color: #C9A84C; font-weight: 700; }
  .navbtn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #C9A84C;
  }
  .navbtn-icon { font-size: 22px; line-height: 1; }

  /* ── Cards ────────────────────────────────────────────────── */
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(13,27,42,0.08), 0 1px 3px rgba(13,27,42,0.05);
  }
  .cardbody { padding: 1rem 1.25rem; }
  .section-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(13,27,42,0.06);
  }
  .section-header {
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f8f9fb;
    border-left: 3px solid #C9A84C;
  }
  .section-title { font-size: 14px; font-weight: 700; color: #0D1B2A; letter-spacing: -0.1px; }
  .section-body { padding: 0.875rem 1.25rem 1.125rem; }

  /* ── Buttons ──────────────────────────────────────────────── */
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 52px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    letter-spacing: -0.2px;
  }
  .btn-primary {
    background: linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 100%);
    color: #C9A84C;
    box-shadow: 0 2px 12px rgba(13,27,42,0.35);
    border: 1px solid #C9A84C;
  }
  .btn-primary:hover { box-shadow: 0 4px 20px rgba(13,27,42,0.45); }
  .btn-primary:active:not(:disabled) { transform: scale(0.97); opacity: 0.92; }
  .btn-primary:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none; border-color: transparent; }
  .btn-outline {
    background: #fff;
    color: #0D1B2A;
    border: 1.5px solid #0D1B2A;
  }
  .btn-outline:active { background: #f1f5f9; transform: scale(0.97); }
  .btn-added {
    background: #f0f9f4;
    color: #166534;
    border: 1.5px solid #16a34a;
  }
  .btn-loading {
    background: linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 100%);
    color: #C9A84C;
    opacity: 0.85;
    cursor: wait;
  }

  /* ── Form Elements ────────────────────────────────────────── */
  .formlabel {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 6px;
    display: block;
  }
  .formselect {
    width: 100%;
    height: 50px;
    padding: 0 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    background: #fff;
    margin-bottom: 1rem;
    appearance: none;
    -webkit-appearance: none;
    color: #0D1B2A;
    transition: border-color 0.15s;
  }
  .formselect:focus { outline: none; border-color: #C9A84C; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
  .formselect:disabled { opacity: 0.45; background: #f8fafc; }

  /* ── Hero ─────────────────────────────────────────────────── */
  .hero { text-align: center; padding: 1.75rem 0 1.25rem; }
  .heroicon {
    width: 80px; height: 80px;
    border-radius: 24px;
    background: linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin: 0 auto 1rem;
    box-shadow: 0 6px 24px rgba(13,27,42,0.3), 0 0 0 2px #C9A84C;
  }
  .hero h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 6px; color: #0D1B2A; }
  .hero-tagline-main {
    font-size: 13px;
    font-weight: 800;
    color: #C9A84C;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 4px;
  }
  .hero-tagline-sub {
    font-size: 15px;
    font-weight: 500;
    color: #475569;
    line-height: 1.5;
  }

  /* ── Feature chips ────────────────────────────────────────── */
  .chips { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-top: 0.75rem; }
  .chip {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-top: 3px solid #C9A84C;
    border-radius: 12px;
    padding: 0.875rem 0.5rem;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    box-shadow: 0 2px 6px rgba(13,27,42,0.06);
  }
  .chip-icon { font-size: 22px; margin-bottom: 5px; }

  /* ── Step dots ────────────────────────────────────────────── */
  .step-dot {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .step-dot-pending { background: #f1f5f9; color: #94a3b8; border: 2px solid #e2e8f0; }
  .step-dot-active  { background: #0D1B2A; color: #C9A84C; border: 2px solid #C9A84C; }
  .step-dot-done    { background: #C9A84C; color: #0D1B2A; border: 2px solid #C9A84C; }

  /* ── Port list ────────────────────────────────────────────── */
  .portcard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    transition: background 0.12s;
    gap: 12px;
  }
  .portcard:last-child { border-bottom: none; }
  .portcard:active:not(.sea) { background: #fdf8ed; }
  .portcard.sea { cursor: default; background: #fafbfc; }

  /* ── Badges ───────────────────────────────────────────────── */
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #fdf3d0; color: #7a5c00; letter-spacing: 0.01em; }
  .badge-amber { background: #fef3c7; color: #92400e; }
  .badge-gray  { background: #f1f5f9; color: #475569; }
  .badge-blue  { background: #eff6ff; color: #1e40af; }
  .badge-red   { background: #fef2f2; color: #991b1b; }

  /* ── Summary box ──────────────────────────────────────────── */
  .summary-box {
    background: linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 100%);
    border: 1px solid #C9A84C;
    border-radius: 16px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
  }
  .summary-row { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0; border-bottom: 1px solid rgba(201,168,76,0.2); }
  .summary-row:last-child { border-bottom: none; padding-bottom: 0; }
  .summary-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
  .summary-label { font-size: 10px; color: #C9A84C; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; }
  .summary-value { font-size: 15px; color: #ffffff; font-weight: 700; letter-spacing: -0.2px; }
  .summary-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; line-height: 1.4; }

  /* ── Port header ──────────────────────────────────────────── */
  .port-header {
    background: #0D1B2A;
    border-bottom: 1px solid #1a2e42;
    padding: 1rem 1rem 0.875rem;
    margin: -1rem -1rem 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 12px rgba(13,27,42,0.2);
  }
  .port-header > div:first-child { color: #ffffff; }
  .port-header > div:nth-child(2) { color: #94a3b8; }
  .time-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .time-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(201,168,76,0.15);
    color: #C9A84C;
    border: 1px solid rgba(201,168,76,0.3);
  }

  /* ── Warning box ──────────────────────────────────────────── */
  .warning-box {
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-left: 4px solid #f59e0b;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    margin-bottom: 1rem;
    font-size: 13px;
    color: #92400e;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    line-height: 1.5;
  }

  /* ── Checkboxes & radios ──────────────────────────────────── */
  .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .check-row {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 4px 0;
    cursor: pointer;
  }
  .check-row input[type=checkbox], .check-row input[type=radio] {
    width: 20px; height: 20px;
    accent-color: #0D1B2A;
    flex-shrink: 0;
    cursor: pointer;
  }
  .check-label { font-size: 14px; color: #0D1B2A; line-height: 1.3; }
  .check-icon { font-size: 17px; flex-shrink: 0; }

  /* ── Pills ────────────────────────────────────────────────── */
  .pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    padding: 9px 20px;
    border-radius: 999px;
    border: 1.5px solid #e2e8f0;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    background: #fff;
    cursor: pointer;
    transition: all 0.15s;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  .pill:active { transform: scale(0.97); }
  .pill.selected {
    background: #0D1B2A;
    color: #C9A84C;
    border-color: #C9A84C;
    box-shadow: 0 2px 8px rgba(13,27,42,0.2);
    font-weight: 700;
  }

  /* ── Sliders ──────────────────────────────────────────────── */
  .slider-wrap { padding: 4px 0 2px; }
  .slider-value { font-size: 18px; font-weight: 800; color: #0D1B2A; margin-bottom: 8px; letter-spacing: -0.5px; }
  .slider-labels { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; margin-top: 8px; font-weight: 500; }
  input[type=range] { width: 100%; accent-color: #C9A84C; cursor: pointer; height: 20px; }

  /* ── Sticky button ────────────────────────────────────────── */
  .sticky-btn {
    position: sticky;
    bottom: 76px;
    z-index: 20;
    padding-top: 0.5rem;
    background: linear-gradient(to top, #F4F6F9 60%, transparent);
    padding-bottom: 4px;
  }

  /* ── Tab bar ──────────────────────────────────────────────── */
  .tab-bar {
    display: flex;
    background: #0D1B2A;
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 1rem;
    gap: 4px;
  }
  .tab-btn {
    flex: 1;
    padding: 9px 4px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    color: #5a7a9a;
    background: transparent;
    transition: all 0.15s;
    text-align: center;
    line-height: 1.3;
  }
  .tab-btn.active {
    background: #C9A84C;
    color: #0D1B2A;
    font-weight: 800;
    box-shadow: 0 2px 8px rgba(201,168,76,0.4);
  }

  /* ── Result cards ─────────────────────────────────────────── */
  .result-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(13,27,42,0.08), 0 1px 3px rgba(13,27,42,0.04);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .result-card:active { transform: scale(0.995); box-shadow: 0 1px 4px rgba(13,27,42,0.04); }
  .result-img {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52px;
    position: relative;
    border-bottom: 1px solid #f1f5f9;
  }
  .result-body { padding: 1rem 1.25rem; }
  .result-title { font-size: 16px; font-weight: 800; color: #0D1B2A; margin-bottom: 4px; letter-spacing: -0.3px; }
  .result-desc { font-size: 13px; color: #64748b; line-height: 1.55; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .stars { color: #C9A84C; font-size: 13px; letter-spacing: -1px; }
  .rating-row { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
  .rating-num { font-size: 14px; font-weight: 800; color: #0D1B2A; }
  .rating-count { font-size: 12px; color: #94a3b8; }
  .cat-pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; }
  .cat-excursion { background: #fdf3d0; color: #7a5c00; }
  .cat-dining    { background: #dcfce7; color: #166534; }
  .cat-activity  { background: #dbeafe; color: #1e40af; }
  .cat-resort    { background: #f3e8ff; color: #7e22ce; }
  .icon-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
  .icon-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #475569; background: #f8fafc; padding: 3px 8px; border-radius: 6px; }

  /* ── Empty state ──────────────────────────────────────────── */
  .empty-state { text-align: center; padding: 2.5rem 1rem; color: #94a3b8; }

  /* ── Plan badge ───────────────────────────────────────────── */
  .plan-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    background: #C9A84C;
    color: #0D1B2A;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 800;
    margin-left: 8px;
  }

  /* ── Timeline ─────────────────────────────────────────────── */
  .timeline-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
  .timeline-line { width: 2px; flex: 1; background: #e2e8f0; margin-top: 2px; }

  /* ── Loading spinner ──────────────────────────────────────── */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { display: inline-block; width: 18px; height: 18px; border: 2px solid rgba(201,168,76,0.4); border-top-color: #C9A84C; border-radius: 50%; animation: spin 0.7s linear infinite; }

  /* ── Screen fade ──────────────────────────────────────────── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .screen-enter { animation: fadeUp 0.22s ease-out forwards; }

  /* ── Responsive ───────────────────────────────────────────── */
  @media (max-width: 400px) {
    .checkbox-grid { grid-template-columns: 1fr; }
    .pill { padding: 8px 14px; font-size: 13px; }
    .tab-btn { font-size: 10px; padding: 8px 2px; }
  }
  @media (min-width: 640px) {
    .main { padding: 1.5rem; padding-bottom: 96px; }
    .hero h1 { font-size: 32px; }
  }
`;

// ─── Data ────────────────────────────────────────────────────
const LINES = [
  { id: "royal",     name: "Royal Caribbean" },
  { id: "carnival",  name: "Carnival Cruise Line" },
  { id: "ncl",       name: "Norwegian Cruise Line" },
  { id: "disney",    name: "Disney Cruise Line" },
  { id: "celebrity", name: "Celebrity Cruises" },
  { id: "princess",  name: "Princess Cruises" },
  { id: "msc",       name: "MSC Cruises" },
  { id: "holland",   name: "Holland America Line" },
];

const SHIPS = {
  royal: [
    { id: "wonder",    name: "Wonder of the Seas" },
    { id: "icon",      name: "Icon of the Seas" },
    { id: "symphony",  name: "Symphony of the Seas" },
    { id: "oasis",     name: "Oasis of the Seas" },
    { id: "allure",    name: "Allure of the Seas" },
    { id: "harmony",   name: "Harmony of the Seas" },
    { id: "navigator", name: "Navigator of the Seas" },
    { id: "mariner",   name: "Mariner of the Seas" },
  ],
  carnival: [
    { id: "mardi_gras",    name: "Mardi Gras" },
    { id: "celebration",   name: "Carnival Celebration" },
    { id: "jubilee",       name: "Carnival Jubilee" },
    { id: "venezia",       name: "Carnival Venezia" },
    { id: "horizon",       name: "Carnival Horizon" },
    { id: "vista",         name: "Carnival Vista" },
    { id: "breeze",        name: "Carnival Breeze" },
    { id: "sunshine",      name: "Carnival Sunshine" },
    { id: "miracle",       name: "Carnival Miracle" },
    { id: "spirit",        name: "Carnival Spirit" },
    { id: "splendor",      name: "Carnival Splendor" },
    { id: "radiance",      name: "Carnival Radiance" },
  ],
  ncl: [
    { id: "prima",   name: "Norwegian Prima" },
    { id: "viva",    name: "Norwegian Viva" },
    { id: "bliss",   name: "Norwegian Bliss" },
    { id: "encore",  name: "Norwegian Encore" },
    { id: "joy",     name: "Norwegian Joy" },
    { id: "escape",  name: "Norwegian Escape" },
    { id: "getaway", name: "Norwegian Getaway" },
  ],
  disney: [
    { id: "wish",     name: "Disney Wish" },
    { id: "treasure", name: "Disney Treasure" },
    { id: "fantasy",  name: "Disney Fantasy" },
    { id: "dream",    name: "Disney Dream" },
    { id: "magic",    name: "Disney Magic" },
    { id: "wonder_d", name: "Disney Wonder" },
  ],
  celebrity: [
    { id: "beyond",   name: "Celebrity Beyond" },
    { id: "ascent",   name: "Celebrity Ascent" },
    { id: "edge",     name: "Celebrity Edge" },
    { id: "apex",     name: "Celebrity Apex" },
    { id: "equinox",  name: "Celebrity Equinox" },
    { id: "silhouette",name: "Celebrity Silhouette" },
  ],
  princess: [
    { id: "sun",        name: "Sun Princess" },
    { id: "sphere",     name: "Sphere Princess" },
    { id: "enchanted",  name: "Enchanted Princess" },
    { id: "discovery",  name: "Discovery Princess" },
    { id: "royal_p",    name: "Royal Princess" },
    { id: "majestic",   name: "Majestic Princess" },
  ],
  msc: [
    { id: "world",     name: "MSC World Europa" },
    { id: "seascape",  name: "MSC Seascape" },
    { id: "seashore",  name: "MSC Seashore" },
    { id: "virtuosa",  name: "MSC Virtuosa" },
    { id: "grandiosa", name: "MSC Grandiosa" },
    { id: "bellissima",name: "MSC Bellissima" },
  ],
  holland: [
    { id: "rotterdam",       name: "Rotterdam" },
    { id: "nieuw_statendam", name: "Nieuw Statendam" },
    { id: "koningsdam",      name: "Koningsdam" },
    { id: "eurodam",         name: "Eurodam" },
    { id: "nieuw_amsterdam", name: "Nieuw Amsterdam" },
    { id: "westerdam",       name: "Westerdam" },
  ],
};

const ITINERARIES = {
  // ── Royal Caribbean ──────────────────────────────────────────
  royal_wonder: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Roatán, Honduras",    date: "Day 4", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Belize City, Belize", date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "CT" },
    { port: "Costa Maya, Mexico",  date: "Day 6", arrival: "7:00 AM",      departure: "3:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  royal_icon: [
    { port: "Miami, FL",              date: "Day 1", arrival: "Embarkation", departure: "4:30 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",                 date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",        date: "Day 3", arrival: "7:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Perfect Day at CocoCay", date: "Day 4", arrival: "7:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",                 date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",              date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  royal_symphony: [
    { port: "Barcelona, Spain",   date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Palma, Mallorca",    date: "Day 2", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Provence, France",   date: "Day 3", arrival: "8:00 AM",      departure: "7:00 PM",        tender: true,  sea_day: false, timezone: "CET" },
    { port: "Florence/Pisa",      date: "Day 4", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Rome, Italy",        date: "Day 5", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",      date: "Day 6", arrival: "7:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "At Sea",             date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CET" },
    { port: "Barcelona, Spain",   date: "Day 8", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CET" },
  ],
  royal_navigator: [
    { port: "Galveston, TX",      date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",             date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Cozumel, Mexico",    date: "Day 3", arrival: "10:00 AM",     departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Costa Maya, Mexico", date: "Day 4", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",             date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Galveston, TX",      date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CT" },
  ],

  // ── Carnival ──────────────────────────────────────────────────
  carnival_mardi_gras: [
    { port: "Port Canaveral, FL",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",                     date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",            date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Amber Cove, Dominican Rep.", date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "Grand Turk",                 date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",                     date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Port Canaveral, FL",         date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  carnival_horizon: [
    { port: "Miami, FL",          date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",             date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Ocho Rios, Jamaica", date: "Day 3", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "George Town, Cayman",date: "Day 4", arrival: "7:00 AM",      departure: "3:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Cozumel, Mexico",    date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",             date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",          date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Norwegian ─────────────────────────────────────────────────
  ncl_bliss: [
    { port: "Seattle, WA",   date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",        date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",    date: "Day 3", arrival: "7:00 AM",      departure: "9:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Skagway, AK",   date: "Day 4", arrival: "7:00 AM",      departure: "8:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK", date: "Day 5", arrival: "7:30 AM",      departure: "4:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Vancouver, BC", date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],
  ncl_escape: [
    { port: "New York, NY",        date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Orlando/Canaveral",   date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 4", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Great Stirrup Cay",   date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "New York, NY",        date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Disney ────────────────────────────────────────────────────
  disney_wish: [
    { port: "Port Canaveral, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",    date: "Day 2", arrival: "9:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Lookout Cay",        date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Port Canaveral, FL", date: "Day 4", arrival: "7:30 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  disney_fantasy: [
    { port: "Port Canaveral, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",             date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "St. Thomas, USVI",   date: "Day 3", arrival: "8:00 AM",      departure: "5:30 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Maarten",        date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",             date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Castaway Cay",       date: "Day 6", arrival: "9:00 AM",      departure: "5:30 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Port Canaveral, FL", date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Celebrity ─────────────────────────────────────────────────
  celebrity_beyond: [
    { port: "Fort Lauderdale, FL",  date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",               date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "San Juan, Puerto Rico",date: "Day 3", arrival: "2:00 PM",      departure: "11:00 PM",       tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Thomas, USVI",     date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Kitts",            date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "Antigua",              date: "Day 6", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",               date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL",  date: "Day 8", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  celebrity_edge: [
    { port: "Barcelona, Spain",  date: "Day 1", arrival: "Embarkation", departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Provence, France",  date: "Day 2", arrival: "8:00 AM",      departure: "6:00 PM",        tender: true,  sea_day: false, timezone: "CET" },
    { port: "Rome, Italy",       date: "Day 3", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",     date: "Day 4", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Mykonos, Greece",   date: "Day 5", arrival: "1:00 PM",      departure: "11:00 PM",       tender: true,  sea_day: false, timezone: "EET" },
    { port: "Santorini, Greece", date: "Day 6", arrival: "7:00 AM",      departure: "6:00 PM",        tender: true,  sea_day: false, timezone: "EET" },
    { port: "Athens, Greece",    date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "EET" },
  ],

  // ── Princess ──────────────────────────────────────────────────
  princess_enchanted: [
    { port: "Fort Lauderdale, FL",  date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",               date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Princess Cays",        date: "Day 3", arrival: "8:00 AM",      departure: "4:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",      date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",               date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL",  date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  princess_discovery: [
    { port: "Los Angeles, CA",    date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",             date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Puerto Vallarta",    date: "Day 3", arrival: "8:00 AM",      departure: "8:00 PM",        tender: false, sea_day: false, timezone: "MT" },
    { port: "Mazatlán, Mexico",   date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "MT" },
    { port: "Cabo San Lucas",     date: "Day 5", arrival: "7:00 AM",      departure: "3:00 PM",        tender: true,  sea_day: false, timezone: "MT" },
    { port: "At Sea",             date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Los Angeles, CA",    date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT" },
  ],

  // ── Holland America ───────────────────────────────────────────
  holland_rotterdam: [
    { port: "Seattle, WA",        date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",             date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",         date: "Day 3", arrival: "8:00 AM",      departure: "8:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Glacier Bay, AK",    date: "Day 4", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Sitka, AK",          date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",      date: "Day 6", arrival: "7:00 AM",      departure: "3:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",       date: "Day 7", arrival: "6:00 PM",      departure: "11:30 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",        date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],

  // ── MSC ───────────────────────────────────────────────────────
  msc_seascape: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Puerto Plata, DR",    date: "Day 3", arrival: "9:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "San Juan, Puerto Rico",date:"Day 4", arrival: "2:00 PM",      departure: "10:00 PM",       tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Maarten",         date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  // ── Royal Caribbean (missing ships) ──────────────────────────
  royal_oasis: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Labadee, Haiti",      date: "Day 3", arrival: "7:00 AM",      departure: "3:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Falmouth, Jamaica",   date: "Day 4", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "George Town, Cayman", date: "Day 5", arrival: "7:00 AM",      departure: "3:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 6", arrival: "10:00 AM",     departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  royal_allure: [
    { port: "Port Canaveral, FL",  date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "7:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Perfect Day at CocoCay", date: "Day 4", arrival: "7:00 AM",  departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Port Canaveral, FL",  date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  royal_harmony: [
    { port: "Barcelona, Spain",    date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Provence, France",    date: "Day 2", arrival: "8:00 AM",      departure: "6:00 PM",        tender: true,  sea_day: false, timezone: "CET" },
    { port: "Florence/Pisa",       date: "Day 3", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Rome, Italy",         date: "Day 4", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",       date: "Day 5", arrival: "7:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Palma, Mallorca",     date: "Day 6", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "At Sea",              date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CET" },
    { port: "Barcelona, Spain",    date: "Day 8", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CET" },
  ],
  royal_mariner: [
    { port: "Los Angeles, CA",     date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Ensenada, Mexico",    date: "Day 3", arrival: "8:00 AM",      departure: "10:00 PM",       tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",              date: "Day 4", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Los Angeles, CA",     date: "Day 5", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT" },
  ],

  // ── Carnival (missing ships) ──────────────────────────────────
  carnival_celebration: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Freeport, Bahamas",   date: "Day 4", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  carnival_jubilee: [
    { port: "Galveston, TX",       date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Mahogany Bay, Roatán",date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Belize City, Belize", date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "CT" },
    { port: "Cozumel, Mexico",     date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Galveston, TX",       date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CT" },
  ],
  carnival_venezia: [
    { port: "New York, NY",        date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Grand Turk",          date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "New York, NY",        date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  carnival_vista: [
    { port: "Galveston, TX",       date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Costa Maya, Mexico",  date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Belize City, Belize", date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "CT" },
    { port: "Cozumel, Mexico",     date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CT" },
    { port: "Galveston, TX",       date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CT" },
  ],
  carnival_breeze: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Ocho Rios, Jamaica",  date: "Day 3", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "George Town, Cayman", date: "Day 4", arrival: "7:00 AM",      departure: "3:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  carnival_sunshine: [
    { port: "Charleston, SC",      date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 4", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Charleston, SC",      date: "Day 5", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  carnival_miracle: [
    { port: "Seattle, WA",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",          date: "Day 3", arrival: "8:00 AM",      departure: "9:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Skagway, AK",         date: "Day 4", arrival: "7:00 AM",      departure: "8:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Glacier Bay, AK",     date: "Day 5", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",       date: "Day 6", arrival: "7:30 AM",      departure: "4:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",        date: "Day 7", arrival: "6:00 PM",      departure: "11:30 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",         date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],
  carnival_spirit: [
    { port: "Seattle, WA",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",          date: "Day 3", arrival: "8:00 AM",      departure: "9:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Skagway, AK",         date: "Day 4", arrival: "7:00 AM",      departure: "8:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Glacier Bay, AK",     date: "Day 5", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",       date: "Day 6", arrival: "7:30 AM",      departure: "4:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",        date: "Day 7", arrival: "6:00 PM",      departure: "11:30 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",         date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],
  carnival_splendor: [
    { port: "Long Beach, CA",      date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Puerto Vallarta",     date: "Day 3", arrival: "8:00 AM",      departure: "8:00 PM",        tender: false, sea_day: false, timezone: "MT" },
    { port: "Mazatlán, Mexico",    date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "MT" },
    { port: "Cabo San Lucas",      date: "Day 5", arrival: "7:00 AM",      departure: "3:00 PM",        tender: true,  sea_day: false, timezone: "MT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Long Beach, CA",      date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT" },
  ],
  carnival_radiance: [
    { port: "Baltimore, MD",       date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Freeport, Bahamas",   date: "Day 4", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Baltimore, MD",       date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Norwegian (missing ships) ─────────────────────────────────
  ncl_prima: [
    { port: "New York, NY",        date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "San Juan, Puerto Rico",date:"Day 3", arrival: "2:00 PM",      departure: "11:00 PM",       tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Thomas, USVI",    date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "Great Stirrup Cay",   date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "New York, NY",        date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  ncl_viva: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 3", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Costa Maya, Mexico",  date: "Day 4", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Roatán, Honduras",    date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  ncl_encore: [
    { port: "Seattle, WA",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",          date: "Day 3", arrival: "7:00 AM",      departure: "9:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Skagway, AK",         date: "Day 4", arrival: "7:00 AM",      departure: "8:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Glacier Bay, AK",     date: "Day 5", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",       date: "Day 6", arrival: "7:30 AM",      departure: "4:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",        date: "Day 7", arrival: "6:00 PM",      departure: "11:00 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",         date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],
  ncl_joy: [
    { port: "New York, NY",        date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Great Stirrup Cay",   date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "New York, NY",        date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  ncl_getaway: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Roatán, Honduras",    date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Belize City, Belize", date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "CT" },
    { port: "Cozumel, Mexico",     date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Disney (missing ships) ────────────────────────────────────
  disney_treasure: [
    { port: "Port Canaveral, FL",  date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 2", arrival: "9:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Castaway Cay",        date: "Day 3", arrival: "9:00 AM",      departure: "5:30 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Port Canaveral, FL",  date: "Day 4", arrival: "7:30 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  disney_dream: [
    { port: "Port Canaveral, FL",  date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 2", arrival: "9:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Castaway Cay",        date: "Day 3", arrival: "9:00 AM",      departure: "5:30 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Port Canaveral, FL",  date: "Day 4", arrival: "7:30 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  disney_magic: [
    { port: "New York, NY",        date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Castaway Cay",        date: "Day 4", arrival: "9:00 AM",      departure: "5:30 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "New York, NY",        date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  disney_wonder_d: [
    { port: "Los Angeles, CA",     date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Ensenada, Mexico",    date: "Day 3", arrival: "8:00 AM",      departure: "10:00 PM",       tender: false, sea_day: false, timezone: "PT" },
    { port: "At Sea",              date: "Day 4", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT" },
    { port: "Los Angeles, CA",     date: "Day 5", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT" },
  ],

  // ── Celebrity (missing ships) ─────────────────────────────────
  celebrity_ascent: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "San Juan, Puerto Rico",date:"Day 3", arrival: "2:00 PM",      departure: "11:00 PM",       tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Kitts",           date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "Antigua",             date: "Day 5", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Maarten",         date: "Day 6", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",              date: "Day 7", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 8", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  celebrity_apex: [
    { port: "Southampton, UK",     date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "BST" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Lisbon, Portugal",    date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "WET" },
    { port: "Vigo, Spain",         date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Southampton, UK",     date: "Day 6", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "BST" },
  ],
  celebrity_equinox: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "St. Thomas, USVI",    date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "San Juan, Puerto Rico",date:"Day 5", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  celebrity_silhouette: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Costa Maya, Mexico",  date: "Day 4", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "Roatán, Honduras",    date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],

  // ── Princess (missing ships) ──────────────────────────────────
  princess_sun: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Princess Cays",       date: "Day 3", arrival: "8:00 AM",      departure: "4:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  princess_sphere: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Amber Cove, DR",      date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "San Juan, Puerto Rico",date:"Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "St. Thomas, USVI",    date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  princess_royal_p: [
    { port: "Southampton, UK",     date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "BST" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Vigo, Spain",         date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "WET" },
    { port: "Lisbon, Portugal",    date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "WET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Southampton, UK",     date: "Day 6", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "BST" },
  ],
  princess_majestic: [
    { port: "Barcelona, Spain",    date: "Day 1", arrival: "Embarkation", departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Provence, France",    date: "Day 2", arrival: "8:00 AM",      departure: "6:00 PM",        tender: true,  sea_day: false, timezone: "CET" },
    { port: "Florence/Pisa",       date: "Day 3", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Rome, Italy",         date: "Day 4", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",       date: "Day 5", arrival: "7:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CET" },
    { port: "Barcelona, Spain",    date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CET" },
  ],

  // ── Holland America (missing ships) ──────────────────────────
  holland_nieuw_statendam: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Grand Turk",          date: "Day 4", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Amber Cove, DR",      date: "Day 5", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "AT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  holland_koningsdam: [
    { port: "Seattle, WA",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",          date: "Day 3", arrival: "8:00 AM",      departure: "8:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Skagway, AK",         date: "Day 4", arrival: "7:00 AM",      departure: "8:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Glacier Bay, AK",     date: "Day 5", arrival: "7:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",       date: "Day 6", arrival: "7:00 AM",      departure: "3:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",        date: "Day 7", arrival: "6:00 PM",      departure: "11:30 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",         date: "Day 8", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],
  holland_eurodam: [
    { port: "Amsterdam, Netherlands",date:"Day 1", arrival: "Embarkation", departure: "5:00 PM",       tender: false, sea_day: false, timezone: "CET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CET" },
    { port: "Bergen, Norway",      date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Flam, Norway",        date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Geiranger, Norway",   date: "Day 5", arrival: "7:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "CET" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "CET" },
    { port: "Amsterdam, Netherlands",date:"Day 7", arrival: "6:00 AM",    departure: "Disembarkation",  tender: false, sea_day: false, timezone: "CET" },
  ],
  holland_nieuw_amsterdam: [
    { port: "Fort Lauderdale, FL", date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Half Moon Cay",       date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 4", arrival: "8:00 AM",      departure: "4:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Fort Lauderdale, FL", date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  holland_westerdam: [
    { port: "Seattle, WA",         date: "Day 1", arrival: "Embarkation", departure: "4:00 PM",        tender: false, sea_day: false, timezone: "PT"  },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "PT"  },
    { port: "Juneau, AK",          date: "Day 3", arrival: "8:00 AM",      departure: "8:00 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Sitka, AK",           date: "Day 4", arrival: "8:00 AM",      departure: "5:00 PM",        tender: true,  sea_day: false, timezone: "AKT" },
    { port: "Ketchikan, AK",       date: "Day 5", arrival: "7:30 AM",      departure: "4:30 PM",        tender: false, sea_day: false, timezone: "AKT" },
    { port: "Victoria, BC",        date: "Day 6", arrival: "6:00 PM",      departure: "11:30 PM",       tender: false, sea_day: false, timezone: "PT"  },
    { port: "Seattle, WA",         date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "PT"  },
  ],

  // ── MSC (missing ships) ───────────────────────────────────────
  msc_world: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Nassau, Bahamas",     date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "Ocean Cay MSC Marine Reserve",date:"Day 4",arrival:"8:00 AM",departure: "11:00 PM",       tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 6", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  msc_seashore: [
    { port: "Miami, FL",           date: "Day 1", arrival: "Embarkation", departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Ocho Rios, Jamaica",  date: "Day 3", arrival: "8:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "ET" },
    { port: "George Town, Cayman", date: "Day 4", arrival: "7:00 AM",      departure: "3:30 PM",        tender: true,  sea_day: false, timezone: "ET" },
    { port: "Cozumel, Mexico",     date: "Day 5", arrival: "9:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CT" },
    { port: "At Sea",              date: "Day 6", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "ET" },
    { port: "Miami, FL",           date: "Day 7", arrival: "7:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "ET" },
  ],
  msc_virtuosa: [
    { port: "Southampton, UK",     date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "BST" },
    { port: "At Sea",              date: "Day 2", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Vigo, Spain",         date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "WET" },
    { port: "Lisbon, Portugal",    date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "WET" },
    { port: "At Sea",              date: "Day 5", arrival: null,           departure: null,              tender: false, sea_day: true,  timezone: "BST" },
    { port: "Southampton, UK",     date: "Day 6", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "BST" },
  ],
  msc_grandiosa: [
    { port: "Genoa, Italy",        date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",       date: "Day 2", arrival: "9:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Palermo, Sicily",     date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Valletta, Malta",     date: "Day 4", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Barcelona, Spain",    date: "Day 5", arrival: "9:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Marseille, France",   date: "Day 6", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Genoa, Italy",        date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CET" },
  ],
  msc_bellissima: [
    { port: "Marseille, France",   date: "Day 1", arrival: "Embarkation", departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Barcelona, Spain",    date: "Day 2", arrival: "9:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Palma, Mallorca",     date: "Day 3", arrival: "8:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Rome, Italy",         date: "Day 4", arrival: "7:00 AM",      departure: "7:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Naples, Italy",       date: "Day 5", arrival: "7:00 AM",      departure: "6:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Genoa, Italy",        date: "Day 6", arrival: "7:00 AM",      departure: "5:00 PM",        tender: false, sea_day: false, timezone: "CET" },
    { port: "Marseille, France",   date: "Day 7", arrival: "6:00 AM",      departure: "Disembarkation", tender: false, sea_day: false, timezone: "CET" },
  ],

};


// ─── Port Data ────────────────────────────────────────────────
const PORT_DATA = {
  "Cozumel, Mexico": {
    excursions: [
      { id:"cx1", title:"Tulum Ruins & Cenote Swim", desc:"Explore the breathtaking Mayan ruins of Tulum perched above the sea, then cool off in a stunning natural cenote.", duration:6, price:2, rating:4.9, reviews:1842, distance:"45 min drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Historical","Cultural","Water Activities"], emoji:"🏛️" },
      { id:"cx2", title:"Cozumel Snorkel & Beach Club", desc:"Snorkel the famous Palancar Reef, one of the world's top dive sites, then relax at an all-inclusive beach club.", duration:5, price:2, rating:4.8, reviews:2341, distance:"20 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Water Activities","Beach Day"], emoji:"🐠" },
      { id:"cx3", title:"ATV & Zip Line Adventure", desc:"Race through the jungle on ATVs then soar above the treetops on thrilling zip lines across the Cozumel interior.", duration:4, price:2, rating:4.7, reviews:987, distance:"15 min drive", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure"], emoji:"🏍️" },
      { id:"cx4", title:"San Gervasio Mayan Ruins", desc:"Self-guided tour of the sacred Mayan site dedicated to Ixchel. Less crowded than Tulum, more authentic.", duration:3, price:1, rating:4.6, reviews:654, distance:"20 min drive", fitness:"Low", transport:["shuttle","walking"], family:true, accessibility:true, types:["Historical","Cultural","Scenic"], emoji:"🗿" },
      { id:"cx5", title:"Fury Catamaran Snorkel Sail", desc:"Sail on a luxury catamaran to two snorkel sites with open bar and all gear included. Perfect for all ages.", duration:4, price:2, rating:4.8, reviews:1523, distance:"10 min walk", fitness:"Low", transport:["walking","boat"], family:true, accessibility:false, types:["Water Activities","Beach Day","Relaxation"], emoji:"⛵" },
    ],
    dining: [
      { id:"cd1", title:"Kondesa", desc:"Upscale Mexican cuisine in a beautifully restored colonial building. Famous for fresh ceviche and local mezcal.", cuisine:"Mexican Fine Dining", price:3, rating:4.8, reviews:892, distance:"5 min walk", kidFriendly:false, hours:"12:00 PM – 11:00 PM", emoji:"🍽️" },
      { id:"cd2", title:"Kinta Mexican Bistro", desc:"Modern Mexican bistro with creative cocktails and the best fish tacos on the island.", cuisine:"Modern Mexican", price:2, rating:4.7, reviews:1243, distance:"8 min walk", kidFriendly:true, hours:"11:00 AM – 10:00 PM", emoji:"🌮" },
      { id:"cd3", title:"Guido's Restaurant", desc:"Beloved Italian spot serving wood-fired pizza and homemade pasta steps from the waterfront since 1975.", cuisine:"Italian", price:2, rating:4.6, reviews:765, distance:"10 min walk", kidFriendly:true, hours:"11:00 AM – 10:30 PM", emoji:"🍕" },
      { id:"cd4", title:"Casa Mission", desc:"Sprawling hacienda restaurant serving traditional Yucatan specialties in a stunning courtyard setting.", cuisine:"Yucatan Traditional", price:2, rating:4.7, reviews:543, distance:"12 min walk", kidFriendly:true, hours:"12:00 PM – 9:00 PM", emoji:"🏡" },
      { id:"cd5", title:"La Cocay", desc:"Caribbean-inspired fusion cuisine with an eclectic menu of fresh seafood and international plates.", cuisine:"Caribbean Fusion", price:2, rating:4.5, reviews:421, distance:"7 min walk", kidFriendly:false, hours:"5:00 PM – 10:30 PM", emoji:"🦞" },
    ],
    activities: [
      { id:"ca1", title:"Cozumel Waterfront Malecon Walk", desc:"Stroll the scenic oceanfront promenade lined with local shops, street art, and stunning Caribbean views.", duration:2, price:0, rating:4.7, reviews:2103, distance:"2 min walk", fitness:"Low", family:true, accessibility:true, types:["Scenic","Shopping"], emoji:"🚶" },
      { id:"ca2", title:"San Miguel Market & Shopping", desc:"Explore the colorful local market for handmade crafts, silver jewelry, vanilla, and authentic Mexican souvenirs.", duration:2, price:0, rating:4.5, reviews:876, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping","Cultural"], emoji:"🛍️" },
      { id:"ca3", title:"Chocolate Making Workshop", desc:"Learn the ancient Mayan art of chocolate-making using traditional techniques and local cacao.", duration:2, price:1, rating:4.8, reviews:432, distance:"8 min walk", fitness:"Low", family:true, accessibility:true, types:["Cultural","Food & Drink"], emoji:"🍫" },
      { id:"ca4", title:"Punta Sur Eco Beach Park", desc:"Pristine ecological reserve with a lighthouse, crocodile lagoon, and gorgeous empty beaches on the southern tip.", duration:4, price:1, rating:4.6, reviews:678, distance:"40 min drive", fitness:"Low", family:true, accessibility:false, types:["Wildlife","Scenic","Beach Day"], emoji:"🦎" },
    ],
    resorts: [
      { id:"cr1", title:"Nachi Cocom Beach Club", desc:"Premier all-inclusive beach club with pools, open bar, and beach loungers. No cruise ship crowds.", price:2, rating:4.8, reviews:1432, distance:"5 min taxi", family:true, emoji:"🏖️" },
      { id:"cr2", title:"Mr. Sancho's Beach Club", desc:"Lively all-inclusive beach club with a huge pool, water slide, and great food. Very family-friendly.", price:2, rating:4.6, reviews:2134, distance:"10 min taxi", family:true, emoji:"🌴" },
    ],
  },

  "Roatán, Honduras": {
    excursions: [
      { id:"rx1", title:"West Bay Beach & Snorkel", desc:"Visit one of the Caribbean's most beautiful beaches and snorkel the Mesoamerican Barrier Reef just offshore.", duration:5, price:1, rating:4.9, reviews:1654, distance:"30 min drive", fitness:"Low", transport:["shuttle"], family:true, accessibility:false, types:["Beach Day","Water Activities"], emoji:"🏖️" },
      { id:"rx2", title:"Gumbalimba Park Wildlife", desc:"Meet Honduran wildlife including monkeys, macaws, and sloths in a lush tropical jungle setting.", duration:4, price:2, rating:4.7, reviews:987, distance:"20 min drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Wildlife","Adventure"], emoji:"🐒" },
      { id:"rx3", title:"Roatán Zip Line Canopy Tour", desc:"14 platforms soaring through the jungle canopy with spectacular views of the Caribbean coast below.", duration:3, price:2, rating:4.8, reviews:756, distance:"25 min drive", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure"], emoji:"🌿" },
      { id:"rx4", title:"Scuba Diving — Barrier Reef", desc:"Dive the second-largest barrier reef in the world with certified instructors. All skill levels welcome.", duration:4, price:3, rating:4.9, reviews:543, distance:"15 min boat", fitness:"Moderate", transport:["boat"], family:false, accessibility:false, types:["Water Activities","Adventure"], emoji:"🤿" },
      { id:"rx5", title:"Village & Butterfly Garden Tour", desc:"Explore colorful Punta Gorda, visit the butterfly garden and learn about Garífuna culture.", duration:3, price:1, rating:4.5, reviews:432, distance:"35 min drive", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Cultural","Wildlife"], emoji:"🦋" },
    ],
    dining: [
      { id:"rd1", title:"Sundowners Bar & Grill", desc:"Iconic beachside bar and grill with the best sunset views on the island and fresh-caught seafood daily.", cuisine:"Seafood & Grill", price:2, rating:4.7, reviews:654, distance:"25 min drive", kidFriendly:true, hours:"10:00 AM – 9:00 PM", emoji:"🌅" },
      { id:"rd2", title:"Roatán Oasis", desc:"Waterfront restaurant serving authentic Honduran cuisine with a focus on fresh seafood and local flavors.", cuisine:"Honduran", price:1, rating:4.6, reviews:432, distance:"10 min walk", kidFriendly:true, hours:"8:00 AM – 8:00 PM", emoji:"🐟" },
      { id:"rd3", title:"The Canopy Restaurant", desc:"Elevated dining in a jungle setting with creative fusion cuisine and spectacular canopy views.", cuisine:"Fusion", price:2, rating:4.5, reviews:321, distance:"20 min drive", kidFriendly:false, hours:"11:00 AM – 9:00 PM", emoji:"🌳" },
    ],
    activities: [
      { id:"ra1", title:"Mahogany Bay Beach", desc:"The cruise port's own beach with calm warm water, beach chairs, and a scenic chair lift ride down.", duration:3, price:0, rating:4.5, reviews:2341, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
      { id:"ra2", title:"Arch's Iguana Farm", desc:"Visit hundreds of iguanas in their natural habitat. Kids absolutely love hand-feeding these prehistoric creatures.", duration:1, price:0, rating:4.6, reviews:876, distance:"15 min drive", fitness:"Low", family:true, accessibility:true, types:["Wildlife"], emoji:"🦎" },
      { id:"ra3", title:"Local Craft Market", desc:"Browse local artisans selling handmade wooden carvings, jewelry, and Honduran crafts right at the port.", duration:1, price:0, rating:4.3, reviews:543, distance:"2 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping"], emoji:"🛍️" },
    ],
    resorts: [
      { id:"rr1", title:"Fantasy Island Resort Day Pass", desc:"Full day pass to this stunning island resort with pools, beach, and watersports included.", price:2, rating:4.7, reviews:876, distance:"15 min boat", family:true, emoji:"🏝️" },
    ],
  },

  "Belize City, Belize": {
    excursions: [
      { id:"bx1", title:"Great Blue Hole Snorkel Tour", desc:"Snorkel the world-famous Great Blue Hole and Lighthouse Reef Atoll — a UNESCO World Heritage site.", duration:7, price:3, rating:4.9, reviews:1243, distance:"1 hr boat", fitness:"Moderate", transport:["boat"], family:false, accessibility:false, types:["Water Activities","Adventure","Scenic"], emoji:"🔵" },
      { id:"bx2", title:"Lamanai Mayan Ruins by Boat", desc:"Journey by riverboat through the jungle to the ancient Mayan city of Lamanai, spotting wildlife en route.", duration:8, price:3, rating:4.9, reviews:987, distance:"2 hr boat+drive", fitness:"Moderate", transport:["boat","shuttle"], family:true, accessibility:false, types:["Historical","Wildlife","Cultural"], emoji:"🏛️" },
      { id:"bx3", title:"Cave Tubing & Zip Line", desc:"Float through ancient Mayan ceremonial caves on inner tubes then zip through the jungle canopy.", duration:6, price:2, rating:4.8, reviews:1876, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Adventure","Water Activities"], emoji:"🕳️" },
      { id:"bx4", title:"Shark Ray Alley Snorkel", desc:"Snorkel alongside nurse sharks and stingrays in the shallow turquoise waters of Hol Chan Marine Reserve.", duration:4, price:2, rating:4.8, reviews:1543, distance:"45 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Water Activities","Wildlife"], emoji:"🦈" },
      { id:"bx5", title:"Altun Ha Ruins & River Wallace", desc:"Visit the iconic jade head temple of Altun Ha then cruise the Belize River spotting crocodiles and birds.", duration:5, price:2, rating:4.7, reviews:765, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Historical","Wildlife"], emoji:"🗿" },
    ],
    dining: [
      { id:"bd1", title:"Elvi's Kitchen", desc:"Beloved Belizean institution serving authentic local cuisine for over 40 years. A must-try on the island.", cuisine:"Belizean", price:1, rating:4.8, reviews:1243, distance:"15 min tender+walk", kidFriendly:true, hours:"11:00 AM – 9:30 PM", emoji:"🍲" },
      { id:"bd2", title:"Wet Lizard Restaurant", desc:"Casual waterfront spot serving fresh seafood, local rice and beans, and refreshing tropical cocktails.", cuisine:"Seafood & Local", price:1, rating:4.5, reviews:765, distance:"10 min tender+walk", kidFriendly:true, hours:"7:00 AM – 9:00 PM", emoji:"🦎" },
      { id:"bd3", title:"Palmilla Restaurant", desc:"Fine dining on the water with creative Caribbean fusion cuisine and an extensive rum and cocktail menu.", cuisine:"Caribbean Fusion", price:3, rating:4.7, reviews:432, distance:"20 min tender+walk", kidFriendly:false, hours:"12:00 PM – 10:00 PM", emoji:"🌴" },
    ],
    activities: [
      { id:"ba1", title:"San Pedro Town Stroll", desc:"Wander the colorful streets of San Pedro town, browse local shops, and soak up authentic Belizean culture.", duration:2, price:0, rating:4.5, reviews:1087, distance:"15 min tender+walk", fitness:"Low", family:true, accessibility:true, types:["Cultural","Shopping"], emoji:"🚶" },
      { id:"ba2", title:"Belize City Water Taxi Tour", desc:"Take the local water taxi to Caye Caulker for a laid-back island experience — the ultimate slow travel day.", duration:4, price:1, rating:4.7, reviews:654, distance:"45 min boat", fitness:"Low", family:true, accessibility:false, types:["Scenic","Relaxation"], emoji:"⛵" },
      { id:"ba3", title:"Chocolate Museum Tour", desc:"Discover the ancient Mayan origins of chocolate and taste fresh-made cacao products at this unique museum.", duration:1, price:0, rating:4.6, reviews:432, distance:"20 min tender+walk", fitness:"Low", family:true, accessibility:true, types:["Cultural","Food & Drink"], emoji:"🍫" },
    ],
    resorts: [
      { id:"br1", title:"Victoria House Resort Day Pass", desc:"Exclusive day pass to this luxury boutique resort on Ambergris Caye with pool, beach, and lunch included.", price:3, rating:4.9, reviews:432, distance:"30 min boat", family:false, emoji:"🏡" },
    ],
  },

  "Costa Maya, Mexico": {
    excursions: [
      { id:"mx1", title:"Chacchoben Mayan Ruins", desc:"One of the most impressive and least-visited Mayan sites in Mexico, set deep in the lush jungle.", duration:4, price:2, rating:4.9, reviews:1543, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Historical","Cultural"], emoji:"🏛️" },
      { id:"mx2", title:"Bacalar Lagoon Boat Tour", desc:"Cruise the stunning Lake of Seven Colors — a freshwater lagoon with impossibly clear turquoise waters.", duration:5, price:2, rating:4.8, reviews:987, distance:"1.5 hr drive", fitness:"Low", transport:["shuttle","boat"], family:true, accessibility:true, types:["Scenic","Water Activities","Relaxation"], emoji:"💎" },
      { id:"mx3", title:"Snorkel & Beach Break", desc:"Snorkel the barrier reef at Banco Chinchorro then relax on a pristine empty beach with lunch included.", duration:5, price:2, rating:4.7, reviews:765, distance:"30 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Water Activities","Beach Day"], emoji:"🐠" },
      { id:"mx4", title:"Kayak & Mangrove Eco Tour", desc:"Paddle through tranquil mangrove channels spotting tropical birds, fish, and unique coastal ecosystems.", duration:3, price:1, rating:4.6, reviews:432, distance:"5 min walk", fitness:"Moderate", transport:["walking"], family:true, accessibility:false, types:["Wildlife","Adventure","Scenic"], emoji:"🚣" },
    ],
    dining: [
      { id:"md1", title:"Espresso Caribe", desc:"Charming cafe serving excellent coffee, fresh pastries, and light Mexican bites in a shaded garden setting.", cuisine:"Cafe & Mexican", price:1, rating:4.6, reviews:543, distance:"3 min walk", kidFriendly:true, hours:"7:00 AM – 6:00 PM", emoji:"☕" },
      { id:"md2", title:"El Gringo Loco", desc:"Casual beachside grill serving massive burritos, fresh ceviche, and cold Mexican beers steps from the port.", cuisine:"Mexican", price:1, rating:4.5, reviews:876, distance:"5 min walk", kidFriendly:true, hours:"9:00 AM – 5:00 PM", emoji:"🌯" },
      { id:"md3", title:"Mahahual Seafood Kitchen", desc:"Local fisherman-run restaurant with the freshest catch of the day, grilled simply with lime and cilantro.", cuisine:"Fresh Seafood", price:1, rating:4.7, reviews:432, distance:"10 min walk", kidFriendly:true, hours:"10:00 AM – 7:00 PM", emoji:"🐟" },
    ],
    activities: [
      { id:"ma1", title:"Mahahual Beach Walk", desc:"Stroll the stunning 2km malecon along one of the Caribbean's most unspoiled stretches of white sand beach.", duration:2, price:0, rating:4.7, reviews:1876, distance:"2 min walk", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Scenic","Relaxation"], emoji:"🏖️" },
      { id:"ma2", title:"Costa Maya Port Shopping", desc:"Browse the port's vibrant open-air market for Mexican crafts, silver jewelry, hammocks, and local rum.", duration:1, price:0, rating:4.3, reviews:1243, distance:"1 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping"], emoji:"🛍️" },
      { id:"ma3", title:"Mayan Cuisine Cooking Class", desc:"Learn to make traditional Mayan dishes using local ingredients with a local family in their home kitchen.", duration:3, price:1, rating:4.8, reviews:312, distance:"10 min walk", fitness:"Low", family:true, accessibility:true, types:["Cultural","Food & Drink"], emoji:"👩‍🍳" },
    ],
    resorts: [
      { id:"mr1", title:"Tropicante Beach Club", desc:"Relaxed all-inclusive beach club with kayaks, paddleboards, hammocks, and an open bar.", price:1, rating:4.6, reviews:765, distance:"5 min walk", family:true, emoji:"🌴" },
    ],
  },

  "Nassau, Bahamas": {
    excursions: [
      { id:"nx1", title:"Atlantis Resort Day Pass", desc:"Full access to Atlantis Paradise Island's legendary water park, aquarium, and private beach for the day.", duration:7, price:3, rating:4.7, reviews:3241, distance:"15 min taxi", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Beach Day","Water Activities","Relaxation"], emoji:"🏰" },
      { id:"nx2", title:"Swimming with Pigs — Exumas", desc:"Take a speedboat to the Exumas to swim with the world-famous Bahamian swimming pigs.", duration:6, price:3, rating:4.9, reviews:876, distance:"45 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Wildlife","Adventure"], emoji:"🐷" },
      { id:"nx3", title:"Blue Lagoon Dolphin Swim", desc:"Swim and interact with Atlantic bottlenose dolphins in a stunning natural lagoon setting.", duration:4, price:3, rating:4.8, reviews:1543, distance:"25 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Wildlife","Water Activities"], emoji:"🐬" },
      { id:"nx4", title:"Nassau Historic City Tour", desc:"Walk through 300 years of colonial history visiting the Queen's Staircase, Fort Fincastle, and Government House.", duration:3, price:1, rating:4.5, reviews:987, distance:"10 min walk", fitness:"Moderate", transport:["walking","shuttle"], family:true, accessibility:false, types:["Historical","Cultural"], emoji:"🏛️" },
    ],
    dining: [
      { id:"nd1", title:"Graycliff Restaurant", desc:"Nassau's most celebrated fine dining experience in a 1740 colonial mansion with a legendary wine cellar.", cuisine:"Continental Fine Dining", price:3, rating:4.8, reviews:654, distance:"15 min walk", kidFriendly:false, hours:"12:00 PM – 10:00 PM", emoji:"🍷" },
      { id:"nd2", title:"Fish Fry at Arawak Cay", desc:"The authentic Nassau experience — local fish shacks serving fried snapper, conch fritters, and Kalik beer.", cuisine:"Bahamian", price:1, rating:4.7, reviews:2341, distance:"20 min walk", kidFriendly:true, hours:"11:00 AM – 11:00 PM", emoji:"🐟" },
      { id:"nd3", title:"Café Matisse", desc:"Romantic Italian-Caribbean fusion restaurant in a historic building near Parliament Square.", cuisine:"Italian-Caribbean", price:2, rating:4.6, reviews:543, distance:"12 min walk", kidFriendly:false, hours:"11:30 AM – 10:00 PM", emoji:"🍝" },
    ],
    activities: [
      { id:"na1", title:"Straw Market Shopping", desc:"Nassau's famous open-air market is the place to find hand-woven straw bags, local crafts, and souvenirs.", duration:1, price:0, rating:4.2, reviews:2876, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping","Cultural"], emoji:"🛍️" },
      { id:"na2", title:"Queen's Staircase & Fort Fincastle", desc:"Climb the 66 steps hand-carved by enslaved people, then explore the fort with panoramic city views.", duration:2, price:0, rating:4.6, reviews:1543, distance:"20 min walk", fitness:"Moderate", family:true, accessibility:false, types:["Historical","Scenic"], emoji:"🏰" },
      { id:"na3", title:"Cable Beach Walk & Swim", desc:"Nassau's most beautiful public beach just a short taxi ride away, with calm turquoise water and white sand.", duration:3, price:0, rating:4.5, reviews:987, distance:"15 min taxi", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
    ],
    resorts: [
      { id:"nr1", title:"Baha Mar Resort Day Pass", desc:"Full day access to the stunning Baha Mar resort complex with pools, beach, and casino.", price:3, rating:4.8, reviews:1234, distance:"15 min taxi", family:true, emoji:"🎰" },
    ],
  },

  "San Juan, Puerto Rico": {
    excursions: [
      { id:"sjx1", title:"El Yunque Rainforest Tour", desc:"Hike through the only tropical rainforest in the US National Forest system with stunning waterfall swims.", duration:5, price:2, rating:4.8, reviews:1432, distance:"45 min drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Wildlife","Adventure","Scenic"], emoji:"🌿" },
      { id:"sjx2", title:"Old San Juan Walking Tour", desc:"Explore the colorful colonial streets, 500-year-old forts, and vibrant plazas of this UNESCO World Heritage city.", duration:3, price:1, rating:4.8, reviews:2134, distance:"10 min walk", fitness:"Moderate", transport:["walking"], family:true, accessibility:false, types:["Historical","Cultural","Scenic"], emoji:"🏰" },
      { id:"sjx3", title:"Bioluminescent Bay Kayak Tour", desc:"Paddle through glowing bioluminescent waters at night — one of the most magical natural experiences in the Caribbean.", duration:4, price:2, rating:4.9, reviews:876, distance:"1 hr drive", fitness:"Low", transport:["shuttle","boat"], family:true, accessibility:false, types:["Wildlife","Adventure","Scenic"], emoji:"✨" },
      { id:"sjx4", title:"Snorkel & Beach at Culebra", desc:"Take a ferry to Flamenco Beach, consistently rated one of the world's top beaches, and snorkel the clear waters.", duration:6, price:2, rating:4.7, reviews:654, distance:"1 hr ferry", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Beach Day","Water Activities"], emoji:"🏖️" },
    ],
    dining: [
      { id:"sjd1", title:"La Factoria", desc:"San Juan's most celebrated cocktail bar and restaurant serving creative Puerto Rican cuisine in a colonial building.", cuisine:"Puerto Rican", price:2, rating:4.8, reviews:1876, distance:"15 min walk", kidFriendly:false, hours:"6:00 PM – 3:00 AM", emoji:"🍹" },
      { id:"sjd2", title:"Raíces Restaurant", desc:"Traditional Puerto Rican comfort food in a cheerful Old San Juan setting. Best mofongo on the island.", cuisine:"Traditional Puerto Rican", price:1, rating:4.7, reviews:2341, distance:"12 min walk", kidFriendly:true, hours:"11:00 AM – 10:00 PM", emoji:"🍽️" },
      { id:"sjd3", title:"Marmalade Restaurant", desc:"Award-winning contemporary Caribbean cuisine with a rotating seasonal menu and outstanding wine list.", cuisine:"Contemporary Caribbean", price:3, rating:4.8, reviews:654, distance:"18 min walk", kidFriendly:false, hours:"6:00 PM – 11:00 PM", emoji:"🌟" },
    ],
    activities: [
      { id:"sja1", title:"Castillo San Felipe del Morro", desc:"Explore the iconic 16th-century Spanish fort overlooking the Atlantic. Stunning views and rich history.", duration:2, price:0, rating:4.8, reviews:3241, distance:"15 min walk", fitness:"Moderate", family:true, accessibility:false, types:["Historical","Scenic"], emoji:"🏰" },
      { id:"sja2", title:"La Placita de Santurce", desc:"The heartbeat of San Juan — a vibrant market by day and lively outdoor bar scene by evening.", duration:2, price:0, rating:4.6, reviews:1432, distance:"20 min taxi", fitness:"Low", family:false, accessibility:true, types:["Cultural","Food & Drink"], emoji:"🎉" },
      { id:"sja3", title:"Condado Beach", desc:"San Juan's most famous urban beach with calm waters, watersports rentals, and great people-watching.", duration:3, price:0, rating:4.5, reviews:1876, distance:"25 min taxi", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
    ],
    resorts: [
      { id:"sjr1", title:"El San Juan Hotel Beach Club", desc:"Day pass to this iconic historic hotel's beach club with pool, cabanas, and beachside service.", price:2, rating:4.7, reviews:876, distance:"25 min taxi", family:false, emoji:"🏨" },
    ],
  },

  "St. Thomas, USVI": {
    excursions: [
      { id:"stx1", title:"St. John Snorkel & Beach Day", desc:"Take the ferry to St. John and spend the day at Trunk Bay, one of the world's most beautiful beaches.", duration:6, price:2, rating:4.9, reviews:2134, distance:"30 min ferry", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Beach Day","Water Activities","Scenic"], emoji:"🏝️" },
      { id:"stx2", title:"Coral World Ocean Park", desc:"Walk-through underwater observatory, shark tank, sea turtle lagoon, and stingray pool. Great for kids.", duration:4, price:2, rating:4.7, reviews:987, distance:"20 min taxi", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Wildlife"], emoji:"🐠" },
      { id:"stx3", title:"Skyride to Paradise Point", desc:"Take the aerial tramway to 700 feet above Charlotte Amalie for stunning panoramic views of the harbor.", duration:2, price:1, rating:4.6, reviews:1543, distance:"10 min taxi", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Scenic"], emoji:"🚡" },
      { id:"stx4", title:"Buck Island Sailing & Snorkel", desc:"Sail to the protected Buck Island reef system for snorkeling in a designated underwater trail.", duration:5, price:2, rating:4.8, reviews:765, distance:"20 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:false, types:["Water Activities","Scenic"], emoji:"⛵" },
    ],
    dining: [
      { id:"std1", title:"Gladys' Cafe", desc:"Legendary Charlotte Amalie institution serving authentic West Indian breakfast and lunch since 1974.", cuisine:"West Indian", price:1, rating:4.7, reviews:1243, distance:"10 min walk", kidFriendly:true, hours:"7:00 AM – 5:00 PM", emoji:"🍳" },
      { id:"std2", title:"Herve Restaurant & Wine Bar", desc:"Romantic hilltop restaurant with panoramic harbor views and sophisticated Caribbean fusion cuisine.", cuisine:"Caribbean Fusion", price:3, rating:4.8, reviews:543, distance:"20 min taxi", kidFriendly:false, hours:"11:30 AM – 10:00 PM", emoji:"🌅" },
      { id:"std3", title:"Hull Bay Hideaway", desc:"Casual local beach bar on a quiet bay serving fresh fish sandwiches and cold Presidentes. Locals only.", cuisine:"American & Seafood", price:1, rating:4.6, reviews:432, distance:"25 min taxi", kidFriendly:true, hours:"11:00 AM – 8:00 PM", emoji:"🍺" },
    ],
    activities: [
      { id:"sta1", title:"Charlotte Amalie Duty-Free Shopping", desc:"St. Thomas is famous for duty-free luxury shopping. Find jewelry, spirits, perfume, and watches at bargain prices.", duration:2, price:0, rating:4.5, reviews:2341, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping"], emoji:"💎" },
      { id:"sta2", title:"Magens Bay Beach", desc:"Consistently ranked one of the world's top beaches — calm, clear, and spectacular. A true bucket list stop.", duration:3, price:0, rating:4.8, reviews:3241, distance:"20 min taxi", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
    ],
    resorts: [
      { id:"str1", title:"Bolongo Bay Beach Resort Day Pass", desc:"All-inclusive day at this beloved family resort with watersports, beach, and meals included.", price:2, rating:4.6, reviews:654, distance:"20 min taxi", family:true, emoji:"🌴" },
    ],
  },

  "Juneau, AK": {
    excursions: [
      { id:"jux1", title:"Mendenhall Glacier & Ice Walk", desc:"Walk on the face of the stunning Mendenhall Glacier with a certified guide. An extraordinary Alaska experience.", duration:4, price:3, rating:4.9, reviews:1876, distance:"15 min shuttle", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure","Scenic"], emoji:"🧊" },
      { id:"jux2", title:"Whale Watching & Wildlife Tour", desc:"Spot humpback whales, orcas, sea lions, and eagles on a naturalist-guided whale watching cruise.", duration:3, price:2, rating:4.9, reviews:2341, distance:"10 min walk", fitness:"Low", transport:["boat"], family:true, accessibility:true, types:["Wildlife","Scenic"], emoji:"🐋" },
      { id:"jux3", title:"Helicopter & Glacier Dog Sled", desc:"Fly by helicopter to a remote glacier and mush your own dog sled team across the ice. Unforgettable.", duration:3, price:3, rating:4.9, reviews:987, distance:"5 min drive", fitness:"Low", transport:["shuttle"], family:true, accessibility:false, types:["Adventure","Wildlife"], emoji:"🚁" },
      { id:"jux4", title:"Juneau Rainforest Zipline", desc:"Soar through the Tongass National Forest — America's largest rainforest — on 9 exciting zip lines.", duration:3, price:2, rating:4.8, reviews:876, distance:"15 min drive", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure","Scenic"], emoji:"🌲" },
      { id:"jux5", title:"Salmon Bake & Mendenhall Visit", desc:"Alaska's most popular shore excursion — visit the glacier then feast on fresh wild salmon at Gold Creek.", duration:4, price:2, rating:4.7, reviews:3241, distance:"15 min drive", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Food & Drink","Scenic"], emoji:"🐟" },
    ],
    dining: [
      { id:"jud1", title:"Tracy's King Crab Shack", desc:"World-famous outdoor crab shack serving the freshest Alaskan king crab legs right off the dock. A must.", cuisine:"Alaskan Seafood", price:2, rating:4.8, reviews:4321, distance:"5 min walk", kidFriendly:true, hours:"10:00 AM – 6:00 PM", emoji:"🦀" },
      { id:"jud2", title:"The Hangar on the Wharf", desc:"Casual waterfront restaurant in a converted seaplane hangar. Great halibut fish and chips and local beers.", cuisine:"Alaskan Comfort Food", price:2, rating:4.6, reviews:1543, distance:"8 min walk", kidFriendly:true, hours:"11:00 AM – 9:00 PM", emoji:"✈️" },
      { id:"jud3", title:"Salt Restaurant", desc:"Upscale farm-to-table Alaskan cuisine featuring locally sourced halibut, salmon, and Alaskan ingredients.", cuisine:"Contemporary Alaskan", price:3, rating:4.8, reviews:765, distance:"12 min walk", kidFriendly:false, hours:"5:00 PM – 10:00 PM", emoji:"🌿" },
    ],
    activities: [
      { id:"jua1", title:"Alaskan Brewing Company Tour", desc:"Tour and tasting at Alaska's beloved craft brewery, famous for its Amber Ale and Seasonal brews.", duration:1, price:0, rating:4.6, reviews:1876, distance:"20 min taxi", fitness:"Low", family:false, accessibility:true, types:["Food & Drink","Cultural"], emoji:"🍺" },
      { id:"jua2", title:"Mount Roberts Tramway", desc:"Ride the aerial tramway to alpine meadows with spectacular views of the Gastineau Channel and city.", duration:2, price:1, rating:4.7, reviews:2341, distance:"8 min walk", fitness:"Low", family:true, accessibility:true, types:["Scenic"], emoji:"🚡" },
      { id:"jua3", title:"Downtown Juneau Walking Tour", desc:"Explore the charming state capital with its gold rush history, totem poles, and colorful Russian Orthodox church.", duration:2, price:0, rating:4.5, reviews:1243, distance:"2 min walk", fitness:"Low", family:true, accessibility:false, types:["Historical","Cultural"], emoji:"🏛️" },
    ],
    resorts: [],
  },

  "Ketchikan, AK": {
    excursions: [
      { id:"kex1", title:"Misty Fjords Floatplane Tour", desc:"Fly over the breathtaking Misty Fjords National Monument — ancient glaciers, waterfalls, and fjords from above.", duration:2, price:3, rating:4.9, reviews:876, distance:"5 min drive", fitness:"Low", transport:["shuttle"], family:true, accessibility:false, types:["Scenic","Adventure"], emoji:"🛩️" },
      { id:"kex2", title:"Rainforest Canopy & Zip Line", desc:"Soar through the ancient temperate rainforest canopy on a thrilling zip line adventure above the treetops.", duration:3, price:2, rating:4.8, reviews:1234, distance:"15 min drive", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure"], emoji:"🌲" },
      { id:"kex3", title:"Totem Poles & Saxman Village", desc:"Visit the world's largest collection of standing totem poles and learn about the Tlingit and Haida cultures.", duration:2, price:1, rating:4.7, reviews:1543, distance:"10 min taxi", fitness:"Low", transport:["shuttle"], family:true, accessibility:true, types:["Cultural","Historical"], emoji:"🗿" },
      { id:"kex4", title:"Salmon Fishing Charter", desc:"Go sport fishing for wild Alaskan salmon with an experienced guide. Gear and license provided.", duration:4, price:3, rating:4.8, reviews:654, distance:"15 min drive", fitness:"Low", transport:["shuttle","boat"], family:false, accessibility:false, types:["Wildlife","Adventure"], emoji:"🎣" },
    ],
    dining: [
      { id:"ked1", title:"Cape Fox Lodge Restaurant", desc:"Stunning hilltop lodge restaurant with panoramic views and the best wild salmon chowder in Southeast Alaska.", cuisine:"Alaskan", price:2, rating:4.7, reviews:543, distance:"10 min walk+tram", kidFriendly:true, hours:"11:00 AM – 9:00 PM", emoji:"🌲" },
      { id:"ked2", title:"Bar Harbor Restaurant", desc:"Beloved local waterfront diner serving fresh Dungeness crab, halibut, and all-day breakfast.", cuisine:"Alaskan Seafood", price:1, rating:4.6, reviews:876, distance:"5 min walk", kidFriendly:true, hours:"6:00 AM – 8:00 PM", emoji:"🦀" },
    ],
    activities: [
      { id:"kea1", title:"Creek Street Boardwalk", desc:"Stroll the famous red-light district turned charming boardwalk with boutiques, galleries, and historic buildings.", duration:1, price:0, rating:4.6, reviews:2341, distance:"5 min walk", fitness:"Low", family:true, accessibility:false, types:["Historical","Shopping","Scenic"], emoji:"🚶" },
      { id:"kea2", title:"Dolly's House Museum", desc:"Step inside the most famous brothel on Creek Street, now a quirky and fascinating museum of Ketchikan's past.", duration:1, price:0, rating:4.5, reviews:1234, distance:"8 min walk", fitness:"Low", family:false, accessibility:false, types:["Historical","Cultural"], emoji:"🏠" },
      { id:"kea3", title:"Ketchikan Shopping & Galleries", desc:"Browse local Native art galleries, jewelry shops, and souvenir stores along the historic waterfront.", duration:2, price:0, rating:4.3, reviews:1876, distance:"2 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping","Cultural"], emoji:"🛍️" },
    ],
    resorts: [],
  },

  "Barcelona, Spain": {
    excursions: [
      { id:"bcnx1", title:"Gaudí Architecture Tour", desc:"Visit the Sagrada Familia, Park Güell, and Casa Batlló — the masterworks of Barcelona's iconic architect.", duration:5, price:2, rating:4.9, reviews:3241, distance:"20 min metro", fitness:"Moderate", transport:["shuttle","walking"], family:true, accessibility:false, types:["Cultural","Historical","Scenic"], emoji:"🏛️" },
      { id:"bcnx2", title:"Gothic Quarter & Tapas Walk", desc:"Explore Barcelona's medieval Gothic Quarter with a local guide, stopping for tapas and local wine along the way.", duration:3, price:2, rating:4.8, reviews:1876, distance:"15 min walk", fitness:"Moderate", transport:["walking"], family:false, accessibility:false, types:["Cultural","Food & Drink","Historical"], emoji:"🥘" },
      { id:"bcnx3", title:"Montserrat Monastery Day Trip", desc:"Travel to the dramatic mountain monastery of Montserrat with stunning views and a medieval basilica.", duration:6, price:2, rating:4.8, reviews:1432, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Scenic","Cultural","Historical"], emoji:"⛪" },
    ],
    dining: [
      { id:"bcnd1", title:"La Boqueria Market", desc:"Barcelona's legendary fresh food market — graze on fresh fruit, jamón, seafood, and local specialties.", cuisine:"Market & Tapas", price:1, rating:4.7, reviews:5432, distance:"20 min walk", kidFriendly:true, hours:"8:00 AM – 8:30 PM", emoji:"🥗" },
      { id:"bcnd2", title:"Bar del Pla", desc:"Classic Barcelona tapas bar in the Gothic Quarter, famous for its foie gras croquettes and local vermouth.", cuisine:"Catalan Tapas", price:2, rating:4.8, reviews:2341, distance:"25 min walk", kidFriendly:false, hours:"12:00 PM – 11:00 PM", emoji:"🍷" },
      { id:"bcnd3", title:"Can Solé Seafood Restaurant", desc:"A Barcelona institution since 1903, serving the finest fideuà (noodle paella) and fresh seafood in Barceloneta.", cuisine:"Catalan Seafood", price:3, rating:4.8, reviews:1234, distance:"25 min walk", kidFriendly:true, hours:"1:00 PM – 11:00 PM", emoji:"🦞" },
    ],
    activities: [
      { id:"bcna1", title:"Las Ramblas & Barceloneta Beach", desc:"Stroll the famous promenade then relax on Barcelona's urban beach steps from the city center.", duration:3, price:0, rating:4.6, reviews:4321, distance:"20 min walk", fitness:"Low", family:true, accessibility:true, types:["Scenic","Beach Day","Shopping"], emoji:"🚶" },
      { id:"bcna2", title:"Picasso Museum", desc:"One of the most visited museums in Spain, housing an extensive collection of Pablo Picasso's early works.", duration:2, price:1, rating:4.7, reviews:2876, distance:"25 min walk", fitness:"Low", family:true, accessibility:true, types:["Cultural","Historical"], emoji:"🎨" },
    ],
    resorts: [],
  },

  "Rome, Italy": {
    excursions: [
      { id:"romx1", title:"Vatican, Sistine Chapel & Colosseum", desc:"The ultimate Rome day — visit the Vatican Museums, Sistine Chapel, and the iconic Colosseum with a expert guide.", duration:8, price:3, rating:4.9, reviews:4321, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Historical","Cultural"], emoji:"🏛️" },
      { id:"romx2", title:"Rome Highlights: Trevi & Pantheon", desc:"See the Trevi Fountain, Spanish Steps, Pantheon, and Piazza Navona on a guided walking tour of ancient Rome.", duration:5, price:2, rating:4.8, reviews:2876, distance:"1 hr drive", fitness:"Moderate", transport:["shuttle","walking"], family:true, accessibility:false, types:["Historical","Cultural","Scenic"], emoji:"⛲" },
      { id:"romx3", title:"Roman Food & Wine Tour", desc:"A culinary journey through Rome's best trattorias, wine bars, and street food markets with a local food guide.", duration:4, price:2, rating:4.8, reviews:1543, distance:"1 hr drive", fitness:"Low", transport:["shuttle","walking"], family:false, accessibility:true, types:["Food & Drink","Cultural"], emoji:"🍝" },
    ],
    dining: [
      { id:"romd1", title:"Trattoria da Enzo al 29", desc:"Tiny, beloved Trastevere trattoria with the finest cacio e pepe in Rome. Arrive early — no reservations.", cuisine:"Roman Trattoria", price:2, rating:4.9, reviews:3241, distance:"1 hr drive", kidFriendly:true, hours:"12:30 PM – 3:00 PM, 7:30 PM – 10:30 PM", emoji:"🍝" },
      { id:"romd2", title:"Pizzarium Bonci", desc:"Rome's most famous pizza al taglio spot — innovative toppings on light, airy Roman-style focaccia.", cuisine:"Roman Pizza", price:1, rating:4.8, reviews:2134, distance:"1 hr drive", kidFriendly:true, hours:"11:00 AM – 10:00 PM", emoji:"🍕" },
    ],
    activities: [
      { id:"roma1", title:"Trastevere Neighborhood Walk", desc:"Wander the cobblestone streets of Rome's most charming medieval neighborhood. Alive with local color.", duration:2, price:0, rating:4.7, reviews:2341, distance:"1 hr drive", fitness:"Low", family:true, accessibility:false, types:["Cultural","Scenic"], emoji:"🚶" },
    ],
    resorts: [],
  },

  "Ocho Rios, Jamaica": {
    excursions: [
      { id:"orx1", title:"Dunn's River Falls Climb", desc:"Climb the iconic 600-foot cascading waterfall in a human chain — Jamaica's most famous experience.", duration:4, price:2, rating:4.8, reviews:3241, distance:"15 min drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Adventure","Water Activities","Scenic"], emoji:"💦" },
      { id:"orx2", title:"Bobsled Jamaica & Zipline", desc:"Ride the world's only bobsled attraction in the tropics then soar on zip lines through the jungle canopy.", duration:3, price:2, rating:4.7, reviews:1876, distance:"20 min drive", fitness:"Moderate", transport:["shuttle"], family:true, accessibility:false, types:["Adventure"], emoji:"🛷" },
      { id:"orx3", title:"Blue Hole Secret Falls", desc:"Swim in Jamaica's stunning hidden blue lagoon and waterfall — a less-crowded and magical alternative to Dunn's.", duration:4, price:2, rating:4.9, reviews:987, distance:"30 min drive", fitness:"High", transport:["shuttle"], family:false, accessibility:false, types:["Adventure","Water Activities","Scenic"], emoji:"💎" },
      { id:"orx4", title:"Catamaran Snorkel & Beach Party", desc:"Sail on a party catamaran to a snorkel reef and private beach with an open bar and reggae music.", duration:4, price:2, rating:4.7, reviews:1543, distance:"10 min walk", fitness:"Low", transport:["boat"], family:false, accessibility:false, types:["Water Activities","Beach Day","Relaxation"], emoji:"⛵" },
    ],
    dining: [
      { id:"ord1", title:"Scotchies Jerk Centre", desc:"The gold standard of Jamaican jerk — whole pork and chicken slow-cooked over pimento wood. A pilgrimage.", cuisine:"Jamaican Jerk", price:1, rating:4.9, reviews:2876, distance:"15 min drive", kidFriendly:true, hours:"11:00 AM – 11:00 PM", emoji:"🔥" },
      { id:"ord2", title:"Evita's Italian Restaurant", desc:"Charming hilltop Italian restaurant with stunning bay views and a famous lobster linguine made by Miss Eva herself.", cuisine:"Italian-Jamaican", price:2, rating:4.7, reviews:1234, distance:"20 min drive", kidFriendly:true, hours:"11:00 AM – 10:00 PM", emoji:"🦞" },
    ],
    activities: [
      { id:"ora1", title:"Mystic Mountain Reggae Park", desc:"Visit this Jamaican cultural park with a treetop bobsled, zipline, and reggae museum celebrating island culture.", duration:3, price:1, rating:4.6, reviews:1543, distance:"15 min drive", fitness:"Low", family:true, accessibility:true, types:["Cultural","Adventure"], emoji:"🎵" },
      { id:"ora2", title:"Ocho Rios Craft Market", desc:"Browse 150+ local vendors selling handmade carvings, paintings, spices, and authentic Jamaican souvenirs.", duration:1, price:0, rating:4.2, reviews:1876, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Shopping","Cultural"], emoji:"🛍️" },
    ],
    resorts: [
      { id:"orr1", title:"Sandals Ocho Rios Day Pass", desc:"Full day-pass at one of Jamaica's most beautiful all-inclusive resorts with pools, beach, and unlimited food.", price:3, rating:4.8, reviews:876, distance:"10 min drive", family:false, emoji:"🏖️" },
    ],
  },

  "George Town, Cayman": {
    excursions: [
      { id:"gcx1", title:"Stingray City Sandbar", desc:"The world's most famous marine attraction — wade in the shallow sandbar and hand-feed friendly stingrays.", duration:3, price:2, rating:4.9, reviews:5432, distance:"30 min boat", fitness:"Low", transport:["boat"], family:true, accessibility:true, types:["Wildlife","Water Activities"], emoji:"🦈" },
      { id:"gcx2", title:"Seven Mile Beach Day", desc:"Relax on one of the Caribbean's most beautiful beaches — powder-white sand and calm, crystal-clear turquoise water.", duration:4, price:0, rating:4.8, reviews:4321, distance:"15 min tender+taxi", fitness:"Low", transport:["boat","shuttle"], family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
      { id:"gcx3", title:"Cayman Crystal Caves", desc:"Explore a stunning network of crystal-studded underground caves formed over millions of years.", duration:2, price:1, rating:4.7, reviews:876, distance:"30 min tender+drive", fitness:"Moderate", transport:["boat","shuttle"], family:true, accessibility:false, types:["Adventure","Scenic"], emoji:"🗿" },
    ],
    dining: [
      { id:"gcd1", title:"The Wharf Restaurant", desc:"Romantic waterfront dining with spectacular sunset views and fresh Caymanian seafood. A local institution.", cuisine:"Caribbean Seafood", price:3, rating:4.7, reviews:1234, distance:"20 min tender+walk", kidFriendly:false, hours:"5:00 PM – 10:00 PM", emoji:"🌅" },
      { id:"gcd2", title:"Calypso Grill", desc:"Casual beachside grill popular with locals serving jerk chicken, fish tacos, and tropical cocktails.", cuisine:"Caribbean & Grill", price:2, rating:4.6, reviews:876, distance:"15 min tender+taxi", kidFriendly:true, hours:"11:00 AM – 9:00 PM", emoji:"🌴" },
    ],
    activities: [
      { id:"gca1", title:"Cayman Turtle Centre", desc:"The world's only sea turtle farm — swim with green sea turtles and learn about conservation efforts.", duration:2, price:1, rating:4.5, reviews:1543, distance:"20 min tender+drive", fitness:"Low", family:true, accessibility:true, types:["Wildlife"], emoji:"🐢" },
      { id:"gca2", title:"Downtown George Town Shopping", desc:"Duty-free luxury shopping for jewelry, watches, and spirits along the colorful waterfront promenade.", duration:2, price:0, rating:4.4, reviews:2341, distance:"10 min tender+walk", fitness:"Low", family:true, accessibility:true, types:["Shopping"], emoji:"💎" },
    ],
    resorts: [
      { id:"gcr1", title:"Ritz-Carlton Grand Cayman Beach Day", desc:"Luxurious day pass including pool, private beach, and lunch at this world-class Seven Mile Beach resort.", price:3, rating:4.9, reviews:654, distance:"15 min tender+taxi", family:false, emoji:"🏨" },
    ],
  },

  "Lookout Cay": {
    excursions: [
      { id:"lcx1", title:"Snorkel the Reef", desc:"Disney's private island has a gorgeous offshore reef with vibrant coral and tropical fish.", duration:2, price:1, rating:4.8, reviews:1234, distance:"5 min walk", fitness:"Low", transport:["walking"], family:true, accessibility:false, types:["Water Activities"], emoji:"🐠" },
    ],
    dining: [
      { id:"lcd1", title:"Lookout Cay Buffet", desc:"Open-air buffet serving Caribbean-inspired dishes, fresh fruit, and drinks in a breezy island setting.", cuisine:"Caribbean Buffet", price:0, rating:4.5, reviews:2341, distance:"5 min walk", kidFriendly:true, hours:"10:00 AM – 4:00 PM", emoji:"🍽️" },
    ],
    activities: [
      { id:"lca1", title:"Lookout Cay Beach & Hammock Village", desc:"Relax on pristine Bahamian beaches and in the famous hammock village. Disney's newest private island paradise.", duration:4, price:0, rating:4.9, reviews:3241, distance:"2 min walk", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
      { id:"lca2", title:"Water Sports & Kayaking", desc:"Rent kayaks, paddleboards, and snorkel gear directly on the beach for exploring the clear Bahamian waters.", duration:2, price:1, rating:4.7, reviews:1543, distance:"3 min walk", fitness:"Moderate", family:true, accessibility:false, types:["Water Activities","Adventure"], emoji:"🚣" },
    ],
    resorts: [],
  },

  "Perfect Day at CocoCay": {
    excursions: [
      { id:"ccx1", title:"Thrill Waterpark", desc:"Royal Caribbean's private island waterpark with the tallest waterslide in North America and wave pool.", duration:5, price:2, rating:4.9, reviews:4321, distance:"5 min walk", fitness:"Low", transport:["walking"], family:true, accessibility:false, types:["Adventure","Water Activities"], emoji:"🎢" },
      { id:"ccx2", title:"Overwater Cabana", desc:"Reserve a private overwater cabana with all-inclusive food and drinks and direct ocean access.", duration:6, price:3, rating:4.9, reviews:876, distance:"10 min walk", fitness:"Low", transport:["walking"], family:true, accessibility:false, types:["Relaxation","Beach Day"], emoji:"🏖️" },
    ],
    dining: [
      { id:"ccd1", title:"Chill Island Barbecue", desc:"Open-air BBQ serving jerk chicken, ribs, and fresh island sides at Royal Caribbean's private island.", cuisine:"BBQ & Caribbean", price:0, rating:4.6, reviews:5432, distance:"5 min walk", kidFriendly:true, hours:"11:00 AM – 4:00 PM", emoji:"🍖" },
    ],
    activities: [
      { id:"cca1", title:"South Beach & Floating Bar", desc:"Relax on CocoCay's beautiful South Beach with the famous floating swim-up bar in the warm Bahamian waters.", duration:4, price:0, rating:4.8, reviews:6543, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🍹" },
      { id:"cca2", title:"Snorkeling at Snorkel Lagoon", desc:"Explore a purpose-built snorkel lagoon teeming with tropical fish and vibrant coral. All gear included.", duration:2, price:1, rating:4.7, reviews:3241, distance:"10 min walk", fitness:"Low", family:true, accessibility:false, types:["Water Activities"], emoji:"🐠" },
    ],
    resorts: [],
  },

  "Castaway Cay": {
    excursions: [],
    dining: [
      { id:"caycd1", title:"Cookie's BBQ", desc:"Disney's famous open-air BBQ on Castaway Cay. The BBQ ribs and grilled chicken are legendary.", cuisine:"BBQ", price:0, rating:4.8, reviews:7654, distance:"5 min walk", kidFriendly:true, hours:"11:00 AM – 4:00 PM", emoji:"🍖" },
    ],
    activities: [
      { id:"cayca1", title:"Family Beach", desc:"Disney's magical private island beach — white sand, turquoise water, and Disney characters. Pure paradise.", duration:5, price:0, rating:4.9, reviews:8765, distance:"5 min walk", fitness:"Low", family:true, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🏖️" },
      { id:"cayca2", title:"Adult Beach — Serenity Bay", desc:"A private adults-only beach retreat at the far end of the island. Serene, quiet, and beautiful.", duration:4, price:0, rating:4.9, reviews:3241, distance:"15 min tram", fitness:"Low", family:false, accessibility:true, types:["Beach Day","Relaxation"], emoji:"🌴" },
      { id:"cayca3", title:"Bike & Water Sports Rentals", desc:"Rent bikes, kayaks, paddleboards, and snorkel gear to explore the island at your own pace.", duration:3, price:1, rating:4.7, reviews:2341, distance:"5 min walk", fitness:"Moderate", family:true, accessibility:false, types:["Water Activities","Adventure"], emoji:"🚴" },
    ],
    resorts: [],
  },
};

// ─── Sail date schedules ──────────────────────────────────────
// JS day numbers: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const SAIL_SCHEDULES = {
  // Royal Caribbean
  royal_wonder:    { days: [6], count: 16, note: "Every Saturday from Miami" },
  royal_icon:      { days: [6], count: 16, note: "Every Saturday from Miami" },
  royal_symphony:  { days: [6], count: 12, note: "Every Saturday from Barcelona" },
  royal_navigator: { days: [0], count: 16, note: "Every Sunday from Galveston" },
  royal_oasis:     { days: [6], count: 16, note: "Every Saturday from Miami" },
  royal_allure:    { days: [6], count: 16, note: "Every Saturday from Port Canaveral" },
  royal_harmony:   { days: [6], count: 12, note: "Every Saturday from Barcelona" },
  royal_mariner:   { days: [0], count: 16, note: "Every Sunday from Los Angeles" },
  // Carnival
  carnival_mardi_gras:  { days: [6], count: 16, note: "Every Saturday from Port Canaveral" },
  carnival_celebration: { days: [6], count: 16, note: "Every Saturday from Miami" },
  carnival_jubilee:     { days: [6], count: 16, note: "Every Saturday from Galveston" },
  carnival_venezia:     { days: [0], count: 16, note: "Every Sunday from New York" },
  carnival_horizon:     { days: [0], count: 16, note: "Every Sunday from Miami" },
  carnival_vista:       { days: [6], count: 16, note: "Every Saturday from Galveston" },
  carnival_breeze:      { days: [6], count: 16, note: "Every Saturday from Miami" },
  carnival_sunshine:    { days: [0], count: 16, note: "Every Sunday from Charleston" },
  carnival_miracle:     { days: [4, 6], count: 30, note: "Thursdays & Saturdays from Seattle (Alaska season)" },
  carnival_spirit:      { days: [4, 6], count: 30, note: "Thursdays & Saturdays from Seattle (Alaska season)" },
  carnival_splendor:    { days: [0], count: 16, note: "Every Sunday from Long Beach" },
  carnival_radiance:    { days: [6], count: 16, note: "Every Saturday from Baltimore" },
  // Norwegian
  ncl_bliss:    { days: [0], count: 12, note: "Every Sunday from Seattle (Alaska season)" },
  ncl_prima:    { days: [6], count: 16, note: "Every Saturday from New York" },
  ncl_viva:     { days: [6], count: 16, note: "Every Saturday from Miami" },
  ncl_encore:   { days: [0], count: 12, note: "Every Sunday from Seattle" },
  ncl_joy:      { days: [6], count: 16, note: "Every Saturday from New York" },
  ncl_escape:   { days: [0], count: 16, note: "Every Sunday from New York" },
  ncl_getaway:  { days: [6], count: 16, note: "Every Saturday from Miami" },
  // Disney
  disney_wish:     { days: [0, 4], count: 16, note: "3 & 4 night sailings from Port Canaveral" },
  disney_treasure: { days: [0, 4], count: 16, note: "3 & 4 night sailings from Port Canaveral" },
  disney_fantasy:  { days: [6],    count: 16, note: "Every Saturday from Port Canaveral" },
  disney_dream:    { days: [0, 4], count: 16, note: "3 & 4 night sailings from Port Canaveral" },
  disney_magic:    { days: [6],    count: 16, note: "Every Saturday from various ports" },
  disney_wonder_d: { days: [0],    count: 16, note: "Every Sunday from various ports" },
  // Celebrity
  celebrity_beyond:     { days: [0], count: 16, note: "Every Sunday from Fort Lauderdale" },
  celebrity_ascent:     { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  celebrity_edge:       { days: [6], count: 12, note: "Every Saturday from Barcelona" },
  celebrity_apex:       { days: [6], count: 12, note: "Every Saturday from Southampton" },
  celebrity_equinox:    { days: [0], count: 16, note: "Every Sunday from Fort Lauderdale" },
  celebrity_silhouette: { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  // Princess
  princess_sun:       { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  princess_sphere:    { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  princess_enchanted: { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  princess_discovery: { days: [6], count: 16, note: "Every Saturday from Los Angeles" },
  princess_royal_p:   { days: [0], count: 12, note: "Every Sunday from Southampton" },
  princess_majestic:  { days: [6], count: 12, note: "Every Saturday from Barcelona" },
  // Holland America
  holland_rotterdam:        { days: [6], count: 12, note: "Every Saturday from Seattle (Alaska)" },
  holland_nieuw_statendam:  { days: [0], count: 16, note: "Every Sunday from Fort Lauderdale" },
  holland_koningsdam:       { days: [6], count: 12, note: "Every Saturday from Seattle" },
  holland_eurodam:          { days: [0], count: 12, note: "Every Sunday from Amsterdam" },
  holland_nieuw_amsterdam:  { days: [6], count: 16, note: "Every Saturday from Fort Lauderdale" },
  holland_westerdam:        { days: [0], count: 12, note: "Every Sunday from Seattle" },
  // MSC
  msc_world:      { days: [6], count: 16, note: "Every Saturday from Miami" },
  msc_seascape:   { days: [6], count: 16, note: "Every Saturday from Miami" },
  msc_seashore:   { days: [6], count: 16, note: "Every Saturday from Miami" },
  msc_virtuosa:   { days: [6], count: 12, note: "Every Saturday from Southampton" },
  msc_grandiosa:  { days: [6], count: 12, note: "Every Saturday from Genoa" },
  msc_bellissima: { days: [0], count: 12, note: "Every Sunday from Marseille" },
};

// ─── Helpers ──────────────────────────────────────────────────
function getSailDates(lineId, shipId) {
  const key = `${lineId}_${shipId}`;
  const schedule = SAIL_SCHEDULES[key];

  const fmt = (d) => d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric"
  });

  if (!schedule) {
    // Fallback: next 16 Saturdays
    const dates = [];
    const d = new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 1);
    while (d.getDay() !== 6) d.setDate(d.getDate() + 1);
    for (let i = 0; i < 16; i++) {
      dates.push(fmt(new Date(d)));
      d.setDate(d.getDate() + 7);
    }
    return { dates, note: "" };
  }

  const { days, count, note } = schedule;
  const dates = [];

  // Start from tomorrow, look up to 18 months ahead
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 1);

  const limit = new Date();
  limit.setMonth(limit.getMonth() + 18);

  while (dates.length < count && d <= limit) {
    if (days.includes(d.getDay())) {
      dates.push(fmt(new Date(d)));
    }
    d.setDate(d.getDate() + 1);
  }

  return { dates, note };
}


function parseTime(str) {
  if (!str || str === "Embarkation" || str === "Disembarkation") return null;
  const [time, period] = str.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function getPortWindow(port) {
  const arr = parseTime(port.arrival);
  const dep = parseTime(port.departure);
  if (!arr || !dep) return null;
  const bufferIn = port.tender ? 60 : 30;
  const windowStart = arr + bufferIn;
  const windowEnd = dep - 60;
  const hours = Math.max(0, (windowEnd - windowStart) / 60);
  return { start: minutesToTime(windowStart), end: minutesToTime(windowEnd), hours: Math.round(hours * 10) / 10 };
}

function starsFor(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - half);
}

// ─── Filter & Rank ────────────────────────────────────────────
function filterAndRank(items, prefs, win, category) {
  if (!items) return [];
  let filtered = [...items];

  if (prefs.activity_types && prefs.activity_types.length > 0 && category !== "dining" && category !== "resorts") {
    const match = filtered.filter(i => i.types && i.types.some(t => prefs.activity_types.includes(t)));
    if (match.length >= 2) filtered = match;
  }

  if (prefs.accessibility_flags && prefs.accessibility_flags.includes("family_friendly")) {
    const match = filtered.filter(i => i.family);
    if (match.length >= 2) filtered = match;
  }

  if (prefs.accessibility_flags && prefs.accessibility_flags.includes("wheelchair")) {
    const match = filtered.filter(i => i.accessibility);
    if (match.length >= 1) filtered = match;
  }

  if (prefs.fitness_level && category === "excursions") {
    const match = filtered.filter(i => i.fitness === prefs.fitness_level);
    if (match.length >= 2) filtered = match;
  }

  if (prefs.price_range !== undefined) {
    const match = filtered.filter(i => i.price <= prefs.price_range + 1);
    if (match.length >= 2) filtered = match;
  }

  if (win && prefs.duration_hours && category === "excursions") {
    const [minH, maxH] = prefs.duration_hours;
    const match = filtered.filter(i => i.duration >= minH && i.duration <= Math.min(maxH, win.hours));
    if (match.length >= 2) filtered = match;
  }

  if (prefs.transportation && prefs.transportation.length > 0 && category === "excursions") {
    const match = filtered.filter(i => i.transport && i.transport.some(t => prefs.transportation.includes(t)));
    if (match.length >= 2) filtered = match;
  }

  return filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
}

// ─── Result Card ──────────────────────────────────────────────
function ResultCard({ item, category, isAdded, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const priceStr = category === "dining"
    ? ["Free","$","$$","$$$"][item.price] || "$"
    : ["Free","$","$$","$$$"][item.price] || "$";

  const catLabel = { excursions: "Excursion", dining: "Dining", activities: "Activity", resorts: "Resort" }[category];
  const catClass = { excursions: "cat-excursion", dining: "cat-dining", activities: "cat-activity", resorts: "cat-resort" }[category];
  const bgColor  = { excursions: "#fef9f0", dining: "#f0fdf4", activities: "#eff6ff", resorts: "#fdf4ff" }[category];

  return (
    <div className="result-card">
      {/* Image placeholder */}
      <div className="result-img" style={{ background: bgColor }}>
        <span style={{ fontSize: 52 }}>{item.emoji}</span>
      </div>

      <div className="result-body">
        {/* Category + title */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <span className={`cat-pill ${catClass}`}>{catLabel}</span>
            <div className="result-title" style={{ marginTop: 6 }}>{item.title}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="rating-row">
          <span className="stars">{starsFor(item.rating)}</span>
          <span className="rating-num">{item.rating.toFixed(1)}</span>
          <span className="rating-count">({item.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Description */}
        <p className="result-desc">{item.desc}</p>

        {/* Meta icons */}
        <div className="icon-row">
          {item.duration && (
            <span className="icon-item">⏱️ {item.duration} hrs</span>
          )}
          <span className="icon-item">💰 {priceStr}</span>
          <span className="icon-item">📍 {item.distance}</span>
          {item.family && <span className="icon-item">👨‍👩‍👧 Family OK</span>}
          {item.accessibility && <span className="icon-item">♿ Accessible</span>}
          {item.kidFriendly && <span className="icon-item">👧 Kid-friendly</span>}
          {item.cuisine && <span className="icon-item">🍴 {item.cuisine}</span>}
          {item.hours && <span className="icon-item">🕐 {item.hours}</span>}
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div style={{ background: "#F4F6F9", borderRadius: 10, padding: "0.75rem", marginBottom: 10, fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
            {item.fitness && <div><strong>Fitness level:</strong> {item.fitness}</div>}
            {item.transport && <div><strong>Transport:</strong> {item.transport.join(", ")}</div>}
            {item.types && <div><strong>Type:</strong> {item.types.join(", ")}</div>}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            className="btn btn-outline"
            style={{ flex: 1, minHeight: 44, fontSize: 14 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less ↑" : "Details ↓"}
          </button>
          <button
            className={`btn ${isAdded ? "btn-added" : "btn-primary"}`}
            style={{ flex: 2, minHeight: 44, fontSize: 14 }}
            onClick={onToggle}
          >
            {isAdded ? "✓ Added to Plan" : "+ Add to Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────
function HomeScreen({ appState, updateAppState, navigate }) {
  const [line, setLine] = useState("");
  const [ship, setShip] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ships = line ? (SHIPS[line] || []) : [];
  const { dates: sailDates, note: sailNote } = (line && ship) ? getSailDates(line, ship) : { dates: [], note: "" };
  const canLoad = line && ship && date;

  const handleLoad = () => {
    setLoading(true); setError("");
    setTimeout(() => {
      const key = `${line}_${ship}`;
      const itinerary = ITINERARIES[key];
      if (!itinerary) {
        setError("No itinerary found. Try Royal Caribbean – Wonder of the Seas or Disney – Disney Wish.");
        setLoading(false); return;
      }
      const lineName = LINES.find(l => l.id === line)?.name || line;
      const shipName = ships.find(s => s.id === ship)?.name || ship;
      updateAppState({ cruise: { line: lineName, ship: shipName, sail_date: date }, itinerary });
      setLoading(false);
      navigate("prefs");
    }, 700);
  };

  const dot = (n, active, done) => (
    <div className={`step-dot ${done ? "step-dot-done" : active ? "step-dot-active" : "step-dot-pending"}`}>
      {done ? "✓" : n}
    </div>
  );

  return (
    <div className="screen-enter">
      <div className="hero">
        <div className="heroicon">🚢</div>
        <h1>Skip the Ship</h1>
        <div className="hero-tagline-main">Smarter shore days start here</div>
        <div className="hero-tagline-sub">Your day, your way.</div>
      </div>

      <div className="card">
        <div className="cardbody">

          {/* Step 1 */}
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
            <div style={{ paddingTop:28 }}>{dot(1, !line, !!line)}</div>
            <div style={{ flex:1 }}>
              <label className="formlabel">Cruise Line</label>
              <select className="formselect" value={line} onChange={e => { setLine(e.target.value); setShip(""); setDate(""); }}>
                <option value="">Select cruise line</option>
                {LINES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
            <div style={{ paddingTop:28 }}>{dot(2, !!line && !ship, !!ship)}</div>
            <div style={{ flex:1 }}>
              <label className="formlabel">Ship</label>
              <select className="formselect" value={ship} onChange={e => { setShip(e.target.value); setDate(""); }} disabled={!line}>
                <option value="">{line ? "Select your ship" : "Select a cruise line first"}</option>
                {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:20 }}>
            <div style={{ paddingTop:28 }}>{dot(3, !!ship && !date, !!date)}</div>
            <div style={{ flex:1 }}>
              <label className="formlabel">Sail Date</label>
              <select className="formselect" value={date} onChange={e => setDate(e.target.value)} disabled={!ship} style={{ marginBottom: sailNote ? 6 : 0 }}>
                <option value="">{ship ? "Select your sail date" : "Select a ship first"}</option>
                {sailDates.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {sailNote && (
                <div style={{ fontSize:11, color:"#64748b", marginBottom:0, display:"flex", alignItems:"center", gap:4 }}>
                  <span>🗓️</span> {sailNote}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"0.75rem 1rem", color:"#dc2626", fontSize:13, marginBottom:16, lineHeight:1.5 }}>
              ⚠️ {error}
            </div>
          )}

          <button className="btn btn-primary" onClick={handleLoad} disabled={!canLoad || loading}>
            {loading ? <><span className="spinner" />&nbsp; Loading itinerary…</> : "Load My Itinerary →"}
          </button>
        </div>
      </div>

      <div className="chips">
        {[["🗺️","Auto-loaded port times"],["⭐","Top-rated only"],["🎯","Matches preferences"]].map(([icon,label]) => (
          <div key={label} className="chip">
            <div className="chip-icon">{icon}</div>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Port List ────────────────────────────────────────
function PortListScreen({ appState, navigate, updateAppState }) {
  const { itinerary, cruise, plan = [], selectedPort, plannedPorts = [] } = appState;
  const [confirmPort, setConfirmPort] = useState(null);

  const handlePortSelect = (port) => {
    const isSamePort = selectedPort?.port === port.port;
    const hasPlan = plan.length > 0;

    if (hasPlan && !isSamePort) {
      // Ask user what to do with existing plan
      setConfirmPort(port);
    } else {
      // No plan or same port — just navigate
      updateAppState({ selectedPort: port });
      navigate("portday");
    }
  };

  const handleKeepPlan = () => {
    // Keep existing plan, switch port — add old port to history
    const history = appState.plannedPorts || [];
    const existing = appState.selectedPort;
    const updatedHistory = existing && !history.find(h => h.port === existing.port)
      ? [...history, { ...existing, planCount: plan.length }]
      : history;
    updateAppState({
      selectedPort: confirmPort,
      plannedPorts: updatedHistory,
    });
    setConfirmPort(null);
    navigate("portday");
  };

  const handleClearPlan = () => {
    // Clear plan and start fresh for new port
    updateAppState({
      selectedPort: confirmPort,
      plan: [],
    });
    setConfirmPort(null);
    navigate("portday");
  };

  if (!itinerary || itinerary.length === 0) {
    return (
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your Itinerary</h2>
        <div className="card cardbody" style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
          <p>No itinerary loaded yet.</p>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={() => navigate("home")}>Go to Home →</button>
        </div>
      </div>
    );
  }

  const portDays = itinerary.filter(p => !p.sea_day && p.arrival !== "Embarkation" && p.departure !== "Disembarkation");

  return (
    <div>

      {/* ── Port switch confirmation modal ─────────────────── */}
      {confirmPort && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(13,27,42,0.7)",
          zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1.5rem",
        }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "1.5rem",
            maxWidth: 360, width: "100%",
            boxShadow: "0 20px 60px rgba(13,27,42,0.4)",
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ fontSize: 32, textAlign: "center", marginBottom: 12 }}>🗺️</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0D1B2A", textAlign: "center", marginBottom: 8, letterSpacing: "-0.3px" }}>
              Switch to {confirmPort.port}?
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
              You have <strong>{plan.length} item{plan.length !== 1 ? "s" : ""}</strong> in your current plan for <strong>{appState.selectedPort?.port}</strong>. What would you like to do?
            </p>

            {/* Option 1 — Keep plan */}
            <button
              onClick={handleKeepPlan}
              style={{
                width: "100%", minHeight: 52, borderRadius: 12, marginBottom: 10,
                background: "#0D1B2A", color: "#C9A84C", border: "1px solid #C9A84C",
                fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              📋 Keep my plan &amp; switch port
            </button>

            {/* Option 2 — Clear plan */}
            <button
              onClick={handleClearPlan}
              style={{
                width: "100%", minHeight: 52, borderRadius: 12, marginBottom: 10,
                background: "#fff", color: "#dc2626", border: "1.5px solid #fecaca",
                fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              🗑️ Clear plan &amp; start fresh
            </button>

            {/* Cancel */}
            <button
              onClick={() => setConfirmPort(null)}
              style={{
                width: "100%", minHeight: 44, borderRadius: 12,
                background: "transparent", color: "#94a3b8", border: "none",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Your Itinerary</h2>
        <p style={{ color: "#334155", fontSize: 13 }}>{cruise.ship} · {cruise.sail_date}</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: "1rem" }}>
        {[[ itinerary.length, "Total days"], [portDays.length, "Port days"], [itinerary.filter(p=>p.sea_day).length, "Sea days"]].map(([n,l]) => (
          <div key={l} style={{ flex:1, background:"#fdf8ed", border:"1px solid #C9A84C", borderRadius:12, padding:"0.75rem", textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:700, color:"#0D1B2A" }}>{n}</div>
            <div style={{ fontSize:11, color:"#334155" }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="card">
        {itinerary.map((p, i) => {
          const win = (!p.sea_day && !["Embarkation","Disembarkation"].includes(p.arrival) && !["Embarkation","Disembarkation"].includes(p.departure)) ? getPortWindow(p) : null;
          const isClickable = !p.sea_day && p.arrival !== "Embarkation" && p.departure !== "Disembarkation";
          return (
            <div key={i} className={`portcard ${p.sea_day ? "sea" : ""}`} onClick={() => { if (isClickable) { handlePortSelect(p); } }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>{p.date}</div>
                <div style={{ fontSize:15, fontWeight:600, color:p.sea_day?"#94a3b8":"#0D1B2A", marginBottom:3, display:"flex", alignItems:"center", gap:6 }}>
                  {p.sea_day ? "🌊 " : ""}{p.port}
                  {plannedPorts.find(h => h.port === p.port) && (
                    <span style={{ fontSize:10, fontWeight:800, background:"#fdf3d0", color:"#7a5c00", padding:"2px 6px", borderRadius:999 }}>
                      PLANNED
                    </span>
                  )}
                  {selectedPort?.port === p.port && plan.length > 0 && (
                    <span style={{ fontSize:10, fontWeight:800, background:"#0D1B2A", color:"#C9A84C", padding:"2px 6px", borderRadius:999 }}>
                      {plan.length} ITEMS
                    </span>
                  )}
                </div>
                {!p.sea_day && <div style={{ fontSize:13, color:"#64748b" }}>{p.arrival} – {p.departure}{p.timezone && <span style={{ marginLeft:6, color:"#94a3b8" }}>({p.timezone})</span>}</div>}
                {win && <div style={{ fontSize:12, color:"#0D1B2A", marginTop:4, fontWeight:500 }}>✓ ~{win.hours} hrs excursion time</div>}
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, marginLeft:12 }}>
                {p.tender && <span className="badge-amber badge">Tender</span>}
                {p.arrival === "Embarkation" && <span className="badge-gray badge">Embark</span>}
                {p.departure === "Disembarkation" && <span className="badge-gray badge">Disembark</span>}
                {isClickable && <span style={{ color:"#0D1B2A", fontSize:20, lineHeight:1 }}>›</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Preference constants ─────────────────────────────────────
const ACTIVITY_TYPES = ["Wildlife","Adventure","Cultural","Food & Drink","Beach Day","Shopping","Scenic","Historical","Water Activities","Relaxation"];
const ACCESSIBILITY_OPTIONS = [
  { id: "family_friendly",   label: "Family Friendly",       icon: "👨‍👩‍👧" },
  { id: "stroller_friendly", label: "Stroller Friendly",     icon: "🍼" },
  { id: "wheelchair",        label: "Wheelchair Accessible", icon: "♿" },
  { id: "shade_required",    label: "Shade Required",        icon: "⛱️" },
  { id: "bathroom_access",   label: "Bathroom Access",       icon: "🚻" },
];
const TRANSPORTATION = [
  { id: "walking",   label: "Walking Only",    icon: "🚶" },
  { id: "shuttle",   label: "Shuttle / Van OK", icon: "🚐" },
  { id: "boat",      label: "Boat OK",           icon: "⛵" },
  { id: "longdrive", label: "Long Drives OK",    icon: "🚗" },
];
const PRICE_LABELS = ["Free","$","$$","$$$"];

// ─── Screen: Preferences (set once, applies to all ports) ─────
function PreferencesScreen({ appState, updateAppState, navigate }) {
  const prefs = appState.userPreferences || {};
  const [activityTypes, setActivityTypes] = useState(prefs.activity_types || []);
  const [accessibility, setAccessibility] = useState(prefs.accessibility_flags || []);
  const [fitnessLevel,  setFitnessLevel]  = useState(prefs.fitness_level || "");
  const [groupSize,     setGroupSize]     = useState(prefs.group_size || "");
  const [priceRange,    setPriceRange]    = useState(prefs.price_range ?? 2);
  const [minDuration,   setMinDuration]   = useState(prefs.duration_hours?.[0] ?? 1);
  const [maxDuration,   setMaxDuration]   = useState(prefs.duration_hours?.[1] ?? 6);
  const [transport,     setTransport]     = useState(prefs.transportation || []);

  const toggleItem = (list, setList, id) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const handleSave = () => {
    updateAppState({
      preferencesSaved: true,
      userPreferences: { activity_types: activityTypes, accessibility_flags: accessibility, fitness_level: fitnessLevel, group_size: groupSize, price_range: priceRange, duration_hours: [minDuration, maxDuration], transportation: transport },
    });
    navigate("ports");
  };

  const prefCount = activityTypes.length + accessibility.length + (fitnessLevel ? 1 : 0) + (groupSize ? 1 : 0) + transport.length;

  return (
    <div>
      <div style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>Your Preferences</h2>
        <p style={{ fontSize:13, color:"#334155" }}>Set once — applies to all ports on your cruise.</p>
        {appState.preferencesSaved && prefCount > 0 && (
          <div style={{ marginTop:8, background:"#fdf8ed", border:"1px solid #C9A84C", borderRadius:10, padding:"0.5rem 0.875rem", fontSize:13, color:"#0D1B2A" }}>
            ✓ {prefCount} preference{prefCount!==1?"s":""} saved
          </div>
        )}
      </div>

      <div className="section-card">
        <div className="section-header"><span>🎯</span><span className="section-title">Activity Types</span></div>
        <div className="section-body">
          <div className="checkbox-grid">
            {ACTIVITY_TYPES.map(type => (
              <label key={type} className="check-row">
                <input type="checkbox" checked={activityTypes.includes(type)} onChange={() => toggleItem(activityTypes, setActivityTypes, type)} />
                <span className="check-label">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>♿</span><span className="section-title">Family &amp; Accessibility</span></div>
        <div className="section-body">
          {ACCESSIBILITY_OPTIONS.map(opt => (
            <label key={opt.id} className="check-row">
              <input type="checkbox" checked={accessibility.includes(opt.id)} onChange={() => toggleItem(accessibility, setAccessibility, opt.id)} />
              <span className="check-icon">{opt.icon}</span><span className="check-label">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>💪</span><span className="section-title">Fitness Level</span></div>
        <div className="section-body">
          <div className="pill-group">
            {["Low","Moderate","High"].map(level => (
              <button key={level} className={`pill ${fitnessLevel===level?"selected":""}`} onClick={() => setFitnessLevel(fitnessLevel===level?"":level)}>
                {level==="Low"?"🚶 ":level==="Moderate"?"🚴 ":"🏃 "}{level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>👥</span><span className="section-title">Group Size</span></div>
        <div className="section-body">
          <div className="pill-group">
            {["Small Group","Private Only","Avoid Large Groups"].map(size => (
              <button key={size} className={`pill ${groupSize===size?"selected":""}`} onClick={() => setGroupSize(groupSize===size?"":size)}>{size}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>💰</span><span className="section-title">Price Range</span></div>
        <div className="section-body">
          <div className="slider-value">{PRICE_LABELS[priceRange]} and under</div>
          <div className="slider-wrap">
            <input type="range" min={0} max={3} step={1} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} />
            <div className="slider-labels">{PRICE_LABELS.map(l => <span key={l}>{l}</span>)}</div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>⏱️</span><span className="section-title">Duration Preference</span></div>
        <div className="section-body">
          <div className="slider-value">{minDuration} – {maxDuration} hrs</div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>Minimum hours</div>
            <input type="range" min={1} max={8} step={1} value={minDuration} onChange={e => { const v=Number(e.target.value); setMinDuration(v); if(v>maxDuration) setMaxDuration(v); }} />
          </div>
          <div>
            <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>Maximum hours</div>
            <input type="range" min={1} max={8} step={1} value={maxDuration} onChange={e => { const v=Number(e.target.value); setMaxDuration(v); if(v<minDuration) setMinDuration(v); }} />
          </div>
          <div style={{ fontSize:12, color:"#64748b", marginTop:8 }}>Duration is automatically capped to each port's available window.</div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header"><span>🚐</span><span className="section-title">Transportation</span></div>
        <div className="section-body">
          {TRANSPORTATION.map(opt => (
            <label key={opt.id} className="check-row">
              <input type="checkbox" checked={transport.includes(opt.id)} onChange={() => toggleItem(transport, setTransport, opt.id)} />
              <span className="check-icon">{opt.icon}</span><span className="check-label">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="sticky-btn">
        <button className="btn btn-primary" onClick={handleSave}>
          Save &amp; View My Itinerary →
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Port Day (clean — port info only) ──────────────
function PortDayScreen({ appState, navigate }) {
  const { selectedPort, userPreferences = {} } = appState;

  if (!selectedPort) {
    return (
      <div className="card cardbody" style={{ textAlign:"center", color:"#94a3b8", padding:"2rem" }}>
        <div style={{ fontSize:32, marginBottom:8 }}>📅</div>
        <p style={{ marginBottom:4, fontWeight:600, color:"#0D1B2A" }}>No port selected</p>
        <p style={{ fontSize:13, marginBottom:16 }}>Go to your itinerary and tap a port to get started.</p>
        <button className="btn btn-primary" onClick={() => navigate("ports")}>View Itinerary →</button>
      </div>
    );
  }

  const win = getPortWindow(selectedPort);
  const prefs = userPreferences;
  const prefCount = (prefs.activity_types?.length || 0) + (prefs.accessibility_flags?.length || 0) + (prefs.fitness_level ? 1 : 0) + (prefs.transportation?.length || 0);

  return (
    <div>
      <div className="port-header">
        <div style={{ fontSize:20, fontWeight:700 }}>{selectedPort.port}</div>
        <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>{selectedPort.date}</div>
        <div className="time-badges">
          <span className="time-badge">🕐 Arrive {selectedPort.arrival}</span>
          <span className="time-badge">🕐 Depart {selectedPort.departure}</span>
          {selectedPort.timezone && <span className="time-badge">🌍 {selectedPort.timezone}</span>}
        </div>
      </div>

      {selectedPort.tender && (
        <div className="warning-box"><span>🚢</span><span>This is a <strong>tender port</strong>. Allow extra time to get ashore. Walking-only excursions from the pier are not available.</span></div>
      )}

      {win && (
        <div className="summary-box">
          <div className="summary-row"><span className="summary-icon">🕑</span><div><div className="summary-label">In port</div><div className="summary-value">{selectedPort.arrival} – {selectedPort.departure}</div></div></div>
          <div className="summary-row"><span className="summary-icon">✅</span><div><div className="summary-label">Safe excursion window</div><div className="summary-value">{win.start} – {win.end}</div><div className="summary-sub">~{win.hours} hrs · includes 1 hr return buffer{selectedPort.tender?" + tender time":""}</div></div></div>
          <div className="summary-row"><span className="summary-icon">🌍</span><div><div className="summary-label">Time zone</div><div className="summary-value">{selectedPort.timezone}</div></div></div>
        </div>
      )}

      <div className="section-card">
        <div className="section-header"><span>🎯</span><span className="section-title">Your Preferences</span></div>
        <div className="section-body">
          {prefCount === 0 ? (
            <p style={{ fontSize:13, color:"#94a3b8", marginBottom:8 }}>No preferences set yet.</p>
          ) : (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
              {prefs.activity_types?.map(t => <span key={t} className="badge">{t}</span>)}
              {prefs.accessibility_flags?.map(f => <span key={f} className="badge badge-gray">{ACCESSIBILITY_OPTIONS.find(o=>o.id===f)?.label || f}</span>)}
              {prefs.fitness_level && <span className="badge badge-gray">💪 {prefs.fitness_level}</span>}
              {prefs.transportation?.map(t => <span key={t} className="badge badge-gray">{TRANSPORTATION.find(o=>o.id===t)?.label || t}</span>)}
              {prefs.price_range !== undefined && <span className="badge badge-gray">💰 {PRICE_LABELS[prefs.price_range]} and under</span>}
            </div>
          )}
          <button className="btn btn-outline" style={{ minHeight:40, fontSize:14 }} onClick={() => navigate("prefs")}>
            ✏️ Edit Preferences
          </button>
        </div>
      </div>

      <div className="sticky-btn">
        <button className="btn btn-primary" onClick={() => navigate("results")}>
          Show Top Options →
        </button>
      </div>
    </div>
  );
}


// ─── Screen: Results ──────────────────────────────────────────
function ResultsScreen({ appState, updateAppState, navigate }) {
  const { selectedPort, userPreferences = {}, plan = [] } = appState;
  const [activeTab, setActiveTab] = useState("excursions");

  if (!selectedPort) {
    return (
      <div className="card cardbody" style={{ textAlign:"center", color:"#94a3b8", padding:"2rem" }}>
        <div style={{ fontSize:32, marginBottom:8 }}>⭐</div>
        <p>Select a port and set your preferences first.</p>
        <button className="btn btn-primary" style={{ marginTop:"1rem" }} onClick={() => navigate("ports")}>View Itinerary →</button>
      </div>
    );
  }

  const portData = PORT_DATA[selectedPort.port] || {};
  const win = getPortWindow(selectedPort);

  const excursions = filterAndRank(portData.excursions, userPreferences, win, "excursions");
  const dining     = filterAndRank(portData.dining,     userPreferences, win, "dining");
  const activities = filterAndRank(portData.activities, userPreferences, win, "activities");
  const resorts    = filterAndRank(portData.resorts,    userPreferences, win, "resorts");

  const tabData = { excursions, dining, activities, resorts };
  const tabs = [
    { id: "excursions", label: "Excursions", icon: "🗺️", count: excursions.length },
    { id: "dining",     label: "Dining",     icon: "🍽️", count: dining.length },
    { id: "activities", label: "Activities", icon: "⚡", count: activities.length },
    { id: "resorts",    label: "Resorts",    icon: "🏖️", count: resorts.length },
  ];

  const togglePlan = (item) => {
    const exists = plan.find(p => p.id === item.id);
    const newPlan = exists ? plan.filter(p => p.id !== item.id) : [...plan, { ...item, category: activeTab, port: selectedPort.port }];
    updateAppState({ plan: newPlan });
  };

  const currentItems = tabData[activeTab] || [];
  const planCount = plan.length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:2 }}>Top Options</h2>
        <p style={{ fontSize:13, color:"#334155" }}>{selectedPort.port} · {selectedPort.date}</p>
        {win && <p style={{ fontSize:12, color:"#0D1B2A", marginTop:2 }}>Showing options that fit your {win.hours} hr port window</p>}
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn ${activeTab===t.id?"active":""}`} onClick={() => setActiveTab(t.id)}>
            {t.icon} {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Cards */}
      {currentItems.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
          <p style={{ fontWeight:600, marginBottom:4 }}>No matches found</p>
          <p style={{ fontSize:13 }}>Try adjusting your preferences on the Port Day screen.</p>
          <button className="btn btn-outline" style={{ marginTop:"1rem", maxWidth:200 }} onClick={() => navigate("portday")}>Adjust Filters</button>
        </div>
      ) : (
        currentItems.map(item => (
          <ResultCard
            key={item.id}
            item={item}
            category={activeTab}
            isAdded={plan.some(p => p.id === item.id)}
            onToggle={() => togglePlan(item)}
          />
        ))
      )}

      {/* Go to plan button */}
      {planCount > 0 && (
        <div className="sticky-btn">
          <button className="btn btn-primary" onClick={() => navigate("plan")}>
            Generate My Port Day Plan
            <span className="plan-count">{planCount}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Screen: Plan ─────────────────────────────────────────────
// ─── Timeline generator ───────────────────────────────────────
function buildTimeline(plan, selectedPort) {
  const win = selectedPort ? getPortWindow(selectedPort) : null;
  const events = [];

  const parseT = (str) => {
    if (!str) return null;
    const [time, period] = str.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const fmtT = (mins) => {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    const p = h >= 12 ? "PM" : "AM";
    const hr = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hr}:${String(m).padStart(2,"0")} ${p}`;
  };

  let cursor = win ? parseT(win.start) : parseT(selectedPort?.arrival) || 480;

  // Arrival / get ashore
  events.push({
    time: fmtT(cursor),
    icon: "🚢",
    title: selectedPort?.tender ? "Tender ashore" : "Arrive at port",
    desc: selectedPort?.tender
      ? "Take the tender boat to shore. Allow 20–30 min each way."
      : `Disembark at ${selectedPort?.port || "port"} and make your way ashore.`,
    type: "logistics",
  });
  cursor += 15;

  // Sort plan: early dining first, then excursions, then activities/resorts, then lunch/dinner
  // Breakfast = opens before 10 AM (e.g. "7:00 AM", "8:00 AM")
  const isBreakfast = (item) => {
    if (!item.hours) return false;
    const match = item.hours.match(/^(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return false;
    let h = parseInt(match[1]);
    const period = match[3].toUpperCase();
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h < 10;
  };
  const breakfast  = plan.filter(p => p.category === "dining" && isBreakfast(p));
  const excursions = plan.filter(p => p.category === "excursions");
  const activities = plan.filter(p => p.category === "activities");
  const resorts    = plan.filter(p => p.category === "resorts");
  const dining     = plan.filter(p => p.category === "dining" && !isBreakfast(p));

  // Breakfast
  breakfast.forEach(item => {
    events.push({ time: fmtT(cursor), icon: item.emoji, title: item.title, desc: `${item.cuisine} · ${item.distance} · ${["Free","$","$$","$$$"][item.price]}`, type: "dining" });
    cursor += 60;
  });

  // Excursions
  excursions.forEach(item => {
    events.push({ time: fmtT(cursor), icon: item.emoji, title: item.title, desc: `${item.duration} hrs · ${item.distance} · ⭐ ${item.rating}`, type: "excursion" });
    cursor += (item.duration || 3) * 60;
    // Buffer between activities
    cursor += 20;
  });

  // Resorts
  resorts.forEach(item => {
    events.push({ time: fmtT(cursor), icon: item.emoji, title: item.title, desc: `Beach & pool day · ${item.distance} · ⭐ ${item.rating}`, type: "resort" });
    cursor += 180;
    cursor += 20;
  });

  // Activities
  activities.forEach(item => {
    events.push({ time: fmtT(cursor), icon: item.emoji, title: item.title, desc: `${item.duration ? item.duration+" hrs · " : ""}${item.distance} · ⭐ ${item.rating}`, type: "activity" });
    cursor += (item.duration || 1.5) * 60;
    cursor += 15;
  });

  // Lunch slot if nothing dining midday
  if (dining.length === 0 && breakfast.length === 0) {
    events.push({ time: fmtT(cursor), icon: "🍽️", title: "Lunch on your own", desc: "Explore local restaurants near the port or enjoy street food.", type: "dining" });
    cursor += 60;
  }

  // Dinner
  dining.forEach(item => {
    events.push({ time: fmtT(cursor), icon: item.emoji, title: item.title, desc: `${item.cuisine} · ${item.distance} · ${["Free","$","$$","$$$"][item.price]}`, type: "dining" });
    cursor += 90;
  });

  // Return to ship
  const returnTime = win ? parseT(win.end) : (parseT(selectedPort?.departure) || 1020) - 60;
  events.push({
    time: fmtT(Math.min(cursor + 15, returnTime)),
    icon: "🚢",
    title: selectedPort?.tender ? "Return tender to ship" : "Return to ship",
    desc: `Be back aboard by ${selectedPort?.departure || "departure time"}. ${selectedPort?.tender ? "Allow 30 min for tender." : "Allow extra time for pier walk."}`,
    type: "logistics",
  });

  return events;
}

// ─── Safety tips per port ──────────────────────────────────────
const SAFETY_TIPS = {
  "Cozumel, Mexico":           ["Stay hydrated — it gets very hot midday","Use reef-safe sunscreen to protect the coral","Only use licensed taxis from the official stand at the pier","Keep valuables in your ship cabin, not on the beach","Agree on taxi fare before getting in"],
  "Roatán, Honduras":          ["Stay in tourist areas around the port and West Bay","Use cruise-recommended or port taxi services only","Don't wear flashy jewelry or carry large amounts of cash","West Bay Beach is safe — venture further with a guide","Drink bottled water only"],
  "Belize City, Belize":       ["This is a tender port — plan extra time both ways","Belize City center is best avoided — head to the cayes instead","Book reputable tour operators for jungle and cave activities","Wear water shoes for cave tubing","Don't pet or feed wildlife on eco tours"],
  "Costa Maya, Mexico":        ["Costa Maya is one of the safest Caribbean ports","The port area and Mahahual town are very walkable","Mahahual beach is free and safe to enjoy independently","Negotiate taxi fares before departure","Drink sealed bottled water only"],
  "Nassau, Bahamas":           ["Nassau is generally safe in tourist areas","Avoid walking alone after dark away from resort areas","Use licensed taxis — agree on fare upfront","Cable Beach and downtown are safest for independent exploration","Keep an eye on your belongings in the Straw Market"],
  "Lookout Cay":               ["Disney's private island — very safe and well-managed","All amenities are included with your cruise","Snorkel gear available to rent on the island","Shade is limited — bring sunscreen and hats","Water is safe to drink on the island"],
  "Perfect Day at CocoCay":    ["Royal Caribbean's private island — very safe","Wristband required for Thrill Waterpark — purchase in advance","Floating bar requires swimmers only — no non-swimmers","Bring reef-safe sunscreen — very limited shade","All food and non-alcoholic drinks included on island"],
  "Castaway Cay":              ["Disney's private island — extremely safe and family-friendly","Tram runs the length of the island — great for getting around","Adult beach (Serenity Bay) is at the far end — plan time","Snorkel gear included with your cruise — just show up","Character meet and greets happen throughout the day"],
  "Port Canaveral, FL":        ["Very safe US port — standard US precautions apply","Cocoa Beach is a short taxi ride away","Kennedy Space Center is an excellent excursion option","US currency and credit cards accepted everywhere","Emergency: dial 911"],
  "San Juan, Puerto Rico":     ["Old San Juan is very safe for tourists during the day","Puerto Rico uses US dollars — no currency exchange needed","Uber works well throughout San Juan","Avoid walking alone late at night in non-tourist areas","Emergency: dial 911 — US laws and protections apply"],
  "St. Thomas, USVI":          ["St. Thomas is a US territory — very safe for tourists","US dollars accepted everywhere — no currency exchange needed","Taxis are metered — agree on fare for non-metered rides","Downtown can get very crowded on cruise days","Emergency: dial 911"],
  "Juneau, AK":                ["Weather can change quickly — bring a rain jacket","Wildlife viewing: never approach bears or eagles","Only eat at established restaurants — avoid unlicensed sellers","Book glacier and whale watching tours in advance","Trails can be slippery — wear sturdy shoes"],
  "Ketchikan, AK":             ["Ketchikan is one of Alaska's safest ports","Creek Street boardwalk has uneven surfaces — watch your step","Rain is common — bring waterproof layers","Wildlife: don't approach or feed bald eagles or bears","Book excursions early — floatplane tours sell out fast"],
  "Barcelona, Spain":          ["Barcelona is generally safe but pickpocketing is common on Las Ramblas","Keep bags in front of you in crowded areas","Use licensed taxis or the metro — very safe and efficient","Emergency: dial 112 (European emergency number)","Carry a photocopy of your passport — leave original on ship"],
  "Rome, Italy":               ["Watch for pickpockets near the Colosseum and Vatican","Only use licensed taxis from official taxi stands","Dress modestly when visiting churches — cover shoulders and knees","Emergency: dial 112","Agree on restaurant prices before ordering — check for tourist surcharges"],
  "Naples, Italy":             ["Naples requires more caution than other Italian cities","Stay in tourist areas and use official taxis only","Watch bags closely in crowded areas","Book Vatican and Colosseum tickets in advance to skip lines","Emergency: dial 112"],
  "Ocho Rios, Jamaica":        ["Stick to tourist areas and organized excursions","Use only licensed taxis from the cruise pier — agree on fare first","Don't purchase items from unofficial vendors","Drink bottled water only","Ignore persistent vendors outside the port — be polite but firm"],
  "George Town, Cayman":       ["This is a tender port — time the tender schedule carefully","Grand Cayman is one of the safest Caribbean destinations","Use ATMs at established banks only","Taxis are metered — check rates before departing","UV is extremely strong — apply sunscreen every 2 hours"],
  "default":                   ["Always return to the ship at least 1 hour before departure","Carry a copy of your cruise card and passport","Keep emergency cash in local currency","Know the ship's emergency number","Stay hydrated and use sunscreen"],
};

function getSafetyTips(portName) {
  return SAFETY_TIPS[portName] || SAFETY_TIPS["default"];
}

// ─── Screen: Plan ─────────────────────────────────────────────
function PlanScreen({ appState, navigate }) {
  const { plan = [], selectedPort, cruise } = appState;
  const [shared, setShared] = useState(false);

  if (plan.length === 0) {
    return (
      <div>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:"1rem" }}>My Plan</h2>
        <div className="card cardbody" style={{ textAlign:"center", color:"#94a3b8", padding:"2rem" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>📋</div>
          <p style={{ marginBottom:4 }}>No items added to your plan yet.</p>
          <p style={{ fontSize:13 }}>Go to Results and tap "Add to Plan" on items you like.</p>
          <button className="btn btn-primary" style={{ marginTop:"1rem" }} onClick={() => navigate("results")}>Browse Options →</button>
        </div>
      </div>
    );
  }

  const timeline = buildTimeline(plan, selectedPort);
  const safetyTips = getSafetyTips(selectedPort?.port);
  const win = selectedPort ? getPortWindow(selectedPort) : null;

  const typeColors = {
    logistics: { bg:"#f1f5f9", border:"#cbd5e1", dot:"#64748b" },
    excursion: { bg:"#fdf8ed", border:"#C9A84C", dot:"#0D1B2A" },
    dining:    { bg:"#f0fdf4", border:"#bbf7d0", dot:"#15803d" },
    activity:  { bg:"#eff6ff", border:"#bfdbfe", dot:"#1d4ed8" },
    resort:    { bg:"#fdf4ff", border:"#e9d5ff", dot:"#7e22ce" },
  };

  const shareText = [
    `🚢 Skip the Ship Plan — ${selectedPort?.port || "Port Day"}`,
    `📅 ${selectedPort?.date || ""} · ${cruise?.ship || ""}`,
    win ? `⏱️ Port window: ${win.start} – ${win.end}` : "",
    "",
    "📋 MY TIMELINE:",
    ...timeline.map(e => `${e.time}  ${e.icon} ${e.title}`),
    "",
    "⚠️ SAFETY REMINDERS:",
    ...safetyTips.slice(0,3).map(t => `• ${t}`),
    "",
    "Generated with Skip the Ship",
  ].filter(Boolean).join("\n");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "My Skip the Ship Port Day Plan", text: shareText });
    } else {
      navigator.clipboard?.writeText(shareText).then(() => setShared(true));
      setTimeout(() => setShared(false), 3000);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:"1rem" }}>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:2 }}>My Port Day Plan</h2>
        {selectedPort && <p style={{ fontSize:13, color:"#334155" }}>{selectedPort.port} · {selectedPort.date}</p>}
        {cruise?.ship && <p style={{ fontSize:12, color:"#94a3b8" }}>{cruise.ship} · {cruise.sail_date}</p>}
      </div>

      {/* Port window banner */}
      {win && (
        <div style={{ background:"#fdf8ed", border:"1px solid #C9A84C", borderRadius:12, padding:"0.75rem 1rem", marginBottom:"1rem", display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:20 }}>✅</span>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#0D1B2A" }}>Safe excursion window: {win.start} – {win.end}</div>
            <div style={{ fontSize:12, color:"#334155" }}>~{win.hours} hrs · Return buffer included · {selectedPort?.timezone}</div>
          </div>
        </div>
      )}

      {/* Tender warning */}
      {selectedPort?.tender && (
        <div className="warning-box" style={{ marginBottom:"1rem" }}>
          <span>🚢</span>
          <span><strong>Tender port</strong> — factor in 30 min each way for the tender boat when planning your day.</span>
        </div>
      )}

      {/* Timeline */}
      <div className="section-card" style={{ marginBottom:"1rem" }}>
        <div className="section-header">
          <span>🗓️</span>
          <span className="section-title">Your Day Timeline</span>
        </div>
        <div style={{ padding:"0.75rem 1.25rem" }}>
          {timeline.map((event, i) => {
            const colors = typeColors[event.type] || typeColors.logistics;
            const isLast = i === timeline.length - 1;
            return (
              <div key={i} style={{ display:"flex", gap:12, marginBottom: isLast ? 0 : 4 }}>
                {/* Time column */}
                <div style={{ width:60, flexShrink:0, paddingTop:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#64748b", textAlign:"right" }}>{event.time}</div>
                </div>

                {/* Line + dot */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:20, flexShrink:0 }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:colors.dot, marginTop:14, flexShrink:0, zIndex:1 }} />
                  {!isLast && <div style={{ width:2, flex:1, background:"#e2e8f0", marginTop:2 }} />}
                </div>

                {/* Event card */}
                <div style={{ flex:1, background:colors.bg, border:`1px solid ${colors.border}`, borderRadius:10, padding:"0.625rem 0.875rem", marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <span style={{ fontSize:16 }}>{event.icon}</span>
                    <span style={{ fontSize:14, fontWeight:700, color:"#0D1B2A" }}>{event.title}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#334155", lineHeight:1.4 }}>{event.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected items summary */}
      <div className="section-card" style={{ marginBottom:"1rem" }}>
        <div className="section-header"><span>📋</span><span className="section-title">Selected Items ({plan.length})</span></div>
        {plan.map(item => (
          <div key={item.id} style={{ padding:"0.75rem 1.25rem", borderBottom:"1px solid #f1f5f9", display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:24, flexShrink:0 }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>{item.title}</div>
              <div style={{ fontSize:12, color:"#64748b" }}>{item.distance} · ⭐ {item.rating.toFixed(1)}</div>
            </div>
            <span className={`cat-pill ${
              item.category==="excursions"?"cat-excursion":
              item.category==="dining"?"cat-dining":
              item.category==="resorts"?"cat-resort":"cat-activity"
            }`} style={{ fontSize:10 }}>
              {item.category.slice(0,-1)}
            </span>
          </div>
        ))}
      </div>

      {/* Transportation notes */}
      <div className="section-card" style={{ marginBottom:"1rem" }}>
        <div className="section-header"><span>🚐</span><span className="section-title">Transportation Notes</span></div>
        <div style={{ padding:"0.875rem 1.25rem" }}>
          {[
            selectedPort?.tender ? "🚢 Tender port — water taxi to shore, ~20–30 min each way. Check tender schedule on the ship." : null,
            plan.some(p => p.transport?.includes("boat")) ? "⛵ One or more excursions require a boat transfer. Confirm meeting point with operator." : null,
            plan.some(p => p.transport?.includes("shuttle")) ? "🚐 Shuttle/van transport needed for some excursions. Confirm pickup location at the pier." : null,
            plan.some(p => p.distance?.includes("taxi")) ? "🚕 Taxis needed — agree on fare before departing. Only use official port taxis." : null,
            plan.some(p => p.transport?.includes("walking") || p.distance?.includes("walk")) ? "🚶 Some options are walkable from the pier — easy and free." : null,
            "⏱️ Always allow at least 60 minutes to return to the ship before departure.",
          ].filter(Boolean).map((note, i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#334155", lineHeight:1.5 }}>
              <span style={{ flexShrink:0, marginTop:1 }}></span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety tips */}
      <div className="section-card" style={{ marginBottom:"1rem" }}>
        <div className="section-header"><span>⚠️</span><span className="section-title">Safety Tips for {selectedPort?.port?.split(",")[0] || "This Port"}</span></div>
        <div style={{ padding:"0.875rem 1.25rem" }}>
          {safetyTips.map((tip, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:8, fontSize:13, color:"#334155", lineHeight:1.5 }}>
              <span style={{ color:"#0D1B2A", fontWeight:700, flexShrink:0 }}>✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important reminder */}
      <div style={{ background:"#fef9f0", border:"1px solid #fcd34d", borderRadius:12, padding:"0.875rem 1rem", marginBottom:"1rem" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:6 }}>⚠️ Important Reminders</div>
        {[
          `Ship departs at ${selectedPort?.departure || "scheduled time"} — be back at least 1 hour early`,
          "The ship will NOT wait for late passengers",
          "Carry a copy of your cruise card and a form of ID",
          "Save the ship's emergency number in your phone",
          selectedPort?.tender ? "Last tender time is usually 90 min before departure — confirm onboard" : "Know which gangway to use when returning",
        ].map((r, i) => (
          <div key={i} style={{ fontSize:13, color:"#92400e", display:"flex", gap:8, marginBottom:4 }}>
            <span style={{ flexShrink:0 }}>•</span><span>{r}</span>
          </div>
        ))}
      </div>

      {/* Share button */}
      <button className="btn btn-primary" onClick={handleShare} style={{ marginBottom:8 }}>
        {shared ? "✓ Copied to Clipboard!" : "📤 Save or Share My Plan"}
      </button>
      <div style={{ display:"flex", gap:10, marginBottom:"1rem" }}>
        <button className="btn btn-outline" style={{ flex:2 }} onClick={() => navigate("results")}>
          ← Edit Selections
        </button>
        <button
          onClick={() => {
            if (window.confirm("Clear your entire plan and start over?")) {
              updateAppState({ plan: [] });
              navigate("ports");
            }
          }}
          style={{
            flex:1, minHeight:52, borderRadius:14, border:"1.5px solid #fecaca",
            background:"#fff", color:"#dc2626", fontSize:14, fontWeight:700,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          }}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────
const NAV = [
  { id: "home",    label: "Home",    icon: "🏠" },
  { id: "prefs",   label: "Filters", icon: "🎯" },
  { id: "ports",   label: "Ports",   icon: "🗺️" },
  { id: "results", label: "Results", icon: "⭐" },
  { id: "plan",    label: "My Plan", icon: "📋" },
];
const SCREEN_TITLES = { home:"Skip the Ship", prefs:"My Preferences", ports:"My Itinerary", portday:"Port Day", results:"Top Options", plan:"My Plan" };
const BACK_TARGETS  = { prefs:"home", ports:"prefs", portday:"ports", results:"portday", plan:"results" };

function App() {
  const [screen, setScreen] = useState("home");
  const [appState, setAppState] = useState({
    cruise: { line:"", ship:"", sail_date:"" },
    itinerary: [],
    selectedPort: null,
    userPreferences: {},
    plan: [],
    plannedPorts: [],
  });

  const navigate = (s) => setScreen(s);
  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));
  const backTarget = BACK_TARGETS[screen];

  const screens = {
    home:    <HomeScreen         appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    prefs:   <PreferencesScreen  appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    ports:   <PortListScreen     appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    portday: <PortDayScreen      appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    results: <ResultsScreen      appState={appState} updateAppState={updateAppState} navigate={navigate} />,
    plan:    <PlanScreen         appState={appState} updateAppState={updateAppState} navigate={navigate} />,
  };

  return (
    <div className="app">
      <style>{css}</style>

      {/* Top bar */}
      <div className="topbar">
        <div style={{ width:72, display:"flex", alignItems:"center" }}>
          {backTarget ? (
            <button className="topbar-back" onClick={() => navigate(backTarget)}>
              ‹ Back
            </button>
          ) : (
            <div style={{ width:44 }} />
          )}
        </div>
        <span className="topbar-title" style={{ fontSize:16, fontWeight:800, letterSpacing:"-0.3px" }}>
          {SCREEN_TITLES[screen]}
        </span>
        <div style={{ width:72, display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
          {appState.plan.length > 0 && screen !== "plan" && (
            <button
              onClick={() => navigate("plan")}
              style={{ background:"#C9A84C", color:"#0D1B2A", borderRadius:999, fontSize:11, fontWeight:800, padding:"4px 10px", display:"flex", alignItems:"center", gap:4 }}
            >
              📋 {appState.plan.length}
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="main" key={screen}>
        {screens[screen]}
      </div>

      {/* Bottom nav */}
      <nav className="bottomnav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={`navbtn ${screen===n.id?"active":""}`}
            onClick={() => navigate(n.id)}
          >
            <span className="navbtn-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);
