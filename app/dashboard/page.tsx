'use client';

import { useRouter } from "next/navigation";
import CacheSim from "@/components/custom/CacheSim";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="p-4 ">
      <main className="items-center mx-auto flex flex-col gap-4 ">
        <Card className="w-full max-w-6xl p-6 ">
          <CardHeader className="flex items-center justify-between">
            <Label className="text-center text-xl">Current Weather</Label>
            <Label className="text-center text-xl">Sun 13 Apr 2024 - 21:54</Label>
          </CardHeader>
          <CardContent className="grid grid-cols-3 items-center justify-between">
            <div className="flex flex-col">
              <div className="flex gap-4">
                <Sun height={150} width={200} />
                <div className="flex flex-col justify-center">
                  <Label className="text-8xl">33°C</Label>
                  <Label>Feels like 28°C</Label>
                </div>
              </div>
              <Label className="text-3xl">Partly Cloudy</Label>
            </div>

            <div />
            <div>
              {weatherDetails.map((detail) => (
                <div key={detail.title} className="flex justify-between">
                  <Label className="text-2xl font-light">{detail.title}</Label>
                  <Label className="text-xl font-extrabold">{detail.value}</Label>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-end">
              <Button variant="link" className="mr-2" onClick={() => router.push(`/dashboard/city/${cityName}`)}>
                More Details
                <ArrowRight />
              </Button>
          </CardFooter>
        </Card>
      </main>
    </section>
  );
}
