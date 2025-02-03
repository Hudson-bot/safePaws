import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthForm from "../Auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      const isValid = updatedFormData.email && updatedFormData.password;
      setFormValid(isValid);
      return updatedFormData;
    });
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      console.error("Login error:", error.message);
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
        });
    });
  };

  return (
    <AuthForm
      isLoginMode={true}
      formData={formData}
      inputHandler={inputHandler}
      formValid={formValid}
      authSubmitHandler={authSubmitHandler}
      googleSignInHandler={googleSignInHandler}
      switchModeHandler={() => navigate("/signup")}
    />
  );
};

export default Login;