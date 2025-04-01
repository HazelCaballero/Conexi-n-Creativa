import React from 'react'; // Importamos React para poder utilizar JSX en este componente
import '../styles/pagescss/Home.css'; // Importamos el archivo CSS que contiene los estilos específicos para la página de inicio
import HomeByHazelCC from '../components/HomeByHazelCC'; // Importamos el componente HomeByHazelCC 
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente HeaderByHazelCC
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente AsideByHazelCC
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente FooterByHazelCC 
import SeccionDestacada from '../components/SeccionDestacada'; // Importamos el componente SeccionDestacada
import '../styles/componentscss/SeccionDestacada.css'; // Import styles for SeccionDestacada

// Definimos el componente funcional Home
function Home() {
  return (
    <div className="home-page"> {/* Contenedor principal de la página de inicio */}
      <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC  */}
      <div className="home-content">
        <AsideByHazelCC /> {/* Insertamos el componente AsideByHazelCC  */}
        <div className="main-content">
          <HomeByHazelCC /> {/* Contenido específico de la página */}
          <SeccionDestacada /> {/* Contenido adicional */}
        </div>
      </div>
      <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC */}
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Home;
