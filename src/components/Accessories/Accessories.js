import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinearProgress, Box } from "@mui/material"; // Make sure LinearProgress is imported

const Accessories = ({ loading }) => {
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products"); // Replace with your backend URL
        setProducts(response.data); // Set the products data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart logic
  const addToCart = (id) => {
    setCart((prevCart) => {
      if (prevCart[id]) {
        return prevCart;
      } else {
        return { ...prevCart, [id]: 1 };
      }
    });
  };

  // Toggle favorite logic
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Category filter logic
  const filterProducts = (category) => {
    setSelectedCategory(category);
    setShowFavorites(false);
  };

  // Show favorite items
  const showFavoritesView = () => {
    setShowFavorites(true);
    setSelectedCategory("All");
  };

  // Cart toggle visibility
  const handleCartToggle = () => {
    setShowCart(!showCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id]; // Remove from cart
      return updatedCart;
    });
  };

  // Calculate total cart price
  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      const product = products.find((p) => p.id === parseInt(id));
      const price = parseFloat(product.price.replace("$", ""));
      total += price;
    });
    return total.toFixed(2);
  };

  // Filter products based on category or favorites
  const filteredProducts = showFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // If there are no products after filtering, show a message
  if (filteredProducts.length === 0) {
    return (
      <div className="bg-[#E8E0D6] min-h-screen p-10">
        {/* Show loader if loading */}
        {loading && <LinearProgress color="secondary" />}
        <div className="text-center text-xl font-semibold text-gray-600">
          No products are available right now.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E8E0D6] min-h-screen p-10">
      {/* Show loader if loading */}
      {loading && <LinearProgress color="secondary" />}
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
            onClick={handleCartToggle}
          >
            My Cart{" "}
            {Object.keys(cart).length > 0 &&
              `(${Object.values(cart).reduce((a, b) => a + b, 0)})`}
          </button>
        </div>
      </div>

      {/* Product grid */}
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
              <p>Total: ${calculateTotal()}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400"
                onClick={handleCartToggle}
              >
                Close
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400"
                onClick={handleCartToggle}
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
