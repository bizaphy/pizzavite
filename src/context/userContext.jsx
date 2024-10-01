import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

// Proveedor
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Empiezan en estado inicial NULL
  const [email, setEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  ///////////////////////////////////////////////////////////////////////////////
  // Fx para logout, cambiara el valor del token a null. Mismo caso para el correo y perfil
  ///////////////////////////////////////////////////////////////////////////////
  const logout = () => {
    setToken(null);
    setEmail(null);
    setUserProfile(null);
    //Con localStorage.removeItem se limpia el perfil del usuario cuando cerremos esta sesion
    localStorage.removeItem("token");
  };

  ///////////////////////////////////////////////////////////////////////////////
  // Fx para login, cambiara el valor del token a null. Mismo caso para el correo
  ///////////////////////////////////////////////////////////////////////////////

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Autenticacion correcta hara que se almacene token ymail
      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem("token", data.token); // El token se guarda en localStorage
        alert("Login exitoso");
      } else {
        alert(data?.error || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error en el servidor");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////
  // Fx para REGISTER, cambiara el valor del token a null. Mismo caso para el correo
  ///////////////////////////////////////////////////////////////////////////////

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Si el registro es exitoso, almacena el token y el mail
      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem("token", data.token); // Se guarda el token en localStorage
        alert("Registro exitoso");
      } else {
        alert(data?.error || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el servidor");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////
  // Fx para PROFILE, paraobtener sus valores
  ///////////////////////////////////////////////////////////////////////////////
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");
      //uso de bearer para autenticar
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data); // guarda datos de perfil en el state
      } else {
        console.error(data?.error || "Error al obtener el perfil");
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, userProfile, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

//para llamar al context desde otros componentes
export const useUser = () => {
  return useContext(UserContext);
};
