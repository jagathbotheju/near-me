"use client";
import { KeyboardEvent } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      console.log(target.value);
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
