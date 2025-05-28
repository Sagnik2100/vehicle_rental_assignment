import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const vehicleId = localStorage.getItem("vehicleId");
  const vehicleName = localStorage.getItem("vehicleName");
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/bookings", {
        firstName,
        lastName,
        vehicleId: parseInt(vehicleId),
        startDate,
        endDate,
      });

      alert("Booking successful!");

      // optionally clear storage and redirect
      localStorage.clear();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Review Your Booking</h2>

      <ul>
        <li><strong>Name:</strong> {firstName} {lastName}</li>
        <li><strong>Vehicle:</strong> {vehicleName}</li>
        <li><strong>Start Date:</strong> {startDate}</li>
        <li><strong>End Date:</strong> {endDate}</li>
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleConfirm} disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
