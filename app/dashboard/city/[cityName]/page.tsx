'use client';

import React, {useEffect, useState} from 'react';
import { notFound } from 'next/navigation';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import HourlyForecast from '@/components/custom/HourlyForecast';
import WeatherCard from '@/components/custom/WeatherCard';

interface PageProps{
 cityName: string;
}

const CityPage:React.FC<PageProps> = ({cityName}) => {
  const [city, setCity] = React.useState('Paris');
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/CurrentWeather?city=${city}`);
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

    fetchWeatherData();
  },[cityName] );
  // Check if weatherData is null or undefined

  const weatherDetails = [
    { title: 'Air Quality', value: 'Good' },
    { title: 'Humidity', value: '50%' },
    { title: 'Wind Speed', value: '10 km/h - N' },
    { title: 'Wind Gust', value: '15 km/h' },
    { title: 'Wind Chill', value: '28°C' },
    { title: 'Cloud Coverage', value: '50%' },
  ];

  const weatherDetails2 = [
    { title: 'Heat Index', value: '32°C' },
    { title: 'Dew Point', value: '20°C' },
    { title: 'Pressure', value: '1011.2mb' },
    { title: 'Precipitation', value: '12 inch' },
    { title: 'UV Index', value: '6' },
  ];

  return (
    <section className="p-4">
      <main className="mx-auto flex flex-col items-center gap-4">
        {/* <WeatherCard weatherData={weatherData} /> */}
        <main className="mx-auto flex flex-col items-center gap-4">
          {loading ? (
            <p>Loading weather data...</p>
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <p>No weather data available.</p>
          )}
        </main>

      </main>
    </section>
  );
};

export default CityPage;
