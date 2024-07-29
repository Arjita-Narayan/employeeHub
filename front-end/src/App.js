import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authorisation/Login";
import Signup from "./Authorisation/Signup";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import EmployeeList from "./Components/EmployeeList";
import CreateEmployee from "./Components/CreateEmployee";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/employee/edit/:id" element={<CreateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
