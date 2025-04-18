'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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

    const interval = setInterval(fetchHourlyData, 15 * 60 * 1000); // every 15 mins
    return () => clearInterval(interval); // cleanup
  }, [cityName]);

  // Extract hour data from forecast
  const hours = hourlyData?.forecast?.forecastday?.[0]?.hour || [];

  // Determine current hour (fallback to system time if necessary)
  const now = new Date();
  const currentHour = hourlyData?.location?.localtime
    ? new Date(hourlyData.location.localtime).getHours()
    : now.getHours();

  const nextHour = (currentHour + 1) % 24;

  // Sort hours to show the current hour forecast first
  const sortedHours = hours.filter((hour: any) => {
    const hourTime = new Date(hour.time);
    const nowTime = new Date(hourlyData.location.localtime);
    return hourTime >= nowTime;
  });



  return (
    <div>
      {/* Loading state */}
      {loading ? (
        <Skeleton className="h-[800px] w-full" />
      ) : (
        <Card className="h-full p-4 overflow-y-auto gap-1">
          <CardHeader className="justify-center ">
            <CardTitle className="text-center text-xl p-2 flex flex-row items-center justify-center gap-2">
             <ClockIcon className='size-5'/> Hourly Forecast
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 h-[500px] overflow-y-auto ">
            {sortedHours.map((hour: any, index: number) => {
              const isNext = new Date(hour.time).getHours() === nextHour;
              const hourCode = hour.condition?.code;
              const hourTime = new Date(hour.time).getHours();
              const WeatherIcon = getWeatherIcon(hourCode, hourTime );

              return (
                <Card
                  key={index}
                  className={`p-2 text-center mb-3 transition-all  ${
                    isNext ? 'bg-accent shadow-lg' : ''
                  }`}
                >
                  <CardContent className="grid grid-cols-3 items-center justify-between gap-2">
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

          <CardFooter>

          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default HourlyForecast;
