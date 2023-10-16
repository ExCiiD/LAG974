import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Accueil from "./pages/Accueil";
import Apropos from "./pages/Apropos";
import Evenements from "./pages/Evenements";
import Equipes from "./pages/Equipes";
import Partenaires from "./pages/Partenaires";
import Contact from "./pages/Contact";
import Roster from "./pages/Roster";
import EventDetails from "./pages/EventDetails";

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
