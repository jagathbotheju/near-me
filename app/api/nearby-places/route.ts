import axios from "axios";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

interface Props {
  params: {
    category: string;
    lat: string;
    lng: string;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const response = await axios(
      BASE_URL +
        "/nearbysearch/json?fields=formatted_address,name,rating,opening_hours,geometry,photos&type=" +
        category +
        "&location=" +
        lat +
        "," +
        lng +
        "&radius=5000&key=" +
        process.env.GOOGLE_API_KEY
    );
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.error });
  }
}
