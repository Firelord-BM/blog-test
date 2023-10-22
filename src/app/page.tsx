import React from "react";
import CategoriesList from "./components/CategoriesList";
import Posts from "./components/Posts";
import { TPost } from "./types";

const getPosts = async(): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`,{cache: "no-store"})

    if(res.ok){
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error)
  }
  return null;
}
const Home = async () => {
  const posts = await getPosts();
  return (
    <div className="">
      <CategoriesList />
      {posts&& posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            {" "}
            <Posts
              id={post.id}
              author={post.author.name}
              authorEmail = {post.authorEmail}
              date={post.createdAt}
              content={post.content}
              category={post.catName}
              title={post.title}
              links={post.links || null}
             thumbnail={post.imageUrl}
            />
          </div>
        ))
      ) : (
        <div>No Posts Yet</div>
      )}
    </div>
  );
};

export default Home;
