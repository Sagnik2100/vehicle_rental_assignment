import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../css/NameScreen.css"; // Import your custom CSS

export default function NameScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError(true);
      return;
    }

    // Save to localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);

    navigate("/wheels");
  };

  return (
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          Enter Your Name
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={error && !firstName.trim()}
            helperText={error && !firstName.trim() ? "First name is required" : ""}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={error && !lastName.trim()}
            helperText={error && !lastName.trim() ? "Last name is required" : ""}
          />
          <div className="button-wrapper">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Next
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
