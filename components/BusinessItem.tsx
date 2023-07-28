import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { Result } from "../types";
import useSelectedBusiness from "@/app/hooks/useSelectedBusiness";

interface Props {
  business: Result;
}

const BusinessItem = ({ business }: Props) => {
  const selectedBusinessStore = useSelectedBusiness();
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const photo_ref = business?.photos
    ? business?.photos[0]?.photo_reference
    : "/images/placeholder.jpg";

  return (
    <div
      className={`card card-side shadow-xl gap-4 w-[70%] my-5 ${
        business.name === selectedBusinessStore.selectedBusiness?.name &&
        "bg-purple-100"
      }`}
    >
      <figure className="relative w-[100px] h-[100px]">
        <Image
          fill
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`}
          alt="Movie"
          className="object-cover top-0 left-0 relative w-full h-full"
        />
      </figure>
      <div className={`flex flex-col w-full `}>
        <h2 className="card-title line-clamp-1">{business.name}</h2>
        <p className="font-semibold text-gray-500 line-clamp-1">
          {business.vicinity}
        </p>
        <div className="flex gap-2 items-center">
          <AiFillStar size={20} className="text-yellow-500" />
          {business.rating}
        </div>
      </div>
    </div>
  );
};

export default BusinessItem;
