'use client';

import { useState, useEffect } from "react";

import HourlyForecast from "@/components/custom/HourlyForecast";
import {
  Wind, Droplet, Cloud, Thermometer, ThermometerSun,
  Umbrella, Eye, Sun, Gauge, ChevronsDownUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,TabsContent, TabsList,TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";
import { Clock, Calendar } from "lucide-react";
import WeatherCard from "@/components/custom/WeatherCard";
import WeatherDetailsCard from "@/components/custom/WeatherDetailsCard";


export default function Home() {
  const [cityName, setCityName] = useState('Manila');
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/CurrentWeather?city=${cityName}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 15 * 60 * 1000); // every 15 mins
    return () => clearInterval(interval); // cleanup
  }, [cityName]);

  // Structure for current weather details
  const WeatherDetails = weatherData ? [
    {
      label: 'Wind',
      value: `${weatherData.current.wind_kph} kp/h - ${weatherData.current.wind_dir}`,
      icon: Wind,
    },
    {
      label: 'Heat Index',
      value: `${weatherData.current.heatindex_c}%`,
      icon: ThermometerSun,
    },
    {
      label: 'Humidity',
      value: `${weatherData.current.humidity} %`,
      icon: Droplet,
    },
    {
      label: 'Cloud Cover',
      value: `${weatherData.current.cloud} %`,
      icon: Cloud,
    },
    {
      label: 'Dew Point',
      value: `${weatherData.current.dewpoint_c} °C`,
      icon: Thermometer,
    },
    {
      label: 'Pressure',
      value: `${weatherData.current.pressure_mb} mbar`,
      icon: ChevronsDownUp,
    },
    {
      label: 'Precipitation',
      value: `${weatherData.current.precip_mm} mm`,
      icon: Umbrella,
    },
    {
      label: 'UV Index',
      value: `${weatherData.current.uv}`,
      icon: Sun,
    },
    {
      label: 'Visibility',
      value: `${weatherData.current.vis_km} km`,
      icon: Eye,
    },
    {
      label: 'Air Quality',
      value:
        weatherData.current.air_quality?.co !== undefined
          ? `${weatherData.current.air_quality.co} µg/m³`
          : 'N/A',
      icon: Gauge,
    },
  ] : [];


  return (
    <section className="flex flex-col items-center w-full gap-6">

      {/* Weather Card */}
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <Skeleton className="w-full max-w-4xl h-[300px] rounded-md" />
      )}

      {/* Hourly Forecast && Daily Forecast */}
      <Tabs defaultValue="">
        <TabsList>
          <TabsTrigger value="HForecast"><Label><Clock/>Hourly ForeCast</Label></TabsTrigger>
          <TabsTrigger value="DForecast"><Label><Calendar/>Daily ForeCast</Label></TabsTrigger>
        </TabsList>
        <TabsContent value="HForecast">
          <HourlyForecast cityName={cityName} />

        </TabsContent>
        <TabsContent value="DForecast">

        </TabsContent>
      </Tabs>

      {/* Weather Details Grid */}
      {loading ? (
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full rounded-md" />
          ))}
        </section>
      ) : (
        WeatherDetails.length > 0 && (
          <section className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {WeatherDetails.map(({ label, value, icon: Icon }) => (
              <WeatherDetailsCard
                key={label}
                label={label}
                value={value}
                icon={Icon}
                weatherData={weatherData}
              />
            ))}
          </section>
        )
      )}


    </section>

  );
}
