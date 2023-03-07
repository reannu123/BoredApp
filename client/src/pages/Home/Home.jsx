import { Alert, Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance, auth } from "../../api/axios";
import "./home.css";
import NoUser from "./NoUser/NoUser";
import NavBar from "../../components/NavBar/NavBar";
import Lists from "./Lists/Lists";
function Home() {
  const [user, setUser] = useState();
  const [inputTask, setInputTask] = useState("");
  const [lists, setLists] = useState([]);
  const [update, setUpdate] = useState(false);

  // Checks localstorage if a user is logged in, sets user if so
  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      //TODO: Check expiry of access token first. Then set user as result from server
      setUser(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/api/task/getall/mine", {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });

      setLists(response.data);
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [update]);

  const handleAddTask = async (task) => {
    try {
      const response = await instance.post(
        "/api/task/add",

        {
          task: task,
        },
        {
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      setLists([...lists, task]);
      setUpdate(!update);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      if (inputTask === "") {
        return;
      }
      handleAddTask(inputTask);
      event.target.value = "";
      setInputTask("");
    }
  };
  return (
    <>
      {!user ? (
        <NoUser />
      ) : (
        <>
          <NavBar user={user} setUser={setUser} />
          <div className="homeContainer">
            <div className="centerList">
              <div className="d-flex col w-100">
                <input
                  className="form-control text-bg-dark"
                  type="text"
                  onChange={(e) => setInputTask(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={inputTask}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (inputTask === "") {
                      return;
                    }
                    handleAddTask(inputTask);
                    setInputTask("");
                  }}
                >
                  Add
                </button>
              </div>
              <Lists setUpdate={setUpdate} lists={lists} setLists={setLists} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
