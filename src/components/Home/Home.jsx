import React from "react";

const Home = () => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center lg:justify-start h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('images/background1.png')" }}
    >
      <div className="p-6 lg:ml-60 text-center lg:text-left">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl text-brown-700">
          Safe Paws
        </h1>
        <p className="text-xl sm:text-2xl lg:text-4xl text-brown-700 mt-4">
          Let’s get the tails wagged!
        </p>

        <div className="flex flex-col sm:flex-row items-center mt-6">
          <button className="inline-flex text-white items-center px-8 py-3 sm:px-12 sm:py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75 mb-4 sm:mb-0 sm:mr-4">
            Rescue
          </button>
          <button className="inline-flex text-white items-center px-8 py-3 sm:px-12 sm:py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75">
            Accessories
          </button>
        </div>

        <button className="inline-flex text-white items-center px-6 py-6 sm:px-16 sm:py-8 lg:px-32 lg:py-12 font-medium bg-amber-800 rounded-lg hover:opacity-75 mt-6 text-center">
          <div>
            For rescue operations <br />
            Call us at: <br />
            XXXX XXXX XXXX
          </div>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row mt-6 lg:mt-0 lg:ml-56 items-center">
        <img
          src="images/cat1.png"
          alt="Cat"
          className="w-40 sm:w-52 lg:w-[250px] h-auto"
        />
        <img
          src="images/dog1.png"
          alt="Dog"
          className="w-40 sm:w-52 lg:w-[250px] h-auto mt-6 sm:mt-0 sm:ml-10 lg:ml-20"
        />
      </div>
    </div>
  );
};



export default Home;