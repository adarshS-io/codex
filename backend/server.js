// CarbonTwin Backend - Node.js + Express
// Run: npm install express cors && node server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); app.use(express.json());

// Bangalore CO2 hotspots
const hotspots = [
  { id: 'silk-board', name: 'Silk Board Junction', source: 'transport', baseCO2: 180, x: 52, y: 70 },
  { id: 'peenya',     name: 'Peenya Industrial',    source: 'industry',  baseCO2: 220, x: 30, y: 30 },
  { id: 'electronic', name: 'Electronic City',      source: 'industry',  baseCO2: 160, x: 60, y: 82 },
  { id: 'whitefield', name: 'Whitefield Tech Park', source: 'power',     baseCO2: 140, x: 78, y: 45 },
  { id: 'koramangala',name: 'Koramangala',          source: 'residential',baseCO2: 90, x: 55, y: 60 },
  { id: 'mg-road',    name: 'MG Road',              source: 'transport', baseCO2: 130, x: 50, y: 50 },
];

// Capture model: reduction factors per source x intervention
function reduction(source, iv) {
  const r = {
    transport:   0.0035*iv.roadsideCapture + 0.0010*iv.verticalGardens + 0.0055*iv.evAdoption,
    industry:    0.0060*iv.biofilters     + 0.0010*iv.verticalGardens + 0.0005*iv.roadsideCapture,
    power:       0.0050*iv.biofilters     + 0.0008*iv.verticalGardens,
    residential: 0.0035*iv.verticalGardens+ 0.0005*iv.roadsideCapture,
  }[source] || 0;
  return Math.min(r, 0.85); // cap at 85%
}

app.get('/api/zones', (req, res) => res.json(hotspots));

app.post('/api/simulate', (req, res) => {
  const iv = req.body.interventions || { roadsideCapture:0, verticalGardens:0, biofilters:0, evAdoption:0 };
  const results = hotspots.map(h => ({
    ...h,
    effectiveCO2: +(h.baseCO2 * (1 - reduction(h.source, iv))).toFixed(1),
    reductionPct: +(reduction(h.source, iv) * 100).toFixed(1),
  }));
  const totalBase = hotspots.reduce((s,h)=>s+h.baseCO2,0);
  const totalEff  = results.reduce((s,h)=>s+h.effectiveCO2,0);
  res.json({
    zones: results,
    totals: { baseCO2: totalBase, effectiveCO2: totalEff, savedTonnes: +(totalBase-totalEff).toFixed(1) },
  });
});

app.get('/api/aqi', (req, res) => {
  res.json({ city:'Bangalore', aqi: 142, category:'Unhealthy for Sensitive', pm25: 58, pm10: 96 });
});

app.get('/api/weather', (req, res) => {
  res.json({ city:'Bangalore', temperatureC: 27, humidity: 64, condition:'Partly cloudy', windKph: 11 });
});

app.listen(3001, () => console.log('CarbonTwin API on http://localhost:3001'));
