import React from 'react'; // Importamos React para poder trabajar con JSX en este componente
import '../styles/pagescss/Comunicate.css'; // Importamos el archivo CSS que contiene los estilos específicos de esta página
import ContactByHazelCC from '../components/ContactByHazelCC'; // Importamos el componente ContactByHazelCC
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente HeaderByHazelCC
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente AsideByHazelCC
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente FooterByHazelCC

// Definimos el componente funcional Comunicate
function Comunicate() {
  return (
    <div> {/* Contenedor principal para la página "Comunicate" */}
     
      <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC */}
      <br /> {/* Salto de línea  */}
      
      <AsideByHazelCC /> {/* Insertamos el componente AsideByHazelCC */}
      <br /> {/* Salto de línea  */}
      
      <ContactByHazelCC /> {/* Insertamos el componente ContactByHazelCC*/}
      <br /> {/* Salto de línea  */}
      
      <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC */}
    </div>
  );
}

// Exportamos el componente para poder usarlo en otras partes de la aplicación
export default Comunicate;
