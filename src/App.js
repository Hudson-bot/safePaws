import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NotFound from "./components/Not Found/NotFound";
import DonateAdopt from "./components/DonateAdopt/DonateAdopt";
import Donate from "./components/Donate/Donate";
import Adopt from "./components/Adopt/Adopt";
import AboutUs from "./components/About/About";
import Services from "./components/Services/Services";
import Contacts from "./components/Contacts/Contacts";
import Auth from "./components/authenticate/Auth";
import Forgot from "./components/authenticate/Forgot";
import Login from "./components/authenticate/login/Login";
import SignUp from "./components/authenticate/signUp/signUp";
import ServicesForm from "./components/Services/ServicesForm";

function App() {
  // Create refs for each section to scroll to
  const homeRef = useRef(null);
  const donateAdoptRef = useRef(null);
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactsRef = useRef(null);

  return (
    <Router>
      {/* Pass refs to Header */}
      <Header
        homeRef={homeRef}
        donateAdoptRef={donateAdoptRef}
        aboutUsRef={aboutUsRef}
        servicesRef={servicesRef}
        contactsRef={contactsRef}
      />

      {/* Main content sections */}
      <Routes>
        {/* Home route */}
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
        {/* Other routes */}
        <Route path="/Donate/adopt" element={<DonateAdopt />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/Adopt" element={<Adopt />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<Contacts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/ServicesForm" element={<ServicesForm />} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
