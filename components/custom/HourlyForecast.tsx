'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Sun } from 'lucide-react'
import {Card, CardHeader, CardTitle,  CardContent, CardFooter} from "@/components/ui/card";
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

interface HourlyForecastProps {
    cityName: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({cityName}) => {
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
    }, [cityName]);

  const hours = hourlyData?.forecast?.forecastday?.[0]?.hour || [];

  const now = new Date();
  const currentHour = hourlyData?.location?.localtime
    ? new Date(hourlyData.location.localtime).getHours()
    : now.getHours(); // fallback to system time

    const sortedHours = [
        ...hours.filter((hour: any) => new Date(hour.time).getHours() === currentHour),
        ...hours.filter((hour: any) => new Date(hour.time).getHours() !== currentHour),
      ];

      return (
        <div>
          {loading ? (
            <Skeleton className="h-[800px] w-full" />
          ) : (
            <Card className='h-[800px] p-4 overflow-y-auto'>
              <CardHeader className='justify-center '>
                <CardTitle className='text-center text-2xl'>
                  Hourly Forecast for {cityName}
                </CardTitle>
              </CardHeader>
              <CardContent className='px-4 h-[800px] overflow-y-auto'>
                {sortedHours.map((hour: any, index: number) => {
                  const isCurrent = new Date(hour.time).getHours() === currentHour;
                  return (
                    <Card
                      key={index}
                      className={`p-2 text-center mb-5 transition-all ${
                        isCurrent ? ' bg-primary shadow-lg ' : ''
                      }`}
                    >
                      <CardContent className="flex flex-row items-center gap-6">
                        <img
                          src={hour.condition.icon}
                          alt={hour.condition.text}
                          height={64}
                          width={64}
                          className="opacity-80"
                        />
                        <Label className="text-base font-bold">{hour.temp_c}°C</Label>
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

}

export default HourlyForecast
