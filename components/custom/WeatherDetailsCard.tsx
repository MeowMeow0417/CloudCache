'use client'

import React from 'react'

import {
    Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getWeatherIcon } from '@/lib/utility/WeatherIconMap'

interface WeatherDetailsProps {
    label: string;
    value: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    weatherData: {
        location: {
            name: string;
            region: string;
            country: string;
            localtime: string;
        };
        current: {
            condition: {
                code: number;
            };
            last_updated: string;
        };
        last_updated: string;
    };
}


const WeatherDetailsCard: React.FC<WeatherDetailsProps> = ({weatherData, label, value, icon: Icon}) => {
    const WeatherIcon = getWeatherIcon(weatherData?.current?.condition?.code);
  return (
    <Card key={label} className="p-4 w-full">
        <CardContent className="flex items-center gap-4 justify-between">
            <div className="flex flex-col">
              <Label className="text-md font-medium">{label}</Label>
              <Label className="text-xl">{value}</Label>
            </div>
            <Icon className="size-10" />
        </CardContent>
    </Card>
  )
}

export default WeatherDetailsCard