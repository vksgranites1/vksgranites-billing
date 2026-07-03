import { useState } from "react";
import company from "../data/company";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getNextJobWorkNumber } from "../api/jobWorkApi";

function Billing() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
        invoiceNo: "01",
        invoiceDate: today,

        reverseCharge: "No",

        customerName: "",
        customerAddress: "",
        customerGSTIN: "",
        state: "",
        stateCode: "",

        transportMode: "",
        vehicleNumber: "",
        dateOfSupply: today,
        placeOfSupply: "",

        consigneeName: "",
        consigneeAddress: "",
        consigneeGSTIN: "",
        consigneeState: "",
        consigneeStateCode: "",
        product: "",
        hsnCode: "",

        rate: "",
        cuFeet: "",
        cgst: "",
        sgst: "",
        igst: "",
      });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const amount =
  Number(formData.rate || 0) *
  Number(formData.cuFeet || 0);

const cgstAmount =
  amount * Number(formData.cgst || 0) / 100;

const sgstAmount =
  amount * Number(formData.sgst || 0) / 100;

const igstAmount =
  amount * Number(formData.igst || 0) / 100;

const totalGST = cgstAmount + sgstAmount + igstAmount;

const grandTotal = amount + totalGST;
useEffect(() => {
  loadInvoice();
}, []);

  const loadInvoice = async () => {
      const no = await getNextJobWorkNumber();

      setFormData((prev) => ({
          ...prev,
          invoiceNo: no,
      }));
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-red-200 rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          {company.name}
        </h1>

        <p className="text-center text-gray-500">
          JOB WORK INVOICE
        </p>

        <hr className="my-6"/>

        {/* Invoice */}

        <h2 className="font-bold text-lg mb-3">
          Invoice Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label>Invoice Number</label>

            <input
              value={formData.invoiceNo}
              readOnly
              className="w-full border rounded p-3 bg-gray-100"
            />
          </div>

          <div>
  <label className="block mb-2">Reverse Charge</label>

  <label className="mr-4">
    <input
      type="radio"
      name="reverseCharge"
      value="Yes"
      checked={formData.reverseCharge === "Yes"}
      onChange={handleChange}
    />{" "}
    Yes
  </label>

  <label>
    <input
      type="radio"
      name="reverseCharge"
      value="No"
      checked={formData.reverseCharge === "No"}
      onChange={handleChange}
    />{" "}
    No
  </label>
</div>

          

          <div>
            <label>Invoice Date</label>

            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className="w-full border rounded p-3"
            />
          </div>

        </div>

        <hr className="my-6"/>

        {/* Customer */}

        <h2 className="font-bold text-lg mb-3">
          Customer Details
        </h2>

        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <textarea
          name="customerAddress"
          placeholder="Customer Address"
          value={formData.customerAddress}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="customerGSTIN"
            placeholder="Customer GSTIN"
            value={formData.customerGSTIN}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="stateCode"
            placeholder="State Code"
            value={formData.stateCode}
            onChange={handleChange}
            className="border rounded p-3"
          />

        </div>

        <hr className="my-6"/>

        {/* Transport */}

        <h2 className="font-bold text-lg mb-3">
          Transport Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="transportMode"
            placeholder="Transport Mode"
            value={formData.transportMode}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            type="date"
            name="dateOfSupply"
            value={formData.dateOfSupply}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="placeOfSupply"
            placeholder="Place Of Supply"
            value={formData.placeOfSupply}
            onChange={handleChange}
            className="border rounded p-3"
          />

        </div>

        <hr className="my-6"/>

        <h2 className="font-bold text-lg mb-3">
          Consignee Details
        </h2>

        <input
          name="consigneeName"
          placeholder="Consignee Name"
          value={formData.consigneeName}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <textarea
          name="consigneeAddress"
          placeholder="Consignee Address"
          value={formData.consigneeAddress}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-3"
        />

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="consigneeGSTIN"
            placeholder="Consignee GSTIN"
            value={formData.consigneeGSTIN}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="consigneeState"
            placeholder="State"
            value={formData.consigneeState}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="consigneeStateCode"
            placeholder="State Code"
            value={formData.consigneeStateCode}
            onChange={handleChange}
            className="border rounded p-3"
          />

        </div>

        <hr className="my-6" />
        {/* Product */}

        <h2 className="font-bold text-lg mb-3">
          Product Details
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="product"
            placeholder="Product"
            value={formData.product}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="hsnCode"
            placeholder="HSN Code"
            value={formData.hsnCode}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="rate"
            placeholder="Rate"
            value={formData.rate}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="cuFeet"
            placeholder="Cu.ft"
            value={formData.cuFeet}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
          name="cgst"
          placeholder="CGST %"
          value={formData.cgst}
          onChange={handleChange}
          className="border rounded p-3"
        />

        <input
          name="sgst"
          placeholder="SGST %"
          value={formData.sgst}
          onChange={handleChange}
          className="border rounded p-3"
        />

        <input
          name="igst"
          placeholder="IGST %"
          value={formData.igst}
          onChange={handleChange}
          className="border rounded p-3"
        />

        </div>

        <hr className="my-6"/>

        <div className="bg-gray-50 rounded-lg p-5">

          <p>Amount : ₹ {amount.toFixed(2)}</p>

          <p>
  CGST ({formData.cgst || 0}%): ₹ {cgstAmount.toFixed(2)}
</p>

<p>
  SGST ({formData.sgst || 0}%): ₹ {sgstAmount.toFixed(2)}
</p>

<p>
  IGST ({formData.igst || 0}%): ₹ {igstAmount.toFixed(2)}
</p>

          <p>Total GST : ₹ {totalGST.toFixed(2)}</p>

          <h2 className="text-2xl font-bold mt-2">
            Total Amount After Tax :
            ₹ {grandTotal.toFixed(2)}
          </h2>

        </div>

        <div className="mt-8 text-center">

          <button
          onClick={() => {
  const invoiceData = {
    formData,
    amount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalGST,
    grandTotal,
  };

  sessionStorage.setItem(
    "invoiceData",
    JSON.stringify(invoiceData)
  );

  navigate("/jobwork-preview", {
  state: {
    formData,
    amount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalGST,
    grandTotal,
  },
});
}}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Print  Bill
        </button><br/><br/>
        <button onClick={() => navigate("/search-jobwork")}
        className="bg-gray-700 text-white px-8 py-3 rounded-lg ml-3">
         Search Jobwork Bill
        </button><br/><br/>
        <button onClick={() => navigate("/dashboard")}
        className="bg-red-700 text-white px-8 py-3 rounded-lg ml-3">
         Dashboard
        </button>

        </div>

      </div>

    </div>
  );
}

export default Billing;