import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Box } from "@mui/material";
import "../css/TypeScreen.css"; // Custom CSS

export default function TypeScreen() {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();
  const wheels = localStorage.getItem("wheels");

  useEffect(() => {
    if (!wheels) {
      navigate("/wheels");
      return;
    }

    const fetchTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicles/types?wheels=${wheels}`);
        setTypes(res.data);
      } catch (err) {
        console.error("Failed to fetch types", err);
      }
    };

    fetchTypes();
  }, [wheels, navigate]);

  const handleSelectType = (type) => {
    localStorage.setItem("vehicleTypeId", type.id);
    localStorage.setItem("vehicleTypeName", type.name);
    navigate("/model");
  };

  return (
    <div className="form-container">
      <Box className="form-box">
        <Typography variant="h5" gutterBottom>
          Select a Vehicle Type
        </Typography>

        <div className="button-grid">
          {types.length > 0 ? (
            types.map((type) => (
              <Button
                key={type.id}
                variant="contained"
                color="primary"
                onClick={() => handleSelectType(type)}
                className="type-button"
              >
                {type.name}
              </Button>
            ))
          ) : (
            <Typography color="textSecondary">Loading types...</Typography>
          )}
        </div>
      </Box>
    </div>
  );
}
