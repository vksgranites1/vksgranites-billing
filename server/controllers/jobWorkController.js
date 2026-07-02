import JobWork from "../models/JobWork.js";

// Get Next Job Work Number
export const getNextInvoiceNumber = async (req, res) => {
  try {
    const jobWorks = await JobWork.find({}, "invoiceNo");

    let highest = 0;

    jobWorks.forEach((bill) => {
      const no = parseInt(bill.invoiceNo, 10);

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

// Save Job Work Bill
export const saveInvoice = async (req, res) => {
  try {
    const jobWork = new JobWork(req.body);

    await jobWork.save();

    res.status(201).json({
      success: true,
      message: "Job Work Bill Saved Successfully",
      invoice: jobWork,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Job Work Number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to save Job Work Bill",
    });
  }
};

// Search / Get All Job Work Bills
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
            invoiceDate: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const jobWorks = await JobWork.find(query).sort({
      createdAt: -1,
    });

    res.json(jobWorks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Job Work Bill
export const getInvoice = async (req, res) => {
  try {
    const jobWork = await JobWork.findById(req.params.id);

    if (!jobWork) {
      return res.status(404).json({
        message: "Job Work Bill Not Found",
      });
    }

    res.json(jobWork);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Latest Job Work Bill
export const deleteInvoice = async (req, res) => {
  try {
    const jobWork = await JobWork.findById(req.params.id);

    if (!jobWork) {
      return res.status(404).json({
        success: false,
        message: "Job Work Bill Not Found",
      });
    }

    const latestJobWork = await JobWork.findOne().sort({
      createdAt: -1,
    });

    if (
      !latestJobWork ||
      latestJobWork._id.toString() !== jobWork._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Only the latest Job Work Bill can be deleted.",
      });
    }

    await jobWork.deleteOne();

    res.json({
      success: true,
      message: "Job Work Bill Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};