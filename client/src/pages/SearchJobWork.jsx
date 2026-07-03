import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getJobWorks,
  deleteJobWork,
} from "../api/jobWorkApi";

const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

function SearchJobWork() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [jobWorks, setJobWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobWorks();
  }, []);

  const loadJobWorks = async (searchText = "") => {
    try {
      setLoading(true);

      const data = await getJobWorks(searchText);

      setJobWorks(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load Job Work Bills");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    loadJobWorks(value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this Job Work Bill?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteJobWork(id);

      alert(res.message);

      loadJobWorks(search);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to delete Job Work Bill.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Search Job Work Bills
          </h1>

          <button
            onClick={() => navigate("/jobwork")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + New Job Work Bill
          </button>

        </div>

        <input
          type="text"
          placeholder="Search by Bill No, Customer Name or Date"
          value={search}
          onChange={handleSearch}
          className="w-full border rounded-lg p-3 mb-6"
        />

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading job work bills...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Bill No
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
                {jobWorks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No job work bills found
                    </td>
                  </tr>
                ) : (
                  jobWorks.map((bill) => (
                    <tr key={bill._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {bill.invoiceNo}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(bill.invoiceDate)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {bill.customerName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
                        ₹ {Number(bill.grandTotal).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/jobwork/${bill._id}`)}
                            className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(bill._id)}
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
          onClick={() => navigate("/jobwork")}
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

export default SearchJobWork;