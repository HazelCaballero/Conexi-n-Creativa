//recordar terminar de comentar 
import React from 'react'; // Importamos React para poder usar JSX en este componente
import '../styles/pagescss/Inicio.css';// Importamos el archivo de estilos para la página de inicio
import LoginByHazelCC from '../components/LoginByHazelCC'; 
import SignByHazelCC from '../components/SignByHazelCC'; 
import HeaderByHazelCC from '../components/HeaderByHazelCC'; 
import AsideByHazelCC from '../components/AsideByHazelCC'; 
import FooterByHazelCC from '../components/FooterByHazelCC'; 

function Inicio() {
  return (
    <div> {/* Contenedor principal para la estructura de la página */}
      
      <HeaderByHazelCC />
      <br /> 
      
      <AsideByHazelCC /> 
      <br /> 
      
      <LoginByHazelCC /> 
      
      <SignByHazelCC /> 
      
      <br /> 
      
      <FooterByHazelCC /> 
      
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Inicio;
