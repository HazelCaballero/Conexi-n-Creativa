import React, { useState } from 'react';
import Swal from "sweetalert2";
import '../styles/componentscss/LoginByHazelCC.css';
import CallsUsersCC from '../services/CallsUsersCC'; // Asegúrate de que la ruta sea correcta

function validateInputs(nameU, emailU, passwordU, phoneU) {
    const nameRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^\d{8,15}$/;

    if (!nameU || !emailU || !passwordU || !phoneU) {
        return { valid: false, message: "Todos los campos son obligatorios." };
    }
    if (!nameRegex.test(nameU)) {
        return { valid: false, message: "El nombre debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas." };
    }
    if (!emailRegex.test(emailU)) {
        return { valid: false, message: "El correo electrónico no tiene un formato válido." };
    }
    if (!passwordRegex.test(passwordU)) {
        return { valid: false, message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número." };
    }
    if (!phoneRegex.test(phoneU)) {
        return { valid: false, message: "El número de teléfono debe tener entre 8 y 15 dígitos numéricos." };
    }

    return { valid: true };
}

function LoginByHazelCC() {
    const [nameUser, setUserName] = useState("");
    const [emailUser, setUserEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [phoneUser, setPhoneUser] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleLoginCC(event) {
        event.preventDefault();
        const validation = validateInputs(nameUser, emailUser, passwordUser, phoneUser);

        if (!validation.valid) {
            Swal.fire({
                icon: "warning",
                title: "Validación fallida",
                text: validation.message,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Llamada a la función PostUsersCC desde CallsUsersCC
            const response = await CallsUsersCC.PostUsersCC(nameUser, emailUser, passwordUser, phoneUser);

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "El usuario ha sido registrado correctamente.",
            });

            // Limpiar los campos después del registro exitoso
            setUserName("");
            setUserEmail("");
            setPasswordUser("");
            setPhoneUser("");

            console.log("Respuesta del servidor:", response);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al registrar",
                text: "Hubo un problema al intentar registrar el usuario. Inténtalo nuevamente.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="LoginContainer">
            <h1 className="logTitle">Crear Nueva Cuenta</h1>
            <form onSubmit={handleLoginCC}>
                <label htmlFor="nameUser" className="NameUserLabelCss">Nombre de usuaria</label> <br />
                <input
                    id="nameUser"
                    className="NameUserInputCss"
                    value={nameUser}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Escribe tu usuario"
                /> <br />

                <label htmlFor="emailUser" className="EmailUserLabelCss">Email</label> <br />
                <input
                    id="emailUser"
                    className="EmailUserInputCss"
                    value={emailUser}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                    placeholder="Escribe tu correo"
                /> <br />

                <label htmlFor="passwordUser" className="PasswordUserLabelCss">Contraseña</label> <br />
                <input
                    id="passwordUser"
                    className="PasswordUserInputCss"
                    value={passwordUser}
                    onChange={(e) => setPasswordUser(e.target.value)}
                    type="password"
                    placeholder="Crear contraseña segura"
                /> <br />

                <label htmlFor="phoneUser" className="PhoneUserLabelCss">Teléfono</label> <br />
                <input
                    id="phoneUser"
                    className="PhoneUserInputCss"
                    value={phoneUser}
                    onChange={(e) => setPhoneUser(e.target.value)}
                    type="text"
                    placeholder="Escribe tu número de teléfono"
                /> <br />

                <button className="btnAddLoginCss" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginByHazelCC;
