import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const filePreview = useSelector((state) => state.avatarInfo.filePreview);
  const userInfo = useSelector((state) => state.auth.userData);

  return (
    <div className=" w-full">
      {" "}
      <nav className="bg-white w-full shadow  border-b-2 border-gray-400 p-3">
        <div className=" w-full mx-auto px-2  ">
          <div className="flex justify-between h-16">
            <div className="flex px-2  justify-between items-center w-full small-header">
              <div className="flex-shrink-0 flex items-center ">
                <img
                  className="bloc h-8 w-auto"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Workflow logo"
                />
              </div>

              <div className=" flex  small-screen-link  items-center gap-4 justify-between  w-1/4">
                <Link to="/profile">
                  <div className=" w-16 h-16 rounded-full small-header-image  mb-3 flex items-center gap-2">
                    <img
                      className=" rounded-full h-full w-full"
                      src={filePreview}
                      alt="this a imga"
                    />
                    <p className=" font-bold mb-3">{userInfo?.name}</p>
                  </div>
                </Link>

                <p className=" small-siwtch float-end text-blue-500 text-xl cursor-pointer mb-3">
                  switch
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
