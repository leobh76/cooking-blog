import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <div className="max-w-full mx-auto">
      <Head>
        <title>Cooking Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-around items-center bg-[#FFC017] border-y border-black py-10 lg:py-0 mx-auto">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Cooking
            </span>{" "}
            is a passion, not a chore.
          </h1>
          <h2>
            Many recipes from famous people in one place.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-48 lg:h-96 mix-blend-darken pr-5"
          src="https://media.tenor.com/f9ifxTjrsTwAAAAC/chef-kiss.gif"
          alt=""
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden shadow-sm">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"] {
    _id,
    title,
    author -> {
    name,
    image
    },
    description,
    mainImage,
    slug
  }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
