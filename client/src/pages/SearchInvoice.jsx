import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices, deleteInvoice } from "../api/invoiceApi";
import { getInvoice } from "../api/invoiceApi";

function SearchInvoice() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async (searchText = "") => {
    try {
      setLoading(true);

      const data = await getInvoices(searchText);

      setInvoices(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    loadInvoices(value);
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this invoice?"
  );

  if (!confirmDelete) return;

  try {
    const res = await deleteInvoice(id);

    alert(res.message);

    loadInvoices(search);

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Unable to delete invoice.");
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Search Invoice
          </h1>

          <button
            onClick={() => navigate("/billing")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + New Invoice
          </button>

        </div>

        <input
          type="text"
          placeholder="Search by Invoice No, Customer Name or Date"
          value={search}
          onChange={handleSearch}
          className="w-full border rounded-lg p-3 mb-6"
        />

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full border-collapse border">

            <thead className="bg-gray-200">

              <tr>

                <th className="border p-2">Invoice No</th>

                <th className="border p-2">Date</th>

                <th className="border p-2">Customer</th>

                <th className="border p-2">Grand Total</th>

                <th className="border p-2">Actions</th>

              </tr>

            </thead>

            <tbody>

              {invoices.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    No Invoice Found
                  </td>

                </tr>

              ) : (

                invoices.map((invoice) => (

                  <tr key={invoice._id}>

                    <td className="border p-2 text-center">
                      {invoice.invoiceNo}
                    </td>

                    <td className="border p-2 text-center">
                      {invoice.invoiceDate}
                    </td>

                    <td className="border p-2">
                      {invoice.customerName}
                    </td>

                    <td className="border p-2 text-right">
                      ₹ {Number(invoice.grandTotal).toFixed(2)}
                    </td>

                    <td className="border p-2">

                      <div className="flex justify-center gap-2">

                        <button
                            onClick={() => navigate(`/invoice/${invoice._id}`)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            >
                            View
                            </button>

                        

                        <button
                          onClick={() => handleDelete(invoice._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
        )}

      </div>
      <div className="flex justify-center mt-8"></div>
      <button onClick={() => navigate("/billing")}
        className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg">
         Back to Billing
        </button>
        






    </div>
  );
}

export default SearchInvoice;