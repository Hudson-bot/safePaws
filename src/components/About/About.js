import React from "react";
import "./AboutUs.css"; // Ensure this file contains the matching CSS

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="text-4xl">About us</h1>
      <div className="about-us-content">
        <div className="about-us-text">
          <p>
            At safePaws, our mission is to rescue and rehabilitate animals of
            all kinds, providing them with the love and care they deserve. We
            believe every animal deserves a second chance, and our dedicated
            team works tirelessly to create a safe environment where these
            vulnerable creatures can thrive and find loving forever homes.
          </p>
          <p>
            In addition to our rescue efforts, we sell high-quality pet
            accessories, with all profits directed towards our animal welfare
            programs. By supporting safePaws, you help us make a meaningful
            impact in the lives of countless animals in need while promoting
            responsible pet ownership in our community.
          </p>
        </div>
        <div className="about-us-image">
          <img src="./images/About_Us_Image.jpg" alt="About Us" />
        </div>
      </div>
      <div className="about-us-cards">
        <div className="card">
          <h3 className="card-title">Main task</h3>
          <p>
            SafePaws rescues and rehabilitates animals in need, promoting
            responsible pet ownership and educating the community about animal
            welfare and care.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Problem</h3>
          <p>
            Neglect and abandonment lead to overcrowded shelters and high
            euthanasia rates, leaving many animals without safe havens or
            adequate care.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Solution</h3>
          <p>
            SafePaws rescues animals and provides essential care, using profits
            from pet accessory sales to support our mission and raise awareness
            about animal welfare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;