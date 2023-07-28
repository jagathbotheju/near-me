import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchtext = searchParams.get("searchtext");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  try {
    const response = await axios(
      BASE_URL +
        "/findplacefromtext/json" +
        "?fields=formatted_address,name,rating,opening_hours,geometry,photos" +
        "&input=" +
        searchtext +
        "language=" +
        "en" +
        "&inputtype=textquery" +
        "&locationbias=circle:20000@" +
        lat +
        "," +
        lng +
        "&key=" +
        GOOGLE_API_KEY
    );

    const data = response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
