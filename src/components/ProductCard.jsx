import { Card, CardGroup, ListGroup } from "react-bootstrap";

const ProductCard = () => {
  return (
    <CardGroup className="p-5  bg-light border">
      <Card.Img variant="top" src={process.env.PUBLIC_URL + "images/w4.png"} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </CardGroup>
  );
};

export default ProductCard;
