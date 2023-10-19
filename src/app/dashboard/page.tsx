import React from "react";
import CategoriesList from "../components/CategoriesList";
import Posts from "../components/Posts";
import { postData } from "../data";
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if(!session){
        redirect("/sign-in")
    }
  return (
    <div>
     <h1>My Posts</h1>
      {postData && postData.length > 0 ? (
        postData.map((category) => (
          <div key={category.id}>
            <Posts
              id={category.id}
              content={category.content}
              title={category.title}
              date={category.date}
              author={category.author}
              thumbnail={category.thumbnail}
              category={category.category}
              links={category.links}
            />
          </div>
        ))
      ) : (
        <div>No posts yet</div>
      )}
    </div>
  );
};


