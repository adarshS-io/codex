# CarbonTwin — Source Code Bundle
Hackathon submission · Digital Twin for CO₂ Capture in Bangalore

## Folders
| Folder         | What's inside                                                     |
|----------------|-------------------------------------------------------------------|
| `frontend/`    | Full React + TypeScript + Tailwind app (the live website)         |
| `backend/`     | Two reference REST APIs — Node.js (Express) and Python (Flask)    |
| `static-demo/` | Pure HTML + CSS + JavaScript version (no framework, opens in browser) |

## Quick start

### 1. Static demo (zero install)
Just open `static-demo/index.html` in any browser.

### 2. Backend
```bash
cd backend
node server.js          # Node version
# or
python app.py           # Python version
```

### 3. Frontend (full app)
```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

## Features
- 🗺  Bangalore CO₂ hotspot map with live halos
- 🎚  4 intervention sliders (roadside capture, gardens, biofilters, EVs)
- 📊  Per-zone reduction bars + KPIs (base, after-capture, saved tonnes)
- 🌡  AQI + temperature + humidity widgets
- 🧮  Source-weighted reduction model, capped at 85%
