'use client'

import React, { useState, useEffect } from 'react';
import {
  Card, CardContent
} from "@/components/ui/card";
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap';

interface HourlyForecastProps {
  cityName: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ cityName }) => {
  const [hourlyData, setHourlyData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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
    const interval = setInterval(fetchHourlyData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cityName]);

  const hours = hourlyData?.forecast?.forecastday?.[0]?.hour || [];

  const now = new Date();
  const currentHour = hourlyData?.location?.localtime
    ? new Date(hourlyData.location.localtime).getHours()
    : now.getHours();

  const nextHour = (currentHour + 1) % 24;

  const sortedHours = hours.filter((hour: any) => {
    const hourTime = new Date(hour.time);
    const nowTime = new Date(hourlyData.location.localtime);
    return hourTime >= nowTime;
  });

  return (
    <div className="w-full">
      {loading ? (
        <Skeleton className="h-full w-full max-w-5xl mx-auto" />
      ) : (
        <Card className="py-2 overflow-hidden w-full max-w-5xl mx-auto bg-transparent border-none shadow-none">

          <CardContent className="h-full overflow-x-auto">
            <div className="flex flex-row gap-4 min-w-fit">
              {sortedHours.map((hour: any, index: number) => {
                const isNext = new Date(hour.time).getHours() === nextHour;
                const hourCode = hour.condition?.code;
                const hourTime = new Date(hour.time).getHours();
                const WeatherIcon = getWeatherIcon(hourCode, hourTime);

                return (
                  <Card
                    key={index}
                    className={`min-w-[100px] p-4 text-center transition-all duration-300 ${
                      isNext ? 'bg-accent shadow-lg' : ''
                    }`}
                  >
                    <CardContent className="flex flex-col items-center justify-between gap-2">
                      <img
                        src={WeatherIcon}
                        alt="Weather Icon"
                        className="size-15 object-cover"
                      />
                      <Label className="text-base font-bold">{hour.temp_c}</Label>
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

};

export default HourlyForecast;
