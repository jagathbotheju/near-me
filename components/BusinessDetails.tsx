import { Result } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface Props {
  business: Result;
  userLocation: Location;
}

const BusinessDetails = ({ business, userLocation }: Props) => {
  //const [distance, setDistance] = useState("");

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const earthRadius = 6371; // in kilometers

    const degToRad = (deg: number) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    //setDistance(distance.toFixed(1));
    return distance.toFixed(2); // Return the distance with 2 decimal places
  };

  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    business.geometry.location.lat,
    business.geometry.location.lng
  );

  const onDirectionClick = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&origin=" +
        userLocation.lat +
        "," +
        userLocation.lng +
        "&destination=" +
        business.geometry.location.lat +
        "," +
        business.geometry.location.lng +
        "&travelmode=driving"
    );
  };

  return (
    <div className="flex flex-row p-2 mt-4 bg-purple-400 rounded-md w-fit gap-x-4">
      <div className="fle flex-col">
        <h1 className="font-semibold text-lg text-white line-clamp-1">
          {business.name}
        </h1>
        <h2 className="text-white">{distance} Miles Away</h2>
      </div>
      <Image
        onClick={onDirectionClick}
        alt="send"
        src="/images/send.png"
        width={50}
        height={50}
        className="p-2 bg-purple-600 rounded-md self-end cursor-pointer hover:scale-105 transition"
      />
    </div>
  );
};

export default BusinessDetails;
