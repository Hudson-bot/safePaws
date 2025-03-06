import React, { useState } from 'react';
import "./ServicesForm.css";

const ServicesForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    petName: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        // const response = await fetch(`${process.env.REACT_APP_URL}/send-email`, {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="cont flex flex-wrap mx-auto pt-0">
      <div className="sideBar w-full md:w-5/12">
        <h2 className="Shead text-3xl p-10 pt-15">Services We Offer</h2>
        <p className="Ppara text-xl p-10 pt-0">
          We provide services of in-home pet care, donation, adoption, and
          selling of pet accessories.
        </p>
        <div className="p-10 pt-0 flex items-center">
          <span className="material-symbols-outlined pt-1">call</span>
          <span className="ml-4 pt-0.5">+91 8989899889</span>
        </div>
        <div className="p-10 pt-0 flex items-center">
          <span className="material-symbols-outlined">mail</span>
          <span className="ml-4 pt-0.5">safePaws@gmail.com</span>
        </div>
        <div className="p-10 pt-0 flex items-center">
          <span className="material-symbols-outlined">pin_drop</span>
          <span className="ml-4 pt-0.5">XYZ Street</span>
        </div>
      </div>
      <div className="mainContent w-full md:w-7/12">
        <h2 className="Shead text-3xl p-10">Contact Us</h2>
        <form className="p-10 pt-0" onSubmit={handleSubmit}>
          <div className="relative w-full mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your name
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="email"
              name="email"
              placeholder=""
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              value={formData.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your Email Address
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="mobNumber"
              name="mobileNumber"
              placeholder=""
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              maxLength={10}
              pattern="[0-9]*"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <label
              htmlFor="mobNumber"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your Mobile Number
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="address"
              name="address"
              placeholder=""
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              value={formData.address}
              onChange={handleChange}
            />
            <label
              htmlFor="address"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your Address
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="petName"
              name="petName"
              placeholder=""
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer"
              value={formData.petName}
              onChange={handleChange}
            />
            <label
              htmlFor="petName"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Enter your Pet (Type: Dog/Cat/etc..)
            </label>
          </div>

          <div className="relative w-full mb-4">
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder=" "
              className="w-full p-3 pl-4 pr-4 border border-black bg-[#EEE9E2] text-black rounded focus:outline-none focus:ring-2 focus:ring-[#6A4D3F] peer resize-none"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <label
              htmlFor="description"
              className="absolute left-3 -top-2.5 bg-[#EEE9E2] px-1 text-sm text-[#6A4D3F] transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#6A4D3F]"
            >
              Pet Description
            </label>
          </div>

          <button
            type="submit"
            className="subb w-full py-3 text-white text-lg font-semibold rounded-lg transition duration-200 shadow-md "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServicesForm;