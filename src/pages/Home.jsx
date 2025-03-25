import React from 'react'; // Importamos React para poder utilizar JSX en este componente
import '../styles/pagescss/Home.css'; // Importamos el archivo CSS que contiene los estilos específicos para la página de inicio
import HomeByHazelCC from '../components/HomeByHazelCC'; // Importamos el componente HomeByHazelCC 
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente HeaderByHazelCC
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente AsideByHazelCC
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente FooterByHazelCC 
import SeccionDestacada from '../components/SeccionDestacada'; // Importamos el componente SeccionDestacada

// Definimos el componente funcional Home
function Home() {
  return (
    <div> {/* Contenedor principal de la página de inicio */}
      
      <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC  */}
      <br /> {/* Salto de línea */}
      
      <AsideByHazelCC /> {/* Insertamos el componente AsideByHazelCC  */}
      <br /> {/* Salto de línea */}
      
      <HomeByHazelCC /> {/* Insertamos el componente HomeByHazelCC*/}
      <br /> {/* Salto de línea */}
      
      <SeccionDestacada /> {/* Insertamos el componente SeccionDestacada*/}
      <br /> {/* Salto de línea  */}
      
      <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC */}
      
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Home;
