import React from 'react';
import WeatherIcon from './WeatherIcon';

interface Props {
  data: any;
  cityName: string;
  country: string;
}

const CurrentWeather: React.FC<Props> = ({ data, cityName, country }) => {
  const { main, weather, wind } = data;
  return (
    <div className="current-weather">
      <h2>{cityName}, {country}</h2>
      <WeatherIcon iconCode={weather[0].icon} size={80} />
      <div className="temp">{Math.round(main.temp)}°C</div>
      <div>Ощущается как {Math.round(main.feels_like)}°C</div>
      <div>{weather[0].description}</div>
      <div>Ветер: {wind.speed} м/с, влажность: {main.humidity}%</div>
    </div>
  );
};

export default CurrentWeather;