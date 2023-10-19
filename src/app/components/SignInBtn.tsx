"use client"
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";
const SignInBtn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <button onClick={()=>signIn("github")} className="flex gap-4 border hover:bg-silver transition hover:scale-105  py-4 px-4 rounded-full">
       <span><Image src={"/github.png"} alt="" width={30} height={30} /></span> 
        Sign In with Github
      </button>
      <button onClick={()=>signIn("google")} className="flex gap-4 border hover:bg-silver transition hover:scale-105 py-4 px-4 rounded-full">
        <Image src={"/google.png"} alt="" width={30} height={30} />
        Sign In with Google
      </button>
    </div>
  );
};

export default SignInBtn;
