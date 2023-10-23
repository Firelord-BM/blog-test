import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/app/components/EditPostForm";
import { TPost } from "@/app/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {}
  return null;
};
export default async function EditPost({params}: {params: {id:string}}) {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/sign-in")
    }
    const id = params.id;
    const post = await getPost(id);
    console.log("id:",id)
  return <>{post ? <EditPostForm post={post} />: <div>Invalid Post</div>}</> ;
}
