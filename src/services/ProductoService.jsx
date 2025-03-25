const BASE_URL = 'http://localhost:3000/productos'; 

// Función para obtener todos los productos
async function GetProductos() {
  try {
    // Realiza una solicitud GET para obtener todos los productos desde la API
    const response = await fetch(BASE_URL, {
      method: 'GET',  // Método de solicitud HTTP
      headers: {
        'Content-Type': 'application/json',  // Tipo de contenido para que la API sepa que espera una respuesta JSON
      },
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error('Error fetching productos');
    }

    // Si la respuesta es exitosa, devuelve los datos en formato JSON
    return await response.json();
  } catch (error) {
    // Si hay un error en la solicitud, lo captura y lo imprime en la consola
    console.error('Error fetching productos:', error);
    // Lanza el error para que se pueda manejar en el componente o función que llamó a esta función
    throw error;
  }
}

// Función para crear un nuevo producto
async function PostProducto(productoData) {
  try {
    // Realiza una solicitud POST para agregar un nuevo producto en la API
    const response = await fetch(BASE_URL, {
      method: 'POST',  // Método de solicitud HTTP
      headers: {
        'Content-Type': 'application/json',  // Tipo de contenido de la solicitud
      },
      body: JSON.stringify(productoData),  // Convierte los datos del producto en una cadena JSON
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error('Error posting producto');
    }

    // Si la respuesta es exitosa, devuelve el producto creado en formato JSON
    return await response.json();
  } catch (error) {
    // Si hay un error en la solicitud, lo captura y lo imprime en la consola
    console.error('Error posting producto:', error);
    // Lanza el error para manejarlo más arriba en la cadena de llamadas
    throw error;
  }
}

// Función para actualizar un producto existente
async function UpdateProducto(productoData, id) {
  try {
    // Realiza una solicitud PUT para actualizar un producto específico por su ID
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',  // Método de solicitud HTTP para actualizar
      headers: {
        'Content-Type': 'application/json',  // Tipo de contenido de la solicitud
      },
      body: JSON.stringify(productoData),  // Convierte los datos del producto a una cadena JSON
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error(`Error updating producto with id ${id}`);
    }

    // Si la respuesta es exitosa, devuelve el producto actualizado en formato JSON
    return await response.json();
  } catch (error) {
    // Si hay un error en la solicitud, lo captura y lo imprime en la consola
    console.error('Error updating producto:', error);
    // Lanza el error para manejarlo más arriba en la cadena de llamadas
    throw error;
  }
}

// Función para eliminar un producto
async function DeleteProducto(id) {
  try {
    // Realiza una solicitud DELETE para eliminar un producto por su ID
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',  // Método de solicitud HTTP para eliminar
      headers: {
        'Content-Type': 'application/json',  // Tipo de contenido de la solicitud
      },
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error(`Error deleting producto with id ${id}`);
    }

    // Si la respuesta es exitosa, devuelve un mensaje confirmando que se eliminó el producto
    return { message: `Producto with id ${id} deleted successfully` };
  } catch (error) {
    // Si hay un error en la solicitud, lo captura y lo imprime en la consola
    console.error('Error deleting producto:', error);
    // Lanza el error para manejarlo más arriba en la cadena de llamadas
    throw error;
  }
}

// Exporta las funciones para que puedan ser utilizadas en otros módulos
export default { GetProductos, PostProducto, UpdateProducto, DeleteProducto };
