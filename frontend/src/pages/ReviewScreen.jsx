import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material";
import "../css/ReviewScreen.css"; // Custom styles

export default function ReviewScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      await axios.post("http://localhost:8000/api/bookings", {
        firstName,
        lastName,
        vehicleId: parseInt(vehicleId),
        startDate,
        endDate,
      });

      setOpenSnackbar(true); // Show success snackbar

      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          Review Your Booking
        </Typography>

        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={`${firstName} ${lastName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vehicle" secondary={vehicleName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Start Date" secondary={startDate} />
          </ListItem>
          <ListItem>
            <ListItemText primary="End Date" secondary={endDate} />
          </ListItem>
        </List>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <div className="button-wrapper">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Booking successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
