import mongoose from "mongoose";

const jobWorkSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: String,

    reverseCharge: String,

    customerName: String,
    customerAddress: String,
    customerGSTIN: String,

    state: String,
    stateCode: String,

    transportMode: String,
    vehicleNumber: String,

    dateOfSupply: String,
    placeOfSupply: String,

    consigneeName: String,
    consigneeAddress: String,
    consigneeGSTIN: String,
    consigneeState: String,
    consigneeStateCode: String,

    product: String,
    hsnCode: String,

    rate: Number,
    cuFeet: Number,

    amount: Number,
    cgst: Number,
    sgst: Number,
    igst: Number,
    cgstAmount: Number,
    sgstAmount: Number,
    igstAmount: Number,
    totalGST: Number,
    grandTotal: Number,

    amountWords: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JobWork", jobWorkSchema);