import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { toast } from "react-toastify";

const Resgister = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      userService
        .register(values)
        .then((res) => {
          if (res.status === 201) {
            toast.success("Register success");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            toast.warning(error.response.data.error);
            formik.setErrors({ username: error.response.data.error });
          }
          // Handle other errors here, if needed
        });
    },
  });
  return (
    <Container className="my-3 py-3">
      <h1 className="text-center">Register</h1>
      <hr />
      <Row className="my-4 h-100">
        <Col md={4} lg={4} sm={8} className="mx-auto">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your username"
                {...formik.getFieldProps("username")}
                isInvalid={formik.touched.username && formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="my-3">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-decoration-underline text-info"
                >
                  Login
                </Link>
              </p>
            </div>
            <div className="text-center">
              <Button
                className="my-2 mx-auto btn btn-dark"
                type="submit"
                disabled={!formik.isValid}
              >
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Resgister;
