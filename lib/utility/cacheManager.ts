import { FIFOCache } from '../cache/fifo';
import { LRUCache } from '../cache/lru';
import { OPTCache } from '../cache/opt';
import type { ICache } from './WeatherInterfaces';

export class CacheManager {
  private fifoCache: ICache;
  private lruCache: ICache;
  private optCache: ICache;

  constructor(capacity: number) {
    this.fifoCache = new FIFOCache(capacity);
    this.lruCache = new LRUCache(capacity);
    this.optCache = new OPTCache(capacity);
  }

  put(key: string, value: any, future: string[]) {
    this.fifoCache.put(key, value);
    this.lruCache.put(key, value);
    this.optCache.put(key, value, future);
  }

  getFrom(strategy: 'FIFO' | 'LRU' | 'OPT', key: string) {
    switch (strategy) {
      case 'FIFO':
        return this.fifoCache.get(key);
      case 'LRU':
        return this.lruCache.get(key);
      case 'OPT':
        return this.optCache.get(key);
    }
  }

  getAllCaches() {
    return {
      FIFO: this.fifoCache.getCache(),
      LRU: this.lruCache.getCache(),
      OPT: this.optCache.getCache(),
    };
  }

  getPageFaultRate(strategy: 'FIFO' | 'LRU' | 'OPT', requests: string[]) {
    let misses = 0;
    const cacheSize = this.fifoCache.getCache().length;

    for (const city of requests) {
      if (!this.getFrom(strategy, city)) {
        misses++;
        this.put(city, {}, []); // Dummy data
      }
    }

    return misses / requests.length;
  }

  // Evaluate page faults for a specific strategy

}
