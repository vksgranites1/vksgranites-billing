import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import JobWorkInvoicePreview from "../components/JobWorkInvoicePreview";
import { saveJobWork } from "../api/jobWorkApi";
import { amountToWords } from "../utils/amountToWords";


function JobWorkPreview() {
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
    documentTitle: `JobWork-${state.formData.invoiceNo}`,
  });

  const previewData = {
    ...state.formData,

    amount: Number(state.amount),

    cgst: Number(state.formData.cgst),
    sgst: Number(state.formData.sgst),
    igst: Number(state.formData.igst),

    cgstAmount: Number(state.cgstAmount),
    sgstAmount: Number(state.sgstAmount),
    igstAmount: Number(state.igstAmount),

    totalGST: Number(state.totalGST),
    grandTotal: Number(state.grandTotal),

    amountWords: amountToWords(state.grandTotal),
  };

  const handleSaveAndPrint = async () => {
    try {
      await saveJobWork(previewData);

      alert("Job Work Bill Saved Successfully");

      await handlePrint();

      navigate("/jobwork");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK"
          ? "Cannot reach server. Make sure the backend is running and MongoDB is connected."
          : "Unable to save Job Work Bill");
      alert(message);
    }
  };
 
  return (
    <div className="bg-gray-100 min-h-screen p-6">
        
      <JobWorkInvoicePreview
         ref={printRef}
  data={previewData}
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

export default JobWorkPreview;