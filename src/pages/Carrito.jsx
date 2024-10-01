import React, { useState } from "react";
import { useCart } from "../context/cartcontext";
import { useUser } from "../context/userContext";

const Carrito = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } =
    useCart(); // Obtenemos cart y funciones del contexto
  const { token } = useUser(); // Para obtener el token
  const [cartMessage, setCartMessage] = useState(""); // Estado para mostrar mensajes de éxito o error

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes logearte para poder pagar");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // se envia token con esquema bearer en el encabezado
        },
        body: JSON.stringify({
          items: cart, // Envia items del carrito
          total: calculateTotal(), // Se envia el total de la compra
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCartMessage("Compra realizada con éxito");
      } else {
        setCartMessage(
          `Error en la compra: ${data?.error || "Error desconocido"}`
        );
      }
    } catch (error) {
      console.error("Error en el checkout:", error);
      setCartMessage("Error en el servidor. Intenta nuevamente.");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="section-title">Carrito</h2>
      {cartMessage ? <p>{cartMessage}</p> : null}
      {cart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <ul className="list-group">
          {cart.map((pizza) => (
            <li key={pizza.id} className="list-group-item">
              <img className="cart-item" src={pizza.img} alt={pizza.name} />
              <span>
                {pizza.name} - ${pizza.price} x{" "}
                <strong className="quantity-number">{pizza.quantity}</strong>
              </span>
              <div className="button-cart-container">
                <button
                  className="button-cart increase"
                  onClick={() => decreaseQuantity(pizza.id)}
                >
                  -
                </button>
                <div
                  className="button-cart decrease"
                  onClick={() => increaseQuantity(pizza.id)}
                >
                  +
                </div>
              </div>
            </li>
          ))}
          <div className="total total--alone">TOTAL: ${calculateTotal()}</div>
          <button
            className="pagar"
            onClick={handleCheckout} // CHECKOUT FX
            disabled={token ? false : true} // Deshabilitar si no hay token
          >
            PAGAR
          </button>
        </ul>
      )}
    </div>
  );
};

export default Carrito;
