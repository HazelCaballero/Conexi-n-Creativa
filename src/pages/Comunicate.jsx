import React from 'react'; // Importamos React para poder trabajar con JSX en este componente
import '../styles/pagescss/Comunicate.css'; // Importamos el archivo CSS que contiene los estilos específicos de esta página
import ContactByHazelCC from '../components/ContactByHazelCC'; // Importamos el componente ContactByHazelCC
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente HeaderByHazelCC
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente AsideByHazelCC
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente FooterByHazelCC
import Main from '../components/Main'; // Importar el nuevo componente Main

// Definimos el componente funcional Comunicate
function Comunicate() {
  return (
    <div> {/* Contenedor principal para la página "Comunicate" */}
     
      <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC */}
      <br /> {/* Salto de línea  */}
      
      <div style={{ display: 'flex', alignItems: 'flex-start' }}> {/* Flex container */}
        <AsideByHazelCC /> {/* Sidebar */}
        <Main>
          <ContactByHazelCC /> {/* Contenido específico de la página */}
        </Main>
      </div>
      <br /> {/* Salto de línea  */}
      
      <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC */}
    </div>
  );
}

// Exportamos el componente para poder usarlo en otras partes de la aplicación
export default Comunicate;
