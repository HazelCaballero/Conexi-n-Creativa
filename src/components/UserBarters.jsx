import React, { useEffect, useState } from 'react';
import '../styles/componentscss/UserBarters.css'; // Importamos los estilos
import Swal from 'sweetalert2';

function UserBarters() {
  const [userBarters, setUserBarters] = useState([]);

  useEffect(() => {
    const currentUserId = localStorage.getItem('idUserSign');
    if (!currentUserId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró un usuario autenticado. Por favor, inicia sesión.',
      });
      return;
    }

    const storedBarters = JSON.parse(localStorage.getItem('barterings')) || [];
    const filteredBarters = storedBarters.filter(
      (barter) => barter.idUserCreate === currentUserId
    );
    setUserBarters(filteredBarters);
  }, []);

  return (
    <div className="user-barters-container">
      <h3>Mis Trueques</h3>
      {userBarters.length === 0 ? (
        <p>No has realizado ningún trueque.</p>
      ) : (
        <div className="barters-list">
          {userBarters.map((barter) => (
            <div key={barter.id} className="barter-item">
              <h4>{barter.resourceOffered}</h4>
              <p>
                <strong>Solicitado:</strong> {barter.resourceRequest}
              </p>
              <p>
                <strong>Estado:</strong> {barter.stateB}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBarters;
