import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cartcontext"; // Se importa coxntext hook

const Navbar = () => {
  const navigate = useNavigate();
  const { calculateTotal } = useCart(); // Aqui accedemos a fx.calculateTotal del cartcontext
  const total = calculateTotal(); // Llamamos a la fx
  const formattedTotal = total.toLocaleString("es-ES"); // Aseguramos de formatear el total
  const token = false; 

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
              <Link to="/" className="text-white ms-3 text-decoration-none">
                Home
              </Link>
              <Button className="button button--logout">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-white ms-3 text-decoration-none">
                Perfil
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