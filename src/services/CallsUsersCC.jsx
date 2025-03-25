async function GetUsersCC() {
    try {
      // Realizamos una solicitud GET para obtener todos los usuarios desde la API.
      const response = await fetch('http://localhost:3000/usersCC', {
        method: 'GET',  // Especificamos que la solicitud es de tipo GET
        headers: {
          'Content-Type': 'application/json'  // Indicamos que esperamos una respuesta en formato JSON
        }
      });
  
      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        throw new Error('Error fetching usersCC');
      }
  
      // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
      return await response.json();
    } catch (error) {
      // En caso de error, se captura y se muestra en la consola
      console.error('Error fetching usersCC:', error);
      throw error;  // Propagamos el error para que sea manejado por el componente que lo llamó
    }
  }
  
  // Función asincrónica para crear un nuevo usuario en la API.
  async function PostUsersCC(nameU, emailU, passwordU, phoneU) {
    try {
      // Creamos el objeto con los datos del nuevo usuario
      const userCCData = { nameU, emailU, passwordU, phoneU };
  
      // Realizamos una solicitud POST para enviar los datos del nuevo usuario a la API
      const response = await fetch("http://localhost:3000/usersCC", {
        method: 'POST',  // Especificamos que la solicitud es de tipo POST
        headers: {
          'Content-Type': 'application/json'  // Indicamos que estamos enviando datos en formato JSON
        },
        body: JSON.stringify(userCCData)  // Convertimos el objeto a JSON y lo enviamos en el cuerpo de la solicitud
      });
  
      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        throw new Error('Error posting userCC');
      }
  
      // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
      return await response.json();
    } catch (error) {
      // En caso de error, se captura y se muestra en la consola
      console.error('Error posting userCC:', error);
      throw error;  // Propagamos el error para que sea manejado por el componente que lo llamó
    }
  }
  
  // Función asincrónica para actualizar un usuario existente en la API.
  async function UpdateUsersCC(nameU, emailU, passwordU, phoneU, id) {
    try {
      // Creamos el objeto con los datos del usuario actualizado
      const userCCData = { nameU, emailU, passwordU, phoneU, id };
  
      // Realizamos una solicitud PUT para actualizar el usuario con el ID especificado
      const response = await fetch(`http://localhost:3000/usersCC/${id}`, {
        method: 'PUT',  // Especificamos que la solicitud es de tipo PUT para actualizar
        headers: {
          'Content-Type': 'application/json'  // Indicamos que estamos enviando datos en formato JSON
        },
        body: JSON.stringify(userCCData)  // Convertimos el objeto a JSON y lo enviamos en el cuerpo de la solicitud
      });
  
      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        throw new Error(`Error updating userCC with id ${id}`);
      }
  
      // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
      return await response.json();
    } catch (error) {
      // En caso de error, se captura y se muestra en la consola
      console.error('Error updating userCC:', error);
      throw error;  // Propagamos el error para que sea manejado por el componente que lo llamó
    }
  }
  
  // Función asincrónica para eliminar un usuario por su ID.
  async function DeleteUserCC(id) {
    try {
      // Realizamos una solicitud DELETE para eliminar el usuario con el ID especificado
      const response = await fetch(`http://localhost:3000/usersCC/${id}`, {
        method: 'DELETE',  // Especificamos que la solicitud es de tipo DELETE
        headers: {
          'Content-Type': 'application/json'  // Indicamos que estamos enviando datos en formato JSON
        }
      });
  
      // Si la respuesta no es exitosa, lanzamos un error
      if (!response.ok) {
        throw new Error(`Error deleting userCC with id ${id}`);
      }
  
      // Retornamos un objeto con un mensaje que indica que el usuario ha sido eliminado con éxito
      return { message: `UserCC with id ${id} deleted successfully` };
    } catch (error) {
      // En caso de error, se captura y se muestra en la consola
      console.error('Error deleting userCC:', error);
      throw error;  // Propagamos el error para que sea manejado por el componente que lo llamó
    }
  }
  
  // Exportamos las funciones para que puedan ser utilizadas en otros archivos o componentes
  export default { GetUsersCC, PostUsersCC, UpdateUsersCC, DeleteUserCC };
  