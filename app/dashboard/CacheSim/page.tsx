'use client';

import React, { useState } from 'react';

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
        // Find the farthest used city in the future
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
    <div className="p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold">🌦️ CacheCast Simulation</h2>

      <div className="flex items-center space-x-4">
        <label htmlFor="cacheSize" className="font-medium">
          Cache Size:
        </label>
        <input
          id="cacheSize"
          type="number"
          className="border p-2 rounded-md w-16"
          value={cacheSize}
          min={1}
          max={10}
          onChange={(e) => setCacheSize(parseInt(e.target.value))}
        />
        <button
          onClick={runSimulation}
          className="bg-blue-600  px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Run Simulation
        </button>
      </div>

      {requests.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm text-gray-500">Request Sequence:</h3>
          <p className="text-sm break-all text-gray-700">{requests.join(', ')}</p>
        </div>
      )}

      {results && (
        <div className="space-y-2">
          <p>📦 <strong>FIFO Misses:</strong> {results.fifo}</p>
          <p>🕓 <strong>LRU Misses:</strong> {results.lru}</p>
          <p>🧠 <strong>OPT Misses:</strong> {results.opt}</p>
        </div>
      )}
    </div>
  );
};

export default CacheSim;
