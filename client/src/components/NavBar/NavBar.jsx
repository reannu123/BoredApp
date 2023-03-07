import React from "react";
import "./NavBar.css";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar(props) {
  // Logs out user by removing access token from localstorage
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // auth.delete("/logout");
      console.log("Logged Out");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      props.setUser(null);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="header text-white">
      <h1>BoredApp</h1>
      <div className="d-flex column m-4 align-items-center">
        {props.user}
        <button className="icon-button text-white" onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
