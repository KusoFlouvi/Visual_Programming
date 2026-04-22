import React from 'react';

interface AirPollutionProps {
  data: any; // можно уточнить тип при необходимости
}

const aqiText: { [key: number]: string } = {
  1: 'Хорошее',
  2: 'Умеренное',
  3: 'Вредное для чувствительных групп',
  4: 'Вредное',
  5: 'Очень вредное',
};

const AirPollution: React.FC<AirPollutionProps> = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) return null;

  const aqi = data.list[0].main.aqi;

  return (
    <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Качество воздуха</h3>
      <p>Индекс AQI: {aqi} — {aqiText[aqi]}</p>
    </div>
  );
};

export default AirPollution;