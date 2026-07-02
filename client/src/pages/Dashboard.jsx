import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[650px]">

        <div className="flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-45 h-28"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mt-3">
          VKS GRANITES
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Billing Management System
        </p>

        <div className="grid grid-cols-2 gap-6">

          <button
            onClick={() => navigate("/billing")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              TAX INVOICE
            </h2>

            <p className="mt-3">
              Create GST Invoice
            </p>
          </button>

          <button
            onClick={() => navigate("/jobwork")}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              JOB WORK BILL
            </h2>

            <p className="mt-3">
              Create Job Work Bill
            </p>
          </button>

          <button
            onClick={() => navigate("/search")}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              SEARCH
            </h2>

            <p className="mt-3">
              Tax Invoices
            </p>
          </button>

          <button
            onClick={() => navigate("/search-jobwork")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              SEARCH
            </h2>

            <p className="mt-3">
              Job Work Bills
            </p>
          </button>

        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;