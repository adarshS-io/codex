const BENGALURU_COORDS = {
  latitude: 12.9716,
  longitude: 77.5946,
  timezone: "Asia/Kolkata",
};

export interface LiveWeatherData {
  temperatureC: number;
  humidity: number;
  windKph: number;
  condition: string;
  observedAt: string;
}

export interface LiveAirQualityData {
  usAqi: number;
  euAqi: number;
  co2Ppm: number;
  carbonMonoxide: number;
  pm25: number;
  no2: number;
  ozone: number;
  observedAt: string;
}

function roundValue(value: number, digits = 0) {
  return Number(value.toFixed(digits));
}

function weatherCodeToText(code: number) {
  const map: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Heavy rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };
  return map[code] ?? "Unknown conditions";
}

export async function fetchLiveBengaluruData() {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${BENGALURU_COORDS.latitude}` +
    `&longitude=${BENGALURU_COORDS.longitude}` +
    `&timezone=${encodeURIComponent(BENGALURU_COORDS.timezone)}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

  const airUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${BENGALURU_COORDS.latitude}` +
    `&longitude=${BENGALURU_COORDS.longitude}` +
    `&timezone=${encodeURIComponent(BENGALURU_COORDS.timezone)}` +
    `&current=us_aqi,european_aqi,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,ozone`;

  const [weatherRes, airRes] = await Promise.all([fetch(weatherUrl), fetch(airUrl)]);

  if (!weatherRes.ok) {
    throw new Error(`Weather request failed with ${weatherRes.status}`);
  }
  if (!airRes.ok) {
    throw new Error(`Air quality request failed with ${airRes.status}`);
  }

  const weatherJson = await weatherRes.json();
  const airJson = await airRes.json();

  const weatherCurrent = weatherJson.current;
  const airCurrent = airJson.current;

  return {
    weather: {
      temperatureC: roundValue(weatherCurrent.temperature_2m, 1),
      humidity: roundValue(weatherCurrent.relative_humidity_2m),
      windKph: roundValue(weatherCurrent.wind_speed_10m, 1),
      condition: weatherCodeToText(weatherCurrent.weather_code),
      observedAt: weatherCurrent.time,
    } satisfies LiveWeatherData,
    air: {
      usAqi: roundValue(airCurrent.us_aqi),
      euAqi: roundValue(airCurrent.european_aqi),
      co2Ppm: roundValue(airCurrent.carbon_dioxide),
      carbonMonoxide: roundValue(airCurrent.carbon_monoxide, 1),
      pm25: roundValue(airCurrent.pm2_5, 1),
      no2: roundValue(airCurrent.nitrogen_dioxide, 1),
      ozone: roundValue(airCurrent.ozone, 1),
      observedAt: airCurrent.time,
    } satisfies LiveAirQualityData,
  };
}
