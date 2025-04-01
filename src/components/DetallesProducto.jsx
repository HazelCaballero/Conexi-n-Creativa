import React, { useState, useEffect } from 'react';
import ProductoService from "../services/ProductoService"; // Import the service to fetch products
import '../styles/componentscss/AgregarProducto.css'; // Reuse the same CSS for styling

const DetallesProducto = () => {
  const [productos, setProductos] = useState([]); // State to store products

  // Fetch products when the component mounts
  useEffect(() => {
    ProductoService.GetProductos()
      .then((productos) => {
        setProductos(productos); // Update state with fetched products
      })
      .catch((error) => console.error('Error al cargar los productos:', error)); // Handle errors
  }, []);

  return (
    <div className="agregar-producto-container"> {/* Reuse the same container styling */}
      <h2>Detalles de Productos</h2>
      <ul>
        {productos
          .filter((producto) => producto.interestedUsers && producto.interestedUsers.length > 0) // Filter products with interested users
          .map((producto) => (
            <li key={producto.id}>
              <span><strong>Producto:</strong> {producto.nombre}</span>
              <span style={{ marginLeft: '10px' }}><strong>ID:</strong> {producto.id}</span>
              <ul style={{ marginTop: '5px', paddingLeft: '20px', fontSize: '0.9rem', color: '#555' }}>
                <li><strong>Interesados:</strong></li>
                {producto.interestedUsers.map((userId, index) => (
                  <li key={index}>ID: {userId}</li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DetallesProducto;
