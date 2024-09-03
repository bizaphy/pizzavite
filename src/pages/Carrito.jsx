import React from "react";

const Carrito = ({
  cart = [],
  increaseQuantity,
  decreaseQuantity,
  calculateTotal,
}) => {
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
                <button
                  className="button-cart decrease"
                  onClick={() => increaseQuantity(pizza.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
          <div className="total">TOTAL: ${calculateTotal()}</div>
          <button className="pagar">PAGAR</button>
        </ul>
      )}
    </div>
  );
};

export default Carrito;
