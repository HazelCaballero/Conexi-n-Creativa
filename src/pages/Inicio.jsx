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
import Main from '../components/Main'; // Importar el nuevo componente Main

// Definimos el componente Inicio que organiza la estructura de la página de inicio
function Inicio() {
  return (
    <div className="inicio-grid"> {/* Contenedor principal con diseño de grid */}
      <div className="header"> {/* Cabecera */}
        <HeaderByHazelCC />
      </div>
      <div className="aside"> {/* Barra lateral */}
        <AsideByHazelCC />
      </div>
      <div className="main"> {/* Contenido principal */}
        <div className="form-container">
          <div className="form-section">
            <LoginByHazelCC /> {/* Login */}
          </div>
          <div className="form-section">
            <SignByHazelCC /> {/* Registro */}
          </div>
        </div>
      </div>
      <div className="footer"> {/* Pie de página */}
        <FooterByHazelCC />
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Inicio;
