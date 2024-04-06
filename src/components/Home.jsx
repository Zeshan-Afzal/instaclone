import React from "react";
import Header from "./Header";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./Feed";

function Home() {
  const posts = useSelector((state) => state.posts.allPosts);
  const dispatch = useDispatch();
  return (
    <>
      <div className=" w-full ">
        <Header />

        <div className=" w-3/5  small-width">
          {posts && posts.map((post) => <Feed key={post.$id} post={post} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
