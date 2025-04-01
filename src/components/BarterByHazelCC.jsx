import React, { useEffect, useState } from "react"; // Importamos React y los hooks useState y useEffect
import Swal from "sweetalert2"; // Importamos SweetAlert para mostrar mensajes emergentes
import CallsBarteringsCC from "../services/CallsBarteringsCC"; // Importamos las funciones para interactuar con la API de trueques
import BarterCreator from './BarterCreator'; // Componente para crear nuevos trueques
import "../styles/componentscss/BarterByHazelCC.css"; // Importar los estilos

// Componente principal para mostrar los trueques y permitir su edición y eliminación
function BarterByHazelCC() {
  // Definimos varios estados que usarán para manejar la información en la interfaz de usuario
  const [barterings, setBarterings] = useState([]); // Lista de trueques
  const [loading, setLoading] = useState(true); // Indicador para saber si los trueques están siendo cargados

  // useEffect se ejecuta una vez cuando el componente se monta y cuando las dependencias cambian
  useEffect(() => {
    async function fetchBarterings() {
      // Obtenemos el ID del usuario autenticado desde el almacenamiento local
      const currentUserId = localStorage.getItem("idUserSign");

      // Si no hay un usuario autenticado, mostramos un mensaje de error
      if (!currentUserId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró un usuario autenticado. Por favor, inicia sesión.",
        });
        setLoading(false); // Terminamos la carga
        return;
      }

      // Verificamos si los trueques están guardados en el almacenamiento local
      const storedBarterings = localStorage.getItem("barterings");

      // Si existen trueques guardados, los cargamos desde el localStorage
      if (storedBarterings) {
        const parsedBarterings = JSON.parse(storedBarterings);
        setBarterings(parsedBarterings); // Establecemos los trueques obtenidos
        setLoading(false); // Terminamos la carga

        // Verificamos si faltan trueques y si es así, hacemos la llamada a la API para obtener los faltantes
        try {
          const data = await CallsBarteringsCC.GetBarterings();
          if (data && data.barterings) {
            const missingBarterings = data.barterings.filter(
              (apiBartering) => !parsedBarterings.some((storedBartering) => storedBartering.id === apiBartering.id)
            );

            // Si faltan trueques, los agregamos
            if (missingBarterings.length > 0) {
              const updatedBarterings = [...parsedBarterings, ...missingBarterings];
              setBarterings(updatedBarterings);
              localStorage.setItem("barterings", JSON.stringify(updatedBarterings)); // Actualizamos el localStorage
            }
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al intentar cargar los trueques. Intenta nuevamente más tarde.',
          });
        }
      } else {
        console.log("entra");
        // Si no hay trueques en el localStorage, hacemos una solicitud a la API
        try {
          const data = await CallsBarteringsCC.GetBarterings(); // Llamamos a la API para obtener los trueques
          setBarterings(data);
          localStorage.setItem("barterings", JSON.stringify(data.barterings)); // Guardamos los trueques en el localStorage
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al intentar cargar los trueques. Intenta nuevamente más tarde.',
          });
        } finally {
          setLoading(false); // Terminamos la carga, sin importar si fue exitoso o no
        }
      }
    }

    fetchBarterings(); // Llamamos a la función para cargar los trueques
  }, []); // El array vacío indica que este useEffect se ejecuta solo una vez cuando el componente se monta

  // Función para manejar el clic en el botón "Editar" de un trueque
  const handleEditClick = (bartering) => {
    Swal.fire({
      title: 'Editar Trueque',
      html: `
        <input id="resourceOffered" class="swal2-input" placeholder="Recurso ofrecido" value="${bartering.resourceOffered || ''}">
        <select id="resourceRequest" class="swal2-input">
          <option value="practico" ${bartering.resourceRequest === 'practico' ? 'selected' : ''}>Práctico</option>
          <option value="teorico" ${bartering.resourceRequest === 'teorico' ? 'selected' : ''}>Teórico</option>
          <option value="otro" ${bartering.resourceRequest === 'otro' ? 'selected' : ''}>Otro</option>
        </select>
        <textarea id="comments" class="swal2-textarea" placeholder="Comentarios">${bartering.commentsB[0]?.comment || ''}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const resourceOffered = document.getElementById('resourceOffered')?.value.trim();
        const resourceRequest = document.getElementById('resourceRequest')?.value.trim();
        const comments = document.getElementById('comments')?.value.trim();

        // Validación de campos
        if (!resourceOffered || !resourceRequest || comments === undefined || comments === '') {
          Swal.showValidationMessage('Por favor, completa todos los campos obligatorios.');
          return false;
        }

        return { resourceOffered, resourceRequest, comments };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { resourceOffered, resourceRequest, comments } = result.value;

        // Preparar los datos para la API
        const updatedBarter = {
          ...bartering,
          resourceOffered,
          resourceRequest,
          commentsB: [{ userComent: bartering.nameB, comment: comments }],
        };

        try {
          // Llamar a la API para actualizar el trueque
          await CallsBarteringsCC.UpdateBarterings(updatedBarter, bartering.id);

          // Actualizar el estado local
          setBarterings((prevBarterings) =>
            prevBarterings.map((b) =>
              b.id === updatedBarter.id ? updatedBarter : b
            )
          );

          Swal.fire('Actualizado', 'El trueque ha sido actualizado con éxito.', 'success');
        } catch (error) {
          console.error('Error al actualizar el trueque:', error);
          Swal.fire('Error', 'Hubo un problema al actualizar el trueque.', 'error');
        }
      }
    });
  };

  // Función para eliminar un trueque
  const deleteBarter = async (id) => {
    try {
      // Confirmación antes de eliminar
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '¡Sí, eliminarlo!',
      });

      if (result.isConfirmed) {
        // Llamar a la API para eliminar el trueque
        await CallsBarteringsCC.DeleteBartering(id);

        // Actualizar la lista de trueques después de eliminar
        const updatedBarterings = barterings.filter((bartering) => bartering.id !== id);
        setBarterings(updatedBarterings);
        localStorage.setItem('barterings', JSON.stringify(updatedBarterings));

        // Mostrar mensaje de éxito
        Swal.fire('Eliminado', 'El trueque ha sido eliminado correctamente.', 'success');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al eliminar el trueque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar trueque',
        text: 'Hubo un problema al intentar eliminar el trueque. Intenta nuevamente.',
      });
    }
  };

  const handleAddComment = async (barteringId) => {
    try {
      const { value: comment } = await Swal.fire({
        title: "Agregar Comentario",
        input: "textarea",
        inputPlaceholder: "Escribe tu comentario aquí...",
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
      });

      if (comment) {
        const bartering = barterings.find((b) => b.id === barteringId);
        if (!bartering) return;

        const updatedComments = [
          ...bartering.commentsB,
          { userComent: localStorage.getItem("nameUserSign"), comment },
        ];

        const updatedBartering = { ...bartering, commentsB: updatedComments };

        await CallsBarteringsCC.UpdateBarterings(updatedBartering, barteringId);

        setBarterings((prevBarterings) =>
          prevBarterings.map((b) =>
            b.id === barteringId ? updatedBartering : b
          )
        );

        Swal.fire({
          icon: "success",
          title: "Comentario agregado",
          text: "Tu comentario ha sido agregado exitosamente.",
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al agregar el comentario. Intenta nuevamente.",
      });
    }
  };

  const handleDeleteComment = async (barteringId, commentIndex) => {
    try {
      const currentUserId = localStorage.getItem("idUserSign");
      const bartering = barterings.find((b) => b.id === barteringId);
      if (!bartering) return;

      const comment = bartering.commentsB[commentIndex];
      const isOwner = bartering.idUserCreate === currentUserId;
      const isCommentAuthor = comment.userComent === localStorage.getItem("nameUserSign");

      if (!isOwner && !isCommentAuthor) {
        Swal.fire({
          icon: "error",
          title: "Acción no permitida",
          text: "Solo el creador del trueque o el autor del comentario pueden eliminarlo.",
        });
        return;
      }

      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Este comentario será eliminado permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const updatedComments = bartering.commentsB.filter(
          (_, index) => index !== commentIndex
        );

        const updatedBartering = { ...bartering, commentsB: updatedComments };

        await CallsBarteringsCC.UpdateBarterings(updatedBartering, barteringId);

        setBarterings((prevBarterings) =>
          prevBarterings.map((b) =>
            b.id === barteringId ? updatedBartering : b
          )
        );

        Swal.fire({
          icon: "success",
          title: "Comentario eliminado",
          text: "El comentario ha sido eliminado exitosamente.",
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al eliminar el comentario. Intenta nuevamente.",
      });
    }
  };

  // Si los trueques están cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando trueques...</div>;
  }

  return (
    <div className="barter-container">
      {/* Left section: List of trueques */}
      <div className="trueques-section">
        <h2 className="section-title">Lista de Trueques</h2>
        {barterings.length === 0 ? (
          <div>No hay trueques disponibles en este momento.</div>
        ) : (
          <div className="barter-list">
            {barterings.map((bartering) => (
              <div key={bartering.id} className="barter-item">
                <h3>
                  Usuaria: {bartering.nameB} ofrece el recurso "{bartering.resourceOffered}", y está interesada en un recurso "{bartering.resourceRequest}".
                </h3>
                <p>Comentarios:</p>
                <ul>
                  {bartering.commentsB.map((comment, index) => (
                    <li key={index}>
                      <strong>{comment.userComent}:</strong> {comment.comment}
                      {(bartering.idUserCreate === localStorage.getItem("idUserSign") ||
                        comment.userComent === localStorage.getItem("nameUserSign")) && (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteComment(bartering.id, index)}
                        >
                          Eliminar comentario
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  className="add-comment-button"
                  onClick={() => handleAddComment(bartering.id)}
                >
                  Agregar Comentario
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(bartering)}
                >
                  Editar Trueque
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteBarter(bartering.id)}
                >
                  Eliminar Trueque
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right section: BarterCreator */}
      <div>
        <BarterCreator setBarterings={setBarterings} barterings={barterings} />
      </div>
    </div>
  );
}

export default BarterByHazelCC; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
