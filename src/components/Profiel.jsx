import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { closeUpdate, openUpdate } from "../store/slices/updatFormSlice";
import userData from "../appwrite/userData";
import authService from "../appwrite/auth";
import {
  deleteData,
  getDocData,
  setStatus,
} from "../store/slices/userAvtarInfoSlice";
import userPosts from "../appwrite/userPosts";
import { getPosts } from "../store/slices/postsSlice";
import { Query } from "appwrite";
import EditForm from "./EditForm";
function Profiel() {
  const [error, setError] = useState(null);

  const userInfo = useSelector((state) => state.auth.userData);
  const docInfo = useSelector((state) => state.avatarInfo.docInfo);
  const isUpdateOpen = useSelector((state) => state.updateForm.isUpdateOpen);
  const filePreview = useSelector((state) => state.avatarInfo.filePreview);
  const posts = useSelector((state) => state.posts.posts);

  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "",
      avatarImage: "",
      bio: "",
      name: "",
    },
  });

  useEffect(() => {
    userData.getDoc(userInfo?.$id).then((docInfo) => {
      if (docInfo) {
        console.log(docInfo);
        dispatch(getDocData({ docInfo }));
      } else {
        dispatch(deleteData());
      }
    });
    const queries = [Query.equal("userId", userInfo?.$id)];
    userPosts.getUserPost(queries).then((res) => {
      console.log(res.documents);
      dispatch(getPosts(res.documents));
    });
  }, []);

  const onInputChange = (e) => {
    const image = e.target.files[0];
    dispatch(setStatus());
    if (image) {
      setFile(image);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const updateProfile = async (data) => {
    try {
      const user = await authService.getCurrentUser();

      if (user) {
        if (file) {
          const uploadeFile = await userData.createFile(user.$id, file);
          if (uploadeFile) {
            data.avatarImage = uploadeFile.$id;

            data.userId = user.$id;

            const documentDetails = await userData.createDocument(user.$id, {
              ...data,
            });
          }
        }
      }
    } catch (error) {
      console.log("error in updating ", error);
      setError(error);
    }
  };
  return (
    <>
      <div className="insta-clone  ">
        <nav className="bg-white shadow border-b border-gray-400 w-full">
          <div className=" w-full">
            <div className="flex   justify-start h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block  h-8 w-auto"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Workflow logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className=" h-auto relative  w-full">
          {isUpdateOpen && (
            <div className=" absolute bg-black bg-opacity-5   h-3/5 z-30   flex items-center justify-center w-full   ">
              <i
                onClick={() => dispatch(closeUpdate())}
                className="fa-solid fa-xmark absolute right-10 top-6 text-4xl cursor-pointer"
              ></i>
              <div className="  w-4/5 h-4/5 bg-white rounded-lg flex ">
                <div className="  w-1/2  flex justify-center items-center ">
                  <div className=" w-64 h-64 bg-red-50 rounded-full">
                    <img
                      src={`${
                        imagePreviewUrl
                          ? imagePreviewUrl
                          : "https://thumbs.dreamstime.com/z/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg?ct=jpeg"
                      }`}
                      alt=""
                      className=" w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(updateProfile)}
                  className=" small-update-form  w-1/2 flex flex-col items-center justify-center gap-4"
                >
                  <p>You only update these details once</p>
                  {error && (
                    <p className=" text-red-800">
                      You can only Update One Time
                    </p>
                  )}
                  <textarea
                    {...register("bio")}
                    placeholder=" Enter a bio"
                    className="  rounded-lg  w-4/5 p-3 ps-4 outline-none  "
                    type="text"
                    name="bio"
                    id=""
                  ></textarea>
                  <input
                    {...register("name")}
                    className="  rounded-lg small-update-input  w-4/5 p-3 ps-4 outline-none  "
                    type="text"
                    placeholder="Update Your name"
                    name="name"
                    id=""
                  />
                  {imagePreviewUrl && (
                    <button
                      type="submit"
                      className="bg-blue-500 update-btn-profile   px-28 py-1 text-white rounded-lg cursor-pointer"
                    >
                      Update
                    </button>
                  )}
                  {!imagePreviewUrl && (
                    <>
                      <p className="text-xl">Add Photos </p>
                      <label
                        className=" bg-blue-500  small-screen-update-btn px-28 py-1 text-white rounded-lg cursor-pointer "
                        htmlFor="file"
                      >
                        Add File
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="hidden "
                        onChange={onInputChange}
                      />
                    </>
                  )}
                </form>
              </div>
            </div>
          )}
          <div className="flex md:flex- w-full mx-auto  justify-center gap-6  items-center">
            <div className=" w-32 h-32  small-pic flex justify-center rounded-full ">
              <img
                className=" w-full  rounded-full"
                src={`${
                  filePreview ||
                  "https://thumbs.dreamstime.com/z/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg?ct=jpeg"
                }`}
              />
            </div>

            <div className=" flex flex-col w-3/5  p-4 text-center">
              <div className="text-left pl-4 pt-3 flex  gap-2">
                <span className="text-base text-gray-700">
                  {userInfo?.name}
                </span>
                <div className="text-base font-semibold text-gray-700  mr-2  ">
                  <button
                    onClick={() => dispatch(openUpdate())}
                    className=" small-edit bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4hover:border-transparent rounded px-2 "
                  >
                    Edit Profile
                  </button>
                </div>
                <span className=" text-base font-semibold text-gray-700 mr-2 ">
                  <button
                    className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <i className="fa-solid fa-gear text-2xl"></i>
                  </button>
                </span>
              </div>

              <div className="flex gap-3 mt-2 ml-2  ">
                <span className="text-base font-semibold text-gray-700 ">
                  <b>220</b> posts
                </span>
                <span className="text-base font-semibold text-gray-700 ">
                  <b>114</b> followers
                </span>
                <span className="text-base font-semibold text-gray-700">
                  <b>200</b> following
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                <span className="text-lg font-bold text-gray-700 mr-2">
                  {docInfo?.name}
                </span>
              </div>

              <div className="text-left pl-4 ">
                <p className="text-base font-medi mr-2">Bio: {docInfo?.bio}</p>
              </div>
            </div>
          </div>

          <div className="flex  items-center justify-center gap-0 mt-16">
            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto  small-circles   w-32 h-32    -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Travel
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto   small-circles   w-32 h-32   -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Food
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto   small-circles  w-32 h-32    -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Sketch
              </h1>
            </div>
          </div>

          <hr className="border-gray-500 mt-6" />
          <hr className=" w-20 border-t-1 ml-64 border-gray-800" />

          <div className="flex flex-row mt-4 justify-center  items-center gap-3">
            <div className="flex gap-3  items-center ">
              <i className="fa-solid fa-table-cells"></i>

              <span className="text-sm  text-gray-800 mr-2 ">POSTS</span>
            </div>
            <div className="flex gap-3  items-center ">
              <i className="fa-regular fa-bookmark"></i>

              <span className="text-sm  text-gray-800 mr-2">Saved</span>
            </div>
            <div className="flex gap-3  items-center ">
              <i className="fa-regular fa-address-card"></i>

              <span className="text-sm  text-gray-800 mr-2">Tagged</span>
            </div>
          </div>

          <div className="flex pl-6 pt-4 flex-wrap gap-1   w-full h-auto">
            {posts.map((post) => (
              <div key={post.$id} className="flex cursor-pointer  w-3/12 ">
                <img
                  className="w-full"
                  src={userPosts.getPostFilePreview(String(post.image))}
                />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profiel;
