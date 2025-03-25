//Recordar comentar y recuerda el readme que lo olvidaste la otra vez
import React from 'react'; 
import HeaderByHazelCC from '../components/HeaderByHazelCC'; 
import AsideByHazelCC from '../components/AsideByHazelCC'; 
import FooterByHazelCC from '../components/FooterByHazelCC'; 
import AgregarProducto from '../components/AgregarProducto'; 
import '../styles/pagescss/AdminTools.css';


function AdminTools() {
  return (
    <div className="admin-tools-grid"> 
      
      <div className="header-container"> 
        <HeaderByHazelCC /> 
      </div>

      <div className="aside-container"> 
        <AsideByHazelCC /> 
      </div>

      <div className="agregar"> 
        <AgregarProducto /> 
      </div>

      <div className="footer-container"> 
        <FooterByHazelCC /> 
      </div>
    </div>
  );
}

export default AdminTools; 