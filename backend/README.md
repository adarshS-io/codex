# CarbonTwin Backend

Two reference implementations of the same REST API used by the CarbonTwin
digital-twin frontend.

## Endpoints
| Method | Path           | Description                                        |
|--------|----------------|----------------------------------------------------|
| GET    | /api/zones     | List Bangalore CO₂ hotspots                        |
| POST   | /api/simulate  | Run capture simulation with intervention sliders   |
| GET    | /api/aqi       | Current air-quality index                          |
| GET    | /api/weather   | Current temperature, humidity, condition           |

## Node.js (Express)
```bash
cd backend
npm install express cors
node server.js
# -> http://localhost:3001
```

## Python (Flask)
```bash
cd backend
pip install flask flask-cors
python app.py
# -> http://localhost:3001
```

## Sample request
```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '{"interventions":{"roadsideCapture":40,"verticalGardens":30,"biofilters":50,"evAdoption":25}}'
```
