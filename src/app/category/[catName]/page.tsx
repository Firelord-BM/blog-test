import { TPost } from "@/app/types";
import Posts from "@/app/components/Posts";
const getPosts = async (catName: string): Promise<TPost | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoryPosts({
  params,
}: {
  params: { catName: string };
}) {
  const category = params.catName;
  const posts = await getPosts(category);

  return (
    <>
      <h1>
        <span className="font-normal">Category: </span>{" "}
        {decodeURIComponent(category)}
      </h1>
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
    </>
  );
}
