import BusinessList from "@/components/BusinessList";
import CategoryList from "@/components/CategoryList";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import axios from "axios";
import getNearbyPlaces from "./actions/getNearbyPlaces";
import Map from "@/components/Map";

export default async function Home() {
  return (
    <main className="flex h-full">
      <SideBar />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 px-6 md:px-10 gap-5">
        <div>
          <SearchBar />
          <CategoryList />
          <BusinessList />
        </div>
        <div>
          <Map />
        </div>
      </div>
    </main>
  );
}
