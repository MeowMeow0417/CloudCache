'use client';

import React, { useState, useRef } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger search for matching cities
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(`/api/LocationSearch?city=${query}`);
      if (!res.ok) throw new Error('Failed to fetch weather data');

      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setWeatherData([]);
    }
  };

  // Trigger search when pressing Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Handle losing focus (blur) - hide dropdown after delay so clicks still register
  const handleBlur = () => {
    setTimeout(() => setWeatherData([]), 150);
  };

  // Handle clicking a city in the dropdown
  const handleSelectCity = (name: string) => {
    setQuery('');
    setWeatherData([]);
    router.push(`/dashboard/city/${name.toLowerCase()}`);
  };

  return (
    <div ref={containerRef} className="relative w-96">
      {/* Search input */}
      <Input
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);

          // Clear dropdown if input is empty
          if (!val.trim()) setWeatherData([]);
        }}
        onKeyDown={handleKeyPress}
        onFocus={handleSearch}
        onBlur={handleBlur}
        placeholder="Search city..."
      />

      {/* Dropdown suggestions */}
      {weatherData.length > 0 && (
        <div className="absolute z-50 w-full mt-2 border rounded shadow bg-background">
          {weatherData.map((location: any, idx: number) => (
            <div
              key={idx}
              className="p-2 cursor-pointer text-sm border-b-2"
              onClick={() => handleSelectCity(location.name)}
              onMouseDown={() => handleSelectCity(location.name)} // use onMouseDown instead of onClick to trigger before blur
            >
              <p className="font-semibold">{location.name}</p>
              <p className="text-gray-500">
                {location.region}, {location.country}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
