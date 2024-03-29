import { Alert, Container, Form, Button, Label } from "react-bootstrap";
import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { instance, auth } from "../../api/axios";
import "./register.css";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.post("/register", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setDuplicate(false);

      // If registration success, try to login
      try {
        const newresponse = await auth.post("/login", user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        localStorage.setItem("accessToken", newresponse.data.accessToken);
        localStorage.setItem("username", user.username);
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e.response.data.message);
      setDuplicate(true);
    }
  };

  return (
    <div className="page align-items-center justify-content-center p-5">
      {success ? (
        <div className="p-5 m-5 border rounded-3 d-flex align-items-center justify-content-center">
          <h1>Success!</h1>
        </div>
      ) : (
        <Container className="py-5 border rounded-3 d-flex align-items-center justify-content-center">
          <Form onSubmit={handleSubmit}>
            {duplicate ? (
              <Alert variant="danger" className="text-center">
                Username already exists!
              </Alert>
            ) : null}
            <h1 className="mb-5">Register</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <p>
              Already have an account? <Link to="/login">Log in!</Link>
            </p>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* Show error message if duplicate */}
        </Container>
      )}
    </div>
  );
}

export default Register;
