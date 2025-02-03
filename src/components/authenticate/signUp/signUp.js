import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthForm from "../Auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      const isValid = updatedFormData.email && updatedFormData.password && updatedFormData.name;
      setFormValid(isValid);
      return updatedFormData;
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      navigate("/"); // Redirect to home page after sign-up
    } catch (error) {
      console.error("Sign-up error:", error.message);
      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("Invalid email address. Please enter a valid email.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("Email address already in use. Please use a different email.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password is too weak. Please use a stronger password.");
          break;
        default:
          setErrorMessage("An error occurred during sign-up. Please try again.");
          break;
      }
    }
  };

  const googleSignInHandler = () => {
    auth.signOut().then(() => {
      signInWithPopup(auth, provider)
        .then((data) => {
          localStorage.setItem("email", data.user.email);
          navigate("/"); // Redirect to home page after Google sign-in
        })
        .catch((error) => {
          console.error("Error during Google Sign-In:", error);
          setErrorMessage("An error occurred during Google Sign-In. Please try again.");
        });
    });
  };

  return (
    <AuthForm
      isLoginMode={false}
      formData={formData}
      inputHandler={inputHandler}
      formValid={formValid}
      authSubmitHandler={authSubmitHandler}
      googleSignInHandler={googleSignInHandler}
      switchModeHandler={() => navigate("/login")}
      errorMessage={errorMessage} // Pass error message to AuthForm
    />
  );
};

export default SignUp;