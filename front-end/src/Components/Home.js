import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../style.css";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="typing-animation">
          Hi {username || "Guest"} ,Welcome to EmployeeHub!!
        </h1>
      </div>
    </div>
  );
};

export default Home;
