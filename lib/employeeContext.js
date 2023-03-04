"use client";

import { createContext, useState } from "react";

const EmployeContext = createContext({
  employees: [],
  addEmployee: (employee) => {},
  addAllEmployee: (employeesList) => {},
  removeEmployee: (employeeId) => {},
  getEmployee: (employeeId) => {},
  getAllEmployee: () => {},
  editEmpoyee: (employee, employeeId) => {},
});

export function EmployeeContextProvider(props) {
  const loadedEmployees = props.value;
  const [employees, setEmployee] = useState(loadedEmployees);

  function addEmployeeContext(employee) {
    setEmployee((employeeOldValue) => {
      return [...employeeOldValue, employee];
    });
  }
  function addAllEmployeeContext(employeeList) {
    setEmployee(employeeList);
  }
  function editEmployeeContext(employee, employeeId) {
    const findIndex = employees.findIndex((employeElement) => {
      return employeElement.id === employeeId;
    });

    setEmployee((employeeOldValue) => {
      employeeOldValue[findIndex] = product;
      return [...employeeOldValue];
    });
  }
  function removeEmployeeContext(employeeId) {
    const newEmployeeCollection = employees.filter(
      (prod) => prod.id !== employeeId
    );

    setEmployee(newEmployeeCollection);
  }

  function getEmployeeContext(employeeId) {
    const findIndex = employees.findIndex((employee) => {
      return employee.id === employeeId;
    });

    if (findIndex > -1) {
      return employees[findIndex];
    } else {
      return {
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        salary: "",
        employeeId: "",
        currentBalance: "",
        companyId: "",
        companyName: "",
      };
    }
  }

  function getAllEmployeeContext() {
    return employees;
  }

  const context = {
    addEmployee: addEmployeeContext,
    removeEmployee: removeEmployeeContext,
    getEmployee: getEmployeeContext,
    editEmpoyee: editEmployeeContext,
    addAllEmployee: addAllEmployeeContext,
    getAllEmployee: getAllEmployeeContext,
    employees: employees,
  };

  return (
    <EmployeContext.Provider value={context}>
      {props.children}
    </EmployeContext.Provider>
  );
}

export default EmployeContext;
