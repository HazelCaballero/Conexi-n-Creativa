// Importamos React para poder usar JSX en este componente
import React from "react";

// Importamos el archivo de estilos para la página Muro
import '../styles/pagescss/Muro.css';

// Importamos los componentes que se utilizarán en la página de Muro
import BarterByHazelCC from '../components/BarterByHazelCC'; // Componente que muestra el contenido del muro o alguna funcionalidad de intercambio
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Componente que representa la cabecera de la página
import AsideByHazelCC from '../components/AsideByHazelCC'; // Componente que representa la barra lateral
import FooterByHazelCC from '../components/FooterByHazelCC'; // Componente que representa el pie de página

// Definimos el componente Muro que organiza la estructura de la página Muro
function Muro() {

  return (
    <div> {/* Contenedor principal para la estructura de la página */}
      
      <HeaderByHazelCC /> {/* Insertamos el componente de cabecera */}
      <br /> {/* Salto de línea para separar las secciones */}
      
      <BarterByHazelCC /> {/* Insertamos el componente que representa el contenido principal del muro */}
      <br /> {/* Salto de línea para separar las secciones */}
      
      <AsideByHazelCC /> {/* Insertamos el componente de la barra lateral */}
      <br /> {/* Salto de línea para separar las secciones */}
      
      <FooterByHazelCC /> {/* Insertamos el componente de pie de página */}
      
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Muro;
