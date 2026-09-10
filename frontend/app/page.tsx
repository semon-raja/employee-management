"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [employeeId, setEmployeeId] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

    const filteredEmployees = employees.filter((employee) => {
      const departmentMatch =
        selectedDepartment === "All" ||
        employee.department === selectedDepartment;

      const projectMatch =
        selectedProject === "All" ||
        employee.project === selectedProject;

      const statusMatch =
        selectedStatus === "All" ||
        employee.status === selectedStatus;

      return departmentMatch && projectMatch && statusMatch;
    });

    const departments = [
  ...new Set(employees.map((employee) => employee.department)),
];

const projects = [
  ...new Set(employees.map((employee) => employee.project)),
];
  // Total employees
  const totalEmployees = filteredEmployees.length;

  // Active employees
  const activeEmployees = filteredEmployees.filter(
    (employee) => employee.status === "Active"
  ).length;

  // Employees on leave
  const onLeaveEmployees = filteredEmployees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  // Average performance
  const averagePerformance =
    filteredEmployees.length > 0
      ? (
          filteredEmployees.reduce(
            (total, employee) => total + employee.performance,
            0
          ) / filteredEmployees.length
        ).toFixed(1)
      : 0;

  // Employees by department
  const departmentData = Object.values(
    filteredEmployees.reduce((acc, employee) => {
      if (!acc[employee.department]) {
        acc[employee.department] = {
          department: employee.department,
          employees: 0,
        };
      }

      acc[employee.department].employees += 1;

      return acc;
    }, {})
  );

  // Employees by status
  const statusData = Object.values(
    filteredEmployees.reduce((acc, employee) => {
      if (!acc[employee.status]) {
        acc[employee.status] = {
          status: employee.status,
          employees: 0,
        };
      }

      acc[employee.status].employees += 1;

      return acc;
    }, {})
  );

  // Employees by project
  const projectData = Object.values(
    filteredEmployees.reduce((acc, employee) => {
      if (!acc[employee.project]) {
        acc[employee.project] = {
          project: employee.project,
          employees: 0,
        };
      }

      acc[employee.project].employees += 1;

      return acc;
    }, {})
  );

  // Employee performance
  const performanceData = filteredEmployees.map((employee) => ({
    name: employee.name,
    performance: employee.performance,
  }));

const searchEmployee = () => {
  if (!employeeId) {
    return;
  }

  setSearchError("");
  setSearchedEmployee(null);

  fetch(`http://localhost:5000/employees/${employeeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Employee not found");
      }

      return response.json();
    })
    .then((data) => {
      setSearchedEmployee(data);
    })
    .catch((error) => {
      setSearchError(error.message);
    });
};



  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Title */}
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Employee Management Dashboard
        </h1>

        <div className="mb-8 grid grid-cols-1 gap-6 rounded-xl bg-white p-6 md:grid-cols-2">

  <div>
    <label
      htmlFor="department"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Filter by Department
    </label>

    <select
      id="department"
      value={selectedDepartment}
      onChange={(e) => setSelectedDepartment(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    >
      <option value="All">All Departments</option>

      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label
      htmlFor="project"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Filter by Project
    </label>

    <select
      id="project"
      value={selectedProject}
      onChange={(e) => setSelectedProject(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    >
      <option value="All">All Projects</option>

      {projects.map((project) => (
        <option key={project} value={project}>
          {project}
        </option>
      ))}
</select>
  </div>

  <div>
  <label
    htmlFor="status"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Filter by Status
  </label>

  <select
    id="status"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  >
    <option value="All">All Status</option>
    <option value="Active">Active</option>
    <option value="On Leave">On Leave</option>
  </select>
</div>

</div>



        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Total Employees */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              Total Employees
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-800">
              {totalEmployees}
            </h2>
          </div>

          {/* Active Employees */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              Active Employees
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-800">
              {activeEmployees}
            </h2>
          </div>

          {/* On Leave */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              On Leave
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-800">
              {onLeaveEmployees}
            </h2>
          </div>

          {/* Average Performance */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm font-medium text-gray-500">
              Average Performance
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-800">
              {averagePerformance} / 5
            </h2>
          </div>

        </div>

        {/* Department + Status */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Employees by Department */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Employees by Department
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="department" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar dataKey="employees" />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Employee Status */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Employee Status
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="employees"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* Project + Performance */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Employees by Project */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Employees by Project
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="project" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar dataKey="employees" />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Employee Performance */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Employee Performance
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  layout="vertical"
                  margin={{ left: 20, right: 20 }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    type="number"
                    domain={[0, 5]}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={60}
                  />

                  <Tooltip />

                  <Bar dataKey="performance" />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">

  <h2 className="mb-4 text-xl font-semibold text-gray-800">
    Search Employee
  </h2>

  <div className="flex gap-4">

    <input
      type="number"
      placeholder="Enter Employee ID"
      value={employeeId}
      onChange={(e) => setEmployeeId(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

   <button
  onClick={searchEmployee}
  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
>
  Search
</button>

  </div>

</div>

        {/* Employee Details */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">

          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Employee Details
          </h2>

          <div className="overflow-x-auto">
            {searchError && (
  <p className="mb-4 text-red-600">
    {searchError}
  </p>
)}

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">

                  <th className="px-4 py-3">
                    Name
                  </th>

                  <th className="px-4 py-3">
                    Department
                  </th>

                  <th className="px-4 py-3">
                    Role
                  </th>

                  <th className="px-4 py-3">
                    Project
                  </th>

                  <th className="px-4 py-3">
                    Attendance
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Performance
                  </th>

                </tr>
              </thead>

              <tbody>

               {searchedEmployee ? (
  <tr
    key={searchedEmployee.id}
    className="border-b border-gray-100"
  >
    <td className="px-4 py-4 font-medium text-gray-800">
      {searchedEmployee.name}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.department}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.role}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.project}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.attendance}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.status}
    </td>

    <td className="px-4 py-4 text-gray-600">
      {searchedEmployee.performance} / 5
    </td>
  </tr>
) : (
  employees.map((employee) => (
    <tr
      key={employee.id}
      className="border-b border-gray-100"
    >
      <td className="px-4 py-4 font-medium text-gray-800">
        {employee.name}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.department}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.role}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.project}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.attendance}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.status}
      </td>

      <td className="px-4 py-4 text-gray-600">
        {employee.performance} / 5
      </td>
    </tr>
  ))
)}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}