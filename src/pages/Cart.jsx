import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  finishCheckOut,
  removeFromCart,
} from "../store/reducers/handleCart";
import EmptyCart from "../components/Cart/EmptyCart";
import ProductImage from "../components/ProductImage";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import orderService from "../services/orderService";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters")
    .required("Phone number is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
};

const Cart = () => {
  const [checkout, setcheckout] = useState(false);
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  const removeItem = (product) => {
    dispatch(removeFromCart(product));
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // You can access the form values here
      console.log(values);
      // You can perform additional actions, like submitting the data to an API
      // Example: sendFormDataToApi(values).then(response => { /* handle response */ });
      const postData = {
        customer: user.isLoggedIn ? user.userInfo.profile.id : null, // Replace with customer data if available
        phone: values.phone,
        address: values.address,
        name: values.firstName + values.lastName,
        total_price: Math.round(state.totalPrice),
        order_items: state.items,
      };

      orderService.create_order(postData).then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          toast.success("Order successful");
          setSubmitting(false);
          dispatch(finishCheckOut());
          setcheckout(false);
        }
      });
    },
  });
  return (
    <>
      <Modal
        show={checkout}
        onHide={() => setcheckout(false)}
        dialogClassName="checkout-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-5">
            <Row className="my-4">
              <Col md={5} lg={4} className="order-md-last">
                <Card className="mb-4">
                  <Card.Header className="py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({state.totalItem})
                        <span>${Math.round(state.totalPrice)}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${30}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(state.totalPrice + 30)}</strong>
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={7} lg={8}>
                <Card className="mb-4">
                  <Card.Header>
                    <h4 className="mb-0">Billing address</h4>
                  </Card.Header>
                  <Card.Body>
                    <Form
                      className="needs-validation"
                      onSubmit={formik.handleSubmit}
                    >
                      <Row className="g-3">
                        <Col sm={6} className="my-1">
                          <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              {...formik.getFieldProps("firstName")}
                              isInvalid={
                                formik.touched.firstName &&
                                formik.errors.firstName
                              }
                              isValid={
                                formik.touched.firstName &&
                                !formik.errors.firstName
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.firstName}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col sm={6} className="my-1">
                          <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              {...formik.getFieldProps("lastName")}
                              isInvalid={
                                formik.touched.lastName &&
                                formik.errors.lastName
                              }
                              isValid={
                                formik.touched.lastName &&
                                !formik.errors.lastName
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.lastName}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col sm={12} className="my-1">
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              {...formik.getFieldProps("email")}
                              isInvalid={
                                formik.touched.email && formik.errors.email
                              }
                              isValid={
                                formik.touched.email && !formik.errors.email
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.email}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col sm={12} className="my-1">
                          <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              {...formik.getFieldProps("address")}
                              isInvalid={
                                formik.touched.address && formik.errors.address
                              }
                              isValid={
                                formik.touched.address && !formik.errors.address
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.address}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col sm={12} className="my-1">
                          <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              {...formik.getFieldProps("phone")}
                              isInvalid={
                                formik.touched.phone && formik.errors.phone
                              }
                              isValid={
                                formik.touched.phone && !formik.errors.phone
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.phone}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <hr className="my-4" />

                      <h4 className="mb-3">Payment</h4>

                      <hr className="my-4" />

                      <Button
                        className="w-100"
                        variant="primary"
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Continue to checkout
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          ;
        </Modal.Body>
      </Modal>
      <Container>
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.items.length > 0 ? (
          <>
            {" "}
            <Container>
              <Row className="d-flex justify-content-center my-4">
                <Col md={8}>
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Item List</h5>
                    </Card.Header>
                    <Card.Body>
                      {state.items.map((item) => (
                        <div key={item.product}>
                          <Row className="d-flex align-items-center">
                            <Col lg={3} md={12}>
                              <ProductImage
                                productId={item.product}
                              ></ProductImage>
                            </Col>

                            <Col lg={5} md={6}>
                              <p>
                                <strong>{item.name}</strong>
                              </p>
                            </Col>

                            <Col lg={4} md={6}>
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <Button
                                  className="btn px-3"
                                  variant="secondary"
                                  onClick={() => removeItem(item)}
                                >
                                  <i className="bi bi-dash"></i>
                                </Button>

                                <p className="mx-5">{item.quantity}</p>

                                <Button
                                  className="btn px-3"
                                  variant="secondary"
                                  onClick={() => addItem(item)}
                                >
                                  <i className="bi bi-plus"></i>
                                </Button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">
                                    {item.quantity}
                                  </span>{" "}
                                  x ${item.price}
                                </strong>
                              </p>
                            </Col>
                          </Row>

                          <hr className="my-4" />
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Order Summary</h5>
                    </Card.Header>
                    <Card.Body>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Products ({state.totalItem})
                          <span>${Math.round(state.totalPrice)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Shipping<span>${30}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                          </div>
                          <span>
                            <strong>
                              ${Math.round(state.totalPrice + 30)}
                            </strong>
                          </span>
                        </li>
                      </ul>

                      <Button
                        variant="dark"
                        size="lg"
                        onClick={() => setcheckout(true)}
                      >
                        Go to checkout
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </>
  );
};

export default Cart;
