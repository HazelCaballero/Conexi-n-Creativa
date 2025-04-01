import React from 'react'; // Importamos React para poder usar JSX y las funcionalidades de React
import { useNavigate } from 'react-router-dom';  // Importamos 'useNavigate' de 'react-router-dom' para realizar la navegación entre rutas de la aplicación
import '../styles/componentscss/AsideByHazelCC.css'; // Importamos el archivo CSS para aplicar los estilos al componente

function AsideByHazelCC() {
  // Inicializamos 'navigate' con el hook 'useNavigate', que nos permite navegar a diferentes rutas dentro de la aplicación
  const navigate = useNavigate();

  // Esta función maneja la navegación a las diferentes rutas, dependiendo del enlace que el usuario haga clic
  const handleNavigation = (route) => {
    // Usamos 'navigate' con la ruta que se pasa como argumento, lo que provoca que el navegador redirija a esa ruta
    navigate(route);  // 'route' es el parámetro que representa la ruta a la que queremos redirigir al usuario
  };

  return (
    <div> {/* El contenedor principal del componente */}
      <aside> {/* Etiqueta 'aside' que se usa para definir contenido adicional, en este caso, la barra lateral */}
        <ul className="aside-list"> {/* Lista desordenada (ul) que contiene los enlaces de navegación */}
          {/* Cada 'li' es un ítem dentro de la lista que representa un enlace a una ruta específica */}
          <li onClick={() => handleNavigation('/Muro')}>Muro</li> 
          {/* Este 'li' representa un enlace a la página del Muro de Trueques. Al hacer clic en este ítem, se ejecuta 'handleNavigation' con la ruta '/Muro'. */}
          <li onClick={() => handleNavigation('/Fundadora')}>Fundadora</li> 
          {/* Este 'li' representa un enlace a la página 'Fundadora'. Se ejecuta 'handleNavigation' con la ruta '/Fundadora'. */}
          <li onClick={() => handleNavigation('/Admin')}>AdminTools</li> 
          {/* Este 'li' representa un enlace a la página 'AdminTools'. Al hacer clic, ejecuta 'handleNavigation' con la ruta '/Admin'. */}
        </ul>
      </aside> {/* Cierra la etiqueta 'aside', que contiene la lista de enlaces */}
    </div>
  );
}

export default AsideByHazelCC;  // Exportamos el componente 'AsideByHazelCC' para poder usarlo en otras partes de la aplicación
