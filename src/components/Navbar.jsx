import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const total = 25000;
  const formattedTotal = total.toLocaleString("es-ES");
  const token = false;

  const handleButtonClick = () => {
    navigate("/pizzareact-gitpage/cart");
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-title">Pizzeria Mamma Mia!</div>
        <div className="navbar-buttons">
          <Link
            to="/pizzareact-gitpage/"
            className="text-white ms-3 text-decoration-none"
          >
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
              <Link
                to="/pizzareact-gitpage/profile"
                className="text-white ms-3 text-decoration-none"
              >
                Perfil
              </Link>

              <Link
                to="/pizzareact-gitpage/register"
                className="text-white ms-3 text-decoration-none"
              >
                Registrar
              </Link>
            </>
          )}
        </div>
        <div className="navbar-cart">
          <Button
            className="button button--cart"
            variant="dark"
            onClick={handleButtonClick}
          >
            🛒 Total: ${formattedTotal}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
