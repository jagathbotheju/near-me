import Error from "next/error";
import { NextResponse } from "next/server";

interface Props {
  category: string;
  lat: string;
  lng: string;
}

export default async function getNearbyPlaces({ category, lat, lng }: Props) {
  try {
    console.log(category);
    return { category };
  } catch (error: any) {
    console.log(error);
  }
}
