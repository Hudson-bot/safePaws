import React from "react";

const Home = () => {
  return (
    <div
      className="flex items-center justify-start h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('images/background1.png')" }}
    >
      <div className="ml-60 mt-0">
        <h1 className="text-8xl text-brown-700">Safe Paws</h1>
        <p className="text-4xl text-brown-700">Let’s get the tails wagged!</p>

        <div className="flex mt-6">
          <button className="inline-flex text-white items-center px-12 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75 mr-24">
            Rescue
          </button>
          <button className="inline-flex text-white items-center px-12 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75">
            Accessories
          </button>
        </div>

        <button className="inline-flex text-white items-center px-32 py-12 font-medium bg-amber-800 rounded-lg hover:opacity-75 mt-6">
        For rescue operations <br/>
             Call us at: <br/>
            XXXX XXXX XXXX
        </button>
      </div>

      <div className="flex mt-6 ml-56">
        <img src="images/cat1.png" alt="Image" style={{ width: '250px', height: '500px' }} />
        <img src="images/dog1.png" alt="Image" style={{ width: '250px', height: '500px' }} className="ml-20 mt-16" />
      </div>
    </div>
  );
};

export default Home;
