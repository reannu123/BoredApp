import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../api/axios";

function Home() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.post("/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {(
        <Container className="py-5 my-5 border rounded-3 d-flex align-items-center justify-content-center">
          <h1>HOME</h1>
            
        </Container>
      )}
    </>
  );
}

export default Home;
