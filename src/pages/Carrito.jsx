import React from "react";
import { useCart } from "../context/cartcontext"; 
import { useUser } from "../context/userContext";

const Carrito = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } = useCart(); // Obtenemops cart y fx del contexto
  const {token} = useUser(); //Para tener el token

  // const checkPago = () => {
  //   if (token) {
  //     console.log('Procesando pago')
  //   } else {
  //     alert("Necesitas estar logeado para pagar")
  //   }
  // }

  return (
    <div className="cart-container">
      <h2 className="section-title">Carrito</h2>
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
          <button className="pagar" disabled={token ? false : true}>
            PAGAR
          </button>
        </ul>
      )}
    </div>
  );
};

export default Carrito;