import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useLogout } from "../hooks/useLogout";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-screen sm:w-screen h-[100px] bg-background-lightgrey drop-shadow-lg">
      <div className="px-5 sm:px-10 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <div className="flex gap-1 sm:gap-3 items-center">
            <ChatBubbleBottomCenterTextIcon className="w-8 sm:w-14  text-nomad-red" />
            <h1
              className="text-xl font-bold sm:text-4xl text-nomad-red cursor-pointer"
              onClick={() => navigate("/")}
            >
              Facts Club
            </h1>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-1 sm:gap-10">
            <p className="text-nomad-red font-bold text-xl sm:text-2xl">
              {user.displayName}
            </p>
            <button
              onClick={handleLogout}
              className="text-nomad-red font-bold text-xl sm:text-2xl transition duration-150 hover:text-nomad-red/75"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3 sm:gap-10 items-center">
            <Link
              to={"/login"}
              className="text-nomad-red font-bold text-xl sm:text-2xl transition duration-150 hover:text-nomad-red/75"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-nomad-red font-bold text-xl sm:text-2xl transition duration-150 hover:text-nomad-red/75"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
