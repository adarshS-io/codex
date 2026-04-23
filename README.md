# CarbonTwin Source Code Bundle
Hackathon submission · Digital Twin for CO2 capture in Bengaluru

## Folders
| Folder | What's inside |
|---|---|
| `frontend/` | Full React + TypeScript + Tailwind app (the live website) |
| `backend/` | Two reference REST APIs - Node.js (Express) and Python (Flask) |
| `static-demo/` | Pure HTML + CSS + JavaScript version (no framework, opens in browser) |

## Quick start

### 1. Static demo
Open `static-demo/index.html` in any browser.

### 2. Backend
```bash
cd backend
node server.js
# or
python app.py
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- Bengaluru hotspot map with modeled CO2 halos
- Intervention sliders for roadside capture, gardens, biofilters, and EV adoption
- Modeled emissions charts for planning scenarios
- Live Bengaluru weather card
- Live AQI, CO2, PM2.5, CO, NO2, and O3 snapshot

## Live data sources
- Weather API: Open-Meteo Forecast API
- Air quality API: Open-Meteo Air Quality API
- Weather data source: Open-Meteo best-match forecast models for Bengaluru coordinates
- Air quality data source: CAMS European Air Quality Forecast, CAMS Global Atmospheric Composition Forecasts, and CAMS Global Greenhouse Gas Forecast

The hotspot map and intervention charts remain modeled planning values. The atmosphere cards use current data fetched live for Bengaluru.
