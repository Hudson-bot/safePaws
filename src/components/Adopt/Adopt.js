import React, { useState, useEffect } from "react";

// const API_URL = process.env.REACT_APP_URL;
// const API_URL = "http://localhost:3001/pets";
const API_URL = "https://safepawsbackend.onrender.com/pets";

const Adopt = () => {
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({
    breed: "Any",
    age: "Any",
    gender: "Any",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pet data from the backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // Get the response as text
        try {
          const data = JSON.parse(text); // Try to parse it as JSON
          console.log("Fetched pets:", data);
          setPets(data);
        } catch (error) {
          console.error("Response is not valid JSON:", text); // Log the invalid response
          setPets([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
        setPets([]); // Fallback to an empty array
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      setFilters({ breed: "Any", age: "Any", gender: "Any" });
    } else {
      setSelectedCategory(category);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e, filterType) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  // Filter pets based on selected category and filters
  const filteredPets = pets.filter(
    (pet) =>
      (selectedCategory === "All" || pet.category === selectedCategory) &&
      (filters.breed === "Any" || pet.breed === filters.breed) &&
      (filters.age === "Any" || pet.age === filters.age) &&
      (filters.gender === "Any" || pet.gender === filters.gender)
  );

  console.log("Filtered pets:", filteredPets); // Debugging

  // Open the modal with selected pet data
  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  // Confirm adoption
  const handleConfirmAdopt = () => {
    console.log(`Adopted ${selectedPet.name}`);
    setIsModalOpen(false);
    alert(`Thank you for adopting ${selectedPet.name}!`);
  };

  if (isLoading) {
    return <p>Loading pets...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F0E6] p-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-[#E6DCCF] p-4 rounded-lg mb-4 md:mb-0 md:mr-4">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        {["BREED", "AGE", "GENDER"].map((filter) => (
          <div key={filter} className="mb-4">
            <label className="block text-sm font-medium mb-1">{filter}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleFilterChange(e, filter.toLowerCase())}
            >
              <option>Any</option>
              {filter === "BREED" &&
                [...new Set(pets.map((pet) => pet.breed))].map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              {filter === "AGE" &&
                [...new Set(pets.map((pet) => pet.age))].map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              {filter === "GENDER" && (
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </>
              )}
            </select>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl font-bold mb-4">Find a friend</h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap space-x-2 md:space-x-4 mb-4">
          {["Dogs", "Cats", "Fish", "Birds"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-gray-700 mb-2 md:mb-0 ${
                selectedCategory === category
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
          <button
            className={`px-4 py-2 rounded-full text-gray-700 mb-2 md:mb-0 ${
              selectedCategory === "All"
                ? "bg-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleCategorySelect("All")}
          >
            All
          </button>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-bold">{pet.name}</h2>
                <p className="text-sm text-gray-500">
                  {pet.age}, {pet.gender}
                </p>
                <button
                  className="mt-2 w-full bg-[#704214] text-white p-2 rounded-lg"
                  onClick={() => handleAdoptClick(pet)}
                >
                  Adopt
                </button>
              </div>
            ))
          ) : (
            <p>No pets match your filters.</p>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to adopt {selectedPet.name}?
            </h2>
            <p className="mb-4">
              Age: {selectedPet.age}
              <br />
              Gender: {selectedPet.gender}
              <br />
              Category: {selectedPet.category}
            </p>
            <img
              src={selectedPet.photo}
              alt={selectedPet.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleConfirmAdopt}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adopt;
