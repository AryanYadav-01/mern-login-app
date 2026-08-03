import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    window.location.href = "https://www.instagram.com";
  }, []);

  return (
    <div className="screen" style={{ justifyContent: "center", alignItems: "center" }}>
      <h2 style={{ marginBottom: 12 }}>Welcome{user ? `, ${user.fullName}` : ""}!</h2>
      <p style={{ color: "#737373", textAlign: "center" }}>
        Redirecting you to Instagram...
      </p>
    </div>
  );
}