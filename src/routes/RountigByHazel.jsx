import React from 'react';// Importamos React para poder trabajar con JSX
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importamos el enrutador de React Router, para manejar la navegación entre las páginas de la aplicación
import Comunicate from "../pages/Comunicate";  // Página de contacto
import Fundadora from "../pages/Fundadora";    // Página de la fundadora
import Home from "../pages/Home";              // Página de inicio
import Inicio from "../pages/Inicio";          // Página de inicio de sesión
import Muro from "../pages/Muro";              // Página del muro


function RountigByHazel() {
  return (
    <div>
      {/* El Router proporciona las rutas para la navegación de la aplicación */}
      <Router>
        {/* Las Routes son las rutas que definen qué página se debe mostrar según la URL */}
        <Routes>
          {/* Cada Route define una URL y el componente que se renderiza cuando esa URL es visitada */}
          <Route path="/Comunicate" element={<Comunicate />} /> {/* Ruta a la página de contacto */}
          <Route path="/Fundadora" element={<Fundadora />} />   {/* Ruta a la página de la fundadora */}
          <Route path="/Home" element={<Home />} />             {/* Ruta a la página de inicio */}
          <Route path="/Inicio" element={<Inicio />} />         {/* Ruta a la página de inicio de sesión */}
          <Route path="/Muro" element={<Muro />} />             {/* Ruta a la página del muro */}
        </Routes>
      </Router>
    </div>
  );
}

// Exportamos el componente RountigByHazel para que pueda ser utilizado en otros archivos
export default RountigByHazel;
