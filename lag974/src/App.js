import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

//composants 
import Navbar from './frontend/frontoffice/components/Navbar.js';
import Footer from './frontend/frontoffice/components/Footer.js';

//pages front office
import Accueil from "./frontend/frontoffice/pages/Accueil.js";
import Apropos from "./frontend/frontoffice/pages/Apropos.js";
import Evenements from "./frontend/frontoffice/pages/Evenements.js";
import Equipes from "./frontend/frontoffice/pages/Equipes.js";
import Partenaires from "./frontend/frontoffice/pages/Partenaires.js";
import Contact from "./frontend/frontoffice/pages/Contact.js";
import Roster from "./frontend/frontoffice/pages/Roster.js";
import EventDetails from "./frontend/frontoffice/pages/EventDetails.js";

//pages back office
import AccueilBack from "./frontend/backoffice/pages/AccueilBack.js";
import ConnectionBack from "./frontend/backoffice/pages/ConnectionBack.js";

import './App.css';


function MainRoutes() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Effect is running');

    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
    setIsLoading(false);
  }, []);

  // Obtenir le chemin actuel de l'URL
  let location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est dans le backoffice
  const isInBackOffice = location.pathname.startsWith("/backoffice");


  function decodeJWT(token) {
    try {
      // Split the token into header, payload, and signature
      const [headerEncoded, payloadEncoded] = token.split('.');

      // Base64Url decode the payload
      const payloadDecoded = atob(payloadEncoded.replace('-', '+').replace('_', '/'));

      return JSON.parse(payloadDecoded);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  function isTokenExpired(token) {
    const decoded = decodeJWT(token);
    if (!decoded) return true; // Consider the token as expired if we failed to decode it

    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTimestamp;
  }


  return (
    <div className="App">
      {!isInBackOffice && <Navbar />}
      <Routes>
        {/* front office */}
        <Route path="/" element={<Accueil />} />
        <Route path="/a_propos" element={<Apropos />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/evenements/details" element={<EventDetails />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/equipes/roster" element={<Roster />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/contact" element={<Contact />} />
        {/* back office */}
        <Route path="/backoffice" element={isLoading ? <div>Loading...</div> : (isLoggedIn ? <AccueilBack /> : <Navigate to="/backoffice/login" replace />)} />
        <Route path="/backoffice/login" element={<ConnectionBack />} />
      </Routes>
      {!isInBackOffice && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
