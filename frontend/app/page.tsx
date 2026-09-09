"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl">
        
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Employee Management
        </h1>

        <div className="mb-8">
          <label
            htmlFor="employeeSelect"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Employee
          </label>

          <select
            id="employeeSelect"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onChange={(e) => {
              const id = Number(e.target.value);

              const employee = employees.find(
                (emp) => emp.id === id
              );

              setSelectedEmployee(employee);
            }}
          >
            <option value="">Select an employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Employee Details
          </h2>

          {selectedEmployee ? (
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span>{" "}
                {selectedEmployee.name}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Department:</span>{" "}
                {selectedEmployee.department}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Project:</span>{" "}
                {selectedEmployee.project}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Attendance:</span>{" "}
                {selectedEmployee.attendance}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              Select an employee to view their details.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}         