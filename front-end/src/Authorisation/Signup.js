import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    const { username, email, password } = credentials;
    let isValid = true;
    let newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 5 || username.length > 10) {
      newErrors.username = "Username must be between 5 and 10 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = "Username must be alphanumeric";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    } else if (email !== email.toLowerCase()) {
      newErrors.email = "Email must be in lowercase";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8 || password.length > 10) {
      newErrors.password = "Password must be between 8 and 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const { username, email, password } = credentials;

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 400) {
          if (error.message.includes("username")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: "Use a unique username",
            }));
          } else if (error.message.includes("email")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Use a unique email",
            }));
          } else {
            throw new Error(error.message || "Signup failed");
          }
        } else {
          throw new Error(error.message || "Signup failed");
        }
        return;
      }

      // Show success alert
      alert("Signup successful! You can now log in.");

      const json = await response.json();
      console.log(json);

      setCredentials({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Use unique username/email.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="lo-si-container">
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          CREATE AN ACCOUNT TO USE EMPLOYEEHUB
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {/* <label htmlFor="username" className="form-label">
                  Username
                </label> */}
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  placeholder="enter your username"
                  name="username"
                  value={credentials.username}
                  onChange={onChange}
                  aria-describedby="usernameHelp"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">
                  Email address
                </label> */}
                <input
                  type="email"
                  className={`form-control form-control-lg ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="enter your email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">
                  Password
                </label> */}
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="enter your password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  minLength={8}
                  maxLength={10}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 ">
                SIGNUP
              </button>
            </form>

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/" className="text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
