import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getCoordinates = async (city: string) => {
  const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
    params: { q: city, limit: 1, appid: API_KEY }
  });
  if (!data.length) throw new Error('Город не найден');
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
};

export const getForecast = async (lat: number, lon: number) => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: { lat, lon, units: 'metric', appid: API_KEY }
  });
  return data;
};

export const getAirPollution = async (lat: number, lon: number) => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
    params: { lat, lon, appid: API_KEY }
  });
  return data;
};