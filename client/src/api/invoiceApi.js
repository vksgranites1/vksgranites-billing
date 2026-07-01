import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Get Next Invoice Number
export const getNextInvoiceNumber = async () => {
  const res = await API.get("/invoices/next-number");
  return res.data.invoiceNo;
};

// Save Invoice
export const saveInvoice = async (invoice) => {
  const res = await API.post("/invoices", invoice);
  return res.data;
};

// Get All / Search Invoices
export const getInvoices = async (search = "") => {
  const res = await API.get("/invoices", {
    params: { search },
  });
  return res.data;
};

// Get Single Invoice
export const getInvoice = async (id) => {
  const res = await API.get(`/invoices/${id}`);
  return res.data;
};

// Delete Invoice
export const deleteInvoice = async (id) => {
  const res = await API.delete(`/invoices/${id}`);
  return res.data;
};