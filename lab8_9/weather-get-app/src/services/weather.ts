import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Типы данных (будут уточняться по мере необходимости)
export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherData {
  // упрощённо, позже дополним
  list: any[];
  city: any;
}

export interface AirPollutionData {
  list: {
    main: { aqi: number };
    components: { [key: string]: number };
  }[];
}

// Получение координат по названию города
export const fetchGeocoding = async (city: string): Promise<GeocodingResult[]> => {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
    params: {
      q: city,
      limit: 5,
      appid: API_KEY,
    },
  });
  return response.data;
};

// Прогноз на 5 дней с шагом 3 часа
export const fetchForecast = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units: 'metric', // градусы Цельсия
      appid: API_KEY,
    },
  });
  return response.data;
};

// Загрязнение воздуха
export const fetchAirPollution = async (lat: number, lon: number): Promise<AirPollutionData> => {
  const response = await axios.get(`${BASE_URL}/air_pollution`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
  return response.data;
};