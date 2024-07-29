import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        // Handle response errors
        const error = await response.json();
        if (response.status === 401) {
          // Show alert for incorrect credentials
          alert("Use correct credentials");
        } else {
          throw new Error(error.message || "Login failed");
        }
        return;
      }

      const json = await response.json();
      console.log(json);

      localStorage.setItem("username", username);
      localStorage.setItem("accessToken", json.accessToken);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Use Correct Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login To Continue To EmployeeHub</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="Username"
                name="username"
                onChange={onChange}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              LOGIN
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
