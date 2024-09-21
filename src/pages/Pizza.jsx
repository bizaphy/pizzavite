import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import Button from "react-bootstrap/Button";

const Pizza = () => {
  const { id } = useParams();  // id desde Params
  const [pizza, setPizza] = useState({});
  
  const getPizza = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);  
      const pizza = await response.json();
      setPizza(pizza);
    } catch (error) {
      console.error("Error al obtener la pizza:", error);
    }
  };
  
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
            {pizza.ingredients?.map((ingredient) => (
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