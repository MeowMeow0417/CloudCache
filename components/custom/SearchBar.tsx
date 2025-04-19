'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { cacheManagerSingleton } from '@/lib/cache/cacheManagerSingleton';

// Utility function to debounce a function call
function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const futureAccessRef = useRef<string[]>([]);

  /**
   * Debounced search function: triggers API call after user pauses typing.
   * Reduces unnecessary requests and improves performance.
   */
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
    }, 200), // Delay in ms (200ms is responsive for fast typing)
    []
  );

  // Handles input changes and triggers the debounced search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  // Hides the dropdown suggestions shortly after input blur
  const handleBlur = () => {
    setTimeout(() => setWeatherData([]), 10);
  };

  // Navigates to the selected city and resets the search state
  const handleSelectCity = (region: string) => {
    const selected = weatherData.find(
      (loc) => `${loc.name}, ${loc.region}, ${loc.country}` === region
    );

    if (!selected) return;
      // Add the selected city to the search history
      const key = `${selected.region.toLowerCase()}-${selected.country.toLowerCase()}`;
      const routeKey = `${selected.name.toLowerCase()}-${selected.region.toLowerCase()}`;

      futureAccessRef.current.push(key); // caches across all 3 algos 🎯
      // Cache the selected city data

      cacheManagerSingleton.put(key, selected, [...futureAccessRef.current] ) ; // caches across all 3 algos 🎯 (FIFO, LRU, OPT)

      console.log('Cache after selection:', cacheManagerSingleton.getAllCaches());

      // Check if the city is already in the cache
      setQuery('');
      setWeatherData([]);

      // Navigate using the same key format
      router.push(`/dashboard/city/${routeKey}`);
  };

  return (
    <div ref={containerRef} className="relative w-96">
      {/* Input for city search */}
      <Input
        value={query}
        onChange={handleChange}
        onFocus={() => debouncedSearch(query)} // Trigger search on focus with current input
        onBlur={handleBlur}
        placeholder="Search city..."
      />

      {/* Suggestions dropdown */}
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
