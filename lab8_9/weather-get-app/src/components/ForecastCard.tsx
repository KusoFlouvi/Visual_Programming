import React from 'react';
import WeatherIcon from './WeatherIcon';

interface Props {
  time: string;
  temp: number;
  icon: string;
  description: string;
}

const ForecastCard: React.FC<Props> = ({ time, temp, icon, description }) => (
  <div className="forecast-card">
    <div>{time}</div>
    <WeatherIcon iconCode={icon} size={50} />
    <div>{Math.round(temp)}°C</div>
    <div className="desc">{description}</div>
  </div>
);

export default ForecastCard;