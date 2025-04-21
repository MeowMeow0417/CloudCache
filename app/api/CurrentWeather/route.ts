import { NextResponse, NextRequest } from "next/server";

// Handles GET requests to fetch current weather data based on a city name
export const GET = async (req: NextRequest) => {
  // Extract the city name from the request's query parameters
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  // Return a 400 Bad Request if no city was provided
  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  // Retrieve the weather API key from environment variables
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // Call the external WeatherAPI to fetch current weather data
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=no`
    );

    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch weather' },
        { status: 500 }
      );
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Return the weather data as a JSON response
    return NextResponse.json(data);

  } catch (error) {
    // Catch and log any unexpected errors (e.g., network issues)
    console.error('Weather API fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
