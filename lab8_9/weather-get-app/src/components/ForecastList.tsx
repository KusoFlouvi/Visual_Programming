import React from 'react';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecastData: any[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecastData }) => {
  // Группируем по дате (без времени)
  const groupedByDay: { [date: string]: any[] } = {};
  forecastData.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedByDay[date]) groupedByDay[date] = [];
    groupedByDay[date].push(item);
  });

  return (
    <div>
      {Object.entries(groupedByDay).map(([date, items]) => (
        <div key={date} style={{ marginBottom: '20px' }}>
          <h3>{new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {items.map((item, idx) => (
              <ForecastCard
                key={idx}
                time={item.dt_txt.split(' ')[1].slice(0, 5)}
                temp={item.main.temp}
                icon={item.weather[0].icon}
                description={item.weather[0].description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;