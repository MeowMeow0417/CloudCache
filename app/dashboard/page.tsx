'use client';

import { useRouter } from "next/navigation";
import CacheSim from "@/components/custom/CacheSim";
import HourlyForecast from "@/components/custom/HourlyForecast";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sun } from "lucide-react";
import { useState } from "react";

const weatherDetails = [
  { title: 'City', value: 'Paris' },
  { title: 'Air Quality', value: 'Good' },
  { title: 'Humidity', value: '50%' },
  { title: 'Heat Index', value: '33°C' },
];

export default function Home() {
  const [cityName, setCityName] = useState('Paris');
  const router = useRouter();

  return (
    <section className="flex flex-col lg:flex-row w-full gap-6">
      <main className="flex flex-col items-center w-full lg:w-2/3">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center justify-end">
            <Label >Sun 13 Apr 2024 - 21:54</Label>
            <Label >{cityName}, France</Label>
          </CardHeader>

          <CardContent className="flex justify-center">
            <div className="flex items-center gap-8">
              <Sun height={150} width={150} className="opacity-50" />
              <div className="text-center">
                <Label className="text-9xl">33°</Label>
                <Label className="text-2xl">Feels like 28°C</Label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-center">
            <Label className="text-4xl">Partly Cloudy</Label>
          </CardFooter>
        </Card>
      </main>

      <aside className="w-full lg:w-1/3">
        <HourlyForecast />
      </aside>
    </section>
  );
}
