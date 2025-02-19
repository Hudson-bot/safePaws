import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthForm from "../Auth";
import LogoutDropdown from "./LogoutDropdown";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formValid, setFormValid] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("User state updated:", currentUser); // Debugging
    });
  
    return () => unsubscribe();
  }, []);
  

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      setFormValid(updatedFormData.email && updatedFormData.password);
      return updatedFormData;
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setUser(auth.currentUser);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleSignInHandler = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await signInWithPopup(auth, provider);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      setError("Error during Google Sign-In. Please try again.");
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setShowDropdown(false);
      navigate("/login");
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div>
{user ? (
  <div style={{ position: "relative" }}>
    <button onClick={() => {
      setShowDropdown((prev) => !prev);
      console.log("Dropdown toggled:", !showDropdown); // Debugging
    }}>
      {user?.displayName ? user.displayName.charAt(0) : "P"}
    </button>
    {showDropdown && (
      <LogoutDropdown onLogout={logoutHandler} onClose={() => setShowDropdown(false)} />
    )}
  </div>
) : (
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