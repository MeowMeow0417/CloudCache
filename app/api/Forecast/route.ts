import { NextResponse, NextRequest } from "next/server";

// Handle GET requests to /api/weather
export const GET = async (req: NextRequest) => {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  // Validate that a city was provided
  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  // Get the weather API key from environment variables
  const apiKey = process.env.WEATHER_API_KEY;

  // Fetch weather data from the external WeatherAPI for the next 3 days
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=no`
  );

  // Handle failure from the external API
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }

  // Parse the API response and return it as JSON
  const data = await response.json();
  return NextResponse.json(data);
};
