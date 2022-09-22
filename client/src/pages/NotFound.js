import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../api/axios";

function NotFound() {

  return (
    <>
      {(
        <Container className="py-5 my-5 border rounded-3 d-flex align-items-center justify-content-center">
          <h1>404 Not Found</h1>
            
        </Container>
      )}
    </>
  );
}

export default NotFound;
