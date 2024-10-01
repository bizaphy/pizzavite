import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext"; // Importa el contexto de usuario

const Profile = () => {
  const { token, userProfile, getProfile, logout } = useUser(); // Se obtiene perfil y el metodo getProfile del contexto

  // Si no hay token, se redirige a pag de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Usa useEffect para obtener el perfil del usuario al cargar el componente
  useEffect(() => {
    if (!userProfile) {
      // Si no tenemos el perfil en el estado, intenta obtenerlo
      getProfile();
    }
  }, [userProfile, getProfile]);

  // Si aún no se ha obtenido el perfil, muestra un mensaje de carga
  if (!userProfile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <>
      <div className="user-container">
        <div className="user-info">
          <p>
            Usuario: <span className="user-name">{userProfile.name}</span>
          </p>
          <p>Email: {userProfile.email}</p>
          {/*LOGOUT AL HACER CLICK EN CERRAR SESION  */}
          <button className="logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
