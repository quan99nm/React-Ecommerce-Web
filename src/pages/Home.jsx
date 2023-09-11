import React from "react";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const Home = (props) => {
  return (
    <Container>
      <Slider />
      <Container className="pt-5">
        <Row className="justify-content-md-center">
          <h1 className="mb-3 text-center">Heading</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6} lg={4}>
            <ProductCard />
          </Col>
          <Col md={6} lg={4}>
            <ProductCard />
          </Col>
          <Col md={6} lg={4}>
            <ProductCard />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
