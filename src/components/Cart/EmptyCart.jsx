import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/products" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmptyCart;
