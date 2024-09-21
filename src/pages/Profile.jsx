import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext"; // Importa el contexto de usuario

const Profile = () => {
  const { token, logout } = useUser(); // Accede al token y la función de cerrar sesión desde el contexto

  // Si no hay token, redirige al usuario a la página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="user-container">
        <div className="user-info">
          <p>
            Usuario: <span className="user-name">Giuseppe</span>
          </p>
          <p>Email: giusepp44@gmail.com</p>
          {/* Llama a la función logout cuando el usuario hace clic en "Cerrar sesión" */}
          <button className="logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;