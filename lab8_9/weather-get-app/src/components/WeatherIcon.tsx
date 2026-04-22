import React from 'react';

interface WeatherIconProps {
  iconCode: string;
  alt?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, alt = 'weather icon', size = 50 }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img src={iconUrl} alt={alt} width={size} height={size} />;
};

export default WeatherIcon;