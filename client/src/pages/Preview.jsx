import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoicePreview from "../components/InvoicePreview";
import { saveInvoice } from "../api/invoiceApi";
import { amountToWords } from "../utils/amountToWords";

function Preview() {
  const navigate = useNavigate();
  const location = useLocation();

const state =
  location.state ||
  JSON.parse(sessionStorage.getItem("invoiceData"));
  const printRef = useRef(null);
  console.log("Preview State:", state);

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">
          No Invoice Data
        </h2>
      </div>
    );
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${state.formData.invoiceNo}`,
  });

  const handleSaveAndPrint = async () => {
    try {
      await saveInvoice({
        ...state.formData,

        amount: state.amount,

        cgst: Number(state.formData.cgst),

        sgst: Number(state.formData.sgst),

        cgstAmount: Number(state.cgstAmount),
        sgstAmount: Number(state.sgstAmount),

        igstAmount: Number(state.igstAmount),

        totalGST: state.totalGST,

        grandTotal: state.grandTotal,

        amountWords: amountToWords(state.grandTotal),
      });

      alert("Invoice Saved Successfully");

      await handlePrint();

      navigate("/billing");
    } catch (error) {
      console.error(error);
      alert("Unable to save invoice");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <InvoicePreview
  ref={printRef}
  data={{
    ...state.formData,

    amount: state.amount,

    cgst: state.formData.cgst,
    sgst: state.formData.sgst,
    igst: state.formData.igst,

    cgstAmount: state.cgstAmount,
    sgstAmount: state.sgstAmount,
    igstAmount: state.igstAmount,

    totalGST: state.totalGST,
    grandTotal: state.grandTotal,

    amountWords: amountToWords(state.grandTotal),
  }}
/>

      <div className="flex justify-center gap-5 mt-8 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
        >
          Back
        </button>

        <button
          onClick={handleSaveAndPrint}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Save & Print
        </button>
      </div>
    </div>
  );
}

export default Preview;