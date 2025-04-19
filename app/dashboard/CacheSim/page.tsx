'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import simulateStrategies from '@/lib/utility/SimulateStrategies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CacheSim from '@/components/custom/CacheSim';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimulationResult {
  fifoFaults: number;
  lruFaults: number;
  optFaults: number;
}

const SimulationPage = () => {
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [cacheSize, setCacheSize] = useState<number>(3);

  useEffect(() => {
    const rawHistory = localStorage.getItem('searchHistory');
    if (rawHistory) {
      const parsed = JSON.parse(rawHistory) as string[];
      setHistory(parsed);

      const simulation = simulateStrategies(parsed, cacheSize);
      setResults(simulation);
    }
  }, [cacheSize]);

  const handleDeleteHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
    setResults(null);
  };

  const totalHistory = history.length;

  return (
    <section className="p-6 max-w-2xl w-full mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Cache Strategy Simulation</h1>

      {results ? (
        <>
          <Card className="w-full shadow-md rounded-2xl">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Page Faults</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="cacheSize">Cache Size</Label>
                <Input
                  id="cacheSize"
                  type="number"
                  className="w-20"
                  min={1}
                  max={10}
                  value={cacheSize}
                  onChange={(e) => setCacheSize(parseInt(e.target.value))}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-lg">
              <p><strong>FIFO:</strong> {results.fifoFaults}</p>
              <p><strong>LRU:</strong> {results.lruFaults}</p>
              <p><strong>OPT:</strong> {results.optFaults}</p>
            </CardContent>
          </Card>

          <Card className="w-full shadow-md rounded-2xl">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">Search History ({totalHistory})</CardTitle>
              <Button variant="destructive" onClick={handleDeleteHistory}>
                Clear History
              </Button>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <p className="text-sm text-gray-700 break-words">{history.join(' → ')}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No search history available.</p>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="w-full shadow-md rounded-2xl">
          <CardContent className="py-6 text-center text-muted-foreground">
            No history data available to simulate.
          </CardContent>
        </Card>
      )}

      <CacheSim />
    </section>
  );
};

export default SimulationPage;
