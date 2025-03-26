import React, { useEffect, useState } from "react"; // Importamos React y los hooks useState y useEffect
import Swal from "sweetalert2"; // Importamos SweetAlert para mostrar mensajes emergentes
import CallsBarteringsCC from "../services/CallsBarteringsCC"; // Importamos las funciones para interactuar con la API de trueques
import BarterCreator from './BarterCreator'; // Componente para crear nuevos trueques

// Componente principal para mostrar los trueques y permitir su edición y eliminación
function BarterByHazelCC() {
  // Definimos varios estados que usarán para manejar la información en la interfaz de usuario
  const [barterings, setBarterings] = useState([]); // Lista de trueques
  const [loading, setLoading] = useState(true); // Indicador para saber si los trueques están siendo cargados
  const [editingBarter, setEditingBarter] = useState(null); // Almacenará el trueque que se está editando
  const [newResourceOffered, setNewResourceOffered] = useState(""); // Recurso ofrecido al editar
  const [newResourceRequest, setNewResourceRequest] = useState(""); // Recurso solicitado al editar
  const [newComments, setNewComments] = useState(""); // Comentarios al editar

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
          setBarterings(data)
          console.log(data);
          
          if (data && data.barterings && data.barterings.length > 0) {
            setBarterings(data); // Establecemos los trueques obtenidos
            localStorage.setItem("barterings", JSON.stringify(data.barterings)); // Guardamos los trueques en el localStorage
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Trueques',
              text: 'Trueques disponibles en este momento.',
            });
          }
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
    const currentUserId = localStorage.getItem("idUserSign");

    // Verificamos que el trueque haya sido creado por el usuario actual
    if (bartering.idUserCreate === currentUserId) {
      setEditingBarter(bartering); // Establecemos el trueque a editar
      setNewResourceOffered(bartering.resourceOffered); // Establecemos el recurso ofrecido en el formulario de edición
      setNewResourceRequest(bartering.resourceRequest); // Establecemos el recurso solicitado en el formulario de edición
      setNewComments(bartering.commentsB ? bartering.commentsB[0].comment : ""); // Establecemos el comentario en el formulario de edición
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción no permitida",
        text: "Solo puedes editar los trueques que hayas creado.",
      });
    }
  };

  // Función para eliminar un trueque
  const deleteBarter = async (id) => {
    const currentUserId = localStorage.getItem("idUserSign");
    const barteringToDelete = barterings.find((bartering) => bartering.id === id); // Buscamos el trueque por su ID

    // Verificamos que el trueque haya sido creado por el usuario actual
    if (barteringToDelete.idUserCreate === currentUserId) {
      try {
        await CallsBarteringsCC.DeleteBartering(id); // Llamamos a la API para eliminar el trueque
        const updatedBarterings = barterings.filter((bartering) => bartering.id !== id); // Filtramos el trueque eliminado
        setBarterings(updatedBarterings); // Actualizamos la lista de trueques
        localStorage.setItem("barterings", JSON.stringify(updatedBarterings)); // Actualizamos el localStorage

        Swal.fire({
          icon: "success",
          title: "Trueque eliminado",
          text: "El trueque ha sido eliminado correctamente.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al eliminar trueque",
          text: "Hubo un problema al intentar eliminar el trueque. Intenta nuevamente.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Acción no permitida",
        text: "Solo puedes eliminar los trueques que hayas creado.",
      });
    }
  };

  // Función para actualizar un trueque
  const handleUpdateBarter = () => {
    // Creamos un objeto con los datos actualizados del trueque
    const updatedBarter = {
      ...editingBarter, // Mantenemos todos los datos del trueque original
      resourceOffered: newResourceOffered, // Actualizamos el recurso ofrecido
      resourceRequest: newResourceRequest, // Actualizamos el recurso solicitado
      commentsB: [{ userComent: editingBarter.nameB, comment: newComments }], // Actualizamos los comentarios
    };

    // Llamamos a la API para actualizar el trueque
    CallsBarteringsCC.UpdateBarterings(updatedBarter, editingBarter.id)
      .then(() => {
        const updatedBarterings = barterings.map((bartering) =>
          bartering.id === updatedBarter.id ? updatedBarter : bartering // Actualizamos el trueque en la lista
        );
        setBarterings(updatedBarterings);

        localStorage.setItem("barterings", JSON.stringify(updatedBarterings)); // Actualizamos el localStorage

        // Limpiamos el estado de edición
        setEditingBarter(null);
        setNewResourceOffered("");
        setNewResourceRequest("");
        setNewComments("");

        Swal.fire({
          icon: "success",
          title: "Trueque actualizado",
          text: "El intercambio ha sido actualizado exitosamente.",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar trueque",
          text: "Hubo un problema al intentar actualizar el trueque. Intenta nuevamente.",
        });
      });
  };

  // Si los trueques están cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando trueques...</div>;
  }

  return (
    <div>
      <h2>Wall de Trueques</h2>
      {/* Componente para crear nuevos trueques */}
      <BarterCreator setBarterings={setBarterings} barterings={barterings} />

      {/* Si no hay trueques disponibles, mostramos un mensaje */}
      {barterings.length === 0 ? (
        <div>No hay trueques disponibles en este momento.</div>
      ) : (
        <div className="barter-list">
          {/* Mapeamos los trueques y los mostramos */}
          {barterings.map((bartering) => (
            <div key={bartering.id} className="barter-item">
              <h3>
                Usuaria: {bartering.nameB} ofrece el recurso "{bartering.resourceOffered}", y está interesada en un recurso "{bartering.resourceRequest}".
              </h3>
              <p>Comentarios: {bartering.commentsB ? bartering.commentsB[0].comment : "No hay comentarios"}</p>
              <button onClick={() => handleEditClick(bartering)}>Editar</button>
              <button onClick={() => deleteBarter(bartering.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para editar un trueque si está en modo edición */}
      {editingBarter && (
        <div className="edit-form">
          <h3>Editar Trueque</h3>
          <input
            type="text"
            value={newResourceOffered}
            onChange={(e) => setNewResourceOffered(e.target.value)} // Modificamos el recurso ofrecido
            placeholder="Nuevo recurso ofrecido"
          />
          <select
            value={newResourceRequest}
            onChange={(e) => setNewResourceRequest(e.target.value)} // Modificamos el recurso solicitado
          >
            <option value="practico">Práctica</option>
            <option value="teorico">Teórica</option>
            <option value="otro">Otro</option>
          </select>
          <textarea
            value={newComments}
            onChange={(e) => setNewComments(e.target.value)} // Modificamos los comentarios
            placeholder="Nuevo comentario"
          />
          <button onClick={handleUpdateBarter}>Actualizar Trueque</button> {/* Botón para actualizar */}
          <button onClick={() => setEditingBarter(null)}>Cancelar</button> {/* Botón para cancelar */}
        </div>
      )}
    </div>
  );
}

export default BarterByHazelCC; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
