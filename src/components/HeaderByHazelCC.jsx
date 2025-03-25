import React from 'react'; // Importamos React para crear el componente
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para manejar la navegación entre páginas
import '../styles/componentscss/HeaderByHazelCC.css'; // Importamos el archivo CSS para los estilos del encabezado
import logo from '../assets/icons/conexioncreativa/conexion_creativa-removebg-preview.png'; // Importamos el logo de la aplicación

function HeaderByHazelCC() {
  const navigate = useNavigate();  // Inicializamos el hook 'useNavigate' para poder navegar a diferentes rutas

  // Función para manejar la navegación
  const handleNavigation = (route) => {
    navigate(route);  // Redirige a la ruta indicada por 'route' cuando se llama
  };

  return (
    <div>
      <header>
        {/* Contenedor del logo */}
        <div>
          <img 
            src={logo}  // Establece la fuente de la imagen del logo
            alt="conexioncreativa"  // Descripción alternativa para la imagen (para accesibilidad)
            className="small-image"  // Aplica la clase de estilo para la imagen (tamaño y posicionamiento)
          />
        </div>
        
        {/* Contenedor de la barra de navegación */}
        <nav>
          <ul>
            {/* Enlaces de navegación que usan 'onClick' para cambiar la ruta */}
            <li onClick={() => handleNavigation('/Home')}>Hogar</li>  {/* Redirige al Home */}
            <li onClick={() => handleNavigation('/Inicio')}>Inicio</li>  {/* Redirige a Inicio */}
            <li>Tienda</li>  {/* Enlace sin funcionalidad, solo texto */}
            <li onClick={() => handleNavigation('/Perfil')}>Perfil</li>  {/* Redirige al Perfil */}
            <li>Quienes somos</li>  {/* Enlace sin funcionalidad, solo texto */}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default HeaderByHazelCC;  // Exportamos el componente para usarlo en otras partes de la aplicación
