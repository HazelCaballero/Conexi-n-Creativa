import React from 'react'; // Importamos React para poder usar JSX en este componente
import HeaderByHazelCC from '../components/HeaderByHazelCC'; // Importamos el componente Header, que probablemente contiene la cabecera de la página
import AsideByHazelCC from '../components/AsideByHazelCC'; // Importamos el componente Aside, que puede ser una barra lateral con opciones de navegación o acciones
import FooterByHazelCC from '../components/FooterByHazelCC'; // Importamos el componente Footer, que contiene el pie de página
import AgregarProducto from '../components/AgregarProducto'; // Importamos el componente AgregarProducto, que se encargará de la funcionalidad para agregar productos
import '../styles/pagescss/AdminTools.css'; // Importamos los estilos específicos para esta página desde un archivo CSS

// Componente funcional AdminTools
function AdminTools() {
  return (
    <div className="admin-tools-grid"> {/* Contenedor principal con una clase CSS que aplica un grid (rejilla) para organizar los elementos en la página */}
      
      <div className="header-container"> {/* Contenedor para el encabezado de la página */}
        <HeaderByHazelCC /> {/* Insertamos el componente HeaderByHazelCC que podría contener la cabecera o menú de navegación */}
      </div>

      <div className="aside-container"> {/* Contenedor para la barra lateral */}
        <AsideByHazelCC /> {/* Insertamos el componente AsideByHazelCC, probablemente una barra lateral con opciones para el administrador */}
      </div>

      <div className="agregar"> {/* Contenedor para el área de agregar productos */}
        <AgregarProducto /> {/* Insertamos el componente AgregarProducto que probablemente contiene el formulario o las herramientas para agregar un nuevo producto */}
      </div>

      <div className="footer-container"> {/* Contenedor para el pie de página */}
        <FooterByHazelCC /> {/* Insertamos el componente FooterByHazelCC que podría contener información adicional, enlaces de contacto, etc. */}
      </div>
    </div>
  );
}

export default AdminTools; // Exportamos el componente AdminTools para poder usarlo en otras partes de la aplicación
