"use client";
import { useEffect, useState, useTransition } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BusinessItem from "./BusinessItem";
import getNearbyPlaces from "@/app/actions/getNearbyPlaces";
import axios from "axios";
import { Result } from "../types";
import useCategory from "@/app/hooks/useCategory";
import { PuffLoader } from "react-spinners";
import Shimmer from "./Shimmer";
import useBusinessList from "@/app/hooks/useBusinessList";
import useSelectedBusiness from "@/app/hooks/useSelectedBusiness";
import useCurrentLocation from "@/app/hooks/useCurrentLocation";

interface Location {
  lat: number;
  lng: number;
}

const BusinessList = () => {
  const currentLocation = useCurrentLocation();
  const categoryStore = useCategory();
  const businessListStore = useBusinessList();
  const selectedBusinessStore = useSelectedBusiness();
  const category = categoryStore.category;
  const [placeCount, setPlaceCount] = useState(4);
  const [businessList, setBusinessList] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  //const [location, setLocation] = useState<Location | null>(null);

  const getBusinessPlaces = async (location: Location) => {
    setLoading(true);
    await axios
      .get("/api/nearby-places", {
        params: {
          category: `${category}`,
          lat: location?.lat.toString(),
          lng: location?.lng.toString(),
        },
      })
      .then((res) => {
        setBusinessList(res.data.data.results);
        businessListStore.setBusinessList(res.data.data.results);
        setLoading(false);
      });
  };

  const getUserCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      currentLocation.setLocation(loc);
      getBusinessPlaces(loc);
    });
  };

  useEffect(() => {
    getUserCurrentLocation();
  }, [category]);

  console.log(`place count ${placeCount}`);
  console.log(businessListStore.list.length);
  console.log(
    placeCount === 0 ? 0 : placeCount - 4,
    businessListStore.list.length < placeCount
      ? businessListStore.list.length
      : placeCount
  );

  console.log(`category ${category}`);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl my-5">Top Nearby Places</h2>
        <div className="flex gap-2 font-bold">
          {placeCount > 4 && (
            <BsChevronLeft
              onClick={() => setPlaceCount(placeCount - 4)}
              size={40}
              className="hover:bg-purple-100 rounded-md p-2 cursor-pointer"
            />
          )}

          <BsChevronRight
            onClick={() => setPlaceCount(placeCount + 4)}
            size={40}
            className="hover:bg-purple-100 rounded-md p-2 cursor-pointer"
          />
        </div>
      </div>

      {/* business item */}

      {businessListStore.list
        .slice(
          placeCount === 0 ? 0 : placeCount - 4,
          businessListStore.list.length < placeCount
            ? businessListStore.list.length
            : placeCount
        )
        .map((item: Result, index) =>
          loading ? (
            <Shimmer key={index} />
          ) : (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => selectedBusinessStore.setSelectedBusiness(item)}
            >
              <BusinessItem business={item} />
            </div>
          )
        )}
    </div>
  );
};

export default BusinessList;
