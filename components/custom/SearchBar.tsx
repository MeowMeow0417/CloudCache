'use client'

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

    // const handleSearch = () => {
    //   if (!query) return
    //   router.push(`/dashboard/city/${query.toLowerCase()}`)
    // }

    const handleSearch = async () => {
      if (!query) return;

      try {
        const res = await fetch(`/api/weather?city=${query}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');

        const data = await res.json();
        console.log(data); // Or display it in UI
      } catch (err) {
        console.error(err);
      }
    };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='flex gap-2'>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search city..."
        className="w-[300px]"
      />
    </div>
  );
};

export default SearchBar;
