import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cartcontext"; // Se importa el hook del cartcontext
import { useUser } from "../context/userContext"; // Importamos el UserContext

const Navbar = () => {
  const navigate = useNavigate();
  const { calculateTotal } = useCart(); // Aquí accedemos a la función calculateTotal del cartcontext
  const total = calculateTotal(); // Llamamos a la función
  const formattedTotal = total.toLocaleString("es-ES"); // Aseguramos de formatear el total
  
  // Accedemos al contexto del usuario
  const { token, logout } = useUser();

  const handleButtonClick = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-title">Pizzeria Mamma Mia!</div>
        <div className="navbar-buttons">
          <Link to="/" className="text-white ms-3 text-decoration-none">
            Home
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-white ms-3 text-decoration-none">
                Perfil
              </Link>
              <span
                className="logout text-white ms-3 text-decoration-none"
                onClick={logout}
              > Logout </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white ms-3 text-decoration-none">
                Login
              </Link>
             <Link to="/register" className="text-white ms-3 text-decoration-none">
                Registrar
              </Link>
            </>
          )}
        </div>
        <div className="navbar-cart">
          <Button className="button button--cart" variant="dark" onClick={handleButtonClick}>
            🛒 Total: ${formattedTotal}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;