import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Accessories = ({ loading }) => {
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown state
  const navigate = useNavigate(); // Get navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        // const response = await axios.get(`${process.env.REACT_APP_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id]) {
        updatedCart[id] += 1; // Increment quantity if already in cart
      } else {
        updatedCart[id] = 1; // Add new item with quantity 1
      }
      return updatedCart;
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
    setSelectedCategory(category);
    setShowFavorites(false);
  };

  const showFavoritesView = () => {
    setShowFavorites(true);
    setSelectedCategory("All");
  };

  const handleCartToggle = () => {
    setShowCart(!showCart);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        const priceString = product.price.replace(/[^0-9.-]+/g, ""); // Remove currency symbols
        const price = parseFloat(priceString); // Convert to number
        if (!isNaN(price)) {
          total += price * cart[id]; // Multiply price by quantity in cart
        } else {
          console.error(`Invalid price for product ID ${id}: ${product.price}`);
        }
      } else {
        console.error(`Product with ID ${id} not found.`);
      }
    });
    return total.toFixed(2); // Return total as a string with 2 decimal places
  };

  const filteredProducts = showFavorites
    ? products.filter((product) => favorites.includes(product.id))
    : selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const handlePayment = async () => {
    try {
      const totalAmount = parseFloat(calculateTotal()) * 100; // Convert to paise

      if (totalAmount <= 0) {
        setOverlayMessage("Invalid amount");
        setShowOverlay(true);
        return;
      }

      const orderResponse = await axios.post(
        "http://localhost:3001/api/payment/create-order",
        // `${process.env.REACT_APP_URL}/api/payment/create-order`,
        {
          amount: totalAmount,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }
      );

      const { id, amount } = orderResponse.data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Your Store",
        description: "Purchase Accessories",
        order_id: id,
        handler: async (response) => {
          console.log(response);
          setOverlayMessage(
            "Thank you for your purchase!"
          );
          setShowOverlay(true);
          setCart({}); // Clear the cart

          // Start countdown
          setCountdown(3);
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                navigate("/"); // Navigate to homepage
                return 0; // Stop countdown
              }
              return prev - 1; // Decrement countdown
            });
          }, 1000);
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      setOverlayMessage("Payment failed. Please try again.");
      setShowOverlay(true);
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-[#E8E0D6] min-h-screen p-10">
        {loading && <LinearProgress color="secondary" />}
        <div className="text-center text-xl font-semibold text-gray-600">
          No products are available right now.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E8E0D6] min-h-screen p-10">
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
                    <p>
                      {product.price} x {cart[id]}
                    </p>{" "}
                    {/* Show quantity */}
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
              <p>Total: INR {calculateTotal()}</p> {/* Display total */}
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
                onClick={handlePayment}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for Payment Success/Failure */}
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{overlayMessage}</h2>
            <p className="text-lg">
              Returning to homepage in {countdown} seconds.
            </p>{" "}
            {/* Countdown message */}
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
              onClick={closeOverlay}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessories;