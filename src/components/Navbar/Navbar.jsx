import { useContext } from "react";
import logo from "./../../assets/freshcart-logo.svg";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from './../../Context/CartContext';

const Navbar = () => {

  const {products, numOfItems, totalCartPrice} = useContext(CartContext)
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate()
    function logout() {
      localStorage.removeItem("token");
      setToken(null);
      navigate("FreshCart/login");
  }

  return (
    <nav className="bg-gray-100 fixed top-0 w-full shadow-lg z-50">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-start container mx-auto p-4 xl:px-10">
        <Link
          to="home"
          className="flex items-center space-x-3 rtl:space-x-reverse me-5"
        >
          <img src={logo} className="h-8" alt="FreshCart Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:flex md:flex-row md:flex-wrap md:justify-between"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col px-4 md:p-0 mt-4 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0">
            {token ? (
              <>
                <li>
                  <NavLink
                    to={"FreshCart/home"}
                    className="block py-2 px-3 text-gray-600 md:p-0"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"FreshCart/categories"}
                    className="block py-2 px-3 text-gray-600 md:p-0"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"FreshCart/brands"}
                    className="block py-2 px-3 text-gray-600 md:p-0"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"FreshCart/wishlist"}
                    className="block py-2 px-3 text-gray-600 md:p-0"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"FreshCart/allorders"}
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
          <ul className="font-medium flex flex-col px-4 md:p-0 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0">
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
                    to={"FreshCart/cart"}
                    className="block py-2 px-3 text-gray-600 md:p-0 relative md:me-4"
                  >
                    Cart
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-lg -top-1 md:-top-4 md:-end-4">
                      {numOfItems}
                    </div>
                  </NavLink>
                </li>
                <li>
                  <span className="hidden py-2 px-3 bg-gray-500 md:p-0 md:block md:w-[1px] md:h-full"></span>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block cursor-pointer py-2 px-3 text-gray-600 md:p-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"FreshCart/login"}
                    className="block cursor-pointer py-2 px-3 text-gray-600 md:p-0"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"FreshCart/register"}
                    className="block cursor-pointer py-2 px-3 text-gray-600 md:p-0"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar