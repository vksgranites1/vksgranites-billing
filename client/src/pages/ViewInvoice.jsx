import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { getInvoice } from "../api/invoiceApi";

function ViewInvoice() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {

    try {

      const data = await getInvoice(id);

      setInvoice(data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!invoice)
    return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <InvoicePreview data={invoice} />

      <div className="text-center mt-8">

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Print Invoice
        </button>
&nbsp;&nbsp;
        <button
          onClick={() => navigate("/search-jobwork")}
          className="bg-red-600 text-white px-7 py-3 rounded"
        >
          Back to Search
        </button>

      </div>

    </div>
  );
}

export default ViewInvoice;