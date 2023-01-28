import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../../api/axios";

function Settings() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      auth.delete("/logout");
      console.log("Logged Out");
      localStorage.removeItem("accessToken");
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {
        <Container className="py-5 my-5 border rounded-3 d-flex align-items-center justify-content-center">
          <h1>Settings</h1>
          <Form onSubmit={handleLogout}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      }
    </>
  );
}

export default Settings;
