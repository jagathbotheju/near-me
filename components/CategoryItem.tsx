"use client";
import useCategory from "@/app/hooks/useCategory";
import useSelectedBusiness from "@/app/hooks/useSelectedBusiness";
import Image from "next/image";

interface Props {
  item: {
    id: number;
    name: string;
    value: string;
    icon: string;
  };
}

const CategoryItem = ({ item: { id, name, value, icon } }: Props) => {
  const category = useCategory();
  const selectedBusinessStore = useSelectedBusiness();

  return (
    <div
      onClick={() => {
        category.setCategory(value);
        selectedBusinessStore.setSelectedBusiness(null);
      }}
      className="shadow-md rounded-md flex flex-col w-28 items-center bg-purple-100 hover:scale-105 transition-all cursor-pointer"
    >
      <figure className="relative w-[50px] h-[50px]">
        <Image
          alt={name}
          src={icon}
          fill
          className="object-cover top-0 left-0 relative w-full h-full"
        />
      </figure>
      <div className="text-center mb-2">
        <h2 className="font-semibold">{name}</h2>
      </div>
    </div>
  );
};

export default CategoryItem;
