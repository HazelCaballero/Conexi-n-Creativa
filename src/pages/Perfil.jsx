// Importamos React para poder usar JSX en este componente
import React from 'react'

// Importamos el archivo de estilos específico para la página Perfil
import '../styles/pagescss/Perfil.css'

// Importamos los componentes que se utilizarán en la página de perfil
import ProfileByHazelCC from '../components/ProfileByHazelCC';  // Componente que muestra el perfil del usuario
import HeaderByHazelCC from '../components/HeaderByHazelCC';  // Componente que representa la cabecera de la página
import AsideByHazelCC from '../components/AsideByHazelCC';  // Componente que representa la barra lateral
import FooterByHazelCC from '../components/FooterByHazelCC';  // Componente que representa el pie de página

// Definimos el componente Perfil, que organiza la estructura de la página de perfil del usuario
function Perfil() {
  return (
    <div> {/* Contenedor principal de la página Perfil */}
      
      {/* Insertamos el componente de cabecera */}
      <HeaderByHazelCC /> <br /> 
      
      {/* Insertamos el componente que representa el perfil del usuario */}
      <ProfileByHazelCC /> <br /> 
      
      {/* Insertamos el componente de la barra lateral */}
      <AsideByHazelCC /> <br />
      
      {/* Insertamos el componente de pie de página */}
      <FooterByHazelCC />
      
    </div>
  )
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Perfil;
