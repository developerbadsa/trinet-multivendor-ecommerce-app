"use client";

import React, { useState, useEffect } from "react";
import { AlignLeft, ChevronDown, ChevronUp } from "lucide-react";
import { NavItems } from "./../../../../configs/constants";
import {  Heart, ShoppingCart } from "lucide-react";
import ProfileIcon from "./../../../../assets/svgs/ProfileIcons";
import Link from "next/link";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  console.log(NavItems);
  // track scrol position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(window.screenY);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(isSticky);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"
      }`}
    >
      {/* Menus */}
      <div
        className={`w-[80%] relative m-auto flex items-center justify-between ${
          isSticky ? "pt-3" : "py-0"
        } `}
      >
        {/*  dropdowns */}
        <div className="flex ">
          <div
            className={`w-[260px] ${
              isSticky && "-mb-0"
            } cursor-pointer flex items-center justify-between px-5 h-[50px] bg-[#3489ff]`}
            onClick={() => setShow(!show)}
          >
            <div className="flex items-center gap-2 font-bold text-white">
              <AlignLeft />
              <span>All Department</span>
            </div>
            {show ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
          </div>
        </div>

        {/* Dropdown menu */}
        {show && (
          <div
            className={`absolute left-0 ${
              isSticky ? "top-[70px]" : "top-[50px]"
            } w-[260px] h-[400px] bg-[#f5f5f5]`}
          >
            menus
          </div>
        )}

        {/* nav menu */}
        <div className="flex items-center">
          {NavItems?.map((i: NavItemsTypes, index: number) => (
            <Link className="px-5 text-lg font-medium" key={index} href={i.href}>
              {i.title}
            </Link>
          ))}
        </div>
<div>
  {
    isSticky && (
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
            <ShoppingCart size={38} />
            <div className="absolute flex items-center justify-center w-6 h-6 bg-red-400 rounded-full top-[-8px] left-[20px]">
              <span className="text-white"> 0</span>
            </div>
          </div>
        </div>
      
    )
  }
</div>


        
      </div>
    </div>
  );
};

export default HeaderBottom;
