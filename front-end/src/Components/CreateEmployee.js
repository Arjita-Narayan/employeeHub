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
  const [errors, setErrors] = useState({});

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNo = (mobile_no) => {
    const mobileNoRegex = /^\d{10}$/;
    return mobileNoRegex.test(mobile_no);
  };

  const validateForm = async () => {
    const newErrors = {};
    if (!credentials.name) newErrors.name = "Name is required";
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = "Invalid email format";
    } else {
      // Check if the email is already in use
      try {
        const response = await axios.post(
          "http://localhost:8080/employee/check-email",
          { email: credentials.email }
        );
        if (response.data.exists) {
          newErrors.email =
            "Email is already in use. Please use a different email.";
        }
      } catch (error) {
        console.error("Error checking email uniqueness:", error);
      }
    }
    if (!credentials.mobile_no) {
      newErrors.mobile_no = "Mobile No. is required";
    } else if (!validateMobileNo(credentials.mobile_no)) {
      newErrors.mobile_no = "Mobile No. must be a 10-digit number";
    }
    if (!credentials.designation)
      newErrors.designation = "Designation is required";
    if (!credentials.gender) newErrors.gender = "Gender is required";
    if (!credentials.course) newErrors.course = "Course is required";
    if (!credentials.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

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
        "An error occurred while saving the employee data. Please use unique email."
      );
    }
  };

  return (
    <div className="create-employee-page">
      <Navbar />
      <h1 className="text-center create-employee-heading">
        {id ? "EDIT EMPLOYEE" : "CREATE NEW EMPLOYEE"}
      </h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="create-employee-form">
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="mobile_no" className="form-label">
                  Mobile No.
                </label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.mobile_no ? "is-invalid" : ""
                  }`}
                  id="mobile_no"
                  name="mobile_no"
                  value={credentials.mobile_no}
                  onChange={onChange}
                  required
                />
                {errors.mobile_no && (
                  <div className="invalid-feedback">{errors.mobile_no}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <select
                  className={`form-control form-select form-select-lg mb-3 ${
                    errors.designation ? "is-invalid" : ""
                  }`}
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
                {errors.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
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
                  <label htmlFor="male" className="me-2">
                    Male
                  </label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={credentials.gender === "female"}
                    onChange={onChange}
                  />
                  <label htmlFor="female" className="me-2">
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <div className="invalid-feedback d-block">
                    {errors.gender}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="course" className="form-label">
                  Course
                </label>
                <select
                  className={`form-select form-select-lg mb-3 ${
                    errors.course ? "is-invalid" : ""
                  }`}
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
                {errors.course && (
                  <div className="invalid-feedback">{errors.course}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className={`form-control ${
                    errors.status ? "is-invalid" : ""
                  }`}
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
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary dual">
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
