import React from "react";
import { useNavigate } from 'react-router-dom';

function DonateAdopt() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1 bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/adoptbackground.png')" }}
      ></div>

      <div
        className="h-80 w-full md:w-3/4 lg:w-1/2 mx-auto bg-no-repeat bg-cover bg-center flex items-center justify-center -mt-12" 
        style={{ backgroundImage: "url('/images/adoptbackground2.png')" }}
      >
        <div className="flex flex-wrap space-x-4 p-4 justify-center">
          <button id="donate"
            className="flex-1 p-8 h-52 w-60 shadow-md rounded-lg bg-cover bg-center"
            style={{ backgroundImage: "url('/images/donatepet.png')" }}
            onClick={() => navigate('/donate')}
          ></button>

          <button id="adopt"
            className="flex-1 p-8 h-52 w-60 shadow-md rounded-lg bg-cover bg-center"
            style={{ backgroundImage: "url('/images/adoptpet.png')" }}
            onClick={() => navigate('/adopt')}
          ></button>
        </div>
      </div>
      <div className="h-40 w-full md:w-3/4 lg:w-1/2 mx-auto mt-4"style={{ backgroundColor: '#EEE9E2' }}>
        <img src="/images/foldedimages.png" alt="multiple-animal-photos"/>
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
