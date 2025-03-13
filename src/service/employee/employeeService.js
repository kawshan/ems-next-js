import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees"

export const createEmployee = (employee)=>{
 return axios.post(REST_API_BASE_URL,employee);
}

export const listAllEmployees = ()=>{
 return axios.get(REST_API_BASE_URL)
}

export const updateEmployeeService = (id,employee)=>{
 return axios.put(`${REST_API_BASE_URL}/${id}`,employee);
}

export const deleteEmployeeService = (id)=>{
 return axios.delete(`${REST_API_BASE_URL}/${id}`);
}







