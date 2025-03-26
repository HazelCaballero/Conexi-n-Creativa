import React from 'react'; // Importa la librería React para crear componentes de React
import './App.css'; // Importa el archivo de estilos CSS de la aplicación
import RoutingByHazel from '../src/routes/RountigByHazel'; // Importa el componente RoutingByHazel que maneja las rutas

// Componente principal de la aplicación
function App() { 
  return ( 
    <> 
      {/* Contenedor principal de la aplicación */}
      <div className='AppContainer'>
        {/* Componente de enrutamiento que maneja las rutas dentro de la aplicación */}
        <RoutingByHazel /> 
      </div> 
    </> 
  ); 
}

export default App; // Exporta el componente App para que pueda ser utilizado en otros archivos
