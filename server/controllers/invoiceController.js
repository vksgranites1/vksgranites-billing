import Invoice from "../models/Invoice.js";

// Get Next Invoice Number
export const getNextInvoiceNumber = async (req, res) => {
  try {
    const invoices = await Invoice.find({}, "invoiceNo");

    let highest = 0;

    invoices.forEach((invoice) => {
      const no = parseInt(invoice.invoiceNo, 10);

      if (no > highest) {
        highest = no;
      }
    });

    const next = String(highest + 1).padStart(2, "0");

    res.json({
      invoiceNo: next,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Save Invoice
export const saveInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);

    await invoice.save();

    res.status(201).json({
      success: true,
      message: "Invoice Saved Successfully",
      invoice,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Invoice number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to save invoice",
    });
  }
};

// Search / Get All Invoices
export const getInvoices = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            invoiceNo: {
              $regex: search,
              $options: "i",
            },
          },
          {
            customerName: {
              $regex: search,
              $options: "i",
            },
          },
          {
            "products.product": {
              $regex: search,
              $options: "i",
            },
          },
          {
            invoiceDate: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const invoices = await Invoice.find(query).sort({
      createdAt: -1,
    });

    res.json(invoices);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Invoice
export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice Not Found",
      });
    }

    res.json(invoice);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Invoice
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice Not Found",
      });
    }

    // Find the latest invoice
    const latestInvoice = await Invoice.findOne().sort({
      createdAt: -1,
    });

    if (
      !latestInvoice ||
      latestInvoice._id.toString() !== invoice._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Only the latest invoice can be deleted.",
      });
    }

    await invoice.deleteOne();

    res.json({
      success: true,
      message: "Invoice Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};