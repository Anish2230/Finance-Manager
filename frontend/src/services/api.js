import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createRecord = (data) => API.post("/records", data);

export const updateRecord = (id, data) =>
  API.put(`/records/${id}`, data);


export const getRecords = () => API.get("/records");

export default API;