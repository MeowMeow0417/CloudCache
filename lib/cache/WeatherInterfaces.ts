/**
 * TODO: apply interfaces to the components, fifo, lru, opt
 */

// Basic weather condition interface
export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
  }

  // Air Quality Index data
  export interface AirQuality {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
  }

  // Astro data (sunrise, sunset, moon phase, etc.)
  export interface AstroData {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  }

  // Hourly forecast
  export interface HourForecast {
    time: string;
    temp_c: number;
    temp_f: number;           // Temperature in Fahrenheit
    condition: WeatherCondition;
    wind_kph: number;
    wind_mph: number;         // Wind speed in mph
    humidity: number;
    chance_of_rain: number;
    uv: number;
    air_quality: AirQuality;
  }

  // Forecast for a specific day
  export interface DayForecast {
    date: string;
    date_epoch: number;
    maxtemp_c: number;
    maxtemp_f: number;        // Max temperature in Fahrenheit
    mintemp_c: number;
    mintemp_f: number;        // Min temperature in Fahrenheit
    avgtemp_c: number;
    avgtemp_f: number;        // Average temperature in Fahrenheit
    maxwind_kph: number;
    maxwind_mph: number;      // Max wind speed in mph
    totalprecip_mm: number;
    totalprecip_in: number;   // Total precipitation in inches
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;     // Average visibility in miles
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
    uv: number;
    air_quality: AirQuality;
    astro: AstroData;
    hour: HourForecast[];
  }

  // Current weather data
  export interface CurrentWeather {
    last_updated: string;
    temp_c: number;
    temp_f: number;           // Temperature in Fahrenheit
    condition: WeatherCondition;
    wind_kph: number;
    wind_mph: number;         // Wind speed in mph
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;      // Pressure in inches
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;      // Feels like temperature in Fahrenheit
    windchill_c: number;
    windchill_f: number;      // Wind chill in Fahrenheit
    heatindex_c: number;
    heatindex_f: number;      // Heat index in Fahrenheit
    dewpoint_c: number;
    dewpoint_f: number;       // Dewpoint in Fahrenheit
    vis_km: number;
    vis_miles: number;        // Visibility in miles
    uv: number;
    gust_kph: number;
    gust_mph: number;         // Gust speed in mph
    air_quality: AirQuality;
  }

  // Location data
  export interface LocationData {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  }

  // Forecast root object
  export interface ForecastData {
    forecastday: DayForecast[];
  }

  // Main weather data structure
  export interface WeatherData {
    location: LocationData;
    current: CurrentWeather;
    forecast: ForecastData;
  }

  // Cache interface for storing weather data
  export interface ICache {
    put(city: string, data: WeatherData, future?: string[]): void;
    get(city: string): WeatherData | null;
    getCache(): string[];
  }
