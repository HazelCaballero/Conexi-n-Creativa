import React from 'react'; // Importamos React para poder trabajar con JSX en este componente
import '../styles/pagescss/Fundadora.css'; // Importamos el archivo CSS que contiene los estilos específicos para esta página
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente HeaderByHazelCC
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente AsideByHazelCC
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente FooterByHazelCC 
import FoundressByHazelCC from '../components/FoundressByHazelCC'; // Importamos el componente FoundressByHazelCC

// Definimos el componente funcional Fundadora
function Fundadora() {
  return (
    <div className="fundadora-grid"> {/* Contenedor principal que agrupa todos los elementos de la página en una cuadrícula */}
      
      <div className="header"> {/* Contenedor para el componente de cabecera */}
        <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC  */}
      </div>

      <div className="foundress"> {/* Contenedor para el componente que muestra la información de la fundadora */}
        <FoundressByHazelCC /> {/* Insertamos el componente FoundressByHazelCC  */}
      </div>

      <div className="aside"> {/* Contenedor para la barra lateral */}
        <AsideByHazelCC /> {/* Insertamos el componente AsideByHazelCC */}
      </div>

      <div className="footer"> {/* Contenedor para el pie de página */}
        <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC */}
      </div>

    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Fundadora;
