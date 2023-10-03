import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './frontend/components/Navbar';
import Footer from './frontend/components/Footer';
import Accueil from "./frontend/pages/Accueil";
import Apropos from "./frontend/pages/Apropos";
import Evenements from "./frontend/pages/Evenements";
import Equipes from "./frontend/pages/Equipes";
import Partenaires from "./frontend/pages/Partenaires";
import Contact from "./frontend/pages/Contact";
import './App.css';

function App() {
  return (
    <div className="App">
      {/* pages */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/Evenements" element={<Evenements />} />
          <Route path="/Equipes" element={<Equipes />} />
          <Route path="/Partenaires" element={<Partenaires />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
