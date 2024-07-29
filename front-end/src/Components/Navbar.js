import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Count from "./Count";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");

    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="#">
          <img
            src="https://logodix.com/logo/1086371.png"
            alt="Logo"
            style={{ width: "60px", marginRight: "10px" }}
          />
          <b>EmployeeHub</b>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/employeeList"
              >
                Employee List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/createEmployee"
              >
                Create Employee
              </Link>
            </li>
          </ul>
          <form className="d-flex align-items-center">
            {location.pathname === "/employeeList" && (
              <span
                className="d-inline-block me-3"
                style={{ whiteSpace: "nowrap" }}
              >
                <Count />
              </span>
            )}

            <span
              style={{
                fontWeight: "bold",
                color: "#007bff",
                marginRight: "10px",
              }}
            >
              {username || "Guest"}
            </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
