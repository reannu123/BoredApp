import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../api/axios";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      const response = await auth.post("/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      console.log(response.data.accessToken);
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {success ? (
        <div>Success!</div>
      ) : (
        <Container className="py-5 my-5 border rounded-3 d-flex align-items-center justify-content-center">
          <Form onSubmit={handleSubmit}>
            <h1 className="mb-5">Log In</h1>
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
              Don't have an account? <Link to="/register">Register!</Link>
            </p>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
}

export default Login;
