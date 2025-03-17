import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importo el enrutador de React Router.
import Comunicate from "../pages/Comunicate";
import Fundadora from "../pages/Fundadora";
import Galeria from "../pages/Galeria";
import Home from "../pages/Home";
import Inicio from "../pages/Inicio";
import Muro from "../pages/Muro";
import Perfil from "../pages/Perfil";
import Trueque from "../pages/Trueque";

function RountigByHazel() {
  return (
    <div>
  
       <Router>
          <Routes>

           
            <Route path="/Comunicate" element={<Comunicate />} />
            
            <Route path="/Fundadora" element={<Fundadora />} />

            <Route path="/Galeria" element={<Galeria />} />

            <Route path="/Home" element={<Home />} />

            <Route path="/Inicio" element={<Inicio />} />

            <Route path="/Muro" element={<Muro />} />

            <Route path="/Perfil" element={<Perfil />} />

            <Route path="/Trueque" element={<Trueque />} />

          </Routes>
        </Router>
     
    </div>
  )
}

export default RountigByHazel