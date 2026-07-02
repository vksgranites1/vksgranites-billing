import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const saveJobWork = async (bill) => {
  const res = await API.post("/jobwork", bill);
  return res.data;
};

export const getJobWorks = async (search = "") => {
  const res = await API.get("/jobwork", {
    params: { search },
  });
  return res.data;
};

export const getJobWork = async (id) => {
  const res = await API.get(`/jobwork/${id}`);
  return res.data;
};

export const deleteJobWork = async (id) => {
  const res = await API.delete(`/jobwork/${id}`);
  return res.data;
};

export const getNextJobWorkNumber = async () => {
  const res = await API.get("/jobwork/next-number");
  return res.data.invoiceNo;
};