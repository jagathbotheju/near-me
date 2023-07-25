import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="flex flex-col p-5 items-center gap-y-10 shadow-md shadow-purple-500 h-full sticky top-0 z-30">
      <Image alt="logo" src="/images/logo.png" height={50} width={50} />
      <FiSearch size={30} className="hover:text-purple-500 cursor-pointer" />
      <BsHeart size={30} className="hover:text-purple-500 cursor-pointer" />
    </div>
  );
};

export default SideBar;
