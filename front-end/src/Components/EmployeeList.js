import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Search from "./Search";
import Count from "./Count";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employee/all");
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (query) => {
    const filtered = employees.filter((employee) => {
      return (
        employee._id.toLowerCase().includes(query.toLowerCase()) ||
        employee.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleShowFullList = () => {
    setFilteredEmployees(employees);
    setCurrentPage(1); // Reset to first page when showing full list
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${id}`);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  // Calculate the index of the last and first employee on the current page
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Pagination controls
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="employee-list-page">
      <Navbar />
      <h1 className="text-center heading">EMPLOYEE LIST</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <Search
              onSearch={handleSearch}
              onShowFullList={handleShowFullList}
            />
            <Count totalCount={filteredEmployees.length} />
            {currentEmployees.length > 0 ? (
              <>
                <table className="table table-striped mt-3 ">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Course</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((employee) => (
                      <tr key={employee._id}>
                        <td style={{ color: "#ffff" }}>{employee._id}</td>
                        <td style={{ color: "#ffff" }}>{employee.name}</td>
                        <td style={{ color: "#ffff" }}>{employee.email}</td>
                        <td style={{ color: "#ffff" }}>{employee.mobile_no}</td>
                        <td style={{ color: "#ffff" }}>
                          {employee.designation}
                        </td>
                        <td style={{ color: "#ffff" }}>{employee.gender}</td>
                        <td style={{ color: "#ffff" }}>{employee.course}</td>
                        <td style={{ color: "#ffff" }}>{employee.status}</td>
                        <td style={{ color: "#ffff" }}>
                          {employee.date
                            ? new Date(employee.date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(employee._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(employee._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>No employees found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
