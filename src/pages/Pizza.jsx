import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import Button from "react-bootstrap/Button";

const Pizza = () => {
  const { id } = useParams();  //obtenemos id desde Params
  const [pizza, setPizza] = useState({});
  
  //fx getPizza dara la info de la pizza
  const getPizza = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);  //construccion dinamica desde params, tomando el valor id pizza como url
      const pizza = await response.json();
      setPizza(pizza);
    } catch (error) {
      console.error("Error al obtener la pizza:", error); //En caso de no cargar nos indicara por consola que no pudo obtener la pizza
    }
  };
  
  //efecto llama a fx getPizza al cargar pag o al cambiar id
  useEffect(() => {
    getPizza();
  }, [id]);  
  
  return (
    <div id={pizza.id} className="newCard">
      {pizza.name ? (
        <>
          <img src={pizza.img} alt={pizza.name} className="newCard-img" />
          <p>{pizza.name}</p>
          <p>${pizza.price?.toLocaleString("es-ES")}</p>
          <ul>
            {pizza.ingredients?.map((ingredient) => ( //confirma la existencia de los ingredientes antes de cargar para evitar un error
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p>{pizza.desc}</p>
          <Button className="button-add" variant="light">
            🛒 Agregar
          </Button>
        </>
      ) : (
        <p>No se encontró la pizza.</p>
      )}
    </div>
  );
};

export default Pizza;