import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import "../css/DateScreen.css"; // Custom CSS

export default function DateScreen() {
  const navigate = useNavigate();

  const vehicleName = localStorage.getItem("vehicleName");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be earlier than start date.");
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

        {error && (
          <Alert severity="error" style={{ marginBottom: "1rem" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (new Date(endDate) < new Date(e.target.value)) {
                setEndDate(""); // Reset invalid end date
              }
            }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            inputProps={{
              min: startDate, // Prevent selecting a date before startDate
            }}
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
