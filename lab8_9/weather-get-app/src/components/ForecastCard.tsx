import React from 'react';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  time: string;
  temp: number;
  icon: string;
  description: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ time, temp, icon, description }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', margin: '8px', textAlign: 'center', minWidth: '120px' }}>
      <div>{time}</div>
      <WeatherIcon iconCode={icon} size={50} />
      <div>{Math.round(temp)}°C</div>
      <div style={{ fontSize: '12px' }}>{description}</div>
    </div>
  );
};

export default ForecastCard;