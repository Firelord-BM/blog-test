import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DeleteButton from "./DeleteButton";
interface postProps {
  id: string;
  author: string;
  authorEmail: string;
  title: string;
  content: string;
  thumbnail?: string;
  category?: string;
  date: string;
  links?: string[] | null;
}
const Posts = async({
  id,
  author,
  title,
  content,
  thumbnail,
  authorEmail,
  category,
  date,
  links,
}: postProps) => {

  const session = await getServerSession(authOptions)
  const isEditable = session && session?.user?.email === authorEmail;
  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day:"numeric",
    year:"numeric"
  };
  const formattedDate = dateObject.toLocaleDateString("en-US",options)
  return (
    <div className="border-b my-4">
      {author ?  <>
        Posted by: <span className="font-bold">{author}</span> on {formattedDate}
      </> : <>Posted on {formattedDate} </>}
     
      <div className=" py-2">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={""}
            width={400}
            height={30}
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image
            src={"/face3.jpg"}
            alt={""}
            width={400}
            height={30}
            className="rounded-md object-cover object-center"
          />
        )}
      </div>

      <Link href={`/categories/${category}`}>
        {" "}
        <p className="bg-black text-white w-fit py-1 mb-2 rounded-md px-4">
          {category}
        </p>
      </Link>
      <h1>{title}</h1>
      <p className="pb-2">{content}</p>

      <div className="flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>

        <p className="text-purple-600 underline text-sm text-ellipsis overflow-hidden">
          {links}
        </p>
      </div>
      {isEditable && (
      <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit"><Link href={`/edit-post/${id}`}>Edit </Link><DeleteButton id={id}/></div>
    )}
    </div>
  
  );

  
};



export default Posts;
