//Este componente aun no funciona correctamente recordar revisar
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CallsBarteringsCC from "../services/CallsBarteringsCC"; 
import '../styles/componentscss/WallByHazelCC.css'

function WallByHazelCC() {
 
  const [barterings, setBarterings] = useState([]);
    const [interestedUsers, setInterestedUsers] = useState({}); 
    const [userId, setUserId] = useState(localStorage.getItem("idUsuario") || null); 

     useEffect(() => {
        async function fetchBarterings() {
          try {
            const fetchedBarterings = await CallsBarteringsCC.GetBarterings();
            setBarterings(fetchedBarterings); 
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error al cargar intercambios",
              text: "Hubo un problema al obtener los intercambios.",
            });
          }
        }
        fetchBarterings();
      }, []);
    
     
      async function addBartering() {
        const { value: newBartering } = await Swal.fire({
          title: "Nuevo intercambio",
          input: "text",
          inputLabel: "Nombre del intercambio",
          inputPlaceholder: "Escribe el nombre del intercambio",
          showCancelButton: true,
          confirmButtonText: "Agregar",
          cancelButtonText: "Cancelar",
        });
    
        if (!newBartering || !newBartering.trim()) {
          Swal.fire({
            icon: "warning",
            title: "Validación fallida",
            text: "El nombre del intercambio no puede estar vacío.",
          });
          return;
        }
    
        const { value: resourceRequest } = await Swal.fire({
          title: "Recurso solicitado",
          input: "text",
          inputLabel: "Escribe lo que deseas obtener",
          inputPlaceholder: "Ejemplo: Producto, servicio...",
        });
    
        const { value: resourceOffered } = await Swal.fire({
          title: "Recurso ofrecido",
          input: "text",
          inputLabel: "Escribe lo que ofrecerás",
          inputPlaceholder: "Ejemplo: Producto, servicio...",
        });
    
        try {
          const createdBartering = await CallsBarterings.PostBarterings(
            newBartering,
            userId, 
            null, 
            resourceOffered,
            resourceRequest,
            "pendiente", 
            "Comentarios aquí"
          );
          setBarterings((prevBarterings) => [...prevBarterings, createdBartering]);
          Swal.fire({
            icon: "success",
            title: "Intercambio agregado",
            text: "El intercambio se ha creado exitosamente.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al agregar intercambio",
            text: "Hubo un problema al agregar el intercambio.",
          });
        }
      }
    
    
      function handleInterest(barteringId) {
        const interestedUsersList = JSON.parse(localStorage.getItem("interestedUsers")) || [];
        if (!interestedUsersList.includes(barteringId)) {
          interestedUsersList.push(barteringId);
          localStorage.setItem("interestedUsers", JSON.stringify(interestedUsersList));
          setInterestedUsers({ ...interestedUsers, [barteringId]: true });
          Swal.fire({
            icon: "success",
            title: "Interés marcado",
            text: "Has mostrado interés en este intercambio.",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Ya estás interesado",
            text: "Ya has marcado tu interés en este truque.",
          });
        }
      }
    
      
      async function deleteBartering(id) {
        try {
          await CallsBarterings.DeleteBartering(id);
          setBarterings((prevBarterings) =>
            prevBarterings.filter((bartering) => bartering.id !== id)
          );
          Swal.fire({
            icon: "success",
            title: "Intercambio eliminado",
            text: "El intercambio ha sido eliminado con éxito.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al eliminar intercambio",
            text: "Hubo un problema al eliminar el intercambio.",
          });
        }
      }

  return (
    <div className="MuroContainer">
      <h1>Muro de Intercambios</h1>
      <button onClick={addBartering} className="AddBarteringButton">
        Agregar Intercambio
      </button>
      {barterings.length > 0 ? (
        <div className="BarteringsList">
          {barterings.map((bartering) => (
            <div key={bartering.id} className="BarteringItem">
              <p className="BarteringTitle">{bartering.nameB}</p>
              <span className={`BarteringState ${bartering.stateB}`}>
                {bartering.stateB}
              </span>
              <br />
              {userId !== bartering.idUserCreate ? (
                <button
                  onClick={() => handleInterest(bartering.id)}
                  className="InterestButton"
                >
                  Marcar interés
                </button>
              ) : (
                <button
                  onClick={() => deleteBartering(bartering.id)}
                  className="DeleteBarteringButton"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="NoBarteringsMessage">
          No hay intercambios disponibles. ¡Crea uno nuevo!
        </p>
      )}
    </div>
  )
}

export default WallByHazelCC