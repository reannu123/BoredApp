import React from "react";
import { Link } from "react-router-dom";
import "./NoUser.css";

function NoUser() {
  return (
    <div className="noUserContainer">
      <div className="actionContainer">
        <h1>BoredApp</h1>
        <div className="buttonRow">
          <Link to="/login" className="linkButton login">
            Log In
          </Link>
          <Link to="/register" className="linkButton register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoUser;
