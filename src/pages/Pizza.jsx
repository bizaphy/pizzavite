import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const Pizza = () => {
  const [pizza, setPizza] = useState({});
  const getPizza = async () => {
    const response = await fetch("http://localhost:5000/api/pizzas/p001");
    const pizza = await response.json();
    setPizza(pizza);
  };
  useEffect(() => {
    getPizza();
  }, []);
  return (
    <div id={pizza.id} className="newCard">
      <img src={pizza.img} alt={pizza.name} className="newCard-img" />
      <p>{pizza.name}</p>
      <p>${pizza.price?.toLocaleString("es-ES")}</p>
      <ul>
        {pizza.ingredients?.map((ingredient) => {
          return <li key={ingredient}> {ingredient} </li>;
        })}
      </ul>
      <p>{pizza.desc}</p>
      <Button className="button-add" variant="light">
        {" "}
        🛒 Agregar
      </Button>
    </div>
  );
};

export default Pizza;
