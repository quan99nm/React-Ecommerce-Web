import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import categoryService from "../services/categoryService";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const loadData = () => {
    productService.list().then((res) => {
      setproducts(res.data);
    });
    categoryService.list().then((res) => {
      setcategories(res.data);
    });
  };
  const loadDataOfCategory = (e, id) => {
    categoryService.get(id).then((res) => {
      setproducts(res.data.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container className="my-3 py-3">
        <Row>
          <Col>
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <ButtonGroup className="d-flex justify-content-center py-5">
            <Button
              variant="outline-dark"
              size="sm"
              className="m-2"
              onClick={() => loadData()}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline-dark"
                size="sm"
                className="m-2"
                onClick={(e) => loadDataOfCategory(e, category.id)}
              >
                {category.name}
              </Button>
            ))}
          </ButtonGroup>
        </Row>
        <Row className="justify-content-md-center ">
          {products.map((row, idx) => (
            <Col md={6} lg={4} key={idx} className="mt-5">
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
    </>
  );
};

export default Products;
