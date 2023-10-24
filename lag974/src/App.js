import { BrowserRouter, Route, Routes } from "react-router-dom";

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

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/a_propos" element={<Apropos />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/evenements/details" element={<EventDetails />} />
          <Route path="/equipes" element={<Equipes />} />
          <Route path="/equipes/roster" element={<Roster />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
