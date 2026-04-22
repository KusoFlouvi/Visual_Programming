import React, { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите город"
      />
      <button type="submit">Поиск</button>
    </form>
  );
};

export default SearchBar;