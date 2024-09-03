import "bootstrap/dist/css/bootstrap.min.css";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import Carrito from "./Carrito"; // Importamos el nuevo componente Carrito
// import { pizzas } from "../assets/pizzas";
import { useEffect, useState } from "react";

const Home = () => {
  //Reemplazar json interno por un json desde API
  const [pizzas, setPizzas] = useState([]); //Parte el State vacio

  const getPizzas = async () => {
    const respuesta = await fetch("http://localhost:5000/api/pizzas");
    const pizzas = await respuesta.json();

    setPizzas(pizzas);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  const [cart, setCart] = useState([]); //Parte el State vacio (osea, el carro parte vacio)
  // Función para agregar pizza al carrito
  const addToCart = (pizza) => {
    // Verifica si la pizza ya está en el carrito
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);
      //Esta parte examina si es necesario aumentar la cantidad, o agregar al carrito como tal
      if (existingPizza) {
        // Si ya existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no existe, agrega la pizza con cantidad inicial = 1
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };
  // FUNCION PARA CARRITO ---> AUMENTA ctd pizza selecc. en el carrito al clickear boton
  const increaseQuantity = (pizzaId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === pizzaId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  // FUNCION PARA CARRITO ---> DISMINUYE ctd. pizza selecc. en el carrito al clickear boton
  const decreaseQuantity = (pizzaId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  //FUNCION PARA CARRITO ---> Calculo Total (se activa al renderizar pag con setCart)
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((pizza) => {
      total += pizza.price * pizza.quantity;
      total = total.toLocaleString("es-ES");
    });
    return total;
  };

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
        {/* Esta parte generara cada card de pizza */}
        <p className="section-title available">Pizzas Disponibles</p>
        <div className="cards">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              img={pizza.img}
              name={pizza.name}
              ingredients={pizza.ingredients.join(", ")}
              price={`$${pizza.price.toLocaleString("es-ES")}`} //Se agrega el signo monetario sin destruir el codigo xD
              onAddToCart={() => addToCart(pizza)} //// Enlazamos la función onAddtoCart y se llama a fx. addToCart
            />
          ))}
        </div>
        <div className="spacing"></div>
      </div>
    </>
  );
};

export default Home;
