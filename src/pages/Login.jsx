import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import userService from "../services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/auth";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Add your login logic here

      userService
        .login(values)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.info);
            dispatch(
              login({
                token: res.data.token,
                userInfo: res.data.info,
              })
            );
            navigate("/products");
            toast.success("Login success");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            toast.warning(error.response.data.error);
            formik.setErrors({ username: error.response.data.error });
          } else if (error.response && error.response.status === 401) {
            toast.warning(error.response.data.error);
            formik.setErrors({ password: error.response.data.error });
          }

          // Handle other errors here, if needed
        });
    },
  });
  return (
    <Container className="my-3 py-3">
      <h1 className="text-center">Login</h1>
      <hr />
      <Row className="my-4 h-100">
        <Col md={4} lg={4} sm={8} className="mx-auto">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label>Username</Form.Label>
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
              <Form.Label>Password</Form.Label>
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
                New Here?{" "}
                <Link
                  to="/register"
                  className="text-decoration-underline text-info"
                >
                  Register
                </Link>{" "}
              </p>
            </div>
            <div className="text-center">
              <Button
                className="my-2"
                variant="dark"
                type="submit"
                disabled={!formik.isValid}
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
