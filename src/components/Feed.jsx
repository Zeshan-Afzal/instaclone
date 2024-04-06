import React, { useState } from "react";
import PostOptions from "./PostOptions";
import userData from "../appwrite/userData";
import { useSelector } from "react-redux";
import userPosts from "../appwrite/userPosts";

function Feed({ post }) {
  const [options, setOptions] = useState(false);
  const userInfo = useSelector((state) => state.auth.userData);
  const isAuthor = post.userId === userInfo?.$id ? true : false;
  return (
    <>
      <div
        className="mx-auto flex justify-center max-w-3xl md:mb-8 mt-4 bg-white rounded-lg items-center relative md:p-0 p-8"
        x-data="{
        comment : false,
    }"
      >
        <div className="h-full relative">
          <div className="py-2 px-2">
            <div className="flex justify-between items-center py-2">
              <div className="relative mt-1 flex">
                <div className="mr-2">
                  <img
                    src={userData.getFilePreview(String(post.userId))}
                    alt="saman sayyar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3 flex justify-start flex-col items-start">
                  <p className="text-gray-900 text-sm"> {post.username}</p>
                  <p className="text-gray-600 text-xs"> {post.username}</p>
                </div>
                <span className="text-xs mx-2">•</span>
                <button className="text-indigo-500 text-sm capitalize flex justify-start items-start">
                  follow
                </button>
              </div>

              {options && isAuthor ? (
                <PostOptions setOptions={setOptions} post={post} />
              ) : (
                ""
              )}
              <button
                onClick={() => setOptions((prev) => !prev)}
                type="button"
                className="relative p-2 focus:outline-none border-none bg-gray-100 rounded-full"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="  w-full ">
            <p className="text-start  ml-3 p-3">{post?.caption}</p>
          </div>
          <div className="relative w-full h-full">
            <img
              src={userPosts.getPostFilePreview(String(post.image))}
              alt="saman"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="">
            <div className="flex justify-between items-start p-2 py-">
              <div className="flex space-x-2 items-center">
                <button type="button" className="focus:outline-none Like">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
                <button type="button" className="focus:outline-none Comment">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </button>
                <button type="button" className="focus:outline-none save">
                  <svg
                    className="w-7 h-7 mb-1 ml-1 text-gray-600  z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex space-x-2 items-center">
                <button type="button" className="focus:outline-none Like">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-2 flex flex-col space-y-3">
              <div className="w-full">
                <p className="font-bold text-sm text-gray-700">234 likes</p>
              </div>
              <div className="w-full">
                <p className="font-normal text-xs text-gray-500">
                  10 hours ago
                </p>
              </div>
            </div>

            <div className="z-50">
              <form>
                <div className="flex justify-between border-t items-center w-full absolute bottom-0">
                  <div className="w-full ">
                    <input
                      type="text"
                      name="comment"
                      id="comment"
                      placeholder="Add A Comment..."
                      className="w-full text-sm py-4 px-3 rounded-none focus:outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <button className="border-none text-sm px-4 bg-white py-4 text-indigo-600 focus:outline-none">
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
