import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}