import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DateScreen() {
  const navigate = useNavigate();

  const vehicleId = localStorage.getItem("vehicleId");
  const vehicleName = localStorage.getItem("vehicleName");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);

    navigate("/review");
  };

  return (
    <div>
      <h2>Select Booking Dates for your {vehicleName || "your vehicle"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button type="submit">Continue to Review</button>
      </form>
    </div>
  );
}
