import React from 'react';
import '../styles/componentscss/Main.css'; // Importar estilos específicos para el contenedor Main

function Main({ children }) {
  return (
    <main className="main-container">
      {children} {/* Renderiza los componentes específicos de cada página */}
    </main>
  );
}

export default Main;
