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

  const handleSaveAndPrint = async () => {
    try {
      await saveJobWork({
  ...state.formData,
  amount: state.amount,
  cgst: state.cgst,
  sgst: state.sgst,
  igst: state.formData.igst,
  igstAmount: state.igstAmount,
  totalGST: state.totalGST,
  grandTotal: state.grandTotal,
  amountWords: amountToWords(state.grandTotal),
});

      alert("Job Work Bill Saved Successfully");

      await handlePrint();

      navigate("/jobwork");
    } catch (error) {
      console.error(error);
      alert("Unable to save Job Work Bill");
    }
  };
 
  return (
    <div className="bg-gray-100 min-h-screen p-6">
        
      <JobWorkInvoicePreview
        ref={printRef}
        data={{
          ...state.formData,

          amount: state.amount,

          cgst: state.cgst,

          sgst: state.sgst,

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

export default JobWorkPreview;