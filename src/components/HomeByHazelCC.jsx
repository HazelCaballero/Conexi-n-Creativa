import React from 'react'; // Importamos React para poder crear el componente
import '../styles/componentscss/HomeByHazelCC.css'; // Importamos los estilos específicos para este componente

function HomeByHazelCC() {
  // Este componente no tiene lógica compleja, sólo renderiza el contenido HTML dentro de un div
  return (
    <div>
      {/* Sección que destacará los productos, servicios o promociones especiales */}
      <div>
        <h2>Información sobre el proyecto Conexión Creativa</h2>
        
        {/* Descripción general del proyecto */}
        <p>
          {/* Descripción breve del propósito de la plataforma */}
          Conexión Creativa es una plataforma digital dedicada a fomentar el intercambio de conocimiento, bienes 
          y servicios entre mujeres de todas partes, mediante un sistema de trueque. Nuestro objetivo es crear una comunidad 
          inclusiva y colaborativa, donde las usuarias puedan aprender, crecer y apoyar a otras mujeres sin necesidad de dinero,
          pero no limitando el uso de este si así se desea. <br />

          {/* Información sobre la ubicación del proyecto */}
          Ubicación: San José, Costa Rica. <br />

          {/* Horario de atención para que las usuarias sepan cuándo pueden acceder a la plataforma o a servicios */}
          Horario de Atención: Lunes a viernes de 9:00 AM a 6:00 PM . <br />

          {/* Enlaces a las redes sociales donde las usuarias pueden seguir al proyecto */}
          Redes Sociales: Incluir enlaces a perfiles de redes sociales donde las usuarias puedan seguirme y estar 
          al tanto de nuevas publicaciones o eventos. <br />

          {/* Información de contacto para resolver dudas o consultas */}
          Contacto: Incluir página de contacto o correo electrónico, o descripción de cómo las usuarias 
          pueden contactarme para dudas o consultas. 
        </p>
      </div>
    </div>
  );
}

export default HomeByHazelCC; // Exportamos el componente para poder usarlo en otras partes de la aplicación
