import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobWorkInvoicePreview from "../components/JobWorkInvoicePreview";
import { getJobWork } from "../api/jobWorkApi";
import { useNavigate } from "react-router-dom";


function ViewJobWork() {
    const navigate = useNavigate();
  const { id } = useParams();

  const [jobWork, setJobWork] = useState(null);

  useEffect(() => {
    loadJobWork();
  }, []);

  const loadJobWork = async () => {

    try {

      const data = await getJobWork(id);

      setJobWork(data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!jobWork)
    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <JobWorkInvoicePreview
        data={jobWork}
      />

      <div className="text-center mt-8">

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Print Job Work Bill
        </button>&nbsp;&nbsp;
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

export default ViewJobWork;