'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { cacheManagerSingleton } from '@/lib/cache/cacheManagerSingleton';

// Debounce utility
function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const futureAccessRef = useRef<string[]>([]);

  // Debounced API call for city search
  const debouncedSearch = useCallback(
    debounce(async (searchValue: string) => {
      const trimmed = searchValue.trim();
      if (!trimmed) {
        setWeatherData([]);
        return;
      }

      try {
        const res = await fetch(`/api/LocationSearch?city=${trimmed}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        setWeatherData([]);
      }
    }, 200),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => setWeatherData([]), 10);
  };

  const handleSelectCity = (region: string) => {
    const selected = weatherData.find(
      (loc) => `${loc.name}, ${loc.region}, ${loc.country}` === region
    );

    if (!selected) return;

    const key = `${selected.name.toLowerCase()}, ${selected.region.toLowerCase()}, ${selected.country.toLowerCase()}`;

    // Save search to localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history.push(key);
    localStorage.setItem('searchHistory', JSON.stringify(history));

    // Update ref and cache
    futureAccessRef.current = history;
    cacheManagerSingleton.put(key, selected, [...history]);

    // Use for debugging
    console.log('Cache:', cacheManagerSingleton.getAllCaches());

    // Reset UI and navigate
    setQuery('');
    setWeatherData([]);
    router.push(`/dashboard/city/${key}`);
  };

  return (
    <div ref={containerRef} className="relative w-96">
      <Input
        value={query}
        onChange={handleChange}
        onFocus={() => debouncedSearch(query)}
        onBlur={handleBlur}
        placeholder="Search city..."
      />

      {weatherData.length > 0 && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-md shadow-2xl bg-card">
          {weatherData.map((location: any, idx: number) => {
            const cityLabel = location.region && location.country
              ? `${location.name}, ${location.region}, ${location.country}`
              : location.name;

            return (
              <div
                key={idx}
                className="p-4 text-sm border-b-2 cursor-pointer"
                onMouseDown={() => handleSelectCity(cityLabel)}
              >
                <p className="font-semibold">{location.name}</p>
                <p className="text-muted-foreground">
                  {location.region}, {location.country}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
