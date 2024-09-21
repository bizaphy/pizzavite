import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext"; // Importar el contexto de usuario

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const {token} = useUser(); // Usamos el contexto para obtener el token

  // Redireccion si el token es true
  if (token) {
    return <Navigate to="/" />;
  }

  // Fx validación y envío del formulario
  const validarDatos = (e) => {
    e.preventDefault(); // Prev comportamiento por defecto

    // Validación de inputs
    if (!mail.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe ser de al menos 6 caracteres");
      return;
    }

    // Si todas las valdiaciones pasan, reinicia formulario
    setMail("");
    setPassword("");
    setError(""); // Reinicia msje de error
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
        <label htmlFor="email">Contraseña</label>
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