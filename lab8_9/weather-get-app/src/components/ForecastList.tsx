import React from 'react';
import ForecastCard from './ForecastCard';

interface Props {
  list: any[];
}

const ForecastList: React.FC<Props> = ({ list }) => {
  const hourly = list.slice(0, 8);

  const daily = list.filter((item: any) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="forecast-list">
      <div className="cards">
        {hourly.map((item, idx) => (
          <ForecastCard
            key={idx}
            time={item.dt_txt.split(' ')[1].slice(0, 5)}
            temp={item.main.temp}
            icon={item.weather[0].icon}
            description={item.weather[0].description}
          />
        ))}
      </div>

      <h3 style={{ marginTop: '30px' }}>Прогноз на 5 дней</h3>
      <div className="cards">
        {daily.map((item, idx) => (
          <ForecastCard
            key={idx}
            time={new Date(item.dt_txt).toLocaleDateString('ru-RU', {
              weekday: 'short',
              day: 'numeric',
            })}
            temp={item.main.temp}
            icon={item.weather[0].icon}
            description={item.weather[0].description}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;