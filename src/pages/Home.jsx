import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import productService from "../services/productService";

const Home = (props) => {
  const [products, setproducts] = useState([]);
  const loadData = () => {
    productService.getNewest().then((res) => {
      setproducts(res.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Slider />
      <Container className="pt-5">
        <Row className="justify-content-md-center square  border-bottom border-2 mb-2">
          <h1 className="mb-3 text-center">Heading</h1>
        </Row>
        <Row className="justify-content-md-center mt-5 ">
          {products.map((row, idx) => (
            <Col md={6} lg={4} key={idx}>
              <ProductCard
                productId={row.id}
                name={row.name}
                description={row.description}
                price={row.price}
                size={300}
                category_name={row.category_name}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="pt-5">
        <Row className="justify-content-md-center square  border-bottom border-2 mb-2">
          <h1 className="mb-3 text-center">Heading</h1>
        </Row>
        <Row className="justify-content-md-center mt-5 ">
          {products.map((row, idx) => (
            <Col md={6} lg={4} key={idx}>
              <ProductCard
                productId={row.id}
                name={row.name.substring(0, 12)}
                description={row.description.substring(0, 90)}
                price={row.price}
                size={300}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
