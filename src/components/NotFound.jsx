import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>
        <div>
          <p className="error404-title">Error 404</p>
          <p className="error404-msj">
            No encontrabamos la página que buscabas 😢
            
          </p>
          <div className="backtohome">         <Link to="/" className="back-home-link">
            Volver a la página principal
          </Link></div>

        </div>
      </div>
    </>
  );
};

export default NotFound;