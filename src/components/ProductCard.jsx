import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import ProductImage from "./ProductImage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/handleCart";

const ProductCard = (props) => {
  const { productId, name, description, price, size, category_name } = props;
  const [productShow, setproductShow] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Create a payload with product details
    const payload = {
      product: productId,
      name: name, // Replace with the actual property name in your product object
      quantity: 1, // You can set the initial quantity to 1 or any other value
      price: parseFloat(price), // Replace with the actual property for the product price
    };
    // Dispatch the addToCart action with the payload
    dispatch(addToCart(payload));
  };
  return (
    <>
      <Card
        border="secondary"
        className="m-2 h-100 text-center "
        key={productId}
      >
        {/*<Card.Img variant="top" src={process.env.PUBLIC_URL + "images/w4.png"} />*/}

        <ProductImage productId={productId} size={size} />

        <Card.Body>
          <Card.Title as="h5" className="title-text">
            {name}...
          </Card.Title>
          <Card.Text className="decription-text">{description}...</Card.Text>
        </Card.Body>
        <Card.Text className="text-center">{price}</Card.Text>
        <Card.Body className="text-center">
          <Button
            variant="secondary"
            onClick={() => setproductShow(true)}
            className="m-1"
          >
            Buy
          </Button>
          <Button variant="secondary" className="m-1" onClick={handleAddToCart}>
            Add Cart
          </Button>
        </Card.Body>
      </Card>
      <Modal
        show={productShow}
        onHide={() => setproductShow(false)}
        dialogClassName="custom-modal"
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {category_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="my-5 py-2">
            <Row>
              <Col md={6} sm={12} py={3}>
                <ProductImage productId={productId} size={600}></ProductImage>
              </Col>
              <Col md={6} sm={12} py={5}>
                <h1 className="display-5">{name}</h1>
                <h3 className="display-6 my-4">${price}</h3>
                <p className="lead">{description}</p>
                <Button variant="outline-dark" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Link to="/cart" className="btn btn-dark mx-3">
                  Go to Cart
                </Link>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCard;
