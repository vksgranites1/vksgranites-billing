import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: {
      type: String,
      required: true,
    },

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

    // Backwards-compatible single-product fields (optional)
    product: String,
    hsnCode: String,

    rate: Number,
    cuFeet: Number,

    amount: Number,

    // Multi-product support
    products: [
      {
        product: String,
        hsn: String,
        rate: Number,
        cuFeet: Number,
        cgst: Number,
        sgst: Number,
        igst: Number,
        amount: Number,
      },
    ],

    cgst: Number,
    sgst: Number,
    igst: Number,

    cgstAmount: Number,
    sgstAmount: Number,
    igstAmount: Number,

    totalGST: Number,
    taxAmount: Number,

    consigneeName: String,
    consigneeAddress: String,
    consigneeGSTIN: String,
    consigneeState: String,
    consigneeStateCode: String,

    grandTotal: Number,
    amountWords: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);