import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../authenticate/config"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

function Header({ homeRef, donateAdoptRef, aboutUsRef, servicesRef, contactsRef, loading }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <header style={{ backgroundColor: '#EEE9E2' }}className="shadow sticky z-50 top-0 " >
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center">
          <img src="/images/smallLogo.png" className="mr-3 h-12" alt="Logo" />
        </Link>

        <button onClick={toggleMenu} className="lg:hidden p-2 text-gray-800 hover:bg-gray-200 rounded-lg">
          <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-8">
          <button onClick={() => homeRef.current?.scrollIntoView({ behavior: "smooth" })} className="py-2 px-3 hover:text-orange-700">
            Home
          </button>
          <button onClick={() => donateAdoptRef.current?.scrollIntoView({ behavior: "smooth" })} className="py-2 px-3 hover:text-orange-700">
            Donate/Adopt
          </button>
          <button onClick={() => aboutUsRef.current?.scrollIntoView({ behavior: "smooth" })} className="py-2 px-3 hover:text-orange-700">
            About Us
          </button>
          <button onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })} className="py-2 px-3 hover:text-orange-700">
            Services
          </button>
          <button onClick={() => contactsRef.current?.scrollIntoView({ behavior: "smooth" })} className="py-2 px-3 hover:text-orange-700">
            Contact Us
          </button>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                {getInitial()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg">
              Log in
            </Link>
          )}
        </div>
      </div>

      {loading && <LinearProgress />}
    </header>
  );
}

export default Header;
