import React from "react";
import userPosts from "../appwrite/userPosts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openEditForm } from "../store/slices/editForm";
function PostOptions({ setOptions, post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeletPost = async () => {
    const deletingFile = await userPosts.deleteFile(post.image);

    if (deletingFile) {
      const deleting = await userPosts.deletePost(post.$id);
      if (deleting) {
        navigate("/");
      }
    }
  };

  const openEdit = () => {
    dispatch(openEditForm(post));
  };

  return (
    <div className=" flex text-xl flex-col gap-1 w-40 h-24 bg-white z-40  cursor-pointer absolute right-4 top-14 rounded-lg  ">
      <span onClick={openEdit} className=" mt-1 hover:bg-gray-200 rounded-lg ">
        Edit
      </span>
      <span
        onClick={handleDeletPost}
        className=" text-red-600 hover:bg-gray-200  rounded-lg "
      >
        Delet
      </span>
      <span
        className="hover:bg-gray-200 rounded-lg"
        onClick={() => setOptions((prev) => !prev)}
      >
        Cancel
      </span>
    </div>
  );
}

export default PostOptions;
