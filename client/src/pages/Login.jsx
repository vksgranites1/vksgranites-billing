import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/billing");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">

        <div className="flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-28 h-28"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mt-4">
          VKS Granites
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Invoice Management System
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;