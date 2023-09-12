import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
// import { Footer, Navbar } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup"
import loginService from "../services/loginService";
import { toast } from "react-toastify";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required").min(5, ">= 5 characters"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    }
  })

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      loginService.add(data).then((res) => {
        if (res.errorCode === 0) {
          
          toast.success("Add successful")
        }
      })
    }
  }
  
  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
                <Form.Group className="text-center">
                <Button variant="secondary" type="submit" >
                    Login
                </Button>
                </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;