const NotFound = () => {
  return (
    <>
      <div>
        <div>
          <p className="error404-title">Error 404</p>
          <p className="error404-msj">
            No encontrabamos la pagina que buscabas 😢
            <Link
                to="/"
                className="text-white ms-3 text-decoration-none"
              >
                Regresar a Home
              </Link>
          </p>
          
        </div>
      </div>
    </>
  );
};

export default NotFound;
