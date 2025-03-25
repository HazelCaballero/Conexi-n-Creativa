// Terminar de comentar
import React, { useState } from 'react';
import '../styles/componentscss/ContactByHazelCC.css';
import ContactoService from '../services/ContactoService'; 
import Swal from 'sweetalert2'; 

function ContactByHazelCC() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    message: '', 
    isInterestedInPromotion: false, 
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, 
      [name]: type === 'checkbox' ? checked : value, 
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página al enviar el formulario
    try {
      // Enviamos los datos del formulario al servidor
      const response = await ContactoService.PostComunicado(formData);
      console.log('Comunicado enviado:', response); 

      // Mostramos un mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu mensaje!',
        text: 'Nos pondremos en contacto contigo pronto.',
      });

      // Limpiamos el formulario después de enviar los datos
      setFormData({
        name: '',
        email: '',
        message: '',
        isInterestedInPromotion: false,
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error); 

      // Mostramos un mensaje de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar el formulario',
        text: 'Hubo un error al enviar tu mensaje. Intenta nuevamente.',
      });
    }
  };

  return (
    <div className="contact-container">
      <section>
        <h2>Historia de Conexión Creativa</h2>
        <p>
          Conexión Creativa nació del deseo profundo de su fundadora de crear una comunidad inclusiva y segura para mujeres...
        </p>
      </section>

      <section>
        <h2>Misión</h2>
        <p>
          La misión de Conexión Creativa es crear una plataforma que permita a las mujeres conectarse, compartir conocimientos y experiencias...
        </p>
      </section>

      <section>
        <h2>Visión</h2>
        <p>
          La visión de Conexión Creativa es crear una red global de mujeres interconectadas...
        </p>
      </section>

      <section>
        <h2>Valores</h2>
        <ul>
          <li><strong>Respeto:</strong> Fomentamos el respeto mutuo en todas las interacciones...</li>
          <li><strong>Unión:</strong> Creemos que el trabajo conjunto es esencial...</li>
          <li><strong>Inclusión:</strong> Aceptamos y valoramos la diversidad...</li>
          <li><strong>Creatividad:</strong> Estimulamos la creatividad...</li>
          <li><strong>Educación:</strong> Promovemos el acceso libre a recursos formativos...</li>
          <li><strong>Libertad:</strong> Apoyamos a las mujeres a tomar el control de sus vidas...</li>
        </ul>
      </section>

      <section>
        <h2>Formulario de Contacto</h2>
        <div className="contact-form">
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name} // El valor de este campo es el estado 'name'
              onChange={handleChange}
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email} // El valor de este campo es el estado 'email'
              onChange={handleChange}
            />
          </label>
          <label>
            Mensaje:
            <textarea
              name="message"
              value={formData.message} // El valor de este campo es el estado 'message'
              onChange={handleChange} 
            />
          </label>
          <label>
            ¿Interesada en promocionarse?
            <input
              type="checkbox"
              name="isInterestedInPromotion"
              checked={formData.isInterestedInPromotion} // El valor de este checkbox es el estado 'isInterestedInPromotion'
              onChange={handleChange} 
            />
          </label>
          <button onClick={handleSubmit}>Enviar</button>
        </div>
      </section>
    </div>
  );
}

export default ContactByHazelCC;
