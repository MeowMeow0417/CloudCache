'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle,CardDescription ,CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const cities = ['Tokyo', 'Paris', 'Rome', 'London', 'Berlin', 'Bangkok', 'Manila', 'Seoul', 'Oslo', 'Beijing'];

const generateRequests = (length: number) => {
  return Array.from({ length }, () => cities[Math.floor(Math.random() * cities.length)]);
};

const simulateFIFO = (requests: string[], cacheSize: number) => {
  const cache: string[] = [];
  let misses = 0;

  for (const city of requests) {
    if (!cache.includes(city)) {
      misses++;
      if (cache.length >= cacheSize) cache.shift();
      cache.push(city);
    }
  }

  return misses;
};

const simulateLRU = (requests: string[], cacheSize: number) => {
  const cache: string[] = [];
  let misses = 0;

  for (const city of requests) {
    const index = cache.indexOf(city);
    if (index === -1) {
      misses++;
      if (cache.length >= cacheSize) cache.shift();
    } else {
      cache.splice(index, 1);
    }
    cache.push(city);
  }

  return misses;
};

const simulateOPT = (requests: string[], cacheSize: number) => {
  const cache: string[] = [];
  let misses = 0;

  for (let i = 0; i < requests.length; i++) {
    const city = requests[i];

    if (!cache.includes(city)) {
      misses++;

      if (cache.length < cacheSize) {
        cache.push(city);
      } else {
        let farthestIndex = -1;
        let cityToRemove = cache[0];

        for (const cachedCity of cache) {
          const nextUse = requests.slice(i + 1).indexOf(cachedCity);
          if (nextUse === -1) {
            cityToRemove = cachedCity;
            break;
          }
          if (nextUse > farthestIndex) {
            farthestIndex = nextUse;
            cityToRemove = cachedCity;
          }
        }

        const removeIndex = cache.indexOf(cityToRemove);
        if (removeIndex !== -1) cache.splice(removeIndex, 1);
        cache.push(city);
      }
    }
  }

  return misses;
};

const CacheSim: React.FC = () => {
  const [cacheSize, setCacheSize] = useState(3);
  const [requests, setRequests] = useState<string[]>([]);
  const [results, setResults] = useState<{ fifo: number; lru: number; opt: number } | null>(null);

  const runSimulation = () => {
    const reqs = generateRequests(20);
    const fifo = simulateFIFO(reqs, cacheSize);
    const lru = simulateLRU(reqs, cacheSize);
    const opt = simulateOPT(reqs, cacheSize);

    setRequests(reqs);
    setResults({ fifo, lru, opt });
  };

  return (
    <section className=" max-w-2xl w-full mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">🌦️ CacheCast Strategy Simulator</CardTitle>
          <CardDescription>This simulation is yung 10 random requests to a cache with a size of {cacheSize} and these requests are hard coded.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="cacheSize">Cache Size:</Label>
            <Input
              id="cacheSize"
              type="number"
              min={1}
              max={10}
              value={cacheSize}
              onChange={(e) => setCacheSize(parseInt(e.target.value))}
              className="w-20"
            />
            <Button onClick={runSimulation}>Run Simulation</Button>
          </div>

          {requests.length > 0 && (
            <div>
              <Label className="text-sm text-muted-foreground">Generated Request Sequence:</Label>
              <p className="text-sm mt-1 text-gray-700 break-words">
                {requests.join(' → ')}
              </p>
            </div>
          )}
        </CardContent>

        {results && (
          <CardFooter className="flex flex-col items-start space-y-2 pt-4 border-t">
            <p>📦 <strong>FIFO Misses:</strong> {results.fifo}</p>
            <p>🕓 <strong>LRU Misses:</strong> {results.lru}</p>
            <p>🧠 <strong>OPT Misses:</strong> {results.opt}</p>
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default CacheSim;
