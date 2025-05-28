import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../css/DateScreen.css"; // Custom CSS

export default function DateScreen() {
  const navigate = useNavigate();

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
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          Select Booking Dates for {vehicleName || "your vehicle"}
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="button-wrapper">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Continue to Review
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
