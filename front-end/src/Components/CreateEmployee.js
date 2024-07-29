import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const CreateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    mobile_no: "",
    designation: "",
    gender: "",
    course: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch the employee details and set the form fields
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/employee/${id}`
          );
          setCredentials(response.data);
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing employee
        await axios.put(`http://localhost:8080/employee/${id}`, credentials, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Employee updated successfully");
      } else {
        // Create new employee
        await axios.post("http://localhost:8080/employee/create", credentials, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Employee created successfully");
      }
      navigate("/employeeList");
    } catch (error) {
      console.error(
        "Error creating/updating employee:",
        error.response?.data || error.message
      );
      alert(
        "An error occurred while saving the employee data. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        overflowX: "hidden",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <h1 className="text-center">
        {id ? "EDIT EMPLOYEE" : "CREATE NEW EMPLOYEE"}
      </h1>
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                maxHeight: "calc(100vh - 180px)",
                overflowY: "auto",
              }}
            >
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="mobile_no" className="form-label">
                  Mobile No.
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="mobile_no"
                  name="mobile_no"
                  value={credentials.mobile_no}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <select
                  className="form-control"
                  id="designation"
                  name="designation"
                  value={credentials.designation}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled>
                    Select designation
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="mb-2">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={credentials.gender === "male"}
                    onChange={onChange}
                  />
                  <label htmlFor="male">Male</label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={credentials.gender === "female"}
                    onChange={onChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="course" className="form-label">
                  Course
                </label>
                <select
                  className="form-select form-select-lg mb-3"
                  id="course"
                  name="course"
                  value={credentials.course}
                  onChange={onChange}
                  required
                >
                  <option value="">Select course</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BSC">BSC</option>
                </select>
              </div>

              <div className="mb-2">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={credentials.status}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  {id ? "Update Employee" : "Create Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
