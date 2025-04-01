// Importamos React para poder usar JSX en este componente
import React from "react";

// Importamos el archivo de estilos para la página Muro
import '../styles/pagescss/Muro.css';

// Importamos los componentes que se utilizarán en la página de Muro
import BarterByHazelCC from '../components/BarterByHazelCC'; // Componente que muestra el contenido del muro o alguna funcionalidad de intercambio
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Componente que representa la cabecera de la página
import AsideByHazelCC from '../components/AsideByHazelCC'; // Componente que representa la barra lateral
import FooterByHazelCC from '../components/FooterByHazelCC'; // Componente que representa el pie de página
import Main from '../components/Main'; // Importar el nuevo componente Main

// Definimos el componente Muro que organiza la estructura de la página Muro
function Muro() {
  return (
    <div className="muro-grid"> {/* Contenedor principal con diseño de grid */}
      <div className="header"> {/* Cabecera */}
        <HeaderByHazelCC />
      </div>
      <div className="aside"> {/* Barra lateral */}
        <AsideByHazelCC />
      </div>
      <div className="main"> {/* Contenido principal */}
        <Main>
          <BarterByHazelCC /> {/* Contenido del muro */}
        </Main>
      </div>
      <div className="footer"> {/* Pie de página */}
        <FooterByHazelCC />
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Muro;
