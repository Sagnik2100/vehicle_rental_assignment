import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import "../css/WheelsScreen.css"; // Custom CSS for layout

export default function WheelsScreen() {
  const navigate = useNavigate();

  const handleSelect = (wheels) => {
    localStorage.setItem("wheels", wheels);
    navigate("/type");
  };

  return (
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          How many wheels?
        </Typography>

        <div className="button-group">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleSelect(2)}
          >
            2 Wheels
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleSelect(4)}
          >
            4 Wheels
          </Button>
        </div>
      </Box>
    </div>
  );
}
