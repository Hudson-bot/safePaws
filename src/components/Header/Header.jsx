import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header style={{ backgroundColor: '#EEE9E2' }} className="shadow sticky z-50 top-0">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/images/logo.jpg" className="mr-3 h-12" alt="Logo" />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-800 hover:bg-gray-200 rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 px-3 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Donate/adopt"
            className={({ isActive }) =>
              `py-2 px-3 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
            }
          >
            Donate/Adopt
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 px-3 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `py-2 px-3 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contactUs"
            className={({ isActive }) =>
              `py-2 px-3 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
            }
          >
            Contact
          </NavLink>

          {/* Login Button */}
          <Link
            to="authenticate"
            className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none ml-4"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, shown when isMenuOpen is true */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-100 py-4`}
        id="mobile-menu"
      >
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Donate/adopt"
              className={({ isActive }) =>
                `block py-2 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
              }
            >
              Donate/Adopt
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block py-2 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                `block py-2 text-gray-700 ${isActive ? "text-orange-700" : "hover:text-orange-700"}`
              }
            >
              Contact
            </NavLink>
          </li>

          {/* Login Button for Mobile */}
          <li>
            <Link
              to="/login"
              className="block py-2 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;