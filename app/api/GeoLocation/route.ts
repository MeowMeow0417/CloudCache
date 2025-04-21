import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
    const apiKey = process.env.WEATHER_API_KEY;

    const lat = req.nextUrl.searchParams.get('lat');
    const long = req.nextUrl.searchParams.get('long');

    console.log('🌍 Incoming GeoLocation API call');
    console.log('📍 Latitude:', lat);
    console.log('📍 Longitude:', long);

    if (!lat || !long) {
      console.error('❌ Missing latitude or longitude');
      return NextResponse.json({ error: 'Missing latitude or longitude' }, { status: 400 });
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}`;

    try {
      console.log('📡 Fetching weather data from WeatherAPI...');
      console.log('🔗 Full URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        console.error('❌ WeatherAPI request failed');
        return NextResponse.json({ error: 'Failed fetching location' }, { status: 500 });
      }

      const data = await response.json();
      console.log('✅ Weather data fetched successfully');

      return NextResponse.json(data);

    } catch (error) {
      console.error('💥 Error fetching weather data:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };