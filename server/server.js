import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import jobWorkRoutes from "./routes/jobWorkRoutes.js";

dotenv.config();

connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://vksgranites-billing-1.onrender.com",
];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vksgranites-billing-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/jobwork", jobWorkRoutes);

app.get("/", (req, res) => {
  res.send("VTS Granites API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});