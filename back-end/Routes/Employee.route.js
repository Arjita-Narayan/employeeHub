const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Employee = require("../Models/Employee");

// Create new employee
router.post("/create", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: err.message });
  }
});

//get all employees
router.get("/all", async (req, res, next) => {
  //   res.send("All employee route");
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    // Extract the employee ID from the request URL
    const employeeId = req.params.id;

    // Use the employee ID to find and delete the specific employee
    const employee = await Employee.findByIdAndDelete(employeeId);

    // Handle case where employee is not found
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Respond with a success message
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
