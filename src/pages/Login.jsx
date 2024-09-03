import { useState } from "react";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para el mensaje de error
  const [error, setError] = useState("");

  // Antes de enviar formulario
  const validarDatos = (e) => {
    e.preventDefault(); // Prevenimos comp. defecto

    // Validación de inputs
    if (!mail.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La password debe ser de al menos 6 caracteres");
      return;
    }

    // Si todas las validaciones pasan, reinicia el formulario
    setMail("");
    setPassword("");

    setError(""); // Reiniciar el mensaje de error
  };

  return (
    <>
      <form onSubmit={validarDatos} className="form">
        {/* Usamos un shortcircuit de AND */}
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
