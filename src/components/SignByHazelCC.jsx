import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CallsUsersCC from "../services/CallsUsersCC"; 
import "../styles/componentscss/SingByHazelCC.css";

function SignByHazelCC() {
  
  const [userNameSign, setUserNameSign] = useState("");
  const [passwordUserSign, setPasswordUserSign] = useState("");
  const [usersSign, setUsersSign] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    async function fetchDataUsers() {
      try {
        const datos = await CallsUsersCC.GetUsersCC(); 
        if (Array.isArray(datos)) {
          setUsersSign(datos);
        } else {
          console.error("Error: los datos no son un arreglo:", datos);
        }
      } catch (error) {
        console.error("Error obteniendo usersSign:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar los usuarios. Por favor, inténtalo más tarde."
        });
      }
    }
    fetchDataUsers();
  }, []);

 
  function authenticate() {
    if (!userNameSign || !passwordUserSign) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos antes de continuar."
      });
      return;
    }

  
    const found = usersSign.find(
      (usuario) =>
        usuario.nameU?.trim().toLowerCase() === userNameSign.trim().toLowerCase() &&
        usuario.passwordU === passwordUserSign
    );

    if (!found) {
      Swal.fire({
        icon: "error",
        title: "Autenticación fallida",
        text: "Usuario o contraseña incorrectos. Inténtalo nuevamente."
      });
    } else {
     
      localStorage.setItem("idUsuerSign", found.id);
      localStorage.setItem("nameUserSign", found.nameU);
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola, ${userNameSign}. Redirigiéndote al inicio...`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
      
        navigate("/Muro"); 
      });
    }
  }

  return (
    <div className="SignByHazelCCContainer">
      <h2 className="signTitle">Iniciar sesión</h2>

      <label className="labelSignStyle">Usuario</label> <br />
      <input
        className="inputSignStyle"
        value={userNameSign}
        onChange={(e) => setUserNameSign(e.target.value)}
        type="text"
        placeholder="Ingresa tu usuario"
      /> <br />

      <label className="labelSignStyle">Contraseña</label> <br />
      <input
        className="inputSignStyle"
        value={passwordUserSign}
        onChange={(e) => setPasswordUserSign(e.target.value)}
        type="password"
        placeholder="Ingresa tu contraseña"
      /> <br />

      <button className="btnSignStyle" onClick={authenticate}>Iniciar sesión</button>
    </div>
  );
}

export default SignByHazelCC;
