import React from 'react';

interface Props {
  data: any;
}

const aqiText: Record<number, string> = {
  1: 'Хорошее',
  2: 'Умеренное',
  3: 'Вредное для чувствительных',
  4: 'Вредное',
  5: 'Очень вредное'
};

const AirPollution: React.FC<Props> = ({ data }) => {
  if (!data?.list?.length) return null;
  const { main } = data.list[0];
  return (
    <div className="air-pollution">
      <h3>Качество воздуха</h3>
      <p>AQI: {main.aqi} – {aqiText[main.aqi]}</p>
    </div>
  );
};

export default AirPollution;