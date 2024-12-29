import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Auth.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formValid, setFormValid] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      const isValid = updatedFormData.email && updatedFormData.password;
      if (!isLoginMode && updatedFormData.name) {
        setFormValid(isValid);
      } else {
        setFormValid(isValid);
      }
      return updatedFormData;
    });
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-container">
      <h2>{isLoginMode ? 'Welcome to SafePaws' : 'Create an Account'}</h2>
      <p>A place to Adopt pets and fill the house with joy.</p>
      <form className="auth-form" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <>
            <label>Name</label>
            <input
              type="text" name="name" value={formData.name} onChange={inputHandler}
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email" name="email" value={formData.email} onChange={inputHandler}
        />
        <label>Password</label>
        <input
          type="password" name="password" value={formData.password} onChange={inputHandler}
        />
        <button type="submit" disabled={!formValid}>
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
        
        
        {isLoginMode && (
          <div className="forgot-password-container">
            <Link to="/forgot" className="forgot-password-link">Forgot Password?</Link>
          </div>
        )}

          <button type="button" className="auth-switch-button" onClick={switchModeHandler}>
            {isLoginMode ? 'Sign Up': 'Login'}
          </button>

      </form>
    </div>
  );
};

export default Auth;