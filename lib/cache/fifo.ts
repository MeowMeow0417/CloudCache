import { ICache, WeatherData } from './WeatherInterfaces';

export class FIFOCache implements ICache {
  private cache: Map<string, WeatherData> = new Map();
  private queue: string[] = [];
  private maxSize: number;

  constructor(size: number) {
    this.maxSize = size;
  }

  put(city: string, data: WeatherData): void {
    if (!this.cache.has(city)) {
      if (this.queue.length >= this.maxSize) {
        const oldest = this.queue.shift();
        if (oldest) this.cache.delete(oldest);
      }
      this.queue.push(city);
    }
    this.cache.set(city, data);
  }

  get(city: string): WeatherData | null {
    return this.cache.get(city) || null;
  }

  getCache(): string[] {
    return [...this.queue];
  }
}
