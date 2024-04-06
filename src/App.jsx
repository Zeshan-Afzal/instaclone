import "./App.css";

import { Outlet } from "react-router-dom";
import authSerivce, { auth } from "./appwrite/auth";

import { useDispatch, useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import { close } from "./store/slices/postFormSlice";
import PostForm from "./components/PostForm";
import { useEffect, useState } from "react";
import { login, logout } from "./store/slices/authSlice";
import Spinner from "./components/Spinner";
import userPosts from "./appwrite/userPosts";
import { getAllPosts } from "./store/slices/postsSlice";
import userData from "./appwrite/userData";
import { deleteData, getFileData } from "./store/slices/userAvtarInfoSlice";
import { useNavigate } from "react-router-dom";
import EditForm from "./components/EditForm";
import { closeEditForm } from "./store/slices/editForm";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const isOpen = useSelector((state) => state.postForm.isOpen);
  const isEditOpen = useSelector((state) => state.editFrom.isEditOpen);

  const isLoggedIn = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();

  useEffect(() => {
    authSerivce
      .getCurrentUser()
      .then((res) => {
        if (res) {
          dispatch(login(res));
          const preview = userData.getFilePreview(res.$id);
          if (preview) {
            const filePreview = preview.href;
            dispatch(getFileData({ filePreview }));
          } else {
            dispatch(deleteData());
          }

          userPosts.getUserPost().then((res) => {
            dispatch(getAllPosts(res.documents));
          });
        } else {
          dispatch(logout());
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized error, user is not logged in or doesn't have necessary permissions
          console.error("Unauthorized error:", error);
          dispatch(logout());
          navigate("/login"); // Navigate to login page
        } else {
          // Other error occurred, handle as needed
          console.error("Error fetching current user:", error);
          // Optionally handle the error case here
        }
      });
    setLoader(false);
  }, []);

  if (loader) {
    return <Spinner />;
  } else {
    return (
      <>
        {isOpen && (
          <div className=" h-screen w-screen  bg-black bg-opacity-50 fixed left-0 top-0 overflow-hidden flex items-center z-50">
            <i
              onClick={() => dispatch(close())}
              className="fa-solid fa-xmark absolute right-10 top-6 text-4xl cursor-pointer"
            ></i>

            <PostForm />
          </div>
        )}

        {isEditOpen && (
          <div className=" h-screen w-screen  bg-black bg-opacity-50 fixed left-0 top-0 overflow-hidden flex items-center z-50">
            <i
              onClick={() => dispatch(closeEditForm())}
              className="fa-solid fa-xmark absolute right-10 top-6 text-4xl cursor-pointer"
            ></i>
            <EditForm />
          </div>
        )}

        <div className=" flex  main-small ">
          <div className="ml-0 fixed small-screen-bottom h-screen ">
            {isLoggedIn && <SideBar />}
          </div>
          <div className=" ml-64 h-screen small-screen-profile w-screen">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default App;
