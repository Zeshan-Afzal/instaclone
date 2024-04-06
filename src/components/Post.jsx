import React, { useState } from "react";
import PostOptions from "./PostOptions";
import { useSelector } from "react-redux";
import userPosts from "../appwrite/userPosts";
import userData from "../appwrite/userData";

function Post({ post }) {
  const userInfo = useSelector((state) => state.auth.userData);
  const [options, setOptions] = useState(false);

  const isAuthor = post.userId === userInfo?.$id ? true : false;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white w-96 ">
          <header className=" py-5 w-full">
            <div className=" flex gap-4 w-full justify-between items-center ">
              <div className=" flex gap-4 ">
                <img
                  src={userData.getFilePreview(String(post.userId))}
                  className="rounded-full w-10 h-10"
                />
                <span className="col-span-4 text-sm font-semibold">
                  {post.username}
                </span>
              </div>
              <div className="  mr-3   relative bottom-3">
                <span
                  className=" cursor-pointer text-2xl"
                  onClick={() => setOptions((prev) => !prev)}
                >
                  ...
                </span>

                {options && isAuthor ? (
                  <PostOptions setOptions={setOptions} post={post} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </header>

          <div>
            <img src={userPosts.getPostFilePreview(String(post.image))} />
          </div>

          <div className="flex flex-col p-4 gap-3">
            <div className="flex flex-row gap-3 justify-between ">
              <div className=" flex gap-3">
                <i className="fa-regular fa-heart text-xl"></i>

                <i className="fa-regular fa-comment text-xl"></i>
                <i className="fa-regular fa-paper-plane text-xl"></i>
              </div>
              <div>
                <i className="fa-regular fa-bookmark text-xl"></i>
              </div>
            </div>
            <div className=" flex  w-full flex-col items-start float-start">
              <div className="text-sm font-semibold ">11,552 Likes</div>
              <p>{post.caption}</p>

              <div className="text-gray-500 text-sm">View all 877 comments</div>

              <div className="text-gray-400 text-xs">{post.$createdAt}</div>
            </div>
          </div>

          <footer></footer>
        </div>
      </div>
    </>
  );
}

export default Post;
