import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CardPizza = ({ img, name, ingredients, price, onAddToCart }) => {
  return (
    <>
      <Card className="my-card">
        <Card.Img variant="top" src={img} />
        <Card.Body className="my-card-body">
          <p className="card-title">{name}</p>

          <p className="ingredients">Ingredientes:</p>
          <p className="card-ingredients">🍕{ingredients}</p>
          <p className="card-price">{price}</p>
        </Card.Body>
        <div className="button-container">
          <Button className="button-more" variant="dark">
            👀 Ver Mas
          </Button>{" "}
          {/* //Al hacer onClick, se ejecuta fx. onAddtoCart  */}
          <Button className="button-add" variant="light" onClick={onAddToCart}>
            {" "}
            🛒 Agregar
          </Button>
        </div>
      </Card>
    </>
  );
};
export default CardPizza;
