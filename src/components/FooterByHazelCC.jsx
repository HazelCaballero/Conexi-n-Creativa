import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/componentscss/FooterByHazelCC.css';

function FooterByHazelCC() {
  const navigate = useNavigate();

  const navigateToComunicate = () => {
    navigate('/Comunicate');
  };

  return (
    <div>
      <footer>
        <div className="footer-item">Derechos reservados 2025</div> {/* Alineado a la izquierda */}
        <div>
          <button onClick={navigateToComunicate}>Comunicate</button> {/* Alineado a la derecha */}
        </div>
      </footer>
    </div>
  );
}

export default FooterByHazelCC;
