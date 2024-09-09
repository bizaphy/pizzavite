import "bootstrap/dist/css/bootstrap.min.css";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import Carrito from "./Carrito";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartcontext"; // Importamos el hook del contexto

const Home = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity, calculateTotal } = useCart();
  const [pizzas, setPizzas] = useState([]);

  const getPizzas = async () => {
    const respuesta = await fetch("http://localhost:5000/api/pizzas");
    const pizzas = await respuesta.json();
    //Pasamos los precios a numericos, para evitar suma de strings.
    const pizzasConPreciosNumericos = pizzas.map((pizza) => ({
      ...pizza,
      price: Number(pizza.price),
    }));
    setPizzas(pizzasConPreciosNumericos);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <Header />
      <div className="container-carrito">
        <Carrito
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          calculateTotal={calculateTotal}
        />
        <p className="section-title available">Pizzas Disponibles</p>
        <div className="cards">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              img={pizza.img}
              name={pizza.name}
              ingredients={pizza.ingredients.join(", ")}
              price={`$${pizza.price.toLocaleString("es-ES")}`}
              onAddToCart={() => addToCart(pizza)}
            />
          ))}
        </div>
        <div className="spacing"></div>
      </div>
    </>
  );
};

export default Home;