import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAccessoriesClick = () => {
    navigate("/accessories");
  };

  return (
    <div
  className="flex flex-col lg:flex-row items-center justify-center lg:justify-start min-h-screen bg-cover bg-no-repeat bg-center"
  style={{ backgroundImage: "url('images/background1.png')" }}
>
  {/* Text and Buttons Section */}
  <div className="p-6 lg:ml-16 xl:ml-60 text-center lg:text-left">
    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brown-700 font-bold leading-tight">
      Safe Paws
    </h1>
    {/* Subheading */}
    <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-brown-700 mt-4">
      Let’s get the tails wagged!
    </p>

    {/* Buttons - Rescue and Accessories */}
    <div className="flex flex-col sm:flex-row items-center mt-6 gap-4">
      <button style={{ backgroundColor: '#BC7057' }} className="inline-flex text-white items-center px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3 text-sm sm:text-base lg:text-lg font-medium  rounded-lg hover:opacity-75">
        Rescue
      </button>
      <button
        onClick={handleAccessoriesClick} style={{ backgroundColor: '#BC7057' }}
        className="inline-flex text-white items-center px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3 text-sm sm:text-base lg:text-lg font-medium  rounded-lg hover:opacity-75"
      >
        Accessories
      </button>
    </div>

    {/* Call to Action Button */}
    <button style={{ backgroundColor: '#BC7057' }} className="inline-flex text-white items-center px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8 text-sm sm:text-base lg:text-lg font-medium bg-amber-800 rounded-lg hover:opacity-75 mt-6 text-center">
      <div>
        For rescue operations <br />
        Call us at: <br />
        XXXX XXXX XXXX
      </div>
    </button>
  </div>

  {/* Images Section */}
  <div className="flex flex-col sm:flex-row mt-8 lg:mt-0 lg:ml-16 xl:ml-56 items-center gap-6 sm:gap-10 lg:gap-20">
    <img
      src="images/cat1.png"
      alt="Cat"
      className="w-32 sm:w-40 lg:w-48 xl:w-64 h-auto"
    />
    <img
      src="images/dog1.png"
      alt="Dog"
      className="w-32 sm:w-40 lg:w-48 xl:w-64 h-auto"
    />
  </div>
</div>
  );
};

export default Home;
