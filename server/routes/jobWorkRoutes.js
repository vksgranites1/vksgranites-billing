import express from "express";
import {
  getNextInvoiceNumber,
  saveInvoice,
  getInvoices,
  getInvoice,
  deleteInvoice,
} from "../controllers/jobWorkController.js";

const router = express.Router();

router.get("/next-number", getNextInvoiceNumber);
router.post("/", saveInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.delete("/:id", deleteInvoice);

export default router;