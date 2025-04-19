'use client';
import React, { useEffect, useState } from 'react';

import simulateStrategies from '@/lib/utility/SimulateStrategies';

interface SimulationResult {
  fifoFaults: number;
  lruFaults: number;
  optFaults: number;
}

const SimulationPage = () => {
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const rawHistory = localStorage.getItem('searchHistory');
    if (rawHistory) {
      const parsed = JSON.parse(rawHistory) as string[];
      setHistory(parsed);

      const simulation = simulateStrategies(parsed, 5); // Example: cache size 3
      setResults(simulation);
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cache Strategy Simulation</h1>

      {results ? (
        <div className="space-y-2 text-lg">
          <p><strong>FIFO Page Faults:</strong> {results.fifoFaults}</p>
          <p><strong>LRU Page Faults:</strong> {results.lruFaults}</p>
          <p><strong>OPT Page Faults:</strong> {results.optFaults}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Search History</h2>
            <p className="text-sm text-gray-500">
              {history.join(' → ')}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No history data available to simulate.</p>
      )}
    </div>
  );
};

export default SimulationPage;
