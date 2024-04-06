import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { open } from "../store/slices/postFormSlice";
import { logout as storLogout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import authSerivce from "../appwrite/auth";
import { deleteData } from "../store/slices/userAvtarInfoSlice";
import { useSelector } from "react-redux";

function SideBar() {
  const [showSignout, setShowSignOut] = useState(false);
  const filePreview = useSelector((state) => state.avatarInfo.filePreview);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = async () => {
    const signingOut = await authSerivce.logout();

    if (signingOut) {
      dispatch(storLogout());
      dispatch(deleteData());
      navigate("/login");
    }
  };
  return (
    <>
      <aside
        id="default-sidebar"
        className="sticky top-0 left-0 z-40 w-64 h-screen small-screen-main "
        aria-label="Sidebar"
      >
        <div className="small-screen-side h-full px-3 py-4 overflow-y-auto  border-r-2 border-gray-200 dark:bg-gray-800">
          <ul className="space-y-2 font-medium small-screen-ul">
            <li>
              <div className="flex-shrink-0 flex items-center small-logo ">
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Workflow logo"
                />
              </div>
            </li>

            <li>
              <Link
                to="/"
                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-house  text-xl "></i>
                <span className="small-li">Home</span>
              </Link>
            </li>
            <li>
              <a
                onClick={() => dispatch(open())}
                href="#"
                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-plus  text-xl "></i>
                <span className="small-li"> Create</span>
              </a>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="  w-5 h-5 rounded-full">
                  <img
                    className=" rounded-full h-full w-full"
                    src={filePreview}
                    alt=""
                  />
                </div>
                <span className="small-li">Profile</span>
              </Link>
            </li>
            <li className=" absolute bottom-6  small-screen-sign  w-56">
              {showSignout && (
                <div
                  onClick={signOut}
                  className=" small-screen-sign-div w-56 h-12 bg-gray-300 rounded-lg cursor-pointer  hover:bg-gray-400  flex items-center justify-center"
                >
                  <span className="">Sign out</span>
                </div>
              )}
              <a
                onClick={() => setShowSignOut((prev) => !prev)}
                href="#"
                className="flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-bars text-2xl"></i>
                <span className=" text-xl small-li"> More</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
