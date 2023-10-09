import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './frontend/components/Navbar';
import Footer from './frontend/components/Footer';

import Accueil from "./frontend/pages/Accueil";
import Apropos from "./frontend/pages/Apropos";
import Evenements from "./frontend/pages/Evenements";
import Equipes from "./frontend/pages/Equipes";
import Partenaires from "./frontend/pages/Partenaires";
import Contact from "./frontend/pages/Contact";
import Roster from "./frontend/pages/Roster";
import EventDetails from "./frontend/pages/EventDetails";

import './App.css';

function App() {
  return (
    <div className="App">
      {/* pages */}
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
