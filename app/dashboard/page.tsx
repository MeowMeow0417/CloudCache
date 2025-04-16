'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HourlyForecast from "@/components/custom/HourlyForecast";
import {
  Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Wind, Droplet, Cloud, Thermometer, ThermometerSun,
  Umbrella, Eye, Sun, Gauge, ChevronsDownUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap';

export default function Home() {
  const [cityName, setCityName] = useState('Manila');
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  // Get icon for current condition
  const WeatherIcon = getWeatherIcon(weatherData?.current?.condition?.code);

  return (
    <section className="flex flex-col lg:flex-row w-full gap-6">
      {/* Main Weather Panel */}
      <main className="flex flex-col items-center w-full lg:w-2/3">

        {/* Weather Card */}
        {weatherData ? (
          <Card className="w-full max-w-4xl">
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col">
                <Label className="text-xl font-semibold">
                  {weatherData.location.name}, {weatherData.location.country}
                </Label>
                <Label>{weatherData.location.region}</Label>
              </div>
              <Label className="text-muted-foreground">
                {new Date(weatherData.location.localtime).toLocaleString([], {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Label>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-8">
                <WeatherIcon className="size-30" />
                <div className="text-center z-10">
                  <Label className="text-8xl font-bold">
                    {weatherData.current.temp_c}°
                  </Label>
                  <Label className="text-lg">
                    Feels like {weatherData.current.feelslike_c}°C
                  </Label>
                </div>
              </div>
              <Label className="text-2xl">
                {weatherData.current.condition.text}
              </Label>
            </CardContent>
          </Card>
        ) : (
          <Skeleton className="w-[750px] h-[300px] rounded-md" />
        )}

        {/* Weather Details Section */}
        {loading ? (
          // Show skeletons while loading
          <section className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[100px] w-full rounded-md" />
            ))}
          </section>
        ) : (
          WeatherDetails.length > 0 && (
            <section className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
              {WeatherDetails.map(({ label, value, icon: Icon }) => (
                <Card key={label} className="p-4 w-full">
                  <CardContent className="flex items-center gap-4 justify-between">
                    <div className="flex flex-col">
                      <Label className="text-md font-medium">{label}</Label>
                      <Label className="text-xl">{value}</Label>
                    </div>
                    <Icon className="size-10" />
                  </CardContent>
                </Card>
              ))}
            </section>
          )
        )}


      </main>

      {/* Hourly Forecast Sidebar */}
      <aside className="w-full lg:w-1/3">
        <HourlyForecast cityName={cityName} />
      </aside>
    </section>
  );
}
