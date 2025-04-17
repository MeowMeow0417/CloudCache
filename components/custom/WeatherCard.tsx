'use client'

import React from 'react'

import {
  Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap'

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
    // Convert the string to a Date object first
    const localTimeString = weatherData?.location?.localtime;
    const hour = new Date(localTimeString).getHours();

    const WeatherIcon = getWeatherIcon(code, hour);


  return (
    <Card className=" w-3xl max-w-4xl ${invertBg} dark:bg-white bg-black ">
      <CardHeader className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center gap-2">
          <Label className={`text-lg font-semibold dark:text-black text-white`}>
            {weatherData.location.region}, {weatherData.location.country}
          </Label>
          {/* <Label className="text-lg font-semibold">
            {weatherData.location.name}
          </Label> */}
        </div>
        <Label className="text-white dark:text-black ">
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
        <div className="flex items-center gap-2">
          {WeatherIcon && (<img src={WeatherIcon} alt="Weather Icon" className="size-40 object-cover" />) }
          <div className="text-center z-10">
            <Label className="text-8xl font-bold dark:text-black text-white">
              {weatherData.current.temp_c}°
            </Label>
            <Label className="text-lg dark:text-black text-white">
              Feels like {weatherData.current.feelslike_c}°C
            </Label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-end">
        <Label className="text-3xl dark:text-black text-white">
          {weatherData.current.condition.text}
        </Label>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
