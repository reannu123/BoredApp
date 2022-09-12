import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
