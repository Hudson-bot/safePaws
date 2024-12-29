import React, { useState } from "react";
import './Forgot.css';

const Forgot = () => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.email); 
    };

    return (
        <> 
            <form onSubmit={handleSubmit}>
                <div className="forgot-password"> 
                    <h2>Forgot Password</h2>
                    <label>Email</label><br/>
                    <input
                        type="email" name="email" value={formData.email} onChange={inputHandler}
                    />
                    <button type="submit" disabled={!formData.email}>Submit</button>
                </div>
            </form>
        </>
    );
};

export default Forgot;