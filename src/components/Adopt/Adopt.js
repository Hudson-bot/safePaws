import React, { useState } from "react";

const petData = [
  // Dogs
  {
    name: "Rocky",
    age: "2 years",
    gender: "Male",
    breed: "Labrador",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Bella",
    age: "1 year",
    gender: "Female",
    breed: "Labrador",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Max",
    age: "3 years",
    gender: "Male",
    breed: "Beagle",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Lucy",
    age: "2 years",
    gender: "Female",
    breed: "Poodle",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Charlie",
    age: "4 years",
    gender: "Male",
    breed: "Bulldog",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Buddy",
    age: "1 year",
    gender: "Male",
    breed: "Golden Retriever",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Daisy",
    age: "2 years",
    gender: "Female",
    breed: "Boxer",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Luna",
    age: "3 years",
    gender: "Female",
    breed: "German Shepherd",
    category: "Dogs",
    photo: "https://via.placeholder.com/150",
  },

  // Cats
  {
    name: "Whiskers",
    age: "3 years",
    gender: "Male",
    breed: "Persian",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Mittens",
    age: "2 years",
    gender: "Female",
    breed: "Siamese",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Shadow",
    age: "1 year",
    gender: "Male",
    breed: "Maine Coon",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Luna",
    age: "4 years",
    gender: "Female",
    breed: "Bengal",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Oliver",
    age: "3 years",
    gender: "Male",
    breed: "Ragdoll",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Salem",
    age: "2 years",
    gender: "Male",
    breed: "British Shorthair",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Cleo",
    age: "1 year",
    gender: "Female",
    breed: "Abyssinian",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Simba",
    age: "4 years",
    gender: "Male",
    breed: "Sphynx",
    category: "Cats",
    photo: "https://via.placeholder.com/150",
  },

  // Fish
  {
    name: "Goldie",
    age: "1 year",
    gender: "Female",
    breed: "Goldfish",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Nemo",
    age: "2 years",
    gender: "Male",
    breed: "Clownfish",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Bubbles",
    age: "1 year",
    gender: "Female",
    breed: "Betta",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Flipper",
    age: "3 years",
    gender: "Male",
    breed: "Guppy",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Splash",
    age: "6 months",
    gender: "Female",
    breed: "Neon Tetra",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Freddy",
    age: "2 years",
    gender: "Male",
    breed: "Angelfish",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Dory",
    age: "3 years",
    gender: "Female",
    breed: "Blue Tang",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Toby",
    age: "4 years",
    gender: "Male",
    breed: "Discus Fish",
    category: "Fish",
    photo: "https://via.placeholder.com/150",
  },

  // Birds
  {
    name: "Tweety",
    age: "2 years",
    gender: "Male",
    breed: "Canary",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Polly",
    age: "3 years",
    gender: "Female",
    breed: "Parrot",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Chirpy",
    age: "1 year",
    gender: "Male",
    breed: "Cockatiel",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Sunny",
    age: "2 years",
    gender: "Female",
    breed: "Macaw",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Kiwi",
    age: "4 years",
    gender: "Male",
    breed: "Budgie",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Bella",
    age: "3 years",
    gender: "Female",
    breed: "Lovebird",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Oliver",
    age: "2 years",
    gender: "Male",
    breed: "African Grey Parrot",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Rusty",
    age: "5 years",
    gender: "Male",
    breed: "Conure",
    category: "Birds",
    photo: "https://via.placeholder.com/150",
  },
];

const Adopt = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [filters, setFilters] = useState({
    breed: "Any",
    age: "Any",
    gender: "Any",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Handle category selection and reset filters if the category is already selected
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("All"); // Reset to show all categories
      setFilters({ breed: "Any", age: "Any", gender: "Any" }); // Reset filters
    } else {
      setSelectedCategory(category); // Set the new category
    }
  };

  // Handle filter changes
  const handleFilterChange = (e, filterType) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  // Filter pets based on selected category and filters
  const filteredPets = petData.filter(
    (pet) =>
      (selectedCategory === "All" || pet.category === selectedCategory) &&
      (filters.breed === "Any" || pet.breed === filters.breed) &&
      (filters.age === "Any" || pet.age === filters.age) &&
      (filters.gender === "Any" || pet.gender === filters.gender)
  );

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
    // Handle the adoption logic here (e.g., updating state or making an API call)
    console.log(`Adopted ${selectedPet.name}`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F0E6] p-4">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#E6DCCF] p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        {["BREED", "AGE", "GENDER"].map((filter) => (
          <div key={filter} className="mb-4">
            <label className="block text-sm font-medium mb-1">{filter}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleFilterChange(e, filter.toLowerCase())}
            >
              <option>Any</option>
              {filter === "BREED" && (
                <>
                  {/* Breed options here */}
                </>
              )}
              {filter === "AGE" && (
                <>
                  {/* Age options here */}
                </>
              )}
              {filter === "GENDER" && (
                <>
                  <option>Male</option>
                  <option>Female</option>
                </>
              )}
            </select>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Find a friend</h1>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-4">
          {["Dogs", "Cats", "Fish", "Birds"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-gray-700 ${
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
            className={`px-4 py-2 rounded-full text-gray-700 ${
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
        <div className="grid grid-cols-4 gap-4">
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
                  onClick={() => handleAdoptClick(pet)} // Open modal with pet data
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
