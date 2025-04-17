'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap';
import { ClockIcon } from 'lucide-react';

interface HourlyForecastProps {
  cityName: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ cityName }) => {
  const [hourlyData, setHourlyData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch hourly forecast data
  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const res = await fetch(`/api/Forecast?city=${cityName}`);
        if (!res.ok) throw new Error('Failed to fetch hourly data');
        const data = await res.json();
        setHourlyData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyData();
  }, [cityName]);

  // Extract hour data from forecast
  const hours = hourlyData?.forecast?.forecastday?.[0]?.hour || [];

  // Determine current hour (fallback to system time if necessary)
  const now = new Date();
  const currentHour = hourlyData?.location?.localtime
    ? new Date(hourlyData.location.localtime).getHours()
    : now.getHours();

  // Sort hours to show the current hour forecast first
  const sortedHours = [
    ...hours.filter((hour: any) => new Date(hour.time).getHours() === currentHour),
    ...hours.filter((hour: any) => new Date(hour.time).getHours() !== currentHour),
  ];


  return (
    <div>
      {/* Loading state */}
      {loading ? (
        <Skeleton className="h-[800px] w-full" />
      ) : (
        <Card className="h-[800px] p-4 overflow-y-auto">
          <CardHeader className="justify-center ">
            <CardTitle className="text-center text-2xl p-2 flex flex-row items-center justify-center gap-2">
             <ClockIcon/> Hourly Forecast
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 h-[800px] overflow-y-auto ">
            {sortedHours.map((hour: any, index: number) => {
              const isCurrent = new Date(hour.time).getHours() === currentHour;
              const hourCode = hour.condition?.code;
              const hourTime = new Date(hour.time).getHours();
              const WeatherIcon = getWeatherIcon(hourCode, hourTime );

              return (
                <Card
                  key={index}
                  className={`p-2 text-center mb-3 transition-all  ${
                    isCurrent ? 'bg-accent shadow-lg' : ''
                  }`}
                >
                  <CardContent className="grid grid-cols-3 items-center justify-between ">
                    {/* Weather icon */}
                      <img src={WeatherIcon} alt="Weather Icon" className="size-15 object-cover" />
                    {/* Temperature */}
                    <Label className="text-base font-bold">
                      {hour.temp_c}
                    </Label>

                    {/* Time */}
                    <Label className="text-sm font-medium">
                      {new Date(hour.time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Label>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HourlyForecast;
