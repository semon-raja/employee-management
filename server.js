const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(express.json());
let employees = [];
fs.readFile("employees.json", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    employees = JSON.parse(data);

    console.log("Employees loaded:", employees);
});
app.get("/employees", (req, res) => {
    res.json(employees);
});

app.get("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});


app.post("/employees", (req, res) => {
    const employee = req.body;

    if (
        !employee.name ||
        !employee.department ||
        !employee.project ||
        employee.attendance === undefined
    ) {
        return res.status(400).json({
            message: "Name, department, project and attendance are required"
        });
    }

    const newId = employees.length > 0
        ? Math.max(...employees.map(emp => emp.id)) + 1
        : 1;

    employee.id = newId;

    employees.push(employee);

    fs.writeFile(
        "employees.json",
        JSON.stringify(employees, null, 2),
        "utf8",
        (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("Employee saved successfully");

            res.status(201).json(employee);
        }
    );
});

app.put("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    const updatedData = req.body;

    if (
        !updatedData.name ||
        !updatedData.department ||
        !updatedData.project ||
        updatedData.attendance === undefined
    ) {
        return res.status(400).json({
            message: "Name, department, project and attendance are required"
        });
    }

    employee.name = updatedData.name;
    employee.department = updatedData.department;
    employee.project = updatedData.project;
    employee.attendance = updatedData.attendance;

    fs.writeFile(
    "employees.json",
    JSON.stringify(employees, null, 2),
    "utf8",
    (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Employee updated successfully");

        res.status(200).json(employee);
    }
);
    console.log(employee);
}); 
app.patch("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    const updatedData = req.body;

    if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

    if (updatedData.name !== undefined) {
        employee.name = updatedData.name;
    }

    if (updatedData.department !== undefined) {
        employee.department = updatedData.department;
    }

    if (updatedData.project !== undefined) {
        employee.project = updatedData.project;
    }

    if (updatedData.attendance !== undefined) {
        employee.attendance = updatedData.attendance;
    }

    fs.writeFile(
    "employees.json",
    JSON.stringify(employees, null, 2),
    "utf8",
    (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Employee updated successfully");

        res.status(200).json(employee);
    }
);

    console.log(employee);
});

app.delete("/employees/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = employees.findIndex(emp => emp.id === id);

    console.log(index);

    if (index === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employees.splice(index, 1);

    fs.writeFile(
        "employees.json",
        JSON.stringify(employees, null, 2),
        "utf8",
        (err) => {
           if (err) {
            console.log(err);
            return;
        }

        console.log("Employee deleted successfully");

        res.status(200).json({
            message: "Employee deleted successfully"
        });
        }
    );
});
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});