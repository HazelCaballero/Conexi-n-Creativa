import React from 'react'; // Importamos React para poder crear el componente
import '../styles/componentscss/HomeByHazelCC.css'; // Importamos los estilos específicos para este componente

function HomeByHazelCC() {
  return (
    <div className="home-container">
      {/* Project Information Section */}
      <div className="project-info">
        <h2 className="project-title">Información sobre el proyecto Conexión Creativa</h2>
        <p className="project-description">
          Conexión Creativa es una plataforma digital dedicada a fomentar el intercambio de conocimiento, bienes 
          y servicios entre mujeres de todas partes, mediante un sistema de trueque. Nuestro objetivo es crear una comunidad 
          inclusiva y colaborativa, donde las usuarias puedan aprender, crecer y apoyar a otras mujeres sin necesidad de dinero,
          pero no limitando el uso de este si así se desea.
        </p>
        <p className="project-location">
          <strong>Ubicación:</strong> San José, Costa Rica.
        </p>
        <p className="project-schedule">
          <strong>Horario de Atención:</strong> Lunes a viernes de 9:00 AM a 6:00 PM.
        </p>
        <p className="project-socials">
          <strong>Redes Sociales:</strong> Aun no disponibles.
        </p>
        <p className="project-contact">
          <strong>Contacto:</strong> Puedes comunicarte al correo hazelcaballeroelizondo@gmail.com, o da click  en comunicate que se encuentra en el pie del sitio web.
        </p>
      </div>
    </div>
  );
}

export default HomeByHazelCC; // Exportamos el componente para poder usarlo en otras partes de la aplicación
