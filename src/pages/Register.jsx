import React from 'react'
// import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
const Register = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter your full name" />
                        </Form.Group>        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                        <Form.Group className="text-center">
                        <Button variant="secondary" type="submit">
                            Register
                        </Button>
                        </Form.Group>
                    </Form>    
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Register