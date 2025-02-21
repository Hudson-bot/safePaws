import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NotFound from "./components/Not Found/NotFound";
import DonateAdopt from "./components/DonateAdopt/DonateAdopt";
import AboutUs from "./components/About/About";
import Services from "./components/Services/Services";
import Contacts from "./components/Contacts/Contacts";
import Auth from "./components/authenticate/Auth";
import Forgot from "./components/authenticate/Forgot";
import Login from "./components/authenticate/login/Login";
import SignUp from "./components/authenticate/signUp/signUp";
import ServicesForm from "./components/Services/ServicesForm";
import Adopt from "./components/Adopt/Adopt";
import Donate from "./components/Donate/Donate";
import Accessories from "./components/Accessories/Accessories";

// Import a loading spinner (you can use your own spinner or any UI component library)
import { LinearProgress } from "@mui/material"; // Material UI spinner for simplicity
import Rescue from "./components/rescue/Rescue";

function App() {
  const [loading, setLoading] = useState(true); // Create loading state
  const homeRef = useRef(null);
  const donateAdoptRef = useRef(null);
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactsRef = useRef(null);

  // Simulate a loading process with a timeout (could be API call or other async operations)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  if (loading) {
    // Show a loading spinner while the app is loading
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <Router>
      <Header
        homeRef={homeRef}
        donateAdoptRef={donateAdoptRef}
        aboutUsRef={aboutUsRef}
        servicesRef={servicesRef}
        contactsRef={contactsRef}
      />

      {/* Main content sections */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div ref={homeRef}>
                <Home />
              </div>
              <div ref={donateAdoptRef}>
                <DonateAdopt />
              </div>
              <div ref={aboutUsRef}>
                <AboutUs />
              </div>
              <div ref={servicesRef}>
                <Services />
              </div>
              <div ref={contactsRef}>
                <Contacts />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/Donate/adopt" element={<DonateAdopt />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<Contacts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/ServicesForm" element={<ServicesForm />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
