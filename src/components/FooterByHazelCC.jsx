import React from 'react';  // Importamos React para crear el componente
import { useNavigate } from 'react-router-dom';  // Importamos el hook 'useNavigate' para navegar entre rutas
import '../styles/componentscss/FooterByHazelCC.css';  // Importamos el archivo CSS para los estilos del pie de página

function FooterByHazelCC() {
  const navigate = useNavigate();  // Inicializamos el hook 'useNavigate' para poder navegar entre las páginas

  // Funciones para navegar a las rutas específicas cuando se haga clic en los botones
  const navigateToComunicate = () => {
    navigate('/Comunicate');  // Redirige a la página "Comunicate"
  };

  const navigateToRecursos = () => {
    navigate('/Recursos');  // Redirige a la página "Recursos utilizados"
  };

  return (
    <div>
      <footer>
        {/* Contenedor para los elementos del pie de página */}
        <div className="footer-item">Derechos reservados 2025</div>  {/* Texto que indica los derechos reservados */}
        
        {/* Contenedor para el botón "Comunicate" que navega a la página de contacto */}
        <div className="footer-item">
          <button onClick={navigateToComunicate}>Comunicate</button>  {/* Al hacer clic, navega a la página de contacto */}
        </div>
        
        {/* Contenedor para el botón "Recursos utilizados" que aún no tiene una ruta asociada */}
        <div className="footer-item">
          <button onClick={navigateToRecursos}>Recursos utilizados</button>  {/* Al hacer clic, navega a la página de recursos (asegurarse que la ruta exista) */}
        </div>
      </footer>
    </div>
  );
}

export default FooterByHazelCC;  // Exportamos el componente para usarlo en otras partes de la aplicación
