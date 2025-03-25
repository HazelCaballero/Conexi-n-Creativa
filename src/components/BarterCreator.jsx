import React, { useState } from "react"; // Importamos React y useState para manejar el estado local del componente
import Swal from "sweetalert2"; // Importamos SweetAlert para mostrar notificaciones emergentes de manera visual
import CallsBarteringsCC from "../services/CallsBarteringsCC"; // Importamos la función para interactuar con la API y realizar acciones sobre los trueques

// Componente principal para crear un nuevo trueque
function BarterCreator({ setBarterings, barterings }) {
  // Declaramos los estados necesarios para capturar la información del trueque
  const [newBarter, setNewBarter] = useState("");  // Estado para el recurso ofrecido en el trueque
  const [resourceRequest, setResourceRequest] = useState("");  // Estado para el recurso solicitado en el trueque
  const [comments, setComments] = useState("");  // Estado para los comentarios adicionales sobre el trueque

  // Función que maneja los cambios en el campo de texto del recurso ofrecido
  const handleInputChange = (event) => {
    setNewBarter(event.target.value);  // Actualiza el estado con el nuevo valor del recurso ofrecido
  };

  // Función que maneja los cambios en el campo de selección del recurso solicitado
  const handleSelectChange = (event) => {
    setResourceRequest(event.target.value);  // Actualiza el estado con el nuevo valor del recurso solicitado
  };

  // Función que maneja los cambios en el área de texto de los comentarios
  const handleCommentsChange = (event) => {
    setComments(event.target.value);  // Actualiza el estado con el nuevo valor de los comentarios
  };

  // Función asíncrona que se ejecuta al hacer clic en el botón "Agregar Trueque"
  const addBarter = async (event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario (recarga de página)

    // Obtenemos el ID y el nombre del usuario desde el almacenamiento local (localStorage)
    const currentUserId = localStorage.getItem("idUserSign");
    const currentUserName = localStorage.getItem("nameUserSign");

    // Si no hay un usuario autenticado, mostramos una alerta de error y salimos de la función
    if (!currentUserId || !currentUserName) {
      Swal.fire({
        icon: "error", // El ícono de la alerta será de error
        title: "Error", // Título de la alerta
        text: "No se encontró un usuario autenticado. Por favor, inicia sesión.", // Mensaje que describe el error
      });
      return; // Salimos de la función si no hay un usuario autenticado
    }

    // Verificamos si el recurso ofrecido y el recurso solicitado son válidos
    if (!newBarter.trim() || !resourceRequest.trim()) {
      Swal.fire({
        icon: "warning", // El ícono de la alerta será de advertencia
        title: "Validación fallida", // Título de la alerta
        text: "Por favor, ingrese texto para el intercambio y seleccione un tipo de clase.", // Mensaje de advertencia
      });
      return; // Salimos de la función si los campos no son válidos
    }

    try {
      // Creamos el objeto con los datos del nuevo trueque que se va a enviar a la API
      const newBarterData = {
        nameB: currentUserName, // Nombre del usuario que crea el trueque
        idUserCreate: currentUserId, // ID del usuario que crea el trueque
        resourceOffered: newBarter, // Recurso que el usuario ofrece
        resourceRequest: resourceRequest || "No especificado", // Recurso que el usuario solicita (por defecto "No especificado" si no se selecciona uno)
        stateB: "pendiente", // El estado del trueque es "pendiente" inicialmente
        commentsB: [{ userComent: currentUserName, comment: comments }], // Comentarios sobre el trueque
      };

      // Enviamos el nuevo trueque a la API para agregarlo a la base de datos
      const newBarterResponse = await CallsBarteringsCC.PostBarterings(newBarterData);

      // Actualizamos la lista de trueques con el nuevo trueque agregado
      const updatedBarterings = [...barterings, newBarterResponse];

      // Sincronizamos la lista de trueques con el almacenamiento local (localStorage)
      localStorage.setItem("barterings", JSON.stringify(updatedBarterings));
      setBarterings(updatedBarterings); // Actualizamos el estado en el componente con la nueva lista de trueques

      // Mostramos una notificación de éxito indicando que el trueque fue agregado correctamente
      Swal.fire({
        icon: "success", // El ícono de la alerta será de éxito
        title: "Trueque agregado", // Título de la alerta
        text: `El intercambio "${newBarter}" ha sido agregado.`, // Mensaje de éxito
      });

      // Limpiamos los campos de entrada después de agregar el trueque
      setNewBarter(""); // Limpiamos el estado del recurso ofrecido
      setResourceRequest(""); // Limpiamos el estado del recurso solicitado
      setComments(""); // Limpiamos el estado de los comentarios
    } catch (error) {
      // Si ocurre un error al agregar el trueque, mostramos una alerta de error
      Swal.fire({
        icon: "error", // El ícono de la alerta será de error
        title: "Error al agregar intercambio", // Título de la alerta
        text: "Hubo un problema al intentar agregar el intercambio. Intenta nuevamente.", // Mensaje de error
      });
    }
  };

  // **Renderizamos la interfaz de usuario (return)**
  return (
    <div>
      <h3>Crear un nuevo trueque</h3> {/* Título principal que indica la acción de crear un nuevo trueque */}
      
      {/* Campo de entrada para el recurso que se ofrece */}
      <input
        type="text" // El tipo de campo es texto
        placeholder="Ejemplo: Clases de Inglés" // Un texto que aparece antes de que el usuario ingrese algo
        value={newBarter} // El valor del campo de texto está vinculado al estado `newBarter`
        onChange={handleInputChange} // Al cambiar el valor del campo, se ejecuta `handleInputChange`
      />

      {/* Menú desplegable para seleccionar el recurso solicitado */}
      <select value={resourceRequest} onChange={handleSelectChange}> {/* Menú desplegable que se llena con opciones */}
        <option value="">Seleccione una opción</option> {/* Opción por defecto cuando no se selecciona nada */}
        <option value="practico">Práctica</option> {/* Opción de tipo de recurso: Práctica */}
        <option value="teorico">Teórica</option> {/* Opción de tipo de recurso: Teórica */}
        <option value="otro">Otro</option> {/* Opción de tipo de recurso: Otro */}
      </select>

      {/* Área de texto para ingresar comentarios adicionales */}
      <textarea
        placeholder="Comentarios" // Un texto que aparece antes de que el usuario ingrese algo
        value={comments} // El valor del área de texto está vinculado al estado `comments`
        onChange={handleCommentsChange} // Al cambiar el valor del área de texto, se ejecuta `handleCommentsChange`
      />

      {/* Botón para agregar el nuevo trueque */}
      <button onClick={addBarter}>Agregar Trueque</button> {/* Al hacer clic, se ejecuta `addBarter` para agregar el trueque */}
    </div>
  );
}

export default BarterCreator; // Exportamos el componente para poder usarlo en otras partes de la aplicación
