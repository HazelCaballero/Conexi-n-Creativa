import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente que protege las rutas privadas
function PrivateRoute({ children }) {
  // Verifica si el usuario está autenticado comprobando si existe el 'idUserSign' en localStorage
  const isAuthenticated = localStorage.getItem('idUserSign');
  
  // Si no está autenticado (si 'isAuthenticated' es null o falso)
  if (!isAuthenticated) {
    // Redirige al usuario a la página de inicio ("/Inicio")
    return <Navigate to="/Inicio" replace />;
  }

  // Si está autenticado, muestra el contenido de la ruta protegida (el contenido de 'children')
  return children;
}

export default PrivateRoute;
