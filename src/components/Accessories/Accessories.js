import React, { useState } from "react";

const Accessories = () => {
  const [cart, setCart] = useState({}); // Change cart to an object
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false); // State to control cart overlay visibility

  const products = [
    {
      id: 1,
      name: "Dog Collar",
      price: "$10",
      category: "Dogs",
      newArrival: true,
    },
    {
      id: 2,
      name: "Cat Toy",
      price: "$14",
      category: "Cats",
      newArrival: true,
    },
    {
      id: 3,
      name: "Fish Tank",
      price: "$9",
      category: "Fish",
      newArrival: false,
    },
    {
      id: 4,
      name: "Bird Cage",
      price: "$14",
      category: "Birds",
      newArrival: false,
    },
    {
      id: 5,
      name: "Dog Bed",
      price: "$5",
      category: "Dogs",
      newArrival: false,
    },
    {
      id: 6,
      name: "Cat Tree",
      price: "$999",
      category: "Cats",
      newArrival: false,
    },
    {
      id: 7,
      name: "Grooming Kit",
      price: "$14",
      category: "Dogs",
      newArrival: false,
    },
    {
      id: 8,
      name: "Automatic Feeder",
      price: "$999",
      category: "Cats",
      newArrival: false,
    },
  ];

  const addToCart = (id) => {
    setCart((prevCart) => {
      if (prevCart[id]) {
        return prevCart;
      } else {
        return { ...prevCart, [id]: 1 };
      }
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const filterProducts = (category) => {
    if (category === "All") {
      setSelectedCategory("All");
      setShowFavorites(false);
    } else {
      setSelectedCategory(category);
      setShowFavorites(false);
    }
  };

  const showFavoritesView = () => {
    setShowFavorites(true);
    setSelectedCategory("All");
  };

  const handleCartToggle = () => {
    setShowCart(!showCart); // Toggle the visibility of the cart overlay
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id]; // Remove item from the cart
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      const product = products.find((p) => p.id === parseInt(id));
      const price = parseFloat(product.price.replace("$", ""));
      total += price;
    });
    return total.toFixed(2); // Format the total to two decimal places
  };

  const filteredProducts = showFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-[#E8E0D6] min-h-screen p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brown-700">Accessories</h1>
        <div className="flex space-x-3">
          {["All", "Dogs", "Cats", "Fish", "Birds"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg hover:bg-gray-400 ${
                selectedCategory === category ? "bg-gray-400" : "bg-gray-300"
              }`}
              onClick={() => filterProducts(category)}
            >
              {category}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={showFavoritesView}
          >
            My Favorites
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={handleCartToggle} // Toggle the cart overlay
          >
            My Cart{" "}
            {Object.keys(cart).length > 0 &&
              `(${Object.values(cart).reduce((a, b) => a + b, 0)})`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden p-4"
          >
            <div className="relative bg-gray-300 h-40 rounded-lg">
              {product.newArrival && (
                <span className="absolute top-2 left-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                  New arrivals
                </span>
              )}
              <span
                className="absolute top-2 right-2 text-gray-600 text-xl cursor-pointer"
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? " ♥" : "♡"}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-700">{product.price}</p>
              <button
                className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => addToCart(product.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Overlay */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {Object.keys(cart).length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              Object.keys(cart).map((id) => {
                const product = products.find((p) => p.id === parseInt(id));
                return (
                  <div key={id} className="flex items-center mb-2">
                    <p className="flex-1">{product.name}</p>
                    <p>{product.price}</p>
                    <button
                      className="text-red-500 text-xl ml-2"
                      onClick={() => removeFromCart(id)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            )}
            <div className="mt-4 text-lg font-semibold">
              <p>Total: ${calculateTotal()}</p> {/* Display the total */}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400"
                onClick={handleCartToggle} // Close the cart overlay
              >
                Close
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400"
                onClick={handleCartToggle} // Placeholder for Checkout functionality
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;
