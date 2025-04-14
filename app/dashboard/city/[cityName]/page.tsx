'use client';

import React from 'react';
import { useRouter, notFound } from 'next/navigation';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Sun, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps{
  params: {
    cityName: string;
  };
}

const CityPage = ({params}: PageProps) => {

  const weatherDetails = [
    { title: 'Air Quality', value: 'Good' },
    { title: 'Humidity', value: '50%' },
    { title: 'Wind Speed', value: '10 km/h - N' },
    { title: 'Wind Gust', value: '15 km/h' },
    { title: 'Wind Chill', value: '28°C' },
    { title: 'Cloud Coverage', value: '50%' },
  ];

  const weatherDetails2 = [
    { title: 'Heat Index', value: '32°C' },
    { title: 'Dew Point', value: '20°C' },
    { title: 'Pressure', value: '1011.2mb' },
    { title: 'Precipitation', value: '12 inch' },
    { title: 'UV Index', value: '6' },
  ];

  return (
    <section className="p-4">
      <main className="mx-auto flex flex-col items-center gap-4">
        <Card className="p-6 w-full max-w-6xl">
          {/* Header */}
          <CardHeader className="flex justify-between border-b-2 border-gray-200 pb-4">
            <div className="flex gap-4">
              <Sun height={100} width={100} />
              <div className="flex flex-col justify-center">
                <Label className="text-5xl">33°C</Label>
                <Label>Feels like 28°C</Label>
                <Label className="text-2xl">Partly Cloudy</Label>
              </div>
            </div>
            <div className="flex flex-col space-y-1 justify-center">
              <Label className="text-right text-xl">Sun 13 Apr 2024 - 21:54</Label>
              <div className="flex justify-between gap-4">
                <Label className="text-2xl font-light">City</Label>
                <Label className="text-xl font-extrabold">Paris</Label>
              </div>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="grid grid-cols-3 gap-8 py-6">
            <div className="space-y-2">
              {weatherDetails.map((detail) => (
                <div key={detail.title} className="flex justify-between">
                  <Label className="text-2xl font-light">{detail.title}</Label>
                  <Label className="text-xl font-extrabold">{detail.value}</Label>
                </div>
              ))}
            </div>

            <div /> {/* Spacer column */}

            <div className="space-y-2">
              {weatherDetails2.map((detail) => (
                <div key={detail.title} className="flex justify-between">
                  <Label className="text-2xl font-light">{detail.title}</Label>
                  <Label className="text-xl font-extrabold">{detail.value}</Label>
                </div>
              ))}
            </div>
          </CardContent>

        </Card>
      </main>
    </section>
  );
};

export default CityPage;
