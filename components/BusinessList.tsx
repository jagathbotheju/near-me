"use client";
import { useEffect, useState, useTransition } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BusinessItem from "./BusinessItem";
import getNearbyPlaces from "@/app/actions/getNearbyPlaces";
import axios from "axios";
import { Result } from "../types";
import useCategory from "@/app/hooks/useCategory";
import { PuffLoader } from "react-spinners";

const BusinessList = () => {
  const categoryStore = useCategory();
  const category = categoryStore.category;
  const [placeCount, setPlaceCount] = useState(4);
  const [businessList, setBusinessList] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const getBusinessPlaces = async () => {
    setLoading(true);
    await axios
      .get("/api/nearby-places", {
        params: {
          category: `${category}`,
          lat: "25.2925",
          lng: "51.5321",
        },
      })
      .then((res) => {
        setBusinessList(res.data.data.results);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBusinessPlaces();
  }, [category]);

  console.log(category);

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
      {loading ? (
        <>
          <div className="h-full w-full flex items-center justify-center mt-10">
            <PuffLoader size={45} color="#f50057" />
          </div>
        </>
      ) : (
        businessList
          .slice(placeCount === 0 ? 0 : placeCount - 4, placeCount)
          .map((item, index) => <BusinessItem key={index} business={item} />)
      )}
    </div>
  );
};

export default BusinessList;
