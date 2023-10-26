import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
  // Obtenir le chemin actuel de l'URL
  let location = useLocation();

  // Vérifier si l'utilisateur est dans le backoffice
  const isInBackOffice = location.pathname.startsWith("/backoffice");

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
        <Route path="/backoffice" element={<AccueilBack />} />
        <Route path="/backoffice/connection" element={<ConnectionBack />} />
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
