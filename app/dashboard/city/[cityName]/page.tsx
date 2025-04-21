'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import HourlyForecast from '@/components/custom/HourlyForecast';
import WeatherCard from '@/components/custom/WeatherCard';
import { Skeleton } from '@/components/ui/skeleton';

const CityPage = () => {
  const params = useParams();
  const cityName = params.cityName as string; // 'paris', 'london', etc.

  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/CurrentWeather?city=${cityName}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (cityName) fetchWeatherData();
  }, [cityName]);

  return (
  <section className="flex flex-col items-center w-full gap-8 lg:px-8 pb-[100px] md:pb-0">
      <main className="mx-auto flex flex-col items-center gap-4">
        {loading ? (
          <Skeleton className='w-[750px] h-[300px] rounded-md'/>
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <p>No weather data available.</p>
        )}
          <HourlyForecast  cityName={cityName}/>
      </main>
    </section>
  );
};

export default CityPage;