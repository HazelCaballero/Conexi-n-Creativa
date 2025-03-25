import React from 'react';
import '../styles/componentscss/ContactByHazelCC.css';

function ContactByHazelCC() {

  return (
    <div className="contact-container">
      <section>
        <h2>Historia de Conexión Creativa</h2>
        <p>
          {/* Descripción de la historia y propósito del proyecto Conexión Creativa */}
          Conexión Creativa nació del deseo profundo de su fundadora de crear una comunidad inclusiva y segura para mujeres...
        </p>
      </section>

      <section>
        <h2>Misión</h2>
        <p>
          {/* Descripción de la misión de Conexión Creativa */}
          La misión de Conexión Creativa es crear una plataforma que permita a las mujeres conectarse, compartir conocimientos y experiencias...
        </p>
      </section>

      <section>
        <h2>Visión</h2>
        <p>
          {/* Descripción de la visión de Conexión Creativa */}
          La visión de Conexión Creativa es crear una red global de mujeres interconectadas...
        </p>
      </section>

      <section>
        <h2>Valores</h2>
        <ul>
          {/* Lista de los valores fundamentales del proyecto */}
          <li><strong>Respeto:</strong> Fomentamos el respeto mutuo en todas las interacciones...</li>
          <li><strong>Unión:</strong> Creemos que el trabajo conjunto es esencial...</li>
          <li><strong>Inclusión:</strong> Aceptamos y valoramos la diversidad...</li>
          <li><strong>Creatividad:</strong> Estimulamos la creatividad...</li>
          <li><strong>Educación:</strong> Promovemos el acceso libre a recursos educativos...</li>
          <li><strong>Libertad:</strong> Apoyamos a las mujeres a tomar el control de sus vidas...</li>
        </ul>
      </section>

      <section>
        <h2>Formulario de Contacto</h2>
        <div className="contact-form">
          {/* Formulario donde los usuarios pueden ingresar su nombre, correo, mensaje y si están interesadas en promocionarse */}
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name} // El valor de este campo es el estado 'name'
              onChange={handleChange} // Llamamos a handleChange para actualizar el estado
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email} // El valor de este campo es el estado 'email'
              onChange={handleChange} // Llamamos a handleChange para actualizar el estado
            />
          </label>
          <label>
            Mensaje:
            <textarea
              name="message"
              value={formData.message} // El valor de este campo es el estado 'message'
              onChange={handleChange} // Llamamos a handleChange para actualizar el estado
            />
          </label>
          <label>
            ¿Interesada en promocionarse?
            <input
              type="checkbox"
              name="isInterestedInPromotion"
              checked={formData.isInterestedInPromotion} // El valor de este checkbox es el estado 'isInterestedInPromotion'
              onChange={handleChange} // Llamamos a handleChange para actualizar el estado
            />
          </label>
          <button onClick={handleSubmit}>Enviar</button> {/* Al hacer clic, se llama a handleSubmit para enviar el formulario */}
        </div>
      </section>
    </div>
  );
}

export default ContactByHazelCC;
