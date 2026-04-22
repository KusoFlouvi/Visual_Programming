import React from 'react';

interface Props {
  iconCode: string;
  alt?: string;
  size?: number;
}

const WeatherIcon: React.FC<Props> = ({ iconCode, alt = '', size = 50 }) => {
  const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img src={url} alt={alt} width={size} height={size} />;
};

export default WeatherIcon;