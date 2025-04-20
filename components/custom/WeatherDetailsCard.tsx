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
            humidity: string,
            condition: {
                code: number;
            };
            last_updated: string;
        };
        last_updated: string;
    };
}


const WeatherDetailsCard: React.FC<WeatherDetailsProps> = ({weatherData, label, value, icon: Icon}) => {
    // const Weather = weatherData.current.humidity
  return (
    <Card key={label} className="p-4 w-full shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="flex items-center justify-between gap-6">
        <div className="flex flex-col">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            <span className="text-lg font-semibold text-foreground">{value}</span>
        </div>
        <div className="flex-shrink-0">
            <Icon className="size-10 text-primary" />
        </div>
        </CardContent>
    </Card>
  )
}

export default WeatherDetailsCard