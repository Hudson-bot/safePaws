import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#EEE9E2' }} className="bg-white border-y">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.jpg"
                className="mr-3 h-auto max-h-16 w-auto"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">About</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/contactUs" className="hover:underline">Contact Us</Link>
                </li>
                <li>
                  <Link to="/services" className="hover:underline">Services</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024 safePaws. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* Social Media Links */}
            <Link to="#" className="text-gray-500 hover:text-gray-900">
              {/* Facebook Icon */}
            </Link>
            <Link to="#" className="text-gray-500">
              {/* Discord Icon */}
            </Link>
            <Link to="#" className="text-gray-500">
              {/* Twitter Icon */}
            </Link>
            <Link to="#" className="text-gray-500">
              {/* GitHub Icon */}
            </Link>
            <Link to="#" className="text-gray-500">
              {/* Dribbble Icon */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;