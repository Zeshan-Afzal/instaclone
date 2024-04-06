import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import userPosts from "../appwrite/userPosts";
import Spinner from "./Spinner";
import { closeEditForm } from "../store/slices/editForm";
import { useNavigate } from "react-router-dom";
function EditForm() {
  const [spinner, setSpinner] = useState(false);
  const prevPost = useSelector((state) => state.editFrom.prevPost);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      caption: prevPost?.caption || "",
      userId: prevPost?.userId || "",
      username: prevPost?.username || "",
      image: prevPost?.image || "",
    },
  });

  const onInputChange = async (e) => {
    setSpinner(true);

    const image = e.target.files[0];
    if (image) {
      setFile(image);
      setTimeout(() => {
        if (image) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreviewUrl(reader.result);
          };
          reader.readAsDataURL(image);
          setSpinner(false);
        }
      }, 3000);
    }
  };

  const post = async (data) => {
    setSpinner(true);
    if (userData && data) {
      if (file) {
        const uploadingFile = file
          ? await userPosts.uploadePostFile(file)
          : null;
        if (uploadingFile) {
          userPosts.deleteFile(prevPost.image);

          const creatingPost = await userPosts.updatePost(prevPost.$id, {
            ...data,
            image: uploadingFile?.$id,
            caption: data?.caption,
          });
          setSpinner(false);
          dispatch(closeEditForm());
          navigate("/");
        }
      } else {
        data.caption = data?.caption;
        const creatingPost = await userPosts.updatePost(prevPost.$id, {
          ...data,
          image: prevPost?.image,
          caption: data?.caption,
        });
        setSpinner(false);
        dispatch(closeEditForm());
        navigate("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(post)}
      className=" w-screen h-screen    flex  items-center "
    >
      <div className="container mx-auto   z-40 relative flex-col w-3/5  h-4/5 bg-white  rounded-lg flex items-center justify-center ">
        {spinner && <Spinner />}

        {!spinner && (
          <>
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

            <div className="  w-4/5 h-4/5  ">
              <img
                className=" w-full   h-full"
                src={
                  imagePreviewUrl
                    ? imagePreviewUrl
                    : userPosts.getPostFilePreview(String(prevPost?.image))
                }
                alt=""
              />
            </div>

            <button
              className="bg-blue-500 small-edit-form  px-6 py-1   right-1  absolute bottom-2 text-white rounded-lg cursor-pointer "
              type="submit"
            >
              Post
            </button>
          </>
        )}
        {!imagePreviewUrl && (
          <>
            <label
              className=" bg-blue-500 mt-2 small-edit-form small-screen-file-btn  px-28 py-1 text-white rounded-lg cursor-pointer "
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

export default EditForm;
