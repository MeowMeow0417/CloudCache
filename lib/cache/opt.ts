// Todo: Update to match WeatherData interface

import { ICache, WeatherData } from './WeatherInterfaces';

export class OPTCache implements ICache {
  private cache: Map<string, WeatherData> = new Map();
  private maxSize: number;

  constructor(size: number) {
    this.maxSize = size;
  }

  put(city: string, data: WeatherData, future: string[]): void {
    if (this.cache.has(city)) return;

    if (this.cache.size >= this.maxSize) {
      let furthest = -1;
      let cityToEvict = "";

      for (const [cachedCity] of this.cache) {
        const index = future.indexOf(cachedCity);
        if (index === -1) {
          cityToEvict = cachedCity;
          break;
        } else if (index > furthest) {
          furthest = index;
          cityToEvict = cachedCity;
        }
      }

      if (cityToEvict) this.cache.delete(cityToEvict);
    }

    this.cache.set(city, data);
  }

  get(city: string): WeatherData | null {
    return this.cache.get(city) || null;
  }

  getCache(): string[] {
    return Array.from(this.cache.keys());
  }
}
