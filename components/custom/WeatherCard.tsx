'use client'

import React from 'react'
import {
  Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap'
import { MapPin } from 'lucide-react'

interface WeatherCardProps {
  weatherData: {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      feelslike_c: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      last_updated: string;
    };
    last_updated: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const code = weatherData.current.condition?.code;
  const localTimeString = weatherData?.location?.localtime;
  const hour = new Date(localTimeString).getHours();
  const WeatherIcon = getWeatherIcon(code, hour);

  return (
    <Card className="w-full bg-black dark:bg-white gap-0 md:gap-6">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <div className="flex flex-row items-center gap-2">
          <MapPin className="size-6 md:size-7 text-white dark:text-black" />
          <Label className="text-lg font-semibold dark:text-black text-white">
            {weatherData.location.name}, {weatherData.location.region}
          </Label>
        </div>
        <Label className="text-sm md:text-base text-white dark:text-black hidden md:flex">
          {new Date(weatherData.location.localtime).toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Label>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-shrink-0">
          {WeatherIcon && (
            <img
              src={WeatherIcon}
              alt="Weather Icon"
              className="w-32 h-32 md:w-40 md:h-40 object-cover"
            />
          )}
        </div>

        <div className="text-center flex flex-col items-center">
          <Label className="text-6xl md:text-8xl font-bold dark:text-black text-white">
            {weatherData.current.temp_c}°
          </Label>
          <Label className="text-md md:text-lg dark:text-black text-white mt-1">
            Feels like {weatherData.current.feelslike_c}°C
          </Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center mt-2">
        <Label className="text-xl md:text-2xl dark:text-black text-white text-center">
          {weatherData.current.condition.text}
        </Label>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
