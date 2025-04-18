
import { ICache, WeatherData } from '../utility/WeatherInterfaces';

export class LRUCache implements ICache {
  private cache: Map<string, WeatherData> = new Map();
  private maxSize: number;

  constructor(size: number) {
    this.maxSize = size;
  }

  put(city: string, data: WeatherData, future?: string[]): void {
    if (this.cache.has(city)) {
      this.cache.delete(city);
    } else if (this.cache.size >= this.maxSize) {
      const lruKey = this.cache.keys().next().value;
      if (lruKey !== undefined) {
        this.cache.delete(lruKey);
      }
    }
    this.cache.set(city, data); // re-inserts to end (most recently used)
  }


  get(city: string): WeatherData | null {
    if (!this.cache.has(city)) return null;
    const value = this.cache.get(city)!;
    this.cache.delete(city);
    this.cache.set(city, value); // refresh access
    return value;
  }

  getCache(): string[] {
    return Array.from(this.cache.keys());
  }
}
