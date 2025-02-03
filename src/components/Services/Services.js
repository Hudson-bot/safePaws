import React from "react";
import { useNavigate } from 'react-router-dom';
import './services.css'

const Services = () => {

  const navigate = useNavigate();
    return (
      <>
      <div className="service-container">
        <b>Trusted In-home Pet Care</b>
        <p>In home animal service </p>
        <button   onClick={() => navigate('/ServicesForm')} >Book a Meet and Greet</button>
      </div>
      </>
    );
     
   
  };

  export default Services ;