import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function DonateAdopt() {
  const navigate = useNavigate();
  const location = useLocation();
  const donateAdoptRef = useRef(null); // Create a ref for the section

  // Scroll to the section if the state matches
  useEffect(() => {
    if (location.state?.scrollTo === 'donateAdoptRef' && donateAdoptRef.current) {
      donateAdoptRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <div style={{ backgroundColor: '#EEE9E2' }} className="flex flex-col min-h-screen">
  {/* Background Section */}
  <div
    className="flex-1 bg-no-repeat bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: "url('/images/adoptbackground.png')" }}
  ></div>

  {/* Donate/Adopt Buttons Section */}
  <div
    ref={donateAdoptRef} // Attach the ref to this section
    className="h-80 w-full md:w-3/4 lg:w-1/2 mx-auto bg-no-repeat bg-cover bg-center flex items-center justify-center -mt-12"
    style={{ backgroundImage: "url('/images/adoptbackground2.png')" }}
  >
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <button
        id="donate"
        className="w-48 h-48 sm:w-52 sm:h-52 md:w-60 md:h-60 shadow-md rounded-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/images/donatepet.png')" }}
        onClick={() => navigate('/donate')}
      ></button>

      <button
        id="adopt"
        className="w-48 h-48 sm:w-52 sm:h-52 md:w-60 md:h-60 shadow-md rounded-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/images/adoptpet.png')" }}
        onClick={() => navigate('/adopt')}
      ></button>
    </div>
  </div>

  {/* Folded Images Section */}
  <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-4" style={{ backgroundColor: '#EEE9E2' }}>
    <img src="/images/foldedimages.png" alt="multiple-animal-photos" className="w-full h-auto" />
  </div>
</div>
  );
}

export default DonateAdopt;

// function DonateAdopt() {
//   return (
//     <div className="flex flex-col min-h-screen ">
//       <div className="flex-1 bg-gray-200 p-4 bg-no-repeat bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/adoptbackground.png')" }}>

//       </div>
//       <div className="flex-1 bg-gray-200 p-4 bg-no-repeat bg-cover bg-center -mt-32 w-3/5 h-auto ml-72  rounded "
//       style={{ backgroundImage: "url('/images/adoptbackground2.png')" }}>

//       </div>
//     </div>
//   );
// }
// "flex-1 bg-no-repeat bg-cover bg-center flex items-center justify-center w-full ml-80 sm:w-3/5 md:w-2/3 lg:w-3/5 xl:w-1/2 -mt-32  sm:ml-24 md:ml-32"
