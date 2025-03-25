import React from 'react'; 

const AgregarProducto = () => {


  return (
    <div>
      <h2>Lista de Productos</h2>

     
      <div>
      
        <input
          type="text"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Nombre del Producto" 
          required 
        />
        <input
          type="text"
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          placeholder="Descripción"
          required 
        />
        <input
          type="number"
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
          placeholder="Precio"
          required 
        />
        <input
          type="text"
          value={imagen} 
          onChange={(e) => setImagen(e.target.value)} 
          placeholder="Imagen URL"
          required 
        />
        <button onClick={() => handleSubmit()}>Agregar Producto</button>
      </div>

    
      <ul>
     
        {productos.map((producto) => (
          <li key={producto.id}>
            <span>{producto.nombre}</span> - <span>{producto.precio}</span>
            <button onClick={() => handleEditClick(producto.id)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgregarProducto;
