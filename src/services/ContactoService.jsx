// Definimos la URL base para la API de comunicados(para intentar codigo mas limpio)
const BASE_URL = 'http://localhost:3000/comunicados'; 

// Función asincrónica para obtener todos los comunicados desde la API
async function GetComunicados() {
  try {
    // Realizamos una solicitud GET a la URL base para obtener todos los comunicados
    const response = await fetch(BASE_URL, {
      method: 'GET',  // Especificamos que la solicitud es de tipo GET
      headers: {
        'Content-Type': 'application/json',  // Indicamos que la respuesta esperada es en formato JSON
      },
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error('Error fetching comunicados');
    }

    // Si la respuesta es exitosa, convertimos la respuesta en formato JSON y la retornamos
    return await response.json();
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error('Error fetching comunicados:', error);
    throw error;  // Propagamos el error para que lo maneje el componente que lo llamó
  }
}

// Función asincrónica para crear un nuevo comunicado en la API
async function PostComunicado(comunicadoData) {
  try {
    // Realizamos una solicitud POST para enviar un nuevo comunicado a la API
    const response = await fetch(BASE_URL, {
      method: 'POST',  // Especificamos que la solicitud es de tipo POST
      headers: {
        'Content-Type': 'application/json',  // Indicamos que estamos enviando datos en formato JSON
      },
      body: JSON.stringify(comunicadoData),  // Convertimos el objeto de datos a JSON y lo enviamos en el cuerpo de la solicitud
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error('Error posting comunicado');
    }

    // Si la respuesta es exitosa, convertimos la respuesta en formato JSON y la retornamos
    return await response.json();
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error('Error posting comunicado:', error);
    throw error;  // Propagamos el error para que lo maneje el componente que lo llamó
  }
}

// Función asincrónica para actualizar un comunicado existente en la API
async function UpdateComunicado(comunicadoData, id) {
  try {
    // Realizamos una solicitud PUT para actualizar el comunicado con el ID especificado
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',  // Especificamos que la solicitud es de tipo PUT para realizar una actualización
      headers: {
        'Content-Type': 'application/json',  // Indicamos que estamos enviando datos en formato JSON
      },
      body: JSON.stringify(comunicadoData),  // Convertimos los datos del comunicado a JSON y los enviamos en el cuerpo de la solicitud
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error updating comunicado with id ${id}`);
    }

    // Si la respuesta es exitosa, convertimos la respuesta en formato JSON y la retornamos
    return await response.json();
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error('Error updating comunicado:', error);
    throw error;  // Propagamos el error para que lo maneje el componente que lo llamó
  }
}

// Función asincrónica para eliminar un comunicado de la API por su ID
async function DeleteComunicado(id) {
  try {
    // Realizamos una solicitud DELETE para eliminar el comunicado con el ID especificado
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',  // Especificamos que la solicitud es de tipo DELETE
      headers: {
        'Content-Type': 'application/json',  // Indicamos que estamos enviando datos en formato JSON
      },
    });

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error deleting comunicado with id ${id}`);
    }

    // Si la respuesta es exitosa, retornamos un mensaje indicando que el comunicado ha sido eliminado
    return { message: `Comunicado with id ${id} deleted successfully` };
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error('Error deleting comunicado:', error);
    throw error;  // Propagamos el error para que lo maneje el componente que lo llamó
  }
}

// Exportamos las funciones para que puedan ser utilizadas en otras partes de la aplicación
export default { GetComunicados, PostComunicado, UpdateComunicado, DeleteComunicado };
