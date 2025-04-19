import { FIFOCache } from '../cache/fifo';
import { LRUCache } from '../cache/lru';
import { OPTCache } from '../cache/opt';
import mockWeatherData  from '../mock/MockWeatherData';

export default function simulateStrategies(history: string[], cacheSize: number) {
  const fifo = new FIFOCache(cacheSize);
  const lru = new LRUCache(cacheSize);
  const opt = new OPTCache(cacheSize);

  let fifoFaults = 0;
  let lruFaults = 0;
  let optFaults = 0;

  history.forEach((city, index) => {
    if (!fifo.get(city)) {
      fifoFaults++;
      fifo.put(city, mockWeatherData);
    }

    if (!lru.get(city)) {
      lruFaults++;
      lru.put(city, mockWeatherData);
    }

    const future = history.slice(index + 1);
    if (!opt.get(city)) {
      optFaults++;
      opt.put(city, mockWeatherData, future);
    }
  });

  console.log('FIFO Page Faults:', fifoFaults);
  console.log('LRU Page Faults:', lruFaults);
  console.log('OPT Page Faults:', optFaults);

  return {
    fifoFaults,
    lruFaults,
    optFaults,
  };
}
