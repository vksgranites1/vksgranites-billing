import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Billing from "./pages/Billing";
import Preview from "./pages/Preview";
import SearchInvoice from "./pages/SearchInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import Dashboard from "./pages/Dashboard";
import JobWork from "./pages/JobWork";
import JobWorkPreview from "./pages/JobWorkPreview";
import ViewJobWork from "./pages/ViewJobWork";
import SearchJobWork from "./pages/SearchJobWork";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/search" element={<SearchInvoice />} />
      <Route path="/invoice/:id" element={<ViewInvoice />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/jobwork" element={<JobWork />} />
      <Route path="/jobwork-preview" element={<JobWorkPreview />} />
      <Route path="/jobwork/:id" element={<ViewJobWork />} />
      <Route path="/search-jobwork" element={<SearchJobWork />} />
    </Routes>
  );
}

export default App;