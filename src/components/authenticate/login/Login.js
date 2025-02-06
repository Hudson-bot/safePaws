import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthForm from "../Auth";
import LogoutDropdown from "./LogoutDropdown";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      const isValid = updatedFormData.email && updatedFormData.password;
      setFormValid(isValid);
      return updatedFormData;
    });
  };

  // Handle email/password login
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const googleSignInHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await signInWithPopup(auth, provider);
      localStorage.setItem("email", data.user.email);
      navigate("/"); // Redirect to home page after Google Sign-In
    } catch (error) {
      setError("Error during Google Sign-In. Please try again.");
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logoutHandler = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error("Logout error:", error.message);
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ position: "relative" }}>
          {/* Profile Button with Dropdown */}
          <button onClick={toggleDropdown}>Profile</button>
          {showDropdown && (
            <LogoutDropdown
              onLogout={logoutHandler}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>
      ) : (
        // Login Form
        <AuthForm
          isLoginMode={true}
          formData={formData}
          inputHandler={inputHandler}
          formValid={formValid}
          authSubmitHandler={authSubmitHandler}
          googleSignInHandler={googleSignInHandler}
          switchModeHandler={() => navigate("/signup")}
          error={error}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Login;