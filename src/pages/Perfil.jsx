import React from 'react';
import '../styles/pagescss/Perfil.css'; // Importamos los estilos específicos para la página Perfil
import HeaderByHazelCC from '../components/HeaderByHazelCC';
import AsideByHazelCC from '../components/AsideByHazelCC';
import FooterByHazelCC from '../components/FooterByHazelCC';
import ProfileByHazelCC from '../components/ProfileByHazelCC';
import UserBarters from '../components/UserBarters'; // Importamos el nuevo componente

function Perfil() {
  return (
    <div className="perfil-page"> {/* Contenedor principal de la página Perfil */}
      <HeaderByHazelCC /> {/* Cabecera */}
      <div className="perfil-content">
        <AsideByHazelCC /> {/* Barra lateral */}
        <div className="main-content">
          <div className="profile-section"> {/* Contenedor para diseño de dos columnas */}
            <ProfileByHazelCC /> {/* Contenido principal del perfil */}
            <UserBarters /> {/* Contenido de los trueques del usuario */}
          </div>
        </div>
      </div>
      <FooterByHazelCC /> {/* Pie de página */}
    </div>
  );
}

export default Perfil;
