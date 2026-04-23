# CarbonTwin Backend - Python Flask
# Run: pip install flask flask-cors && python app.py
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

HOTSPOTS = [
    {"id":"silk-board","name":"Silk Board Junction","source":"transport","baseCO2":180,"x":52,"y":70},
    {"id":"peenya","name":"Peenya Industrial","source":"industry","baseCO2":220,"x":30,"y":30},
    {"id":"electronic","name":"Electronic City","source":"industry","baseCO2":160,"x":60,"y":82},
    {"id":"whitefield","name":"Whitefield Tech Park","source":"power","baseCO2":140,"x":78,"y":45},
    {"id":"koramangala","name":"Koramangala","source":"residential","baseCO2":90,"x":55,"y":60},
    {"id":"mg-road","name":"MG Road","source":"transport","baseCO2":130,"x":50,"y":50},
]

def reduction(source, iv):
    table = {
        "transport":   0.0035*iv["roadsideCapture"] + 0.0010*iv["verticalGardens"] + 0.0055*iv["evAdoption"],
        "industry":    0.0060*iv["biofilters"]      + 0.0010*iv["verticalGardens"] + 0.0005*iv["roadsideCapture"],
        "power":       0.0050*iv["biofilters"]      + 0.0008*iv["verticalGardens"],
        "residential": 0.0035*iv["verticalGardens"] + 0.0005*iv["roadsideCapture"],
    }
    return min(table.get(source, 0), 0.85)

@app.get("/api/zones")
def zones():
    return jsonify(HOTSPOTS)

@app.post("/api/simulate")
def simulate():
    iv = (request.json or {}).get("interventions",
        {"roadsideCapture":0,"verticalGardens":0,"biofilters":0,"evAdoption":0})
    results = []
    for h in HOTSPOTS:
        r = reduction(h["source"], iv)
        results.append({**h,
            "effectiveCO2": round(h["baseCO2"] * (1 - r), 1),
            "reductionPct": round(r * 100, 1)})
    base = sum(h["baseCO2"] for h in HOTSPOTS)
    eff  = sum(z["effectiveCO2"] for z in results)
    return jsonify({"zones": results,
                    "totals": {"baseCO2": base, "effectiveCO2": eff,
                               "savedTonnes": round(base-eff,1)}})

@app.get("/api/aqi")
def aqi():
    return jsonify({"city":"Bangalore","aqi":142,"category":"Unhealthy for Sensitive",
                    "pm25":58,"pm10":96})

@app.get("/api/weather")
def weather():
    return jsonify({"city":"Bangalore","temperatureC":27,"humidity":64,
                    "condition":"Partly cloudy","windKph":11})

if __name__ == "__main__":
    app.run(port=3001, debug=True)
