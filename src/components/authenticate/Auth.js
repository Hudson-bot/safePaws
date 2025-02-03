import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const AuthForm = ({
  isLoginMode,
  formData,
  inputHandler,
  formValid,
  authSubmitHandler,
  googleSignInHandler,
  switchModeHandler,
}) => {
  return (
    <div className="auth-container">
      <h2>{isLoginMode ? "Welcome to SafePaws" : "Create an Account"}</h2>
      <p>A place to Adopt pets and fill the house with joy.</p>
      <form className="auth-form" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={inputHandler}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={inputHandler}
        />
        <button type="submit" disabled={!formValid}>
          {isLoginMode ? "Login" : "Sign Up"}
        </button>

        {isLoginMode && (
          <div className="forgot-password-container">
            <Link to="/forgot" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
        )}

        <button
          type="button"
          className="auth-switch-button"
          onClick={switchModeHandler}
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className="google-signin-button"
          style={{ backgroundColor: "#357AE8" }}
          onClick={googleSignInHandler}
        >
          Continue {isLoginMode ? "In" : "Up"} with Google
        </button>
      </form>
    </div>
  );
};

export default AuthForm;