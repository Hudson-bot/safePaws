import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import NotFound from './components/Not Found/NotFound'; // Ensure this path is correct
import DonateAdopt from './components/DonateAdopt/DonateAdopt';
import Donate from './components/Donate/Donate';
import Adopt from './components/Adopt/Adopt';
import AboutUs from './components/About/About';
import Services from './components/Services/Services';
import Contacts from './components/Contacts/Contacts';
import Auth from './components/authenticate/Auth';
import Forgot from './components/authenticate/Forgot';


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>} /> {/* Changed from About to Home */}
        <Route path="/Donate/adopt" element={<DonateAdopt/>} />
        <Route path="/Donate" element={<Donate/>} />
        <Route path="/Adopt" element={<Adopt/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contactUs" element={<Contacts/>} />
        <Route path="/authenticate" element={<Auth/>} />
        <Route path="/forgot" element={<Forgot/>} />

        <Route path="*" element={<NotFound />} /> {/* Catch-all route for NotFound */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
