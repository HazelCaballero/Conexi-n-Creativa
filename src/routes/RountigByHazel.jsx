// Importamos React para poder trabajar con JSX
import React from 'react';

// Importamos el enrutador de React Router, para manejar la navegación entre las páginas de la aplicación
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

// Importamos las páginas que utilizaremos en las rutas de la aplicación
import Comunicate from "../pages/Comunicate";  // Página de contacto
import Fundadora from "../pages/Fundadora";    // Página de la fundadora
import Home from "../pages/Home";              // Página de inicio
import Inicio from "../pages/Inicio";          // Página de inicio de sesión
import Muro from "../pages/Muro";              // Página del muro
import Perfil from "../pages/Perfil";          // Página del perfil del usuario
import AdminTools from '../pages/AdminTools'; // Página de herramientas de administración

// Importamos el componente PrivateRoute que protege las rutas que requieren autenticación
import PrivateRoute from '../services/PrivateRoute';

function RountigByHazel() {
  return (
    <div>
      {/* El Router proporciona las rutas para la navegación de la aplicación */}
      <Router>
        {/* Las Routes son las rutas que definen qué página se debe mostrar según la URL */}
        <Routes>
          {/* Redirect from "/" to "/Home" */}
          <Route path="/" element={<Navigate to="/Home" replace />} />
          {/* Cada Route define una URL y el componente que se renderiza cuando esa URL es visitada */}
          <Route path="/Comunicate" element={<Comunicate />} /> {/* Ruta a la página de contacto */}
          <Route path="/Fundadora" element={<Fundadora />} />   {/* Ruta a la página de la fundadora */}
          <Route path="/Home" element={<Home />} />             {/* Ruta a la página de inicio */}
          <Route path="/Inicio" element={<Inicio />} />         {/* Ruta a la página de inicio de sesión */}
          <Route path="/Muro" element={<Muro />} />             {/* Ruta a la página del muro */}
          
          {/* Ruta a la página de perfil, está protegida por PrivateRoute */}
          <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />  {/* Ruta protegida */}
          
          {/* Ruta a la página de herramientas de administración, también protegida */}
          <Route path="/Admin" element={<PrivateRoute><AdminTools /></PrivateRoute>} /> {/* Ruta protegida */}
        </Routes>
      </Router>
    </div>
  );
}

// Exportamos el componente RountigByHazel para que pueda ser utilizado en otros archivos
export default RountigByHazel;
