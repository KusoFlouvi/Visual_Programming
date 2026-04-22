import React, { useState, useEffect } from 'react';
import { fetchGeocoding, type GeocodingResult } from '../services/weather';

interface SearchBarProps {
  onCitySelect: (lat: number, lon: number, cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchGeocoding(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Geocoding error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (city: GeocodingResult) => {
    onCitySelect(city.lat, city.lon, city.name);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название города..."
        style={{ padding: '8px', width: '300px' }}
      />
      {isLoading && <div>Загрузка...</div>}
      {suggestions.length > 0 && (
        <ul style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', listStyle: 'none', padding: 0, margin: 0, width: '300px' }}>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {city.name}, {city.country} {city.state ? `(${city.state})` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;