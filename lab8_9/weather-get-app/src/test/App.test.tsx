import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import * as api from '../api';

vi.mock('../api', () => ({
  getCoordinates: vi.fn(),
  getForecast: vi.fn(),
  getAirPollution: vi.fn(),
}));

const mockForecast = {
  city: { name: 'Moscow', country: 'RU' },
  list: [
    {
      dt_txt: '2025-01-01 12:00:00',
      main: { temp: 20, feels_like: 18, humidity: 60 },
      weather: [{ main: 'Clear', description: 'ясно', icon: '01d' }],
      wind: { speed: 3 }
    },
    {
      dt_txt: '2025-01-02 12:00:00',
      main: { temp: 22, feels_like: 20, humidity: 55 },
      weather: [{ main: 'Clouds', description: 'облачно', icon: '02d' }],
      wind: { speed: 4 }
    }
  ]
};

const mockAir = {
  list: [{
    main: { aqi: 1 },
    components: { pm2_5: 10, pm10: 20, no2: 5, o3: 40 }
  }]
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('загружает и отображает погоду после ввода города', async () => {
    const user = userEvent.setup();

    vi.mocked(api.getCoordinates).mockResolvedValue({ lat: 55.75, lon: 37.61, name: 'Moscow' });
    vi.mocked(api.getForecast).mockResolvedValue(mockForecast);
    vi.mocked(api.getAirPollution).mockResolvedValue(mockAir);

    render(<App />);

    const input = screen.getByPlaceholderText(/Введите город/i);
    const button = screen.getByText(/Поиск/i);

    await user.type(input, 'Moscow');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Moscow, RU/i)).toBeInTheDocument();

      const currentWeatherBlock = document.querySelector('.current-weather');
      expect(currentWeatherBlock).toBeInTheDocument();
      const currentText = currentWeatherBlock!.textContent || '';
      expect(currentText).toMatch(/20°C/);
      expect(currentText).toMatch(/ясно/);

      expect(screen.getByText(/Прогноз на 24 часа/i)).toBeInTheDocument();

      expect(screen.getByText(/Качество воздуха/i)).toBeInTheDocument();
      expect(screen.getByText(/AQI: 1 – Хорошее/i)).toBeInTheDocument();
    });
  });
});