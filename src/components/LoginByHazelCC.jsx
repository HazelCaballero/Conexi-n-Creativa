import React, { useState } from 'react'; // Importamos React y useState para manejar el estado del componente
import Swal from "sweetalert2"; // Importamos SweetAlert para mostrar mensajes emergentes
import '../styles/componentscss/LoginByHazelCC.css'; // Importamos los estilos específicos para este componente
import CallsUsersCC from '../services/CallsUsersCC'; // Importamos la función que realiza las llamadas a la API relacionada con usuarios

// Función para validar los datos del formulario (nombre, correo, contraseña, teléfono)
function validateInputs(nameU, emailU, passwordU, phoneU) {
    // Expresiones regulares para validar cada campo
    const nameRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;  // Expresión para validar nombre (mínimo 8 caracteres, letras mayúsculas y minúsculas)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expresión para validar correo electrónico
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;  // Expresión para validar contraseña (mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
    const phoneRegex = /^\d{8,15}$/;  // Expresión para validar teléfono (de 8 a 15 dígitos numéricos)

    // Comprobamos si todos los campos están completos
    if (!nameU || !emailU || !passwordU || !phoneU) {
        return { valid: false, message: "Todos los campos son obligatorios." };  // Retorna un error si algún campo está vacío
    }

    // Validamos cada campo con las expresiones regulares
    if (!nameRegex.test(nameU)) {
        return { valid: false, message: "El nombre debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas." };  // Error si el nombre no es válido
    }
    if (!emailRegex.test(emailU)) {
        return { valid: false, message: "El correo electrónico no tiene un formato válido." };  // Error si el correo no tiene formato válido
    }
    if (!passwordRegex.test(passwordU)) {
        return { valid: false, message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número." };  // Error si la contraseña no cumple con los requisitos
    }
    if (!phoneRegex.test(phoneU)) {
        return { valid: false, message: "El número de teléfono debe tener entre 8 y 15 dígitos numéricos." };  // Error si el teléfono no es válido
    }

    // Si todo es válido, retornamos true
    return { valid: true };
}

function LoginByHazelCC() {
    // Declaramos los estados para manejar los valores de los campos del formulario
    const [nameUser, setUserName] = useState("");  // Estado para el nombre de usuario
    const [emailUser, setUserEmail] = useState("");  // Estado para el correo electrónico del usuario
    const [passwordUser, setPasswordUser] = useState("");  // Estado para la contraseña del usuario
    const [phoneUser, setPhoneUser] = useState("");  // Estado para el teléfono del usuario
    const [isSubmitting, setIsSubmitting] = useState(false);  // Estado para saber si el formulario se está enviando

    // Función que se ejecuta cuando se envía el formulario
    async function handleLoginCC(event) {
        event.preventDefault();  // Prevenimos la acción predeterminada del formulario (recarga de página)

        // Validamos los datos del formulario antes de enviarlos
        const validation = validateInputs(nameUser, emailUser, passwordUser, phoneUser);

        if (!validation.valid) {
            // Si la validación falla, mostramos un mensaje de advertencia con SweetAlert
            Swal.fire({
                icon: "warning",
                title: "Validación fallida",
                text: validation.message,  // Mensaje de error dependiendo del campo inválido
            });
            return;  // Detenemos la ejecución si hay errores en la validación
        }

        setIsSubmitting(true);  // Indicamos que se está enviando el formulario

        try {
            // Llamamos a la API para registrar al usuario
            const response = await CallsUsersCC.PostUsersCC(nameUser, emailUser, passwordUser, phoneUser);

            // Automatically log in the user after successful registration
            localStorage.setItem("idUserSign", response.id);
            localStorage.setItem("nameUserSign", response.nameU);

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "El usuario ha sido registrado correctamente. Iniciando sesión...",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            }).then(() => {
                // Redirect to the desired page after login
                window.location.href = "/Muro";
            });

            // Limpiamos los campos del formulario después de un registro exitoso
            setUserName("");
            setUserEmail("");
            setPasswordUser("");
            setPhoneUser("");

            console.log("Respuesta del servidor:", response);  // Opcional: para ver la respuesta de la API
        } catch (error) {
            // Si hay un error al llamar a la API, mostramos un mensaje de error
            Swal.fire({
                icon: "error",
                title: "Error al registrar",
                text: "Hubo un problema al intentar registrar el usuario. Inténtalo nuevamente.",  // Mensaje de error en caso de fallo
            });
        } finally {
            // Independientemente de si la llamada fue exitosa o no, desactivamos el estado de envío
            setIsSubmitting(false);
        }
    }

    return (
        <div className="LoginContainer">
            <h1 className="logTitle">Crear Nueva Cuenta</h1>
            <form onSubmit={handleLoginCC}>
                {/* Campo de nombre de usuario */}
                <label htmlFor="nameUser" className="NameUserLabelCss">Nombre de usuaria</label> <br />
                <input
                    id="nameUser"
                    className="NameUserInputCss"
                    value={nameUser}  // Valor del estado nameUser
                    onChange={(e) => setUserName(e.target.value)}  // Actualiza el valor del nombre
                    type="text"
                    placeholder="Escribe tu usuario"
                /> <br />

                {/* Campo de correo electrónico */}
                <label htmlFor="emailUser" className="EmailUserLabelCss">Email</label> <br />
                <input
                    id="emailUser"
                    className="EmailUserInputCss"
                    value={emailUser}  // Valor del estado emailUser
                    onChange={(e) => setUserEmail(e.target.value)}  // Actualiza el valor del correo
                    type="email"
                    placeholder="Escribe tu correo"
                /> <br />

                {/* Campo de contraseña */}
                <label htmlFor="passwordUser" className="PasswordUserLabelCss">Contraseña</label> <br />
                <input
                    id="passwordUser"
                    className="PasswordUserInputCss"
                    value={passwordUser}  // Valor del estado passwordUser
                    onChange={(e) => setPasswordUser(e.target.value)}  // Actualiza el valor de la contraseña
                    type="password"
                    placeholder="Crear contraseña segura"
                /> <br />

                {/* Campo de teléfono */}
                <label htmlFor="phoneUser" className="PhoneUserLabelCss">Teléfono</label> <br />
                <input
                    id="phoneUser"
                    className="PhoneUserInputCss"
                    value={phoneUser}  // Valor del estado phoneUser
                    onChange={(e) => setPhoneUser(e.target.value)}  // Actualiza el valor del teléfono
                    type="text"
                    placeholder="Escribe tu número de teléfono"
                /> <br />

                {/* Botón para enviar el formulario */}
                <button className="btnAddLoginCss" type="submit" disabled={isSubmitting}>
                    {/* Cambia el texto del botón dependiendo de si el formulario se está enviando */}
                    {isSubmitting ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginByHazelCC;  // Exportamos el componente para ser usado en otras partes de la aplicación
