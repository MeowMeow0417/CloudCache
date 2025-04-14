import { NextResponse, NextRequest } from "next/server";

// Handles GET requests to /api/LocationSearch?city=CityName
export const GET = async (req: NextRequest) => {
  // Extract search params from the request URL
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  // Return error if no city is provided
  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  // Read API key from environment variables
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // Call the WeatherAPI search endpoint
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`
    );

    // Handle non-200 HTTP responses
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: response.status }
      );
    }

    // Parse and return weather data
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    console.error('Weather API fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
