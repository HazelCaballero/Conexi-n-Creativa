// Aun no compruevo que funcionen las funcionalinades como editar corretamente
import React, { useState, useEffect } from 'react'; 
import ProductoService from "../services/ProductoService"; // Importamos el servicio que maneja la comunicación con la API
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar mensajes de alerta al usuario

const AgregarProducto = () => {
  // Estados para manejar los datos de los productos y los campos del formulario
  const [productos, setProductos] = useState([]); // Estado que almacena la lista de productos que obtenemos de la API
  const [nombre, setNombre] = useState(''); // Estado que almacena el nombre del producto
  const [descripcion, setDescripcion] = useState(''); // Estado que almacena la descripción del producto
  const [precio, setPrecio] = useState(''); // Estado que almacena el precio del producto
  const [imagen, setImagen] = useState(''); // Estado que almacena la URL de la imagen del producto

  // Este hook se ejecuta al montar el componente, y sólo se ejecuta una vez debido al array vacío [].
  useEffect(() => {
    // Llamada a la API para obtener la lista de productos al cargar la página
    ProductoService.GetProductos()
      .then((productos) => {
        setProductos(productos); // Actualizamos el estado 'productos' con los productos obtenidos
      })
      .catch((error) => console.error('Error al cargar los productos:', error)); // Manejamos cualquier error en la llamada a la API
  }, []); // El array vacío asegura que se ejecute sólo una vez cuando el componente se monte

  // Esta función maneja el envío de datos del formulario, tanto para agregar como para editar un producto
  const handleSubmit = async (id, nombreEditado, descripcionEditada, precioEditado, imagenEditada) => {
    const productO = { nombre: nombreEditado, descripcion: descripcionEditada, precio: precioEditado, imagen: imagenEditada };
    try {
      if (id) {
        // Si tenemos un 'id', significa que estamos editando un producto existente
        await ProductoService.UpdateProducto(productO, id); // Llamamos al servicio para actualizar el producto
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado con éxito', // Mensaje de éxito
          showConfirmButton: false, // Ocultamos el botón de confirmación
          timer: 1500 // La alerta desaparecerá después de 1.5 segundos
        });
      } else {
        // Si no hay 'id', significa que estamos agregando un nuevo producto
        await ProductoService.PostProducto(productO); // Llamamos al servicio para agregar un nuevo producto
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado con éxito', // Mensaje de éxito
          showConfirmButton: false, // No necesitamos el botón de confirmación
          timer: 1500 // La alerta desaparece automáticamente después de 1.5 segundos
        });
      }

      // Después de agregar o editar, volvemos a cargar la lista de productos
      ProductoService.GetProductos()
        .then((productos) => setProductos(productos)); // Actualizamos la lista de productos con la respuesta de la API

      // Limpiamos los campos del formulario para que el usuario pueda agregar otro producto si lo desea
      setNombre(''); // Limpiamos el campo del nombre
      setDescripcion(''); // Limpiamos el campo de la descripción
      setPrecio(''); // Limpiamos el campo del precio
      setImagen(''); // Limpiamos el campo de la imagen
    } catch (error) {
      // Si ocurre un error, lo mostramos en la consola para poder depurarlo
      console.error('Error al guardar el producto:', error);
    }
  };

  // Esta función maneja el proceso de eliminación de un producto
  const handleDelete = async (id) => {
    try {
      // Antes de eliminar, mostramos una ventana de confirmación utilizando SweetAlert2
      const result = await Swal.fire({
        title: '¿Estás seguro?', // Pregunta de confirmación
        text: "¡No podrás revertir esta acción!", // Mensaje adicional
        icon: 'warning', // Tipo de alerta (advertencia)
        showCancelButton: true, // Mostramos un botón de cancelación
        confirmButtonColor: '#d33', // Color del botón de confirmación
        cancelButtonColor: '#3085d6', // Color del botón de cancelación
        confirmButtonText: '¡Sí, eliminarlo!' // Texto del botón de confirmación
      });

      // Si el usuario confirma la eliminación (result.isConfirmed es true)
      if (result.isConfirmed) {
        // Llamamos al servicio para eliminar el producto desde la API
        await ProductoService.DeleteProducto(id);
        // Mostramos una alerta de éxito que confirma que el producto fue eliminado
        Swal.fire(
          'Eliminado!', // Título de la alerta
          'El producto ha sido eliminado.', // Mensaje
          'success' // Tipo de alerta (éxito)
        );

        // Actualizamos la lista de productos, eliminando el producto eliminado de la lista local
        setProductos(productos.filter((producto) => producto.id !== id)); // Filtramos el producto eliminado de la lista
      }
    } catch (error) {
      // Si ocurre un error durante la eliminación, lo mostramos en la consola
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Esta función maneja el evento de hacer clic en el botón de editar
  const handleEditClick = (productoId) => {
    // Buscamos el producto que queremos editar en la lista de productos usando el id
    const producto = productos.find((prod) => prod.id === productoId);

    // Si encontramos el producto, mostramos un formulario emergente para editarlo
    if (producto) {
      // Establecer los valores del estado para los campos de edición
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setImagen(producto.imagen);

      // Abrir la ventana emergente para editar el producto
      Swal.fire({
        title: 'Editar Producto',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
          <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion}">
          <input id="precio" class="swal2-input" placeholder="Precio" type="number" value="${producto.precio}">
          <input id="imagen" class="swal2-input" placeholder="Imagen URL" value="${producto.imagen}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          // Cuando el usuario confirma, obtenemos los valores ingresados en el formulario emergente
          const nombre = document.getElementById('nombre').value;
          const descripcion = document.getElementById('descripcion').value;
          const precio = document.getElementById('precio').value;
          const imagen = document.getElementById('imagen').value;

          // Validamos que todos los campos estén completos antes de enviar
          if (!nombre || !descripcion || !precio || !imagen) {
            Swal.showValidationMessage('Por favor, llena todos los campos');
            return false;
          }

          // Pasamos el producto editado a handleSubmit con el id del producto
          handleSubmit(productoId, nombre, descripcion, precio, imagen);
        }
      });
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Formulario para agregar un nuevo producto */}
      <div>
        {/* Los campos del formulario permiten ingresar los datos del producto */}
        <input
          type="text"
          value={nombre} // El valor del campo 'nombre' es el estado 'nombre'
          onChange={(e) => setNombre(e.target.value)} // Actualizamos el estado 'nombre' cuando el usuario escribe
          placeholder="Nombre del Producto" // Texto que aparece cuando el campo está vacío
          required // El campo es obligatorio
        />
        <input
          type="text"
          value={descripcion} // El valor del campo 'descripcion' es el estado 'descripcion'
          onChange={(e) => setDescripcion(e.target.value)} // Actualizamos el estado 'descripcion'
          placeholder="Descripción"
          required // El campo es obligatorio
        />
        <input
          type="number"
          value={precio} // El valor del campo 'precio' es el estado 'precio'
          onChange={(e) => setPrecio(e.target.value)} // Actualizamos el estado 'precio'
          placeholder="Precio"
          required // El campo es obligatorio
        />
        <input
          type="text"
          value={imagen} // El valor del campo 'imagen' es el estado 'imagen'
          onChange={(e) => setImagen(e.target.value)} // Actualizamos el estado 'imagen'
          placeholder="Imagen URL"
          required // El campo es obligatorio
        />
        <button onClick={() => handleSubmit()}>Agregar Producto</button> {/* Al hacer clic en este botón, se ejecuta handleSubmit para agregar un nuevo producto */}
      </div>

      {/* Lista de productos */}
      <ul>
        {/* Mapeamos los productos y mostramos sus detalles */}
        {productos.map((producto) => (
          <li key={producto.id}>
            <span>{producto.nombre}</span> - <span>{producto.precio}</span>
            {/* Botón para editar el producto. Llama a handleEditClick con el id del producto */}
            <button onClick={() => handleEditClick(producto.id)}>Editar</button>
            {/* Botón para eliminar el producto. Llama a handleDelete con el id del producto */}
            <button onClick={() => handleDelete(producto.id)} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgregarProducto;
