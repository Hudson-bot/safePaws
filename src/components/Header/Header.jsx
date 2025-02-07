import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../authenticate/config"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material"; // Importing LinearProgress

function Header({
  homeRef,
  donateAdoptRef,
  aboutUsRef,
  servicesRef,
  contactsRef,
  loading, // Accepting the loading prop
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Function to get the first letter of the user's name or email
  const getInitial = () => {
    if (user && user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    } else if (user && user.email) {
      return user.email.charAt(0).toUpperCase(); // Fallback to first letter of email
    }
    return "";
  };

  return (
    <header
      style={{ backgroundColor: "#EEE9E2" }}
      className="shadow sticky z-50 top-0"
    >
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/images/smallLogo.png" className="mr-3 h-12" alt="Logo" />
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
          <button
            onClick={() => scrollToSection(homeRef)}
            className="py-2 px-3 text-gray-700 hover:text-orange-700"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(donateAdoptRef)}
            className="py-2 px-3 text-gray-700 hover:text-orange-700"
          >
            Donate/Adopt
          </button>
          <button
            onClick={() => scrollToSection(aboutUsRef)}
            className="py-2 px-3 text-gray-700 hover:text-orange-700"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection(servicesRef)}
            className="py-2 px-3 text-gray-700 hover:text-orange-700"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection(contactsRef)}
            className="py-2 px-3 text-gray-700 hover:text-orange-700"
          >
            Contact Us
          </button>

          {/* User Profile Button */}
          {user ? (
            <div className="flex items-center">
              <span className="text-gray-700 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                {getInitial()}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none ml-4"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, shown when isMenuOpen is true */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-100 py-4`}
        id="mobile-menu"
      >
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => scrollToSection(homeRef)}
              className="block py-2 text-gray-700 hover:text-orange-700"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(donateAdoptRef)}
              className="block py-2 text-gray-700 hover:text-orange-700"
            >
              Donate/Adopt
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(aboutUsRef)}
              className="block py-2 text-gray-700 hover:text-orange-700"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="block py-2 text-gray-700 hover:text-orange-700"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(contactsRef)}
              className="block py-2 text-gray-700 hover:text-orange-700"
            >
              Contact Us
            </button>
          </li>
          <li>
            {user ? (
              <div className="flex items-center">
                <span className="text-gray-700 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                  {getInitial()}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              >
                Log in
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Show LinearProgress bar when loading is true */}
      {loading && <LinearProgress />}
    </header>
  );
}

export default Header;
