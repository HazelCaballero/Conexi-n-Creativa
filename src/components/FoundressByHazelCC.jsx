import React from 'react'; // Importamos React para poder crear el componente
import '../styles/componentscss/FoundressByHazelCC.css'; // Importamos los estilos específicos para este componente
import fundadoraImage from '../assets/img/IMG_3426-01.jpeg'; // Importamos la imagen de la fundadora
import { useNavigate } from 'react-router-dom'; // Importamos el hook 'useNavigate' para poder redirigir al usuario a otra página

function FoundressByHazelCC() {
  const navigate = useNavigate(); // Inicializamos el hook 'useNavigate' para manejar la redirección

  // Función para manejar el clic en el botón "Únete a la comunidad"
  const handleJoinCommunity = () => {
    navigate('/Comunicate'); 
  };

  return (
    <div className="foundress-container">
     
      <h1>Hazel Caballero</h1>

     
      <div className="foundress-image-container">
        <img 
          src={fundadoraImage}  
          alt="Hazel Caballero" 
          className="foundress-image" 
        />
      </div>

      
      <p>
        ¡Hola mujer! Qué placer que me leas. Si has llegado aquí es porque deseas conectar con tus oportunidades de desarrollo y tu deseo de una conexión creativa tanto en tu área personal y profesional. Estás en contacto con lo que otras mujeres tienen para ofrecerte en este proceso, y tú puedes aportar a esta maravillosa comunidad.
      </p>
      <p>
        Soy la fundadora de este espacio exclusivo para mujeres, el cual comparte los ideales de mi tienda, un emprendimiento que nace de mi deseo de compartir quién soy con el mundo y mostrar o vender mi arte, mi amor por la fotografía y mi pasión por un mundo donde seamos nosotras mismas.
      </p>

      {/* Sección con el botón de llamada a la acción */}
      <div>
        <button onClick={handleJoinCommunity} className="cta-button">
          ¡Únete a la comunidad! 
        </button>
      </div>
    </div>
  );
}

export default FoundressByHazelCC; 
