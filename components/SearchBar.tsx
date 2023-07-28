"use client";
import useBusinessList from "@/app/hooks/useBusinessList";
import useCurrentLocation from "@/app/hooks/useCurrentLocation";
import { Result } from "@/types";
import axios from "axios";
import { KeyboardEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchtext, setSearchtext] = useState("");
  const currentLocation = useCurrentLocation();
  const businessList = useBusinessList();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      console.log(target.value);
      axios
        .get("/api/search", {
          params: {
            searchtext: target.value,
            lat: currentLocation.location?.lat,
            lng: currentLocation.location?.lng,
          },
        })
        .then((response) => {
          console.log(response);
          const searchedPlaces = response.data.candidates as Result[];
          if (searchedPlaces.length > 0) {
            businessList.setBusinessList(searchedPlaces);
          }
        });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-x-2 px-2 bg-purple-100 rounded-md">
        <FiSearch size={25} className="text-purple-500" />
        <input
          type="text"
          placeholder="Search"
          className="input w-full bg-transparent focus:outline-none placeholder:text-purple-500 placeholder:text-xl text-xl"
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
