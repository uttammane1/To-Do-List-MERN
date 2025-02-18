import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if there's already a token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // If token exists, redirect to todos page
      Navigate("/todos");
    }
  }, [Navigate]);

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://to-do-list-mern-q28z.onrender.com/users/login",
        formData
      );
      const token = res.data.token;
      localStorage.setItem("authToken", token); // Store the token in localStorage
      alert("Login successful!");
      Navigate("/todos"); // Redirect to todos page
      console.log("Login Response:", res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 border p-8 rounded-md bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 text-white"
      >
        <h1 className="text-center font-black text-2xl">Login Page</h1>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <input
          name="email"
          value={formData.email}
          onChange={handleInput}
          className="w-full border p-2 rounded-md text-black"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleInput}
          className="w-full border p-2 rounded-md text-black"
          type="password"
          placeholder="Enter your password"
          required
        />

        <button
          className="w-full border p-2 rounded-md font-medium bg-green-500 text-white disabled:bg-gray-400"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
