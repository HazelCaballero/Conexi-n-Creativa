import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState
import ProductoService from "../services/ProductoService"; // Importamos el servicio que gestiona la obtención de productos

// Componente funcional SeccionDestacada
const SeccionDestacada = () => {
  // Estado local para almacenar la lista de productos
  const [productos, setProductos] = useState([]);

  // useEffect para cargar los productos cuando el componente se monta
  useEffect(() => {
    // Llamada al servicio para obtener los productos
    ProductoService.GetProductos()
      .then((productos) => {
        setProductos(productos);  // Si la llamada es exitosa, actualizamos el estado con los productos obtenidos
      })
      .catch((error) => console.error('Error al cargar los productos:', error));  // Si ocurre un error, lo mostramos en la consola
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez, cuando el componente se monta

  // Función que maneja el clic en el botón de "Ver Producto"
  const handleVerProducto = (id) => {
    // Redirige al usuario a la página del producto correspondiente utilizando la URL con el ID del producto
    window.location.href = `/producto/${id}`;
  };

  return (
    <div className="seccion-destacada">
      <h2>Sección destacada, (Espacio Publicitario Pagado)</h2> {/* Título de la sección destacada */}
      <div className="contenedor-productos">
        {/* Si no hay productos disponibles, mostramos un mensaje */}
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          // Si hay productos, los mostramos en una lista
          productos.map((producto) => (
            <div className="producto" key={producto.id}>
              {/* Si el producto tiene imagen, la mostramos */}
              {producto.imagen && <img src={producto.imagen} alt={producto.nombre} />}
              {/* Mostramos el nombre, descripción y precio del producto */}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span className="precio">${producto.precio}</span>
              {/* Botón para ver más detalles del producto, redirige al producto correspondiente */}
              <button onClick={() => handleVerProducto(producto.id)}>Ver Producto</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default SeccionDestacada;