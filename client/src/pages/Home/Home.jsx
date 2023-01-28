import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../../api/axios";
import "./home.css";

function Home() {
  const [user, setUser] = useState();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      //verify accessToken first then set user as result from server
      setUser(accessToken);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // auth.delete("/logout");
      console.log("Logged Out");
      localStorage.removeItem("accessToken");
      setUser();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("accessToken","hello");
      let accessToken = localStorage.getItem("accessToken");
      setUser(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>{!user ? 
    <div className="noUserContainer">
      <div className="actionContainer">

        <h1 onClick={handleLogin}>BoredApp</h1>
        <div className="buttonRow">
          <Link to="/login" className="linkButton login">Log In
        </Link>
        <Link to="/register" className="linkButton register">Register
        </Link>
        </div>
      </div>
    </div>
    : 
    <div className="homeContainer">
        HomeContainer
        <h1 onClick={handleLogout}>Logged In</h1>
    </div>}
      
    </>
  );
}

export default Home;
