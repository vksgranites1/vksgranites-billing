import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices, deleteInvoice } from "../api/invoiceApi";

const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

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
          <div className="text-center py-12 text-gray-600">Loading invoices...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Invoice No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Grand Total
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {invoice.invoiceNo}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(invoice.invoiceDate)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {invoice.customerName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
                        ₹ {Number(invoice.grandTotal).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/invoice/${invoice._id}`)}
                            className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(invoice._id)}
                            className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
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
          </div>
        )}

      </div>
      <div className="flex flex-col gap-3 items-center justify-center mt-8 md:flex-row">
        <button
          onClick={() => navigate("/billing")}
          className="w-full max-w-xs rounded-lg bg-gray-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 md:w-auto"
        >
          Back to Billing
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full max-w-xs rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-800 md:w-auto"
        >
          Dashboard
        </button>
      </div>






    </div>
  );
}

export default SearchInvoice;