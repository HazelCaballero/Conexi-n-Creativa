import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect para manejar el estado y efectos secundarios en el componente
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar mensajes emergentes
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la navegación entre rutas
import CallsUsersCC from '../services/CallsUsersCC'; // Importamos las funciones que interactúan con la API de usuarios
import "../styles/componentscss/ProfileByHazelCC.css"; // Importamos los estilos específicos para este componente

function ProfileByHazelCC() {
  // Estados para almacenar los datos del usuario y los errores
  const [user, setUser] = useState({ nameU: '', emailU: '', passwordU: '', phoneU: '' });  // Estado para los datos del usuario
  const [isEditing, setIsEditing] = useState(false);  // Estado para determinar si estamos en modo de edición
  const [error, setError] = useState('');  // Estado para almacenar mensajes de error
  const navigate = useNavigate();  // Hook para navegar entre páginas

  // Obtener el ID del usuario desde localStorage (suponiendo que el usuario está autenticado)
  const userId = localStorage.getItem('idUserSign'); 

  // useEffect para obtener los datos del usuario cuando el componente se monta
  useEffect(() => {
    if (userId) {  // Si existe un ID de usuario en localStorage, proceder a obtener sus datos
      // Llamada asíncrona para obtener los detalles del usuario desde la API
      async function fetchUserData() {
        try {
          const userData = await CallsUsersCC.GetUsersCC(); // Obtener todos los usuarios
          
          // Buscar el usuario en el array de usuarios, comparando los ID (convertimos ambos a cadena para comparar)
          const foundUser = userData.find(user => String(user.id) === userId);

          if (foundUser) {
            setUser(foundUser); // Si se encuentra, actualizar el estado con los datos del usuario
          } else {
            console.error("Usuario no encontrado");
            navigate("/Inicio"); // Si no se encuentra el usuario, redirigir al inicio
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);  // En caso de error al obtener los datos
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar la información del usuario.'
          });
        }
      }

      fetchUserData();  // Llamada a la función para obtener los datos del usuario
    } else {
      navigate("/Inicio");  // Si no hay ID de usuario en localStorage, redirigir al inicio
    }
  }, [userId, navigate]);  // El efecto se ejecuta cada vez que el ID del usuario o la función navigate cambian

  // Función que maneja los cambios en los campos de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value  // Actualiza el estado del usuario con los nuevos valores de los campos
    }));
  };

  // Función para validar los campos del formulario
  const validateInputs = () => {
    // Verificamos que todos los campos estén llenos
    if (!user.nameU || !user.emailU || !user.passwordU || !user.phoneU) {
      setError('Todos los campos son obligatorios.');  // Si algún campo está vacío, establecemos un mensaje de error
      return false;
    }

    // Validación de correo electrónico usando una expresión regular simple
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.emailU)) {
      setError('El correo electrónico no es válido.');  // Si el correo no es válido, mostramos un mensaje de error
      return false;
    }

    // Si la validación es exitosa, limpiamos el mensaje de error
    setError('');
    return true;
  };

  // Función para actualizar los datos del usuario en la base de datos
  const handleUpdateUser = async () => {
    if (!validateInputs()) {
      return;  // Si los campos no son válidos, no enviamos la solicitud de actualización
    }

    try {
      // Llamada a la API para actualizar los datos del usuario
      await CallsUsersCC.UpdateUsersCC(
        user.nameU, user.emailU, user.passwordU, user.phoneU, userId
      );

      // Si la actualización es exitosa, mostramos un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La información se ha actualizado correctamente.',
      });
      setIsEditing(false);  // Desactivamos el modo de edición

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);  // En caso de error en la actualización
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la información.'
      });
    }
  };

  // Función para eliminar la cuenta del usuario
  const handleDeleteUser = async () => {
    try {
      // Llamada a la API para eliminar la cuenta del usuario
      await CallsUsersCC.DeleteUserCC(userId);
      Swal.fire({
        icon: 'success',
        title: '¡Usuario eliminado!',
        text: 'Tu cuenta ha sido eliminada con éxito.',
      }).then(() => {
        localStorage.clear();  // Limpiar localStorage después de eliminar la cuenta
        navigate("/Inicio");  // Redirigir al inicio después de eliminar la cuenta
      });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);  // En caso de error al eliminar la cuenta
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el usuario.'
      });
    }
  };

  return (
    <div className="ProfileByHazelCCContainer">
      <h2 className="profileTitle">Perfil de Usuario</h2>

      <div className="profileDetails">
        {/* Campo para el nombre del usuario */}
        <label>Nombre</label>
        <input
          type="text"
          name="nameU"
          value={user.nameU}  // Valor del nombre del usuario
          onChange={handleEditChange}  // Llamada a la función para actualizar el nombre
          disabled={!isEditing}  // El campo es editable solo si estamos en modo edición
        />

        {/* Campo para el correo electrónico */}
        <label>Email</label>
        <input
          type="email"
          name="emailU"
          value={user.emailU}  // Valor del correo electrónico del usuario
          onChange={handleEditChange}  // Llamada a la función para actualizar el correo
          disabled={!isEditing}  // El campo es editable solo si estamos en modo edición
        />

        {/* Campo para la contraseña */}
        <label>Contraseña</label>
        <input
          type="password"
          name="passwordU"
          value={user.passwordU}  // Valor de la contraseña del usuario
          onChange={handleEditChange}  // Llamada a la función para actualizar la contraseña
          disabled={!isEditing}  // El campo es editable solo si estamos en modo edición
        />

        {/* Campo para el teléfono */}
        <label>Teléfono</label>
        <input
          type="text"
          name="phoneU"
          value={user.phoneU}  // Valor del teléfono del usuario
          onChange={handleEditChange}  // Llamada a la función para actualizar el teléfono
          disabled={!isEditing}  // El campo es editable solo si estamos en modo edición
        />
      </div>

      {/* Mostrar el mensaje de error si ocurre algún problema en la validación */}
      {error && <div className="error">{error}</div>}

      <div className="profileActions">
        {/* Botones de acción dependiendo si estamos en modo edición o no */}
        {isEditing ? (
          <>
            <button onClick={handleUpdateUser}>Actualizar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
        {/* Botón para eliminar la cuenta */}
        <button onClick={handleDeleteUser}>Eliminar Cuenta</button>
      </div>
    </div>
  );
}

export default ProfileByHazelCC;  // Exportamos el componente para su uso en otras partes de la aplicación