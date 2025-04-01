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

  const handleInterestToggle = async (productoId) => {
    try {
      const currentUserId = localStorage.getItem("idUserSign");
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

      const isInterested = producto.interestedUsers?.includes(currentUserId);

      const updatedInterestedUsers = isInterested
        ? producto.interestedUsers.filter((id) => id !== currentUserId)
        : [...(producto.interestedUsers || []), currentUserId];

      const updatedProducto = { ...producto, interestedUsers: updatedInterestedUsers };

      await ProductoService.UpdateProducto(updatedProducto, productoId);

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
    <div className="seccion-destacada">
      <h2> Productos de la comunidad</h2> {/* Título de la sección destacada */}
      <div className="contenedor-productos">
        {/* Si no hay productos disponibles, mostramos un mensaje */}
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          // Si hay productos, los mostramos en una lista
          productos.map((producto) => (
            <div className="producto-card" key={producto.id}>
              {/* Si el producto tiene imagen, la mostramos */}
              {producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />}
              {/* Mostramos el nombre, descripción y precio del producto */}
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <span className="producto-precio">₡{producto.precio}</span>
              {/* Display the number of interested users */}
              <span className="producto-interesadas">
                Interesadas: {producto.interestedUsers ? producto.interestedUsers.length : 0}
              </span>
              {/* Checkbox to mark interest */}
              <label className="interest-toggle">
                <input
                  type="checkbox"
                  checked={producto.interestedUsers?.includes(localStorage.getItem("idUserSign")) || false}
                  onChange={() => handleInterestToggle(producto.id)}
                />
                Marcar interés
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default SeccionDestacada;