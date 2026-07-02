import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getJobWorks,
  deleteJobWork,
} from "../api/jobWorkApi";

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
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full border-collapse border">

            <thead className="bg-gray-200">

              <tr>

                <th className="border p-2">Bill No</th>

                <th className="border p-2">Date</th>

                <th className="border p-2">Customer</th>

                <th className="border p-2">Grand Total</th>

                <th className="border p-2">Actions</th>

              </tr>

            </thead>

            <tbody>

              {jobWorks.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    No Job Work Bills Found
                  </td>

                </tr>

              ) : (

                jobWorks.map((bill) => (

                  <tr key={bill._id}>

                    <td className="border p-2 text-center">
                      {bill.invoiceNo}
                    </td>

                    <td className="border p-2 text-center">
                      {bill.invoiceDate}
                    </td>

                    <td className="border p-2">
                      {bill.customerName}
                    </td>

                    <td className="border p-2 text-right">
                      ₹ {Number(bill.grandTotal).toFixed(2)}
                    </td>

                    <td className="border p-2">

                      <div className="flex justify-center gap-2">

                        <button
                            onClick={() => navigate(`/jobwork/${bill._id}`)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            >
                            View
                            </button>

                        <button
                          onClick={() => handleDelete(bill._id)}
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

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/jobwork")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg"
        >
          Back to Billing
        </button>
      </div>

    </div>
  );
}

export default SearchJobWork;