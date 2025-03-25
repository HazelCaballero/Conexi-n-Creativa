//recuerda terminar los comentarios
import React from "react";// Importamos React para poder usar JSX en este componente
import '../styles/pagescss/Muro.css';// Importamos el archivo de estilos para la página Muro
// Importe los componentes que se utilizarán en la página de Muro
import BarterByHazelCC from '../components/BarterByHazelCC'; 
import HeaderByHazelCC from '../components/HeaderByHazelCC'; 
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC'; 


function Muro() {

  return (
    <div>
      
      <HeaderByHazelCC /> 
      <br /> 
      
      <BarterByHazelCC /> 
      <br /> 
      
      <AsideByHazelCC /> 
      <br />
      
      <FooterByHazelCC /> 
      
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Muro;
