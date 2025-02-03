import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "./config"; // Import auth and sendPasswordResetEmail
import './Forgot.css';

const Forgot = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [message, setMessage] = useState("");

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = formData;

        try {
            await sendPasswordResetEmail(auth, email); // Use sendPasswordResetEmail
            setMessage("Password reset email sent. Please check your inbox.");
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            setMessage("Failed to send password reset email. Please check the email address.");
        }
    };

    return (
        <> 
            <form onSubmit={handleSubmit}>
                <div className="forgot-password"> 
                    <h2>Forgot Password</h2>
                    <label>Email</label><br/>
                    <input
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={inputHandler}
                        required
                    />
                    <button type="submit" disabled={!formData.email}>Submit</button>
                    {message && <p className="message">{message}</p>}
                </div>
            </form>
        </>
    );
};

export default Forgot;