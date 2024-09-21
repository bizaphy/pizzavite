import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

// Proveedor
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Empieza en estado inicial TRUE

  // Fx que cambia el token a false
  const logout = () => {
    setToken(false);
  };
  return (
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  );
};

//para llamar al context desde otros componentes
export const useUser = () => {
  return useContext(UserContext);
};