"use client";
import useBusinessList from "@/app/hooks/useBusinessList";
import useSelectedBusiness from "@/app/hooks/useSelectedBusiness";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import BusinessDetails from "./BusinessDetails";

interface Location {
  lat: number;
  lng: number;
}

const Map = () => {
  const selectedBusinessStore = useSelectedBusiness();
  const businessListStore = useBusinessList();
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const [location, setLocation] = useState<Location | null>(null);
  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: 20,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: api_key,
  });

  const getUserCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setLocation(loc);
    });
  };

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  console.log(api_key);
  console.log(isLoaded);

  if (!isLoaded && location === null)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PuffLoader size={25} color="#FF6F00" />
      </div>
    );

  return (
    <div className="flex flex-col">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          selectedBusinessStore?.selectedBusiness
            ? selectedBusinessStore.selectedBusiness.geometry.location
            : location!
        }
        zoom={selectedBusinessStore.selectedBusiness ? 18 : 13}
      >
        <Marker position={location!} />
        {businessListStore.list.map((item, index) => (
          <Marker
            icon={{
              url: "/images/location-pin.png",
              scaledSize: new google.maps.Size(35, 35),
            }}
            key={index}
            position={item.geometry.location}
          />
        ))}
      </GoogleMap>

      <div className="self-end">
        {selectedBusinessStore.selectedBusiness && (
          <BusinessDetails
            business={selectedBusinessStore.selectedBusiness}
            userLocation={location!}
          />
        )}
      </div>
    </div>
  );
};

export default Map;
