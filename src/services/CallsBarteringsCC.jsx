const BASE_URL = 'http://localhost:3000/barterings';

// Función asincrónica para obtener todos los trueques desde la API
async function GetBarterings() { 
  try {
    // Realizamos una solicitud GET para obtener todos los trueques desde la API
    const response = await fetch(BASE_URL, {
      method: 'GET',  // Especificamos el método HTTP, en este caso es GET
      headers: {
        'Content-Type': 'application/json'  // Indicamos que la respuesta debe ser en formato JSON
      }
    });

    // Verificamos si la respuesta no es satisfactoria 
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzamos un error
      throw new Error('Error fetching barterings');
    }

    // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
    return await response.json();
  } catch (error) {
    // En caso de error, se captura y se muestra en la consola
    console.error('Error fetching barterings:', error);
    throw error;  // Propagamos el error para que pueda ser manejado por quien haya llamado la función
  }
}

// Función asincrónica para crear un nuevo trueque
async function PostBarterings(barteringData) {
  try {
    // Realizamos una solicitud POST para enviar datos a la API y crear un nuevo trueque
    const response = await fetch(BASE_URL, {
      method: 'POST',  // Especificamos el método HTTP, en este caso es POST
      headers: {
        'Content-Type': 'application/json'  // Indicamos que vamos a enviar datos en formato JSON
      },
      // Enviamos el objeto barteringData como cuerpo de la solicitud en formato JSON
      body: JSON.stringify(barteringData)
    });

    // Si la respuesta no es satisfactoria, lanzamos un error
    if (!response.ok) {
      throw new Error('Error posting bartering');
    }

    // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
    return await response.json();
  } catch (error) {
    // En caso de error, se captura y se muestra en la consola
    console.error('Error posting bartering:', error);
    throw error;  // Propagamos el error para ser manejado por quien haya llamado la función
  }
}

// Función asincrónica para actualizar un trueque existente
async function UpdateBarterings(barteringData, id) {
  try {
    // Realizamos una solicitud PUT para actualizar un trueque existente por su ID
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',  // Especificamos el método HTTP, en este caso es PUT para actualizar
      headers: {
        'Content-Type': 'application/json'  // Indicamos que vamos a enviar datos en formato JSON
      },
      // Enviamos el objeto barteringData como cuerpo de la solicitud en formato JSON
      body: JSON.stringify(barteringData)
    });

    // Si la respuesta no es satisfactoria, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error updating bartering with id ${id}`);
    }

    // Si la respuesta es exitosa, convertimos la respuesta a JSON y la retornamos
    return await response.json();
  } catch (error) {
    // En caso de error, se captura y se muestra en la consola
    console.error('Error updating bartering:', error);
    throw error;  // Propagamos el error para que pueda ser manejado por quien haya llamado la función
  }
}

// Función asincrónica para eliminar un trueque por su ID
async function DeleteBartering(id) {
  try {
    // Realizamos una solicitud DELETE para eliminar un trueque específico por su ID
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',  // Especificamos el método HTTP, en este caso es DELETE
      headers: {
        'Content-Type': 'application/json'  // Indicamos que estamos enviando una solicitud en formato JSON
      }
    });

    // Si la respuesta no es satisfactoria, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error deleting bartering with id ${id}`);
    }

    // Retornamos un objeto con un mensaje indicando que el trueque fue eliminado con éxito
    return { message: `Bartering with id ${id} deleted successfully` };
  } catch (error) {
    // En caso de error, se captura y se muestra en la consola
    console.error('Error deleting bartering:', error);
    throw error;  // Propagamos el error para ser manejado por quien haya llamado la función
  }
}

// Exportamos las funciones para que puedan ser utilizadas en otros archivos o componentes
export default { GetBarterings, PostBarterings, UpdateBarterings, DeleteBartering };
