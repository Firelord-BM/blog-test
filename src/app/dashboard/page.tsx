import React from "react";
import Posts from "../components/Posts";
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { TPost } from "../types";

const getPosts = async (email:string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const {posts} = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
}
export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    let posts = [];

    if(!session){
        redirect("/sign-in")
    }
if(email){
  posts = await getPosts(email)
}
  
  return (
    <div>
     <h1>My Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post:TPost) => (
          <div key={post.id}>
            <Posts
              id={post.id}
              content={post.content}
              title={post.title}
              date={post.createdAt}
              author={""}
              category={post.catName}
              authorEmail={post.authorEmail}
              thumbnail={post.imageUrl}
              links={post.links || []}
            />
          </div>
        ))
      ) : (
        <div>No posts yet</div>
      )}
    </div>
  );
};


