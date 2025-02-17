import { useContext, useState } from "react";
import logo from "./../../assets/freshcart-logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "./../../Context/CartContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { numOfItems } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white fixed top-0 w-full shadow-lg z-50">
      <div className="container mx-auto p-4 xl:px-10">
        <div className="flex justify-between items-center">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link
              to="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse me-5"
            >
              <img src={logo} className="h-8" alt="Logo" />
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <ul className="font-medium flex flex-col px-4 md:p-0 mt-4 md:flex-row md:justify-between md:space-x-4 rtl:space-x-reverse md:mt-0">
                {token ? (
                  <>
                    <li>
                      <NavLink
                        to={"/home"}
                        className="block py-2 px-3 text-gray-600 md:p-0"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/categories"}
                        className="block py-2 px-3 text-gray-600 md:p-0"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/brands"}
                        className="block py-2 px-3 text-gray-600 md:p-0"
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/wishlist"}
                        className="block py-2 px-3 text-gray-600 md:p-0"
                      >
                        Wishlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/allorders"}
                        className="block py-2 px-3 text-gray-600 md:p-0"
                      >
                        Orders
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>

          {/* Right side: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="font-medium flex flex-col items-center px-4 md:p-0 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0">
              {token ? (
                ""
              ) : (
                <>
                  <div className="links px-3 md:p-0">
                    <Link className="me-3">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                    <Link className="me-3">
                      <i className="fa-brands fa-facebook"></i>
                    </Link>
                    <Link className="me-3">
                      <i className="fa-brands fa-tiktok"></i>
                    </Link>
                    <Link className="me-3">
                      <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                    <Link className="me-3">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                    <Link>
                      <i className="fa-brands fa-youtube"></i>
                    </Link>
                  </div>
                </>
              )}
              {token ? (
                <>
                  <li>
                    <NavLink
                      to={"/cart"}
                      className="block py-2 px-3 text-gray-600 md:p-0 relative me-2"
                    >
                      Cart
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-lg -top-1 md:-top-4 md:-end-4">
                        {numOfItems}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <span className="bg-gray-500 hidden md:block w-[1px] h-[43px]"></span>
                  </li>
                  <li className="py-2 px-3 text-white border-2 border-green-500 rounded-lg bg-green-500">
                    <button
                      onClick={logout}
                      className="block cursor-pointer md:p-0"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-2 px-3 text-gray-600 border-2 rounded-lg border-green-500">
                    <NavLink
                      to={"/login"}
                      className="block cursor-pointer md:p-0"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-2 px-3 text-white border-2 border-green-500 rounded-lg bg-green-500">
                    <NavLink
                      to={"/register"}
                      className="block cursor-pointer md:p-0"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg" onClick={toggleMenu}>
              {isOpen ? (
                <X className="cursor-pointer h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="cursor-pointer h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} pb-4 pt-2`}>
          <div className="space-y-1">
            {token ? (
              <>
                <NavLink
                  to={"/home"}
                  className="block py-2 px-3 text-gray-600 md:p-0"
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/categories"}
                  className="block py-2 px-3 text-gray-600 md:p-0"
                >
                  Categories
                </NavLink>
                <NavLink
                  to={"/brands"}
                  className="block py-2 px-3 text-gray-600 md:p-0"
                >
                  Brands
                </NavLink>
                <NavLink
                  to={"/wishlist"}
                  className="block py-2 px-3 text-gray-600 md:p-0"
                >
                  Wishlist
                </NavLink>
                <NavLink
                  to={"/allorders"}
                  className="block py-2 px-3 text-gray-600 md:p-0"
                >
                  Orders
                </NavLink>
                <NavLink
                  to={"/cart"}
                  className="block py-2 px-3 text-gray-600 md:p-0 relative md:me-4"
                >
                  Cart
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-lg -top-1 md:-top-4 md:-end-4">
                    {numOfItems}
                  </div>
                </NavLink>
              </>
            ) : (
              <div className="links px-3 md:p-0">
                <Link className="me-3">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
                <Link className="me-3">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
                <Link className="me-3">
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
                <Link className="me-3">
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
                <Link className="me-3">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </div>
            )}
            <div className="pt-4 space-y-2">
              {token ? (
                <button
                  onClick={logout}
                  className="block w-full cursor-pointer py-2 px-3 text-white border-2 border-green-500 rounded-lg bg-green-500 md:p-0"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to={"/login"}
                    className="block w-full cursor-pointer py-2 px-3 text-gray-600 border-2 rounded-lg border-green-500 md:p-0"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className="block w-full cursor-pointer py-2 px-3 text-white border-2 border-green-500 rounded-lg bg-green-500 md:p-0"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
