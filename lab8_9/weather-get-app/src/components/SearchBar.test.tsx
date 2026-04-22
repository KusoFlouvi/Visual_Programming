import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import * as weatherService from '../services/weather';

// Мокируем модуль с API-запросами
vi.mock('../services/weather', () => ({
  fetchGeocoding: vi.fn(),
}));

describe('SearchBar', () => {
  it('отображает предложения после ввода', async () => {
    const mockGeocoding = vi.mocked(weatherService.fetchGeocoding);
    mockGeocoding.mockResolvedValue([
      { name: 'Moscow', lat: 55.75, lon: 37.61, country: 'RU' },
    ]);

    const onCitySelect = vi.fn();
    render(<SearchBar onCitySelect={onCitySelect} />);

    const input = screen.getByPlaceholderText(/Введите название города/i);
    fireEvent.change(input, { target: { value: 'Moscow' } });

    await waitFor(() => {
      expect(screen.getByText(/Moscow, RU/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Moscow, RU/i));
    expect(onCitySelect).toHaveBeenCalledWith(55.75, 37.61, 'Moscow');
  });
});