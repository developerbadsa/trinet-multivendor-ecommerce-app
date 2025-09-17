import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingCart  } from "lucide-react";
import ProfileIcon from "./../../../../assets/svgs/ProfileIcons";
import HeaderBottom from './header-bottom';

const Header = () => {
  return (
    <div className="w-full bg-white">
      {/* header top */}
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        {/* logo */}
        <div>
          <Link href={"/"} className="flex items-center gap-2">
            <span className="text-2xl font-bold">Trinet Marketing</span>
            <Image
              src="/trinet-marketing-logo.jpg"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        {/* search bar */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="search products ...."
            className="w-full px-4 pr-[70px] font-medium font-Roboto border-[2.5px] border-[#3489FF] h-[55px] outline-none"
          />
          <button
            type="button"
            className="absolute right-0 top-0 w-[60px] h-[55px] bg-[#3489FF] cursor-pointer flex justify-center items-center"
          >
            <Search color="white" />
          </button>
        </div>

        {/* Auth box */}
        <div className="flex items-center gap-6 cursor-pointer">
          <Link
            href="/login"
            className="p-2 border-2 rounded-full hover:border-[#3489FF] hover:text-[#3489FF]"
          >
            <ProfileIcon />
          </Link>

          <Link className="flex flex-col hover:text-[#3489FF]" href={"/login"}>
            <span>Hello,</span>
            <span>Sign In</span>
          </Link>

          {/* whislist */}
          <div className="relative hover:text-red-400">
            <Heart size={38} />
            <div className="absolute flex items-center justify-center w-6 h-6 bg-red-400 rounded-full top-[-8px] left-[20px]">
              <span className="text-white"> 0</span>
            </div>
          </div>

          {/* cart */}
          <div className="relative hover:text-red-400">
            <ShoppingCart  size={38} />
            <div className="absolute flex items-center justify-center w-6 h-6 bg-red-400 rounded-full top-[-8px] left-[20px]">
              <span className="text-white"> 0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-b-gray-200"/>
      
        <HeaderBottom></HeaderBottom>
      
    </div>
  );
};

export default Header;
