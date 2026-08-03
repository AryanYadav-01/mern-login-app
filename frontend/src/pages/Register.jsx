import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/icons/images (1).jpeg";
import brand from "../assets/icons/Meta-Logo.avif";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { fullName, username, email, password } = form;
    if (!fullName || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      setSuccess("Account created! Redirecting to login...");
      // Simple flow: user is saved to MongoDB, then sent back to the login page.
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="app-icon" style={{ marginTop: 24 }}>
        <img src={logo} alt="App logo placeholder" />
      </div>

      <form style={{ width: "100%" }} onSubmit={handleSubmit} noValidate>
        <input
          className="field"
          type="text"
          name="fullName"
          placeholder="Full name"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          className="field"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="field"
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="field"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <div className="error-msg">{error}</div>
        {success && <div className="success-msg">{success}</div>}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Sign up"}
        </button>
      </form>

      <div className="spacer"></div>

      <p style={{ fontSize: 14, color: "#262626" }}>
        Already have an account?{" "}
        <Link to="/" style={{ color: "#0064e0", fontWeight: 600, textDecoration: "none" }}>
          Log in
        </Link>
      </p>

      <div className="brand-footer">
        <img src={brand} alt="Brand placeholder" />
      </div>
    </div>
  );
}
