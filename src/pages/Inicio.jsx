// Importamos React para poder usar JSX en este componente
import React from 'react'; 

// Importamos el archivo de estilos para la página de inicio
import '../styles/pagescss/Inicio.css';

// Importamos los componentes que se usarán en la página de inicio
import LoginByHazelCC from '../components/LoginByHazelCC'; // Componente que representa el formulario de inicio de sesión
import SignByHazelCC from '../components/SignByHazelCC'; // Componente que representa el formulario de registro
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Componente que representa la cabecera de la página
import AsideByHazelCC from '../components/AsideByHazelCC'; // Componente que representa la barra lateral
import FooterByHazelCC from '../components/FooterByHazelCC'; // Componente que representa el pie de página

// Definimos el componente Inicio que organiza la estructura de la página de inicio
function Inicio() {
  return (
    <div> {/* Contenedor principal para la estructura de la página */}
      
      <HeaderByHazelCC /> {/* Insertamos el componente de cabecera */}
      <br /> {/* Salto de línea para separar las secciones */}
      
      <AsideByHazelCC /> {/* Insertamos el componente de la barra lateral */}
      <br /> {/* Salto de línea para separar las secciones */}
      
      <LoginByHazelCC /> {/* Insertamos el componente que contiene el formulario de inicio de sesión */}
      
      <SignByHazelCC /> {/* Insertamos el componente que contiene el formulario de registro */}
      
      <br /> {/* Salto de línea para separar las secciones */}
      
      <FooterByHazelCC /> {/* Insertamos el componente de pie de página */}
      
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Inicio;
