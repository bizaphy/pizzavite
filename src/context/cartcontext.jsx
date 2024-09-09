import { createContext, useState, useContext } from "react";

// Creamos el contexto
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar pizzas al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);
      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...pizza, price: Number(pizza.price), quantity: 1 }];
      }
    });
  };

  // Función para aumentar la cantidad
  const increaseQuantity = (pizzaId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === pizzaId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para disminuir la cantidad
  const decreaseQuantity = (pizzaId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Función para calcular el total
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((pizza) => {
      total += Number(pizza.price) * pizza.quantity;
    });
    return total.toLocaleString("es-ES"); //formateamos a clp
  };
//Aqui retornamos los valores que usaremos
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};