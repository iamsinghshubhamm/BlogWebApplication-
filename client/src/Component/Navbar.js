import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { MdPersonAdd } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions} from "../Redux/store";

const Navbar = () => {
    const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const loginHandler = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    dispatch(authActions.logout())
    localStorage.clear('user')
    navigate('/login')
  }
  const registerHandler = () => {
    navigate("/register");
  };
  const isLogin = useSelector((state) => state.isLogin);
 

  return (
    <nav className="bg-gray-700 p-4 top-0 w-full z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <button
              className="text-white focus:outline-none block md:hidden"
              onClick={toggleMenu}
            >
              {showMenu ? <FiMenu /> : <FaBars />}
            </button>
          </div>
          <div className="flex items-center">
            <h1 onClick={() => navigate("/")} className="text-xl text-white">
              BlogApp
            </h1>
          </div>
        </div>
        <ul className={`flex items-center gap-5 text-[15px] mr-6 md:mr-0`}>
          {!isLogin ? (
            <li onClick={loginHandler} className="md:ml-4">
              <button className="text-white flex items-center cursor-pointer whitespace-nowrap focus:outline-none">
                <RiLoginBoxLine className="mr-1" />
                Login
              </button>
            </li>
          ) : (
            <li onClick={logoutHandler} className="md:ml-4">
              <button className="text-white flex items-center cursor-pointer whitespace-nowrap focus:outline-none">
              <RiLogoutBoxLine className="mr-1" />
                Logout
              </button>
            </li>
          )}
          { !isLogin && (<li onClick={registerHandler} className="md:ml-4">
            <button className="text-white flex items-center cursor-pointer whitespace-nowrap focus:outline-none">
              <MdPersonAdd className="mr-1" />
              Register
            </button>
          </li>)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
