fetch("/employees")
    .then(response => response.json())
    .then(employees => {

        const employeeSelect = document.getElementById("employeeSelect");

        employees.forEach(employee => {

            const option = document.createElement("option");

            option.value = employee.id;
            option.textContent = employee.name;

            employeeSelect.appendChild(option);
        });

        employeeSelect.addEventListener("change", () => {

            const selectedId = Number(employeeSelect.value);

            const employee = employees.find(emp => emp.id === selectedId);

            document.getElementById("name").textContent = employee.name;
            document.getElementById("department").textContent = employee.department;
            document.getElementById("project").textContent = employee.project;
            document.getElementById("attendance").textContent = employee.attendance;

        });

    });