import { useState } from "react";


const Donate = () => {
  const [category, setCategory] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [otherAnimal, setOtherAnimal] = useState(""); // State for 'Other' animal type
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState(""); // Email error state
  const [petImage, setPetImage] = useState(null); // State to store the uploaded image

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
      setNameError(""); // Clear error if valid
    } else {
      setNameError("Only letters and spaces are allowed");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Basic email format validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(value)) {
      setEmailError(""); // Clear error if valid
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  const handleAnimalTypeChange = (e) => {
    setAnimalType(e.target.value);
    if (e.target.value !== "Other") {
      setOtherAnimal(""); // Clear the other animal input if not 'Other'
    }
  };

  // Handle pet image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPetImage(URL.createObjectURL(file)); // Create an object URL for the image
    } else {
      alert("Please select a valid image file");
    }
  };

  return (
    <div className="bg-[#EEE9E2] flex flex-col items-center min-h-screen py-8 overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#6A4D3F] uppercase tracking-wide text-center mb-4 relative top-8">
        🐾 Donate Your Pet 🐾
      </h1>
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg relative top-5 overflow-y-auto">
        <form>
          {/* Donor Name */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter Donor Name
            </label>
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative w-full mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter Your Email
            </label>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Address */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              id="address"
              name="address"
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
            />
            <label
              htmlFor="address"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your Address
            </label>
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-[#6A4D3F] text-sm mb-2">
              Select Category:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="Animal"
                  className="accent-[#6A4D3F]"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span>Animal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="Accessories"
                  className="accent-[#6A4D3F]"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span>Accessories</span>
              </label>
            </div>
          </div>

          {/* Conditional Fields Based on Category Selection */}
          {category === "Animal" && (
            <div className="relative w-full mb-4">
              <label
                htmlFor="donateAnimal"
                className="block text-[#6A4D3F] text-sm mb-2"
              >
                Choose an Animal to Donate:
              </label>
              <select
                id="donateAnimal"
                name="donateAnimal"
                value={animalType}
                onChange={handleAnimalTypeChange}
                className="w-full p-3 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
              >
                <option value="" disabled selected>
                  Select an animal
                </option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {category === "Accessories" && (
            <div className="relative w-full mb-4">
              <input
                type="text"
                id="accessoryType"
                name="accessoryType"
                placeholder=" "
                className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              />
              <label
                htmlFor="accessoryType"
                className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
              >
                Enter Accessory Type
              </label>
            </div>
          )}

          {/* Breed, Age, and Gender Inputs */}
          {(animalType === "Dog" ||
            animalType === "Cat" ||
            animalType === "Rabbit" ||
            animalType === "Bird" ||
            animalType === "Other") && (
            <div className="flex space-x-4 mb-4">
              <div className="w-1/3">
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Breed"
                  className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
                />
              </div>
              <div className="w-1/3">
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
                />
              </div>
              <div className="w-1/3">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
                >
                  <option value="" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          )}

          {/* Upload Pet Image */}
          <div className="relative w-full mb-4">
            <input
              type="file"
              id="petImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
            />
            {petImage && (
              <img
                src={petImage}
                alt="Pet Preview"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Reason for Donation */}
          <div className="relative w-full mb-4">
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer resize-none"
            ></textarea>
            <label
              htmlFor="description"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Reason to donate
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#6A4D3F] text-white text-lg font-semibold rounded-lg transition duration-200 shadow-md hover:bg-[#5a3c30]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;



// import { useState } from "react";

// const Donate = () => {
//   // Donor Info States
//   const [donorName, setDonorName] = useState("");
//   const [donorEmail, setDonorEmail] = useState("");
//   const [donorAddress, setDonorAddress] = useState("");
//   const [donateReason, setDonateReason] = useState("");

//   // Pet Info States
//   const [category, setCategory] = useState("");
//   const [animalType, setAnimalType] = useState("");
//   const [otherAnimal, setOtherAnimal] = useState(""); // State for 'Other' animal type
//   const [breed, setBreed] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [petName, setPetName] = useState("");
//   const [petImage, setPetImage] = useState(null); // State to store the uploaded image

//   // Validation states
//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");

//   // Handling Donor Name
//   const handleDonorNameChange = (e) => {
//     const value = e.target.value;
//     if (/^[A-Za-z\s]*$/.test(value)) {
//       setDonorName(value);
//       setNameError(""); // Clear error if valid
//     } else {
//       setNameError("Only letters and spaces are allowed");
//     }
//   };

//   // Handling Donor Email
//   const handleDonorEmailChange = (e) => {
//     const value = e.target.value;
//     setDonorEmail(value);

//     // Basic email format validation using regex
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (emailRegex.test(value)) {
//       setEmailError(""); // Clear error if valid
//     } else {
//       setEmailError("Please enter a valid email address");
//     }
//   };

//   // Handle Pet Image Upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setPetImage(URL.createObjectURL(file)); // Create an object URL for the image
//     } else {
//       alert("Please select a valid image file");
//     }
//   };

//   return (
//     <div className="bg-[#EEE9E2] flex flex-col items-center min-h-screen py-8 overflow-y-auto">
//       <h1 className="text-2xl font-bold text-[#6A4D3F] uppercase tracking-wide text-center mb-4 relative top-8">
//         🐾 Donate Your Pet 🐾
//       </h1>
//       <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg relative top-5 overflow-y-auto">
//         <form>
//           {/* Donor Name */}
//           <div className="relative w-full mb-4">
//             <input
//               type="text"
//               id="donorName"
//               name="donorName"
//               value={donorName}
//               onChange={handleDonorNameChange}
//               placeholder=" "
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
//             />
//             <label
//               htmlFor="donorName"
//               className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
//             >
//               Enter Donor Name
//             </label>
//             {nameError && (
//               <p className="text-red-500 text-sm mt-1">{nameError}</p>
//             )}
//           </div>

//           {/* Donor Email */}
//           <div className="relative w-full mb-4">
//             <input
//               type="email"
//               id="donorEmail"
//               name="donorEmail"
//               value={donorEmail}
//               onChange={handleDonorEmailChange}
//               placeholder=" "
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
//             />
//             <label
//               htmlFor="donorEmail"
//               className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
//             >
//               Enter Your Email
//             </label>
//             {emailError && (
//               <p className="text-red-500 text-sm mt-1">{emailError}</p>
//             )}
//           </div>

//           {/* Donor Address */}
//           <div className="relative w-full mb-4">
//             <input
//               type="text"
//               id="donorAddress"
//               name="donorAddress"
//               value={donorAddress}
//               onChange={(e) => setDonorAddress(e.target.value)}
//               placeholder=" "
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
//             />
//             <label
//               htmlFor="donorAddress"
//               className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
//             >
//               Enter your Address
//             </label>
//           </div>

//           {/* Reason for Donation */}
//           <div className="relative w-full mb-4">
//             <textarea
//               id="donateReason"
//               name="donateReason"
//               value={donateReason}
//               onChange={(e) => setDonateReason(e.target.value)}
//               rows="4"
//               placeholder=" "
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer resize-none"
//             ></textarea>
//             <label
//               htmlFor="donateReason"
//               className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
//             >
//               Reason for Donation
//             </label>
//           </div>

//           {/* Pet Name */}
//           <div className="relative w-full mb-4">
//             <input
//               type="text"
//               id="petName"
//               name="petName"
//               value={petName}
//               onChange={(e) => setPetName(e.target.value)}
//               placeholder=" "
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
//             />
//             <label
//               htmlFor="petName"
//               className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
//             >
//               Enter Pet's Name
//             </label>
//           </div>

//           {/* Animal Type Selection */}
//           <div className="relative w-full mb-4">
//             <select
//               id="animalType"
//               name="animalType"
//               value={animalType}
//               onChange={(e) => setAnimalType(e.target.value)}
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
//             >
//               <option value="" disabled selected>
//                 Select an Animal Type
//               </option>
//               <option value="Dog">Dog</option>
//               <option value="Cat">Cat</option>
//               <option value="Bird">Bird</option>
//               <option value="Fish">Fish</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Pet Breed, Age, Gender */}
//           {(animalType === "Dog" || animalType === "Cat" || animalType === "Bird") && (
//             <div className="flex space-x-4 mb-4">
//               <div className="w-1/3">
//                 <input
//                   type="text"
//                   id="breed"
//                   name="breed"
//                   value={breed}
//                   onChange={(e) => setBreed(e.target.value)}
//                   placeholder="Breed"
//                   className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
//                 />
//               </div>
//               <div className="w-1/3">
//                 <input
//                   type="text"
//                   id="age"
//                   name="age"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="Age"
//                   className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
//                 />
//               </div>
//               <div className="w-1/3">
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
//                 >
//                   <option value="" disabled selected>
//                     Gender
//                   </option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Pet Image */}
//           <div className="relative w-full mb-4">
//             <input
//               type="file"
//               id="petImage"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F]"
//             />
//             {petImage && (
//               <img
//                 src={petImage}
//                 alt="Pet Preview"
//                 className="mt-4 w-32 h-32 object-cover rounded"
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-[#6A4D3F] text-white text-lg font-semibold rounded-lg transition duration-200 shadow-md hover:bg-[#5a3c30]"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Donate;
