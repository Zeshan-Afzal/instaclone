import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import userPosts from "../appwrite/userPosts";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../store/slices/postFormSlice";
import Spinner from "./Spinner";

function PostForm() {
  const [spinner, setSpinner] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [file, setFile] = useState();

  const url = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      caption: "",
      userId: "",
      username: "",
      image: "",
    },
  });
  const onInputChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFile(image);
      if (image) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(image);
      }
    }

    console.log(file);
  };

  const post = async (data) => {
    setSpinner(true);
    if (userData && data) {
      if (file) {
        const uploadingFile = await userPosts.uploadePostFile(file);
        if (uploadingFile) {
          data.image = uploadingFile.$id;
          data.username = userData.name;
          data.userId = userData.$id;
          const creatingPost = await userPosts.createPost({
            ...data,
          });
          setSpinner(false);
          dispatch(close());
          navigate(url);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(post)}
      className=" w-screen h-screen    flex  items-center "
    >
      <div className="container mx-auto relative flex-col w-3/5  h-4/5 bg-white  rounded-lg flex items-center justify-center ">
        {spinner && <Spinner />}

        {!spinner && (
          <>
            {imagePreviewUrl && (
              <div className="">
                <textarea
                  {...register("caption")}
                  className=" small-screen-text ps-7 w-4/5 outline-none"
                  placeholder="Add Captions"
                  name="caption"
                  id="caption"
                  cols="70"
                  rows="2"
                ></textarea>
              </div>
            )}

            {!imagePreviewUrl && <i className="fa-solid fa-image text-4xl"></i>}
            {imagePreviewUrl && (
              <>
                <div className="  w-4/5 h-4/5  ">
                  <img
                    className=" w-full   h-full"
                    src={imagePreviewUrl}
                    alt=""
                  />
                </div>
                <button
                  className="bg-blue-500 mt-3  px-8 py-1 absolute right-4 bottom-2 text-white rounded-lg cursor-pointer "
                  type="submit"
                >
                  Post
                </button>
              </>
            )}
          </>
        )}
        {!imagePreviewUrl && (
          <>
            <p className="text-xl">Add Photos </p>
            <label
              className=" bg-blue-500 small-screen-file-btn  px-28 py-1 text-white rounded-lg cursor-pointer "
              htmlFor="file"
            >
              Add File
            </label>
            <input
              {...register("file")}
              type="file"
              name="file"
              id="file"
              className="hidden "
              onChange={onInputChange}
            />
          </>
        )}
      </div>
    </form>
  );
}

export default PostForm;
