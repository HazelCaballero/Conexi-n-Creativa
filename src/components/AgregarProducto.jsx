import React, { useState, useEffect } from 'react'; 
import ProductoService from "../services/ProductoService"; // Importamos el servicio que maneja la API
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar alertas
import '../styles/componentscss/AgregarProducto.css'; // Import the new CSS file

const AgregarProducto = () => {
  // Estados para manejar los datos de los productos y los campos del formulario
  const [productos, setProductos] = useState([]); // Lista de productos que se obtiene de la API
  const [nombre, setNombre] = useState(''); // Almacena el nombre del producto
  const [descripcion, setDescripcion] = useState(''); // Almacena la descripción del producto
  const [precio, setPrecio] = useState(''); // Almacena el precio del producto
  const [imagen, setImagen] = useState(''); // Almacena la URL de la imagen del producto

  // Cargar la lista de productos al montar el componente
  useEffect(() => {
    ProductoService.GetProductos()
      .then((productos) => {
        setProductos(productos); // Actualizamos el estado 'productos' con los datos de la API
      })
      .catch((error) => console.error('Error al cargar los productos:', error)); // Manejo de errores en la carga
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Función para manejar tanto la creación como la actualización de productos
  const handleSubmit = async (id, nombreEditado, descripcionEditada, precioEditado, imagenEditada) => {
    const productO = { 
      nombre: nombreEditado, 
      descripcion: descripcionEditada, 
      precio: precioEditado, 
      imagen: imagenEditada || "" // Default to an empty string if no image is provided
    };

    try {
      if (id) {
        // Si tenemos un 'id', significa que estamos editando un producto existente
        await ProductoService.UpdateProducto(productO, id); 
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado con éxito', // Mensaje de éxito
          showConfirmButton: false, // Ocultar el botón de confirmación
          timer: 1500 // La alerta desaparecerá después de 1.5 segundos
        });
      } else {
        // Si no hay 'id', significa que estamos agregando un nuevo producto
        await ProductoService.PostProducto(productO); 
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado con éxito', // Mensaje de éxito
          showConfirmButton: false, 
          timer: 1500 // Desaparece automáticamente después de 1.5 segundos
        });
      }

      // Volver a cargar la lista de productos después de agregar o actualizar
      ProductoService.GetProductos()
        .then((productos) => setProductos(productos)); 

      // Limpiar los campos del formulario
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagen('');
    } catch (error) {
      // En caso de error, lo mostramos en consola para depuración
      console.error('Error al guardar el producto:', error);
    }
  };

  // Función para manejar la eliminación de un producto
  const handleDelete = async (id) => {
    try {
      // Confirmación antes de eliminar el producto
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
        await ProductoService.DeleteProducto(id); // Eliminar el producto de la API
        Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente.', 'success');
        setProductos(productos.filter((producto) => producto.id !== id)); // Actualizar la lista de productos
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar producto',
        text: 'Hubo un problema al intentar eliminar el producto. Intenta nuevamente.',
      });
    }
  };

  // Función para manejar el evento de hacer clic en "Editar"
  const handleEditClick = (productoId) => {
    const producto = productos.find((prod) => prod.id === productoId);

    if (producto) {
      // Cargar los valores del producto en los campos de edición
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setImagen(producto.imagen);

      // Mostrar un formulario emergente de edición usando Swal
      Swal.fire({
        title: 'Editar Producto',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
          <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion}">
          <input id="precio" class="swal2-input" placeholder="Precio" type="number" value="${producto.precio}">
          <input id="imagen" class="swal2-input" placeholder="Imagen URL (opcional)" value="${producto.imagen || ''}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          // Cuando el usuario confirma, obtenemos los valores editados
          const nombre = document.getElementById('nombre').value;
          const descripcion = document.getElementById('descripcion').value;
          const precio = document.getElementById('precio').value;
          const imagen = document.getElementById('imagen').value;

          // Validar que todos los campos estén completos
          if (!nombre || !descripcion || !precio) {
            Swal.showValidationMessage('Por favor, llena todos los campos obligatorios');
            return false;
          }

          // Enviar los datos del producto editado a handleSubmit
          handleSubmit(productoId, nombre, descripcion, precio, imagen);
        }
      });
    }
  };

  // Función para manejar el evento de hacer clic en "Agregar Producto"
  const handleAddClick = () => {
    // Mostrar un formulario emergente para agregar un producto nuevo
    Swal.fire({
      title: 'Agregar Producto',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${nombre}">
        <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${descripcion}">
        <input id="precio" class="swal2-input" placeholder="Precio" type="number" value="${precio}">
        <input id="imagen" class="swal2-input" placeholder="Imagen URL (opcional)" value="${imagen}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        // Obtener los valores de los inputs del formulario de Swal
        const nombreVal = document.getElementById('nombre').value;
        const descripcionVal = document.getElementById('descripcion').value;
        const precioVal = document.getElementById('precio').value;
        const imagenVal = document.getElementById('imagen').value;

        // Validar que los campos no estén vacíos
        if (!nombreVal || !descripcionVal || !precioVal) {
          Swal.showValidationMessage('Por favor, llena todos los campos obligatorios');
          return false;
        }

        // Llamar a handleSubmit con los valores ingresados y sin 'id' para agregar un nuevo producto
        handleSubmit(null, nombreVal, descripcionVal, precioVal, imagenVal);
      }
    });
  };

  const handleInterestToggle = async (productoId) => {
    try {
      const currentUserId = localStorage.getItem("idUserSign"); // Get the current user's ID
      if (!currentUserId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes iniciar sesión para marcar interés.",
        });
        return;
      }

      const producto = productos.find((prod) => prod.id === productoId);
      if (!producto) return;

      // Check if the user has already marked interest
      const isInterested = producto.interestedUsers?.includes(currentUserId);

      // Update the interestedUsers array
      const updatedInterestedUsers = isInterested
        ? producto.interestedUsers.filter((id) => id !== currentUserId) // Remove user if already interested
        : [...(producto.interestedUsers || []), currentUserId]; // Add user if not interested

      // Update the product with the new interestedUsers array
      const updatedProducto = { ...producto, interestedUsers: updatedInterestedUsers };

      await ProductoService.UpdateProducto(updatedProducto, productoId); // Update the product in the API

      // Update the local state
      setProductos((prevProductos) =>
        prevProductos.map((prod) =>
          prod.id === productoId ? updatedProducto : prod
        )
      );

      Swal.fire({
        icon: "success",
        title: isInterested ? "Interés eliminado" : "Interés marcado",
        text: isInterested
          ? "Has eliminado tu interés en este producto."
          : "Has marcado interés en este producto.",
      });
    } catch (error) {
      console.error("Error al marcar interés:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al intentar marcar interés. Intenta nuevamente.",
      });
    }
  };

  return (
    <div className="agregar-producto-container">
      <h2>Lista de Productos</h2>

      {/* Botón para agregar un nuevo producto */}
      <button onClick={handleAddClick}>Agregar Producto</button>

      {/* Lista de productos */}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <span>{producto.nombre}</span> - <span>{producto.precio}</span>
            {/* Display the number of interested users */}
            <span style={{ marginLeft: '10px', fontWeight: 'bold', color: 'rgb(44, 84, 131)' }}>
              Interesadas: {producto.interestedUsers ? producto.interestedUsers.length : 0}
            </span>
            {/* Botón para editar el producto */}
            <button onClick={() => handleEditClick(producto.id)}>Editar</button>
            {/* Botón para eliminar el producto */}
            <button onClick={() => handleDelete(producto.id)} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgregarProducto;
