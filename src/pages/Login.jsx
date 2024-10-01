import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext"; // Importar el contexto de usuario

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const { token, login } = useUser(); // Usamos el contexto para obtener el token y la función login

  // Redireccion si el token existe
  if (token) {
    return <Navigate to="/" />;
  }

  // Fx validación y envío del formulario
  const validarDatos = async (e) => {
    e.preventDefault(); // Previene comportamiento por defecto

    // Validación de inputs
    if (!mail.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe ser de al menos 6 caracteres");
      return;
    }

    // Llamamos al método login del contexto
    try {
      await login(mail, password); // Llamamos a la función login del UserContext
    } catch (error) {
      setError("Error en el inicio de sesión. Intenta nuevamente.");
    }

    // Si todas las validaciones pasan, reinicia el formulario
    setMail("");
    setPassword("");
    setError(""); // Reinicia el mensaje de error
  };

  return (
    <>
      <form onSubmit={validarDatos} className="form">
        {error && <p className="error-msg">{error}</p>}
        <h3 className="form-title-login">Login</h3>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="text"
          name="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default Login;
