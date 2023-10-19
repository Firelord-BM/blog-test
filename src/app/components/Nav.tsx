"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
const Nav = () => {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible]=useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const handleClickOutside = (e:MouseEvent) => {
      if(popupRef.current && !popupRef.current.contains(e.target as Node)){
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside)

    if(!isPopupVisible){
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  },[isPopupVisible])
  return (
    <div className="flex justify-between border-b mb-4 pb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="tracking-tight font-bold text-2xl">Tech News</h1>
        </Link>

        <p className="text-sm">The future of technology and Innovations</p>
      </div>

      {status === "authenticated" ? (
        <>
          <div ref={popupRef} className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopupVisible ?"flex":"hidden"}`}>
            <div>{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link onClick={()=> setIsPopupVisible(false)} className="hover:underline" href={"/dashboard"}>Dashboard</Link>
            <Link onClick={()=> setIsPopupVisible(false)} className="hover:underline" href={"/createpost"}>Create Post</Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <Link className="hidden md:flex gap-1 items-center mr-6" href={"/createpost"}>
            <span >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


            </span>
            <span className="text-sm">Create new</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              alt="Profile Image"
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
              onClick={()=>setIsPopupVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div>
          {" "}
          <Link href={"/sign-in"}>
            {" "}
            <button className="btn">Sign In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
