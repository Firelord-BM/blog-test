import React from "react";
import CategoriesList from "./components/CategoriesList";
import Posts from "./components/Posts";
import { postData } from "./data";

const Home = () => {
  return (
    <div className="">
      <CategoriesList />
      {postData && postData.length > 0 ? (
        postData.map((posts) => (
          <div key={posts.id}>
            {" "}
            <Posts
              id={posts.id}
              author={posts.author}
              date={posts.date}
              content={posts.content}
              category={posts.category}
              title={posts.title}
              links={posts.links}
             thumbnail={posts.thumbnail}
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
