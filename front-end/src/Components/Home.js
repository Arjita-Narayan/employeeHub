import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          padding: "0 5%",
        }}
      >
        <h1 style={{ fontWeight: "bold" }}>
          Welcome!!! {username || "Guest"}...
        </h1>
      </div>
    </div>
  );
};

export default Home;
